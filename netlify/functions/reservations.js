const { query } = require('./_lib/db');
const { ok, error, parseBody, headers } = require('./_lib/http');
const { requireAdmin } = require('./_lib/auth');

function timeToMinutes(time) {
  const [h, m] = String(time).slice(0, 5).split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const m = String(minutes % 60).padStart(2, '0');
  return `${h}:${m}:00`;
}

function isOpenDay(dateString, workDays = [1, 2, 3, 4, 5]) {
  const jsDay = new Date(`${dateString}T12:00:00`).getDay();
  const normalizedDay = jsDay === 0 ? 7 : jsDay;
  return workDays.includes(normalizedDay);
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

const PHONE_REGEX = /^(0\d{9}|\+212\d{9})$/;

function normalizePhone(value = '') {
  return String(value || '').trim().replace(/[\s.-]+/g, '');
}

function assertReservationIdentity(body) {
  const fullName = String(body.full_name || '').trim();
  const phone = normalizePhone(body.phone || '');
  if (!fullName) throw new Error('Nom complet requis.');
  if (fullName.length < 3) throw new Error('Le nom complet doit contenir au moins 3 caractères.');
  if (!phone) throw new Error('Téléphone requis.');
  if (!PHONE_REGEX.test(phone)) throw new Error('Le téléphone doit être au format 0123456789 ou +212123456789.');
  return { fullName, phone };
}


async function getOfficeSettings() {
  const settingsRows = await query`SELECT value FROM settings WHERE key='office' LIMIT 1`;
  return settingsRows[0]?.value || {};
}

async function getServiceMeta(serviceId, fallbackName, fallbackDuration) {
  if (!serviceId) {
    return { service_name: fallbackName, duration_minutes: Number(fallbackDuration || 60) };
  }
  const rows = await query`SELECT id, name, duration_minutes FROM services WHERE id = ${serviceId} LIMIT 1`;
  const service = rows[0];
  return {
    service_id: service?.id || serviceId,
    service_name: service?.name || fallbackName,
    duration_minutes: Number(service?.duration_minutes || fallbackDuration || 60)
  };
}

async function assertAvailability({ reservationId = null, session_date, session_time, session_end_time }) {
  const rows = await query`
    SELECT id, session_time::text AS session_time, session_end_time::text AS session_end_time
    FROM reservations
    WHERE session_date = ${session_date}
      AND status IN ('reserved', 'confirmed')
      AND (${reservationId}::uuid IS NULL OR id <> ${reservationId}::uuid)
  `;

  const start = timeToMinutes(session_time);
  const end = timeToMinutes(session_end_time);
  const conflict = rows.some(row => overlaps(start, end, timeToMinutes(row.session_time), timeToMinutes(row.session_end_time)));
  if (conflict) {
    throw new Error('Ce créneau est déjà réservé pour tout ou partie de cette durée.');
  }
}

async function normalizeReservationPayload(body, reservationId = null) {
  const office = await getOfficeSettings();
  const workDays = office.workDays || [1, 2, 3, 4, 5];
  const dayStart = office.dayStart || '10:00';
  const dayEnd = office.dayEnd || '18:00';
  const fallbackDuration = Number(office.slotMinutes || 60);
  const { fullName, phone } = assertReservationIdentity(body);

  if (!body.session_date) throw new Error('Date de séance requise.');
  if (!body.session_time) throw new Error('Heure de séance requise.');
  if (!isOpenDay(body.session_date, workDays)) throw new Error('Le cabinet est fermé ce jour-là.');

  const serviceMeta = await getServiceMeta(body.service_id || null, body.service_name, fallbackDuration);
  const start = timeToMinutes(body.session_time);
  const open = timeToMinutes(dayStart);
  const close = timeToMinutes(dayEnd);
  const durationMinutes = Number(body.duration_minutes || serviceMeta.duration_minutes || fallbackDuration);
  const end = start + durationMinutes;

  if (start < open || end > close) {
    throw new Error('Heure hors disponibilité du cabinet.');
  }

  const session_end_time = minutesToTime(end);
  await assertAvailability({
    reservationId,
    session_date: body.session_date,
    session_time: body.session_time,
    session_end_time
  });

  return {
    ...body,
    full_name: fullName,
    phone,
    service_id: serviceMeta.service_id || null,
    service_name: serviceMeta.service_name || body.service_name,
    duration_minutes: durationMinutes,
    session_end_time
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    if (event.httpMethod === 'GET') {
      const auth = requireAdmin(event);
      if (!auth.authorized) return auth.response;
      const rows = await query`
        SELECT r.*, s.name AS service_label
        FROM reservations r
        LEFT JOIN services s ON s.id = r.service_id
        ORDER BY r.session_date ASC, r.session_time ASC
      `;
      return ok(rows);
    }

    if (event.httpMethod === 'POST') {
      const body = parseBody(event);
      const payload = await normalizeReservationPayload(body);

      const rows = await query`
        INSERT INTO reservations (
          full_name, phone, birth_date, city, cin, insurance, company, emergency_contact,
          antecedents, allergies, notes, service_id, service_name, session_date, session_time,
          session_end_time, duration_minutes, status
        ) VALUES (
          ${payload.full_name}, ${payload.phone}, ${payload.birth_date || null}, ${payload.city || null}, ${payload.cin || null},
          ${payload.insurance || null}, ${payload.company || null}, ${payload.emergency_contact || null}, ${payload.antecedents || null},
          ${payload.allergies || null}, ${payload.notes || null}, ${payload.service_id || null}, ${payload.service_name}, ${payload.session_date},
          ${payload.session_time}, ${payload.session_end_time}, ${payload.duration_minutes}, 'reserved'
        ) RETURNING *
      `;
      return ok({ message: 'Réservation enregistrée avec succès.', reservation: rows[0] }, 201);
    }

    if (event.httpMethod === 'PUT') {
      const auth = requireAdmin(event);
      if (!auth.authorized) return auth.response;
      const body = parseBody(event);
      if (!body.id) return error('ID requis.', 400);
      const payload = await normalizeReservationPayload(body, body.id);

      const rows = await query`
        UPDATE reservations SET
          full_name=${payload.full_name}, phone=${payload.phone}, birth_date=${payload.birth_date || null}, city=${payload.city || null},
          cin=${payload.cin || null}, insurance=${payload.insurance || null}, company=${payload.company || null}, emergency_contact=${payload.emergency_contact || null},
          antecedents=${payload.antecedents || null}, allergies=${payload.allergies || null}, notes=${payload.notes || null},
          service_id=${payload.service_id || null}, service_name=${payload.service_name}, session_date=${payload.session_date}, session_time=${payload.session_time},
          session_end_time=${payload.session_end_time}, duration_minutes=${payload.duration_minutes}, status=${payload.status || 'reserved'}, updated_at=NOW()
        WHERE id=${payload.id}
        RETURNING *
      `;
      return ok(rows[0]);
    }

    if (event.httpMethod === 'DELETE') {
      const auth = requireAdmin(event);
      if (!auth.authorized) return auth.response;
      const id = event.queryStringParameters?.id;
      if (!id) return error('ID requis.', 400);
      await query`DELETE FROM reservations WHERE id=${id}`;
      return ok({ message: 'Réservation supprimée.' });
    }

    return error('Méthode non autorisée.', 405);
  } catch (e) {
    if (String(e.message).includes('already reserved') || String(e.message).includes('créneau')) {
      return error(e.message, 409);
    }
    return error(e.message || 'Erreur reservations API.', 500, { details: e.message });
  }
};

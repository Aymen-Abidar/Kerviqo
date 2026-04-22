const { query } = require('./_lib/db');
const { ok, error, headers } = require('./_lib/http');

function timeToMinutes(time) {
  const [h, m] = String(time).slice(0, 5).split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const m = String(minutes % 60).padStart(2, '0');
  return `${h}:${m}:00`;
}

function buildCandidateSlots(dayStart, dayEnd, stepMinutes, durationMinutes) {
  const slots = [];
  const start = timeToMinutes(dayStart);
  const end = timeToMinutes(dayEnd);
  let cursor = start;
  while (cursor + durationMinutes <= end) {
    slots.push({
      time: minutesToTime(cursor),
      end_time: minutesToTime(cursor + durationMinutes)
    });
    cursor += stepMinutes;
  }
  return slots;
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'GET') return error('Méthode non autorisée.', 405);

  try {
    const date = event.queryStringParameters?.date;
    const serviceId = event.queryStringParameters?.serviceId;
    if (!date) return error('Date requise.', 400);

    const settingsRows = await query`SELECT value FROM settings WHERE key='office' LIMIT 1`;
    const office = settingsRows[0]?.value || {};
    const workDays = office.workDays || [1, 2, 3, 4, 5];
    const dayStart = office.dayStart || '10:00';
    const dayEnd = office.dayEnd || '18:00';
    const slotMinutes = Number(office.slotMinutes || 60);
    const slotStep = Number(office.slotStep || 30);

    let durationMinutes = slotMinutes;
    if (serviceId) {
      const serviceRows = await query`SELECT duration_minutes FROM services WHERE id = ${serviceId} LIMIT 1`;
      durationMinutes = Number(serviceRows[0]?.duration_minutes || slotMinutes);
    }

    const jsDay = new Date(`${date}T12:00:00`).getDay();
    const normalizedDay = jsDay === 0 ? 7 : jsDay;
    if (!workDays.includes(normalizedDay)) {
      return ok({ date, closed: true, slots: [], office, durationMinutes, slotStep });
    }

    const reservedRows = await query`
      SELECT session_time::text AS session_time, session_end_time::text AS session_end_time
      FROM reservations
      WHERE session_date = ${date}
        AND status IN ('reserved', 'confirmed')
      ORDER BY session_time ASC
    `;

    const reservedIntervals = reservedRows.map(row => ({
      start: timeToMinutes(row.session_time),
      end: timeToMinutes(row.session_end_time)
    }));

    const allSlots = buildCandidateSlots(dayStart, dayEnd, slotStep, durationMinutes);
    const slots = allSlots.map(slot => {
      const slotStart = timeToMinutes(slot.time);
      const slotEnd = timeToMinutes(slot.end_time);
      const available = !reservedIntervals.some(res => overlaps(slotStart, slotEnd, res.start, res.end));
      return { ...slot, available };
    });

    return ok({ date, closed: false, slots, office, durationMinutes, slotStep });
  } catch (e) {
    return error(e.message || 'Erreur availability API.', 500, { details: e.message });
  }
};

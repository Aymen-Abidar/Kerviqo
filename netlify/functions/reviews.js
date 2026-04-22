const { query } = require('./_lib/db');
const { ok, error, parseBody, headers } = require('./_lib/http');
const { requireAdmin } = require('./_lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  try {
    if (event.httpMethod === 'GET') {
      const rows = await query`SELECT * FROM reviews ORDER BY created_at DESC`;
      return ok(rows);
    }

    const auth = requireAdmin(event);
    if (!auth.authorized) return auth.response;
    const body = parseBody(event);

    if (!String(body.patient_name || '').trim()) return error('Le nom du patient est requis.', 400);
    if (!String(body.comment || '').trim()) return error('Le commentaire est requis.', 400);

    if (event.httpMethod === 'POST') {
      const rows = await query`
        INSERT INTO reviews (patient_name, role_label, rating, comment)
        VALUES (${String(body.patient_name).trim()}, ${body.role_label || null}, ${body.rating || 5}, ${String(body.comment).trim()})
        RETURNING *
      `;
      return ok(rows[0], 201);
    }

    if (event.httpMethod === 'PUT') {
      if (!body.id) return error('ID requis.', 400);
      const rows = await query`
        UPDATE reviews SET patient_name=${String(body.patient_name).trim()}, role_label=${body.role_label || null}, rating=${body.rating || 5}, comment=${String(body.comment).trim()}
        WHERE id=${body.id}
        RETURNING *
      `;
      if (!rows[0]) return error('Avis introuvable.', 404);
      return ok(rows[0]);
    }

    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters?.id;
      if (!id) return error('ID requis.', 400);
      await query`DELETE FROM reviews WHERE id=${id}`;
      return ok({ message: 'Avis supprimé.' });
    }

    return error('Méthode non autorisée.', 405);
  } catch (e) {
    return error(e.message || 'Erreur reviews API.', 500, { details: e.message });
  }
};

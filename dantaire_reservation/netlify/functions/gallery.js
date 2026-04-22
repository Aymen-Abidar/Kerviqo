const { query } = require('./_lib/db');
const { ok, error, parseBody, headers } = require('./_lib/http');
const { requireAdmin } = require('./_lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  try {
    if (event.httpMethod === 'GET') {
      const rows = await query`SELECT * FROM gallery ORDER BY sort_order ASC, created_at ASC`;
      return ok(rows);
    }

    const auth = requireAdmin(event);
    if (!auth.authorized) return auth.response;
    const body = parseBody(event);

    if (!String(body.title || '').trim()) return error('Le titre est requis.', 400);
    if (!String(body.image_url || '').trim()) return error('Une image est requise.', 400);

    if (event.httpMethod === 'POST') {
      const rows = await query`
        INSERT INTO gallery (title, image_url, alt_text, sort_order)
        VALUES (${String(body.title).trim()}, ${String(body.image_url).trim()}, ${body.alt_text || null}, ${body.sort_order || 0})
        RETURNING *
      `;
      return ok(rows[0], 201);
    }

    if (event.httpMethod === 'PUT') {
      if (!body.id) return error('ID requis.', 400);
      const rows = await query`
        UPDATE gallery SET title=${String(body.title).trim()}, image_url=${String(body.image_url).trim()}, alt_text=${body.alt_text || null}, sort_order=${body.sort_order || 0}
        WHERE id=${body.id}
        RETURNING *
      `;
      if (!rows[0]) return error('Image introuvable.', 404);
      return ok(rows[0]);
    }

    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters?.id;
      if (!id) return error('ID requis.', 400);
      await query`DELETE FROM gallery WHERE id=${id}`;
      return ok({ message: 'Image supprimée.' });
    }

    return error('Méthode non autorisée.', 405);
  } catch (e) {
    return error(e.message || 'Erreur gallery API.', 500, { details: e.message });
  }
};

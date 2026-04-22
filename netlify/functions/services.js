const { query } = require('./_lib/db');
const { ok, error, parseBody, headers } = require('./_lib/http');
const { requireAdmin } = require('./_lib/auth');

function toSlug(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    if (event.httpMethod === 'GET') {
      const rows = await query`SELECT * FROM services ORDER BY featured DESC, sort_order ASC, created_at ASC`;
      return ok(rows);
    }

    const auth = requireAdmin(event);
    if (!auth.authorized) return auth.response;
    const body = parseBody(event);

    if (!String(body.name || '').trim()) return error('Le nom du service est requis.', 400);
    const slug = toSlug(body.slug || body.name);

    if (event.httpMethod === 'POST') {
      const rows = await query`
        INSERT INTO services (name, slug, short_description, description, price, duration_minutes, image_url, featured, sort_order)
        VALUES (
          ${String(body.name).trim()}, ${slug}, ${body.short_description || ''}, ${body.description || ''}, ${body.price || 0},
          ${body.duration_minutes || 60}, ${body.image_url || null}, ${!!body.featured}, ${body.sort_order || 0}
        ) RETURNING *
      `;
      return ok(rows[0], 201);
    }

    if (event.httpMethod === 'PUT') {
      if (!body.id) return error('ID requis.', 400);
      const rows = await query`
        UPDATE services SET
          name = ${String(body.name).trim()}, slug = ${slug}, short_description = ${body.short_description || ''},
          description = ${body.description || ''}, price = ${body.price || 0}, duration_minutes = ${body.duration_minutes || 60},
          image_url = ${body.image_url || null}, featured = ${!!body.featured}, sort_order = ${body.sort_order || 0}, updated_at = NOW()
        WHERE id = ${body.id}
        RETURNING *
      `;
      if (!rows[0]) return error('Service introuvable.', 404);
      return ok(rows[0]);
    }

    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters?.id;
      if (!id) return error('ID requis.', 400);
      await query`DELETE FROM services WHERE id = ${id}`;
      return ok({ message: 'Service supprimé.' });
    }

    return error('Méthode non autorisée.', 405);
  } catch (e) {
    return error(e.message || 'Erreur services API.', 500, { details: e.message });
  }
};

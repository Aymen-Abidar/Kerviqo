const { query } = require('./_lib/db');
const { ok, error, parseBody, headers } = require('./_lib/http');
const { requireAdmin } = require('./_lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    if (event.httpMethod === 'GET') {
      const rows = await query`SELECT value FROM settings WHERE key = 'office' LIMIT 1`;
      return ok(rows[0]?.value || {});
    }

    if (event.httpMethod === 'PUT') {
      const auth = requireAdmin(event);
      if (!auth.authorized) return auth.response;
      const body = parseBody(event);
      const payload = JSON.stringify(body);
      await query`
        INSERT INTO settings (key, value, updated_at)
        VALUES ('office', ${payload}::jsonb, NOW())
        ON CONFLICT (key)
        DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
      `;
      return ok({ message: 'Paramètres du cabinet mis à jour.' });
    }

    return error('Méthode non autorisée.', 405);
  } catch (e) {
    return error(e.message || 'Erreur office API.', 500, { details: e.message });
  }
};

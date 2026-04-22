const { ok, error, parseBody, headers } = require('./_lib/http');
const { signAdminToken } = require('./_lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return error('Méthode non autorisée.', 405);

  const { password } = parseBody(event);
  if (!password) return error('Mot de passe requis.', 400);
  if (!process.env.ADMIN_PASSWORD) return error('ADMIN_PASSWORD is missing.', 500);

  if (password !== process.env.ADMIN_PASSWORD) {
    return error('Mot de passe incorrect.', 401);
  }

  const token = signAdminToken();
  return ok({ token, message: 'Connexion administrateur réussie.' });
};

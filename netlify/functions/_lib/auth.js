const jwt = require('jsonwebtoken');
const { error } = require('./http');

function getToken(event) {
  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  if (!authHeader.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}

function signAdminToken() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is missing');
  return jwt.sign({ role: 'admin' }, secret, { expiresIn: '12h' });
}

function requireAdmin(event) {
  try {
    const token = getToken(event);
    if (!token) return { authorized: false, response: error('Authentification requise.', 401) };
    const secret = process.env.JWT_SECRET;
    if (!secret) return { authorized: false, response: error('JWT_SECRET is missing.', 500) };
    const decoded = jwt.verify(token, secret);
    if (decoded.role !== 'admin') {
      return { authorized: false, response: error('Accès refusé.', 403) };
    }
    return { authorized: true, decoded };
  } catch {
    return { authorized: false, response: error('Session invalide ou expirée.', 401) };
  }
}

module.exports = { signAdminToken, requireAdmin };

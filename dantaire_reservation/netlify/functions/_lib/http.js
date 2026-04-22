const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};

function ok(data, statusCode = 200) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(data)
  };
}

function error(message, statusCode = 400, extra = {}) {
  return ok({ error: message, ...extra }, statusCode);
}

function parseBody(event) {
  try {
    return event.body ? JSON.parse(event.body) : {};
  } catch {
    return {};
  }
}

module.exports = { headers, ok, error, parseBody };

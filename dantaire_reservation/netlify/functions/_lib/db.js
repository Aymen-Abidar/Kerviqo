const { neon } = require('@neondatabase/serverless');

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is missing');
  }
  return neon(url);
}

async function query(strings, ...params) {
  const sql = getSql();
  return sql(strings, ...params);
}

module.exports = { query };

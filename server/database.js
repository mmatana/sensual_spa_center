const { Pool } = require('pg');
const client = new Pool({
  connectionString: process.env.DATABASE_URL
});

client.connect()
  .then(() => '')
  .catch(err => { return (err); });

module.exports = client;

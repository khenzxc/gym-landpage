require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = Number(process.env.PORT || 5000);

const databaseUrl = process.env.MYSQL_ADDON_URI || process.env.DATABASE_URL;
const database = databaseUrl
  ? (() => {
      const url = new URL(databaseUrl);
      return {
        host: url.hostname,
        port: Number(url.port || 3306),
        user: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        database: decodeURIComponent(url.pathname.slice(1)),
      };
    })()
  : {
      host: process.env.MYSQL_ADDON_HOST || '127.0.0.1',
      port: Number(process.env.MYSQL_ADDON_PORT || 3306),
      user: process.env.MYSQL_ADDON_USER,
      password: process.env.MYSQL_ADDON_PASSWORD,
      database: process.env.MYSQL_ADDON_DB,
    };

const pool = mysql.createPool({
  ...database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json());

app.get('/api/health', async (_request, response) => {
  try {
    await pool.query('SELECT 1');
    response.json({ ok: true, database: 'connected' });
  } catch (error) {
    console.error('Database health check failed:', error.message);
    response.status(503).json({ ok: false, database: 'disconnected' });
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

module.exports = { app, pool };

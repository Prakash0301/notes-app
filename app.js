const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: 5432,
});

async function init() {
  for (let i = 0; i < 10; i++) {
    try {
      await pool.query('CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, note TEXT)');
      console.log('Connected to Postgres');
      return;
    } catch (e) {
      console.log('Waiting for DB...');
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

app.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT note FROM notes ORDER BY id DESC');
  const list = rows.map(r => `<li>${r.note}</li>`).join('');
  res.send(`
    <html><body style="font-family:sans-serif;max-width:500px;margin:60px auto;
    background:#0d1117;color:#e6edf3;padding:30px;border-radius:10px;">
      <h1 style="color:#58a6ff;">🗒️ Notes</h1>
      <form method="POST" action="/add">
        <input name="note" placeholder="New note..." style="padding:8px;width:70%;">
        <button style="padding:8px 16px;">Add</button>
      </form>
      <ul>${list}</ul>
    </body></html>
  `);
});

app.post('/add', async (req, res) => {
  if (req.body.note) await pool.query('INSERT INTO notes (note) VALUES ($1)', [req.body.note]);
  res.redirect('/');
});

init().then(() => app.listen(3000, () => console.log('App on port 3000')));

require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const storage = multer.diskStorage({
  destination: '../client/src/assets/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

app.use(session({
  store: new pgSession({ pool: pool }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10*60*1000, secure: false }
}));

const authenticateSession = (req, res, next) => {
  if (req.session.id_author) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get('/posts', async (req, res) => {
  const result = await pool.query('SELECT * FROM post');
  res.json(result.rows);
});

app.get('/posts/:id_post', async (req, res) => {
  const { id_post } = req.params;
  const result = await pool.query('SELECT * FROM post WHERE id_post = $1', [id_post]);
  res.json(result.rows[0]);
});

app.post('/posts/new', upload.single('img'), async (req, res) => {
  const { title, date, text } = req.body;
  const image = req.file ? './src/assets/uploads/' + req.file.originalname : null;
  await pool.query(
    'INSERT INTO post (title, date, image, text) VALUES ($1, $2, $3, $4)',
    [title, date, image, text]
  );
  res.json({ message: 'Post agregado correctamente' });
});

app.post('/login', upload.none(), async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM author WHERE username = $1', [username]);
  const data = result.rows[0];
  if (data) {
    if (data.password == password) {
      req.session.id_author = data.id_author;
      req.session.save((err) => {
        if (err) return res.sendStatus(500);
        res.send(req.session);
      });
    } else {
      res.status(401).send('Invalid email/password');
    }
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/session-info', (req, res) => {
  res.json(req.session);
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Failed to destroy session');
    res.send('Session destroyed');
  });
});

app.get('/authors/:id_author', authenticateSession, async (req, res) => {
  const { id_author } = req.params;
  const result = await pool.query('SELECT * FROM author WHERE id_author = $1', [id_author]);
  res.json(result.rows[0]);
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
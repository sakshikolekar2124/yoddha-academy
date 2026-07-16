const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { query, initDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser middlewares (expanded payload limit for device base64 uploads)
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Simple request logger
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

// Initialize SQLite database
initDatabase()
  .then(() => console.log('Database initialized successfully.'))
  .catch((err) => console.error('Database initialization failed:', err));

// ================= AUTH ENDPOINTS =================

// Route: Registration
app.post('/api/auth/register', async (req, res) => {
  const { fullName, email, password, role, discipline } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ error: 'Please enter name, email, password, and role.' });
  }

  try {
    // Check if user already exists
    const existingUser = await query.get('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    // Hash Password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    // Insert user
    const result = await query.run(
      'INSERT INTO users (fullName, email, password, role, discipline) VALUES (?, ?, ?, ?, ?)',
      [fullName, email.toLowerCase(), passwordHash, role, discipline || null]
    );

    res.json({
      success: true,
      user: {
        id: result.id,
        fullName,
        email: email.toLowerCase(),
        role,
        discipline: discipline || null
      }
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Server signup transaction error.' });
  }
});

// Route: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter both email and password.' });
  }

  try {
    // Fetch User
    const user = await query.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email credentials.' });
    }

    // Verify Password
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid password credentials.' });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        discipline: user.discipline
      }
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server authentication error.' });
  }
});

// ================= PUBLIC ENDPOINTS =================

// Route: Fetch Schedule
app.get('/api/schedule', async (req, res) => {
  try {
    const schedule = await query.all('SELECT * FROM schedule ORDER BY time ASC');
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: 'Database fetch error.' });
  }
});

// Route: Submit Trial Form
app.post('/api/submit-trial', async (req, res) => {
  const { fullName, email, phone, discipline, experience } = req.body;

  if (!fullName || !email || !phone || !discipline || !experience) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await query.run(
      'INSERT INTO trial_requests (fullName, email, phone, discipline, experience) VALUES (?, ?, ?, ?, ?)',
      [fullName, email, phone, discipline, experience]
    );
    res.json({ success: true, id: result.id });
  } catch (err) {
    res.status(500).json({ error: 'Database error saving trial request.' });
  }
});

// Route: Get Reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await query.all('SELECT * FROM reviews ORDER BY createdAt DESC');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Database error fetching reviews.' });
  }
});

// Route: Submit Review
app.post('/api/reviews', async (req, res) => {
  const { fullName, rating, comment } = req.body;

  if (!fullName || !rating || !comment) {
    return res.status(400).json({ error: 'Please enter name, rating, and review comment.' });
  }

  try {
    const result = await query.run(
      'INSERT INTO reviews (fullName, rating, comment) VALUES (?, ?, ?)',
      [fullName, parseInt(rating), comment]
    );
    res.json({ success: true, id: result.id });
  } catch (err) {
    res.status(500).json({ error: 'Database error saving review.' });
  }
});

// Route: Fetch Gallery Items
app.get('/api/gallery', async (req, res) => {
  try {
    const items = await query.all('SELECT * FROM gallery ORDER BY id DESC');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Database error fetching gallery items.' });
  }
});

// Route: Fetch News Items
app.get('/api/news', async (req, res) => {
  try {
    const items = await query.all('SELECT * FROM news ORDER BY id DESC');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Database error fetching news articles.' });
  }
});

// ================= COACH ENDPOINTS =================

// Route: Get Coach Workouts
app.get('/api/coach/workouts/:discipline', async (req, res) => {
  const { discipline } = req.params;
  try {
    const workouts = await query.all('SELECT * FROM workouts WHERE discipline = ? ORDER BY createdAt DESC', [discipline]);
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Database error fetching workouts.' });
  }
});

// Route: Post Workout (Coaches upload routine)
app.post('/api/coach/workouts', async (req, res) => {
  const { discipline, title, details } = req.body;

  if (!discipline || !title || !details) {
    return res.status(400).json({ error: 'Please enter discipline, workout title, and details.' });
  }

  try {
    const result = await query.run(
      'INSERT INTO workouts (discipline, title, details) VALUES (?, ?, ?)',
      [discipline, title, details]
    );
    res.json({ success: true, id: result.id });
  } catch (err) {
    res.status(500).json({ error: 'Database error posting workout.' });
  }
});

// ================= ADMIN ENDPOINTS =================

// Route: Get Users List (Admin View)
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await query.all('SELECT id, fullName, email, role, discipline FROM users ORDER BY id DESC');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Database error fetching users list.' });
  }
});

// Route: Register Student directly (Admin View)
app.post('/api/admin/student', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Please enter student name, email, and password.' });
  }

  try {
    // Check if user already exists
    const existingUser = await query.get('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
    if (existingUser) {
      return res.status(400).json({ error: 'A student profile with this email already exists.' });
    }

    // Hash Password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    // Insert user as student role
    const result = await query.run(
      'INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, "student")',
      [fullName, email.toLowerCase(), passwordHash]
    );

    res.json({ success: true, id: result.id });
  } catch (err) {
    console.error('Error adding new student:', err);
    res.status(500).json({ error: 'Database transaction error adding student.' });
  }
});

// Route: Add Image to Gallery (Admin View)
app.post('/api/gallery', async (req, res) => {
  const { title, description, img } = req.body;

  if (!img) {
    return res.status(400).json({ error: 'Image file is required.' });
  }

  try {
    const result = await query.run(
      'INSERT INTO gallery (title, description, img) VALUES (?, ?, ?)',
      [title || '', description || '', img]
    );
    res.json({ success: true, id: result.id });
  } catch (err) {
    res.status(500).json({ error: 'Database error inserting gallery photo.' });
  }
});

// Route: Update Image in Gallery (Admin View)
app.put('/api/gallery/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, img } = req.body;

  if (!img) {
    return res.status(400).json({ error: 'Image file is required.' });
  }

  try {
    await query.run(
      'UPDATE gallery SET title = ?, description = ?, img = ? WHERE id = ?',
      [title || '', description || '', img, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error updating gallery photo.' });
  }
});

// Route: Delete Image from Gallery (Admin View)
app.delete('/api/gallery/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await query.run('DELETE FROM gallery WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error deleting gallery photo.' });
  }
});

// Achievements Endpoints (Student Success medals & achievements)
app.get('/api/achievements', async (req, res) => {
  try {
    const rows = await query.all('SELECT * FROM achievements');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error fetching achievements.' });
  }
});

app.post('/api/admin/achievements', async (req, res) => {
  const { studentName, medalLevel, state, img } = req.body;
  if (!studentName || !medalLevel || !state || !img) {
    return res.status(400).json({ error: 'All fields (studentName, medalLevel, state, img) are required.' });
  }
  try {
    const result = await query.run(
      'INSERT INTO achievements (studentName, medalLevel, state, img) VALUES (?, ?, ?, ?)',
      [studentName, medalLevel, state, img]
    );
    res.json({ success: true, id: result.id });
  } catch (err) {
    res.status(500).json({ error: 'Database error inserting achievement.' });
  }
});

app.put('/api/admin/achievements/:id', async (req, res) => {
  const { id } = req.params;
  const { studentName, medalLevel, state, img } = req.body;
  if (!studentName || !medalLevel || !state || !img) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    await query.run(
      'UPDATE achievements SET studentName = ?, medalLevel = ?, state = ?, img = ? WHERE id = ?',
      [studentName, medalLevel, state, img, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error updating achievement.' });
  }
});

app.delete('/api/admin/achievements/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await query.run('DELETE FROM achievements WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error deleting achievement.' });
  }
});

// Route: Add News Article (Admin View)
app.post('/api/admin/news', async (req, res) => {
  const { title, date, tag, description, img } = req.body;
  if (!title || !date || !tag || !description || !img) {
    return res.status(400).json({ error: 'All fields (title, date, tag, description, image) are required.' });
  }
  try {
    const result = await query.run(
      'INSERT INTO news (title, date, tag, description, img) VALUES (?, ?, ?, ?, ?)',
      [title, date, tag, description, img]
    );
    res.json({ success: true, id: result.id });
  } catch (err) {
    res.status(500).json({ error: 'Database error inserting news article.' });
  }
});

// Route: Update News Article (Admin View)
app.put('/api/admin/news/:id', async (req, res) => {
  const { id } = req.params;
  const { title, date, tag, description, img } = req.body;
  if (!title || !date || !tag || !description || !img) {
    return res.status(400).json({ error: 'All fields are required to update a news article.' });
  }
  try {
    await query.run(
      'UPDATE news SET title = ?, date = ?, tag = ?, description = ?, img = ? WHERE id = ?',
      [title, date, tag, description, img, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error updating news article.' });
  }
});

// Route: Delete News Article (Admin View)
app.delete('/api/admin/news/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await query.run('DELETE FROM news WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error deleting news article.' });
  }
});

// Route: Delete Review (Admin View)
app.delete('/api/admin/reviews/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await query.run('DELETE FROM reviews WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error deleting user review.' });
  }
});

// Route: Get Analytics
app.get('/api/admin/analytics', async (req, res) => {
  try {
    const classesCount = await query.get('SELECT COUNT(*) as count FROM schedule');
    const trialsCount = await query.get('SELECT COUNT(*) as count FROM trial_requests');
    const athletesCount = await query.get('SELECT COUNT(*) as count FROM users WHERE role = "student"');
    const coachesCount = await query.get('SELECT COUNT(*) as count FROM users WHERE role = "coach"');

    res.json({
      totalClasses: classesCount.count,
      totalTrials: trialsCount.count,
      totalAthletes: athletesCount.count + 800, // Include base count seed
      totalCoaches: coachesCount.count + 3    // Include seeded coaches
    });
  } catch (err) {
    res.status(500).json({ error: 'Database error calculating analytics.' });
  }
});

// Route: Create Schedule Class
app.post('/api/admin/schedule', async (req, res) => {
  const { time, className, coach, level, spots, discipline } = req.body;

  if (!time || !className || !coach || !level || !spots || !discipline) {
    return res.status(400).json({ error: 'All fields are required to create a class.' });
  }

  try {
    const result = await query.run(
      'INSERT INTO schedule (time, className, coach, level, spots, discipline) VALUES (?, ?, ?, ?, ?, ?)',
      [time, className, coach, level, parseInt(spots), discipline]
    );
    res.json({ success: true, id: result.id });
  } catch (err) {
    res.status(500).json({ error: 'Database error adding schedule class.' });
  }
});

// Route: Delete Class
app.delete('/api/admin/schedule/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await query.run('DELETE FROM schedule WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error deleting class slot.' });
  }
});

// Route: Fetch Trial Registrations (Admin View)
app.get('/api/admin/trial-requests', async (req, res) => {
  try {
    const requests = await query.all('SELECT * FROM trial_requests ORDER BY createdAt DESC');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Database error fetching trial requests.' });
  }
});

// Start API Server
app.listen(PORT, () => {
  console.log(`Yoddha Academy API Server is running on port ${PORT}`);
});

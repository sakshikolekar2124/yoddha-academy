const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'yoddha.db');

// Ensure database data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Connect to SQLite Database
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
  } else {
    console.log('Successfully connected to SQLite database: yoddha.db');
  }
});

// Helper for promise queries
const query = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  },
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  exec(sql) {
    return new Promise((resolve, reject) => {
      db.exec(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
};

// Initialize schema and seed data
async function initDatabase() {
  console.log('Initializing database schema...');
  
  // 1. Trial Requests Table
  await query.exec(`
    CREATE TABLE IF NOT EXISTS trial_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      discipline TEXT NOT NULL,
      experience TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Class Schedule Table
  await query.exec(`
    CREATE TABLE IF NOT EXISTS schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      time TEXT NOT NULL,
      className TEXT NOT NULL,
      coach TEXT NOT NULL,
      level TEXT NOT NULL,
      spots INTEGER NOT NULL,
      discipline TEXT NOT NULL
    );
  `);

  // 3. Users Table (Admin, Coach, Athlete)
  await query.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      discipline TEXT
    );
  `);

  // 4. Workouts Table (Coach uploads daily workouts)
  await query.exec(`
    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      discipline TEXT NOT NULL,
      title TEXT NOT NULL,
      details TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5. Reviews Table (Dynamic feedback)
  await query.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 6. Gallery Table (For general academy photos)
  await query.exec(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      img TEXT NOT NULL
    );
  `);

  // 7. News Table
  await query.exec(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      tag TEXT NOT NULL,
      description TEXT NOT NULL,
      img TEXT NOT NULL
    );
  `);

  // 8. Achievements Table (For Student Success: studentName, medalLevel, state, img)
  await query.exec(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studentName TEXT NOT NULL,
      medalLevel TEXT NOT NULL,
      state TEXT NOT NULL,
      img TEXT NOT NULL
    );
  `);

  console.log('Database tables successfully initialized.');

  // Pre-seed Schedule if empty
  const scheduleCount = await query.get('SELECT COUNT(*) as count FROM schedule');
  if (scheduleCount.count === 0) {
    console.log('Seeding schedule timetable database...');
    
    const initialClasses = [
      {
        time: '06:00 AM - 07:30 AM',
        className: 'Traditional Lathi Kathi Basics',
        coach: 'Coach Vikram Singh',
        level: 'beginner',
        spots: 12,
        discipline: 'lathi_basics'
      },
      {
        time: '08:00 AM - 09:30 AM',
        className: 'Lathi Kathi Advanced Forms',
        coach: 'Coach Vikram Singh',
        level: 'advanced',
        spots: 8,
        discipline: 'lathi_advanced'
      },
      {
        time: '04:00 PM - 05:30 PM',
        className: 'Stick Sparring & Combat Drills',
        coach: 'Coach Vikram Singh',
        level: 'intermediate',
        spots: 10,
        discipline: 'lathi_combat'
      },
      {
        time: '06:00 PM - 07:30 PM',
        className: 'Traditional Stick Form',
        coach: 'Coach Vikram Singh',
        level: 'beginner',
        spots: 15,
        discipline: 'lathi_basics'
      },
      {
        time: '07:30 PM - 09:00 PM',
        className: 'Lathi Kathi Tournament Practice',
        coach: 'Coach Vikram Singh',
        level: 'advanced',
        spots: 6,
        discipline: 'lathi_combat'
      }
    ];

    for (const c of initialClasses) {
      await query.run(
        `INSERT INTO schedule (time, className, coach, level, spots, discipline) VALUES (?, ?, ?, ?, ?, ?)`,
        [c.time, c.className, c.coach, c.level, c.spots, c.discipline]
      );
    }
    console.log('Schedule pre-seeded.');
  }

  // Pre-seed default Users (Admin, Coach, Student)
  const userCount = await query.get('SELECT COUNT(*) as count FROM users');
  if (userCount.count === 0) {
    console.log('Seeding default credentials database...');
    
    const salt = bcrypt.genSaltSync(10);
    const adminHash = bcrypt.hashSync('adminyoddha', salt);
    const coachHash = bcrypt.hashSync('teacheryoddha', salt);
    const athleteHash = bcrypt.hashSync('athlete123', salt);

    await query.run(
      'INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)',
      ['Academy Admin', 'admin@admin.in', adminHash, 'admin']
    );

    await query.run(
      'INSERT INTO users (fullName, email, password, role, discipline) VALUES (?, ?, ?, ?, ?)',
      ['Coach Vikram Singh', 'teacher@yoddha.in', coachHash, 'coach', 'lathi_basics']
    );

    await query.run(
      'INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)',
      ['Demo Athlete', 'athlete@yoddha.in', athleteHash, 'student']
    );

    console.log('Default credentials pre-seeded.');
  }

  // Pre-seed Reviews if empty
  const reviewsCount = await query.get('SELECT COUNT(*) as count FROM reviews');
  if (reviewsCount.count === 0) {
    console.log('Seeding initial reviews database...');
    
    const initialReviews = [
      {
        fullName: 'Rahul Deshmukh',
        rating: 5,
        comment: 'Onkar Hupare\'s Yoddha Academy is top-notch! The Lathi Kathi basics classes taught by Coach Vikram are excellent. Highly recommended!'
      },
      {
        fullName: 'Sneha Patil',
        rating: 5,
        comment: 'Amazing stick-fighting sparring sessions. Proper safety equipment and traditional technique are perfectly combined here.'
      },
      {
        fullName: 'Amit Kadam',
        rating: 5,
        comment: 'Best martial arts academy in Kolhapur. The trainers are extremely supportive and maintain great discipline.'
      }
    ];

    for (const r of initialReviews) {
      await query.run(
        'INSERT INTO reviews (fullName, rating, comment) VALUES (?, ?, ?)',
        [r.fullName, r.rating, r.comment]
      );
    }
    console.log('Reviews database pre-seeded.');
  }

  // Pre-seed Gallery if empty
  const galleryCount = await query.get('SELECT COUNT(*) as count FROM gallery');
  if (galleryCount.count === 0) {
    console.log('Seeding gallery database...');
    
    const initialGallery = [
      {
        title: 'Rotational Hand Drills',
        description: 'Beginner students practicing single-stick rotational flow and stance work.',
        img: '/images/lathi_kathi.jpg'
      },
      {
        title: 'Weapon Training Court',
        description: 'Sprawling wood-floor court designed for safe stick rotations.',
        img: '/images/gym_hero.jpg'
      }
    ];

    for (const g of initialGallery) {
      await query.run(
        'INSERT INTO gallery (title, description, img) VALUES (?, ?, ?)',
        [g.title, g.description, g.img]
      );
    }
    console.log('Gallery database pre-seeded.');
  }

  // Pre-seed Achievements if empty
  const achievementsCount = await query.get('SELECT COUNT(*) as count FROM achievements');
  if (achievementsCount.count === 0) {
    console.log('Seeding achievements database...');
    
    const initialAchievements = [
      {
        studentName: 'Sakshi Kolekar',
        medalLevel: 'Gold Medalist',
        state: 'Maharashtra State Championship',
        img: '/images/lathi_kathi.jpg'
      },
      {
        studentName: 'Onkar Hupare',
        medalLevel: 'Gold Medalist',
        state: 'National Lathi Kathi Cup',
        img: '/images/founder.jpg'
      },
      {
        studentName: 'Vikram Singh',
        medalLevel: 'Silver Medalist',
        state: 'Federation Cup Sparring',
        img: '/images/gym_hero.jpg'
      }
    ];

    for (const a of initialAchievements) {
      await query.run(
        'INSERT INTO achievements (studentName, medalLevel, state, img) VALUES (?, ?, ?, ?)',
        [a.studentName, a.medalLevel, a.state, a.img]
      );
    }
    console.log('Achievements database pre-seeded.');
  }

  // Pre-seed News if empty
  const newsCount = await query.get('SELECT COUNT(*) as count FROM news');
  if (newsCount.count === 0) {
    console.log('Seeding news database...');
    
    const initialNews = [
      {
        title: 'Lathi Kathi State Cup 2026 Registrations Open',
        date: 'July 10, 2026',
        tag: 'Tournament',
        description: 'Registration slots for the upcoming Maharashtra State Lathi Kathi Championship are now open. Yoddha Academy stick fighters can sign up at the main desk.',
        img: '/images/lathi_kathi.jpg'
      },
      {
        title: 'Stick Speed & Defensive Deflections Workshop by Coach Vikram',
        date: 'July 05, 2026',
        tag: 'Seminar',
        description: 'Join Coach Vikram Singh on Saturday for an exclusive workshop focusing on double-stick combat flow, speed rotations, and strike deflections.',
        img: '/images/gym_hero.jpg'
      },
      {
        title: 'Youth Lathi Kathi Summer Training Camp Starts Next Week',
        date: 'June 28, 2026',
        tag: 'Youth Camp',
        description: 'Our annual 4-week youth development stick training camp kicks off next Monday. Build coordination, reflexes, and discipline under expert instruction.',
        img: '/images/lathi_kathi.jpg'
      }
    ];

    for (const n of initialNews) {
      await query.run(
        'INSERT INTO news (title, date, tag, description, img) VALUES (?, ?, ?, ?, ?)',
        [n.title, n.date, n.tag, n.description, n.img]
      );
    }
    console.log('News database pre-seeded.');
  }
}

module.exports = {
  db,
  query,
  initDatabase
};

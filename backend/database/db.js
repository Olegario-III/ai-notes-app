import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./notes.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to sqlite database");
  }
});

// Enable foreign key constraints
db.run("PRAGMA foreign_keys = ON");

// USERS TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// NOTES TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    category TEXT,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

// QUIZ HISTORY TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS quiz_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    category TEXT,
    difficulty TEXT,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

// QUIZ ANSWERS TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS quiz_answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_history_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    user_answer TEXT,
    is_correct INTEGER NOT NULL,
    FOREIGN KEY (quiz_history_id) REFERENCES quiz_history(id) ON DELETE CASCADE
  )
`);

export default db;
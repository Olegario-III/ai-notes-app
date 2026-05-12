import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./notes.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to sqlite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
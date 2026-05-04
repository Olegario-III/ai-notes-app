const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./notes.db", (err)=>{
    if(err){
        console.error("Error opening database", err.message);
    } else {
        console.log("Connected to sqlite database");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `,(err)=> {
        if(err) {
            console.error("Table creation error", err.message);
        } else {
            console.log("Table's ready");
        }
    });

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello from backend");
});

app.post("/notes", (req, res) =>{
    const { content, category } = req.body;

    const query =`
        INSERT INTO notes (content, category)
        VALUES(?, ?)
    `;

    db.run(query, [content, category], function(err){
        if(err){
            return res.status(500).json({error: err.message});
        }

        res.json({
            message: "note saved!",
            id: this.lastID
        });
    });
});

app.get("/notes", (req, res) =>{
    db.all("SELECT * FROM notes", [],(err, rows) => {
        if(err){
            return res.status(500).json({error: err.message});
        }

        res.json(rows);
    });
});

app.listen(3000,() =>{
    console.log("The server is running in port 3000");
});
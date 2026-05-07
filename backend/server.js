const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

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

app.use(cors());

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
    const { category } = req.query;

    let query = "SELECT * FROM notes";
    let params = [];

    if (category){
        query += " WHERE LOWER(category) = LOWER(?) ";
        params.push(category.trim());
    }
    db.all(query, params, (err, rows) =>{
        if(err){
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });
});

//Delete single note by id
app.delete("/notes/:id", (req, res) =>{
    const { id } = req.params;

    const query = "DELETE FROM notes WHERE id = ?";
    
    db.run(query, [id], function(err){
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(this.changes === 0){
            return res.status(404).json({message: "Note not found"});
        }
        res.json({
            message: "Note deleted Successfully",
            deletedId: parseInt(id)
        });
    });
});

app.listen(3000,() =>{
    console.log("The server is running in port 3000");
});
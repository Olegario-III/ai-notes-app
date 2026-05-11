require("dotenv").config();

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
    const { category, time } = req.query;

    let query = "SELECT * FROM notes";
    let params = [];

    if (category){
        query += " WHERE LOWER(category) = LOWER(?) ";
        params.push(category.trim());
    }

    if(time === "today"){
        query += category
            ? " AND DATE(created_at) = DATE('now')"
            : " WHERE DATE(created_at) = DATE('now')";
    }
    
    if(time === "week"){
        query += category
            ? " AND created_at >= datetime('now', '-7 days')"
            : " WHERE created_at >= datetime('now', '-7 days')";
    }

    if(time === "month"){
        query += category
            ? " AND created_at >= datetime('now', '-30 days')"
            : " WHERE created_at >= datetime('now', '-30 days')";
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

app.post("/quiz", async (req, res) => {

    try {

        const { notes } = req.body;

        const prompt = `
        Create a beginner-friendly quiz 
        based on these notes:

        ${notes}

        Include:
        - 3 multiple choice questions
        - answers at the end
        `;

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization":
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    model: "openai/gpt-3.5-turbo",

                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(JSON.stringify(data, null, 2));

        const quiz =
            data.choices?.[0]?.message?.content;

        res.json({
            quiz
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to generate quiz"
        });
    }
});

app.listen(3000,() =>{
    console.log("The server is running in port 3000");
});
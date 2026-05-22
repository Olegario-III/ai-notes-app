import express from "express";
import db from "../database/db.js";
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  let sql = "SELECT * FROM notes";
  const params = [];

  if (req.query.category) {
    sql += " WHERE LOWER(category) = LOWER(?)";
    params.push(req.query.category);
  }

  sql += " ORDER BY created_at DESC";

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(rows);
  });
});

router.post("/", authMiddleware, (req, res) => {
  const { content, category } = req.body;

  db.run(
    `
      INSERT INTO notes (content, category)
      VALUES (?, ?)
    `,
    [content, category],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        id: this.lastID,
        message: "Note added"
      });
    }
  );
});

router.delete("/:id", authMiddleware, (req, res) => {
  db.run(
    "DELETE FROM notes WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        message: "Note deleted"
      });
    }
  );
});

export default router;
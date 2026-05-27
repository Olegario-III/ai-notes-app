import express from "express";
import db from "../database/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();



// GET ALL USER NOTES
router.get("/", authMiddleware, (req, res) => {
  let sql = `
    SELECT * FROM notes
    WHERE user_id = ?
  `;

  const params = [req.user.id];

  // CATEGORY FILTER
  if (req.query.category) {
    sql += " AND LOWER(category) = LOWER(?)";
    params.push(req.query.category);
  }

  sql += " ORDER BY created_at DESC";

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(rows);
  });
});



// CREATE NOTE
router.post("/", authMiddleware, (req, res) => {
  const { content, category } = req.body;

  db.run(
    `
      INSERT INTO notes (content, category, user_id)
      VALUES (?, ?, ?)
    `,
    [content, category, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        id: this.lastID,
        message: "Note added",
      });
    }
  );
});



// UPDATE NOTE
router.put("/:id", authMiddleware, (req, res) => {
  const { content, category } = req.body;

  db.run(
    `
      UPDATE notes
      SET content = ?, category = ?
      WHERE id = ?
      AND user_id = ?
    `,
    [content, category, req.params.id, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      // No note updated
      if (this.changes === 0) {
        return res.status(404).json({
          error: "Note not found",
        });
      }

      res.json({
        message: "Note updated",
      });
    }
  );
});



// DELETE NOTE
router.delete("/:id", authMiddleware, (req, res) => {
  db.run(
    `
      DELETE FROM notes
      WHERE id = ?
      AND user_id = ?
    `,
    [req.params.id, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      // No note deleted
      if (this.changes === 0) {
        return res.status(404).json({
          error: "Note not found",
        });
      }

      res.json({
        message: "Note deleted",
      });
    }
  );
});



export default router;
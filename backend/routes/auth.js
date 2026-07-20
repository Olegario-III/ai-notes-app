import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "../database/db.js";

const router = express.Router();

/*
=========================
REGISTER
=========================
*/
router.post("/register", async (req, res) => {
  const {
    username,
    email,
    password,
  } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  try {
    db.get(
      `
      SELECT id
      FROM users
      WHERE email = ?
      `,
      [email],
      async (err, existingUser) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
          });
        }

        if (existingUser) {
          return res.status(409).json({
            error: "Email is already registered",
          });
        }

        const hashedPassword =
          await bcrypt.hash(password, 10);

        db.run(
          `
          INSERT INTO users (
            username,
            email,
            password
          )
          VALUES (?, ?, ?)
          `,
          [
            username,
            email,
            hashedPassword,
          ],
          function (err) {
            if (err) {
              return res.status(500).json({
                error: err.message,
              });
            }

            res.status(201).json({
              message:
                "User registered successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Registration failed",
    });
  }
});

/*
=========================
LOGIN
=========================
*/
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  db.get(
    `
    SELECT *
    FROM users
    WHERE email = ?
    `,
    [email],
    async (err, user) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      if (!user) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
});

export default router;
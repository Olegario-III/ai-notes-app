// backend/routes/users.js

import express from "express";

import db from "../database/db.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/*
=================================
GET /users

Returns all users.

Admin only.
=================================
*/
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    db.all(
      `
      SELECT
        id,
        username,
        email,
        role
      FROM users
      ORDER BY id DESC
      `,
      [],
      (err, users) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            error: "Failed to fetch users.",
          });
        }

        res.json(users);
      }
    );
  }
);

/*
=================================
PUT /users/:id/role

Change user role.

Admin only.
=================================
*/
router.put(
  "/:id/role",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    const userId = Number(req.params.id);
    const { role } = req.body;

    if (
      role !== "user" &&
      role !== "admin"
    ) {
      return res.status(400).json({
        error: "Invalid role.",
      });
    }

    db.get(
      `
      SELECT *
      FROM users
      WHERE id = ?
      `,
      [userId],
      (err, user) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            error: "Database error.",
          });
        }

        if (!user) {
          return res.status(404).json({
            error: "User not found.",
          });
        }

        // No change
        if (user.role === role) {
          return res.json({
            message:
              "User already has this role.",
          });
        }

        // Prevent demoting the last admin
        if (
          user.role === "admin" &&
          role === "user"
        ) {
          db.get(
            `
            SELECT COUNT(*) AS totalAdmins
            FROM users
            WHERE role = 'admin'
            `,
            [],
            (err, row) => {
              if (err) {
                return res.status(500).json({
                  error: "Database error.",
                });
              }

              if (row.totalAdmins <= 1) {
                return res.status(400).json({
                  error:
                    "Cannot demote the last administrator.",
                });
              }

              updateRole();
            }
          );
        } else {
          updateRole();
        }

        function updateRole() {
          db.run(
            `
            UPDATE users
            SET role = ?
            WHERE id = ?
            `,
            [role, userId],
            function (err) {
              if (err) {
                console.log(err);

                return res.status(500).json({
                  error:
                    "Failed to update role.",
                });
              }

              res.json({
                message:
                  "User role updated successfully.",
              });
            }
          );
        }
      }
    );
  }
);

/*
=================================
DELETE /users/:id

Delete user.

Admin only.
=================================
*/
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    const userId = Number(req.params.id);

    // Prevent deleting yourself
    if (userId === req.user.id) {
      return res.status(400).json({
        error:
          "You cannot delete your own account.",
      });
    }

    db.get(
      `
      SELECT *
      FROM users
      WHERE id = ?
      `,
      [userId],
      (err, user) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            error: "Database error.",
          });
        }

        if (!user) {
          return res.status(404).json({
            error: "User not found.",
          });
        }

        // Prevent deleting the last admin
        if (user.role === "admin") {
          db.get(
            `
            SELECT COUNT(*) AS totalAdmins
            FROM users
            WHERE role = 'admin'
            `,
            [],
            (err, row) => {
              if (err) {
                return res.status(500).json({
                  error: "Database error.",
                });
              }

              if (row.totalAdmins <= 1) {
                return res.status(400).json({
                  error:
                    "Cannot delete the last administrator.",
                });
              }

              deleteUser();
            }
          );
        } else {
          deleteUser();
        }

        function deleteUser() {
          db.run(
            `
            DELETE FROM users
            WHERE id = ?
            `,
            [userId],
            function (err) {
              if (err) {
                console.log(err);

                return res.status(500).json({
                  error:
                    "Failed to delete user.",
                });
              }

              res.json({
                message:
                  "User deleted successfully.",
              });
            }
          );
        }
      }
    );
  }
);

export default router;
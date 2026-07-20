// backend/middleware/authMiddleware.js

import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check Authorization header
  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization header is missing.",
    });
  }

  // Check Bearer format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Invalid authorization format.",
    });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Authentication token is missing.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    /*
      decoded contains:

      {
        id,
        username,
        email,
        role,
        iat,
        exp
      }
    */

    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token.",
    });
  }
}

export default authMiddleware;
// backend/middleware/adminMiddleware.js

function adminMiddleware(
  req,
  res,
  next
) {
  // Ensure authentication middleware has run
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized. Please log in first.",
    });
  }

  // Only admins can access this route
  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: "Access denied. Administrator privileges are required.",
    });
  }

  // User is an admin
  next();
}

export default adminMiddleware;
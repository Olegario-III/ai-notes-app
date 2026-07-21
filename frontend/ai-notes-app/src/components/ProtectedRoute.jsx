// src/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // User is not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Route requires admin access
  if (
    adminOnly &&
    user.role !== "admin"
  ) {
    return (
      <Navigate
        to="/dashboard/notes"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
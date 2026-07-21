// src/components/Sidebar.jsx

import { NavLink } from "react-router-dom";

function Sidebar() {
  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user")
    );
  } catch (error) {
    console.error(
      "Failed to parse user from localStorage:",
      error
    );
  }

  return (
    <div className="sidebar">
      <NavLink to="/dashboard/notes">
        Notes
      </NavLink>

      <NavLink to="/dashboard/quiz">
        Quiz
      </NavLink>

      <NavLink to="/dashboard/quiz-history">
        Quiz History
      </NavLink>

      <NavLink to="/dashboard/profile">
        Profile
      </NavLink>

      {user?.role === "admin" && (
        <NavLink to="/dashboard/users">
          Account Management
        </NavLink>
      )}
    </div>
  );
}

export default Sidebar;
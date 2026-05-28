import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <NavLink to="/dashboard/notes">
        Notes
      </NavLink>

      <NavLink to="/dashboard/quiz">
        Quiz
      </NavLink>

      <NavLink to="/dashboard/profile">
        Profile
      </NavLink>

    </div>
  );
}

export default Sidebar;
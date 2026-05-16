import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>AI Notes</h2>

      <nav>
        <Link to="/dashboard/notes">
          Notes
        </Link>

        <Link to="/dashboard/quiz">
          Quiz
        </Link>

        <Link to="/dashboard/profile">
          Profile
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
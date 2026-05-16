import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Sidebar from "../components/Sidebar";

import NotesPage from "./NotesPage";
import QuizPage from "./QuizPage";
import ProfilePage from "./ProfilePage";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="notes" />}
          />

          <Route
            path="notes"
            element={<NotesPage />}
          />

          <Route
            path="quiz"
            element={<QuizPage />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
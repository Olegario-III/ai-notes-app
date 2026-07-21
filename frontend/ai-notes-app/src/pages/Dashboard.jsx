// src/pages/Dashboard.jsx

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";

import NotesPage from "./NotesPage";
import QuizPage from "./QuizPage";
import QuizHistoryPage from "./QuizHistoryPage";
import ProfilePage from "./ProfilePage";
import UserManagement from "./UserManagement";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Routes>
          {/* Default Dashboard Page */}
          <Route
            path="/"
            element={
              <Navigate
                to="notes"
                replace
              />
            }
          />

          {/* Notes */}
          <Route
            path="notes"
            element={<NotesPage />}
          />

          {/* Quiz */}
          <Route
            path="quiz"
            element={<QuizPage />}
          />

          {/* Quiz History */}
          <Route
            path="quiz-history"
            element={<QuizHistoryPage />}
          />

          {/* Profile */}
          <Route
            path="profile"
            element={<ProfilePage />}
          />

          {/* Admin Only */}
          <Route
            path="users"
            element={
              <ProtectedRoute adminOnly>
                <UserManagement />
              </ProtectedRoute>
            }
          />

          {/* Unknown Dashboard Routes */}
          <Route
            path="*"
            element={
              <Navigate
                to="notes"
                replace
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
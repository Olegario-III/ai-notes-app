import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logoutUser = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Profile</h1>

        <div className="profile-info">
          <p>
            <strong>Username:</strong>{" "}
            {user?.username}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
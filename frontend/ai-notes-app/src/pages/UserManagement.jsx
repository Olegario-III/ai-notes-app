// src/pages/UserManagement.jsx

import { useEffect, useState } from "react";

import UserTable from "../components/userManagement/UserTable";

function UserManagement() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchUsers = async () => {
    setLoading(true);

    setError("");

    try {
      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          "http://localhost:3000/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to fetch users."
        );
      }

      setUsers(data);
    } catch (error) {
      console.log(error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-management-page">
      <h1>User Management</h1>

      <p>
        Manage user accounts,
        roles, and permissions.
      </p>

      {loading && (
        <p>Loading users...</p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && (
        <UserTable
          users={users}
          refreshUsers={fetchUsers}
        />
      )}
    </div>
  );
}

export default UserManagement;
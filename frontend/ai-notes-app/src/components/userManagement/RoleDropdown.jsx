// src/components/userManagement/RoleDropdown.jsx

import { useState } from "react";

function RoleDropdown({
  user,
  refreshUsers,
}) {
  const [role, setRole] =
    useState(user.role);

  const [loading, setLoading] =
    useState(false);

  const changeRole = async (e) => {
    const newRole = e.target.value;

    // Nothing changed
    if (newRole === role) {
      return;
    }

    // Confirmation
    const confirmed = window.confirm(
      `Change ${user.username}'s role to ${newRole}?`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          `http://localhost:3000/users/${user.id}/role`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              role: newRole,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to update role."
        );
      }

      setRole(newRole);

      alert(data.message);

      refreshUsers();

    } catch (error) {
      console.log(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={role}
      onChange={changeRole}
      disabled={loading}
      className="role-dropdown"
    >
      <option value="user">
        User
      </option>

      <option value="admin">
        Admin
      </option>
    </select>
  );
}

export default RoleDropdown;
// src/components/userManagement/DeleteUserModal.jsx

import { useState } from "react";

function DeleteUserModal({
  isOpen,
  onClose,
  user,
  refreshUsers,
}) {
  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);

    try {
      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          `http://localhost:3000/users/${user.id}`,
          {
            method: "DELETE",
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
            "Failed to delete user."
        );
      }

      alert(data.message);

      refreshUsers();

      onClose();
    } catch (error) {
      console.log(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="delete-user-modal">

        <h2>Delete User</h2>

        <p>
          Are you sure you want to
          delete
          <strong>
            {" "}
            {user.username}
          </strong>
          ?
        </p>

        <p>
          This action cannot be
          undone.
        </p>

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteUserModal;
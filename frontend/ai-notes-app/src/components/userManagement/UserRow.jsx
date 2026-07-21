// src/components/userManagement/UserRow.jsx

import { useState } from "react";

import RoleDropdown from "./RoleDropdown";
import DeleteUserModal from "./DeleteUserModal";

function UserRow({
  user,
  refreshUsers,
}) {
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  return (
    <>
      <tr>
        <td>{user.id}</td>

        <td>{user.username}</td>

        <td>{user.email}</td>

        <td>
          <RoleDropdown
            user={user}
            refreshUsers={refreshUsers}
          />
        </td>

        <td>
          <button
            className="delete-user-btn"
            onClick={() =>
              setShowDeleteModal(true)
            }
          >
            Delete
          </button>
        </td>
      </tr>

      <DeleteUserModal
        isOpen={showDeleteModal}
        onClose={() =>
          setShowDeleteModal(false)
        }
        user={user}
        refreshUsers={refreshUsers}
      />
    </>
  );
}

export default UserRow;
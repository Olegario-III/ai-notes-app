// src/components/userManagement/UserTable.jsx

import UserRow from "./UserRow";

function UserTable({
  users,
  refreshUsers,
}) {
  if (users.length === 0) {
    return (
      <div className="user-table-empty">
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>

            <th>Username</th>

            <th>Email</th>

            <th>Role</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              refreshUsers={refreshUsers}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
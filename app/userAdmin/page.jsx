"use client"
import React, { useState } from "react";

const UserAdmin = () => {
  const [users, setUsers] = useState([
    {
      username: "",
      position: "",
      isActive: false,
      isAdmin: false, // New property for the admin role
    },
  ]);

  const handleAddUser = () => {
    const newUser = {
      username: "",
      position: "",
      isActive: false,
      isAdmin: false, // New property for the admin role
    };
    setUsers([...users, newUser]);
  };

  const handleRemoveUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const handleChangeUsername = (index, value) => {
    const updatedUsers = [...users];
    updatedUsers[index].username = value;
    setUsers(updatedUsers);
  };

  const handleChangePosition = (index, value) => {
    const updatedUsers = [...users];
    updatedUsers[index].position = value;
    setUsers(updatedUsers);
  };

  const handleToggleActive = (index, status) => {
    const updatedUsers = [...users];
    updatedUsers[index].isActive = status;
    setUsers(updatedUsers);
  };

  const handleToggleAdmin = (index, status) => {
    const updatedUsers = [...users];
    updatedUsers[index].isAdmin = status;
    setUsers(updatedUsers);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#FFD7C0",
          minHeight: "calc(100vh - 50px)",
          padding: "20px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Usuario
              </th>
              <th
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Puesto
              </th>
              <th
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Estado de Empleado
              </th>
              <th
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Administrador
              </th>
              <th
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Agregar
              </th>
              <th
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) =>
                      handleChangeUsername(index, e.target.value)
                    }
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      padding: "10px",
                    }}
                  />
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  <input
                    type="text"
                    value={user.position}
                    onChange={(e) =>
                      handleChangePosition(index, e.target.value)
                    }
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      padding: "10px",
                    }}
                  />
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ marginRight: "10px" }}>Activo</label>
                    <input
                      type="checkbox"
                      checked={user.isActive}
                      onChange={() => handleToggleActive(index, !user.isActive)}
                    />
                    <label style={{ marginLeft: "10px", marginRight: "10px" }}>
                      Inactivo
                    </label>
                    <input
                      type="checkbox"
                      checked={!user.isActive}
                      onChange={() => handleToggleActive(index, !user.isActive)}
                    />
                  </div>
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  <input
                    type="checkbox"
                    checked={user.isAdmin}
                    onChange={() => handleToggleAdmin(index, !user.isAdmin)}
                  />
                </td>
                {index === users.length - 1 ? (
                  <>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      <button
                        onClick={handleAddUser}
                        style={{
                          backgroundColor: "#FFD785",
                          color: "black",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Agregar
                      </button>
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    ></td>
                  </>
                ) : (
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    <button
                      onClick={() => handleRemoveUser(index)}
                      style={{
                        backgroundColor: "#FFD785",
                        color: "black",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAdmin;


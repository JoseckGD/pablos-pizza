"use client";
import { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      username: "",
      position: "",
      isActive: false,
    },
  ]);

  const handleAddUser = () => {
    const newUser = {
      username: "",
      position: "",
      isActive: false,
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

  return (
    <div>
      <div style={{ backgroundColor: "#B71C1C", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
        <img src="logo.png" alt="Logo" style={{ width: "70px" }} />
        <div>
          <button style={{ backgroundColor: "transparent", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>Inicio</button>
          <button style={{ backgroundColor: "transparent", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>Venta</button>
          <button style={{ backgroundColor: "transparent", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>Inventario</button>
          <button style={{ backgroundColor: "transparent", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>Panel de Control</button>
        </div>
        <div>
          <button style={{ backgroundColor: "transparent", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>Nombre de Usuario</button>
          <button style={{ backgroundColor: "transparent", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>Cerrar Sesión</button>
        </div>
      </div>
      <div style={{ backgroundColor: "#FFD7C0", minHeight: "calc(100vh - 50px)", padding: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: "transparent", border: "none", padding: "12px", textAlign: "left" }}>Usuario</th>
              <th style={{ backgroundColor: "transparent", border: "none", padding: "12px", textAlign: "left" }}>Puesto</th>
              <th style={{ backgroundColor: "transparent", border: "none", padding: "12px", textAlign: "left" }}>Estado de Empleado</th>
              <th style={{ backgroundColor: "transparent", border: "none", padding: "12px", textAlign: "left" }}>Agregar</th>
              <th style={{ backgroundColor: "transparent", border: "none", padding: "12px", textAlign: "left" }}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) => handleChangeUsername(index, e.target.value)}
                    style={{ width: "100%", borderRadius: "8px", border: "1px solid #ddd", padding: "10px" }}
                  />
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  <input
                    type="text"
                    value={user.position}
                    onChange={(e) => handleChangePosition(index, e.target.value)}
                    style={{ width: "100%", borderRadius: "8px", border: "1px solid #ddd", padding: "10px" }}
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
                    <label style={{ marginLeft: "10px", marginRight: "10px" }}>Inactivo</label>
                    <input
                      type="checkbox"
                      checked={!user.isActive}
                      onChange={() => handleToggleActive(index, !user.isActive)}
                    />
                  </div>
                </td>
                {index === users.length - 1 ? (
                  <>
                    <td style={{ padding: "12px", borderBottom: "1px solid #ddd", backgroundColor: "transparent", border: "none" }}>
                      <button onClick={handleAddUser} style={{ backgroundColor: "#FFD785", color: "black", padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer" }}>Agregar</button>
                    </td>
                    <td style={{ padding: "12px", borderBottom: "1px solid #ddd", backgroundColor: "transparent", border: "none" }}></td>
                  </>
                ) : (
                  <td style={{ padding: "12px", borderBottom: "1px solid #ddd", backgroundColor: "transparent", border: "none" }}>
                    <button onClick={() => handleRemoveUser(index)} style={{ backgroundColor: "#FFD785", color: "black", padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer" }}>Eliminar</button>
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

export default UserManagement;

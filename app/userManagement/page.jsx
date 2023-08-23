"use client";
import { useEffect, useState } from "react";
import { LayoutBase } from "../components/LayoutBase";
import { TitlePage } from "../components/TitlePage";
import { dataTableHeaderUser } from "@/constants/dataTableUser";
import useFetch from "@/hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/Button";
import { TD } from "../components/Table/TD";
import { ModalUser } from "../components/Modals/ModalUser";
import { ModalDeleteUser } from "../components/Modals/ModalDeleteUser";

const UserManagement = () => {
  const [users, setUsers] = useState(null);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [showAdmins, setShowAdmins] = useState(false);

  const { data, isLoading, error, fetchData } = useFetch(
    "http://localhost:3000/api/usuarios",
    { method: "GET" }
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setUsers(data.users);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  const toggleModalAdd = () => {
    setDataUser(null);
    setOpenModalAdd(!openModalAdd);
    setTimeout(() => {
      fetchData();
    }, 1000);
  };

  const toggleModalDelete = () => {
    setDataUser(null);
    setOpenModalDelete(!openModalDelete);
    setTimeout(() => {
      fetchData();
    }, 1000);
  };

  // Filtrar usuarios según el estado de showAdmins.
  const filteredAdmins = users && users.filter((user) => user.ROL === "Administrador");
  const filteredEmployees = users && users.filter((user) => user.ROL === "Empleado");
  const filteredUsers = showAdmins ? (filteredAdmins || []).concat(filteredEmployees || []) : users || [];

  const handleModifyUser = (user) => {
    toggleModalAdd();
    setDataUser(user);
  };

  const handleDeleteUser = (user) => {
    toggleModalDelete();
    setDataUser(user);
  };

  return (
    <LayoutBase>
      <ModalUser
        openModal={openModalAdd}
        toggle={toggleModalAdd}
        dataUser={dataUser}
      />
      <ModalDeleteUser
        openModal={openModalDelete}
        toggle={toggleModalDelete}
        dataUser={dataUser}
      />
      <TitlePage title="Administrar Usuarios" />

      <article className="flex justify-between items-center">
        <Button title="Agregar empleado" eventOnClick={toggleModalAdd} />
        <Button
          title={`Mostrar ${showAdmins ? "Todos" : "Administradores"}`}
          eventOnClick={() => setShowAdmins(!showAdmins)}
        />
      </article>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {dataTableHeaderUser.map((header, i) => (
              <th
                key={i}
                style={{
                  backgroundColor: "#B71C1C",
                  color: "white",
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className="flex justify-center items-center">
              <FontAwesomeIcon
                icon={faSpinner}
                className="w-20 h-20 animate-spin"
              />
            </tr>
          ) : (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <TD>{user.nombre}</TD>
                <TD>{user.apellidos}</TD>
                <TD>{user.telefono}</TD>
                <TD>{user.correo}</TD>
                <TD>{user.ROL}</TD>
                <td className="flex justify-center gap-4">
                  <Button
                    eventOnClick={() => handleModifyUser(user)}
                    icon={faEdit}
                  />
                  <Button
                    eventOnClick={() => handleDeleteUser(user)}
                    icon={faTrash}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </LayoutBase>
  );
};

export default UserManagement;

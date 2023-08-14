"use client";
import React, { useEffect, useState } from "react";
import { TitlePage } from "../TitlePage";
import { Button } from "../Button";
import useFetch from "@/hooks/useFetch";

const userData = {
  nombre: "",
  apellidos: "",
  correo: "",
  telefono: "",
  rol_id: 2,
};

export const ModalUser = ({ openModal, toggle, dataUser }) => {
  if (!openModal) return;

  const [user, setUser] = useState(userData);

  const { data, isLoading, error, fetchData } = useFetch(
    `http://localhost:3000/api/usuarios/${dataUser ? "modifyUser" : "addUser"}`,
    { method: `${dataUser ? "PUT" : "POST"}` }, // Opciones de la petición (puedes utilizar cualquier opción válida para fetch)
    user
  );

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    !isLoading && toggle();
  };

  useEffect(() => {
    dataUser && setUser(dataUser);
  }, []);

  return (
    <div
      className="absolute left-0 top-0 bottom-0 right-0 w-screen h-screen bg-black bg-opacity-75
    flex justify-center items-center"
    >
      <form
        className="bg-white w-1/2 p-5 rounded-lg flex  gap-4 flex-col"
        onSubmit={handleSubmit}
      >
        <TitlePage
          title={dataUser ? "Modificar un empleado" : "Agregar un empleado"}
        />
        <div className="">
          <label htmlFor="nombre" className="block mb-2 text-base font-medium">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={user.nombre}
            onChange={handleOnChange}
            className="p-2 rounded text-base border border-[#B71C1C] w-full"
            placeholder="Escribe tu nombre"
          />
        </div>
        <div>
          <label
            htmlFor="apellidos"
            className="block mb-2 text-base font-medium"
          >
            Apellidos
          </label>
          <input
            type="text"
            name="apellidos"
            value={user.apellidos}
            onChange={handleOnChange}
            className="p-2 rounded text-base border border-[#B71C1C] w-full"
            placeholder="Escribe tus apellidos"
          />
        </div>
        <div>
          <label
            htmlFor="telefono"
            className="block mb-2 text-base font-medium"
          >
            Telefono
          </label>
          <input
            type="text"
            name="telefono"
            value={user.telefono}
            onChange={handleOnChange}
            className="p-2 rounded text-base border border-[#B71C1C] w-full"
            placeholder="Escribe tu telefono"
          />
        </div>
        <div>
          <label htmlFor="correo" className="block mb-2 text-base font-medium">
            Correo
          </label>
          <input
            type="text"
            name="correo"
            value={user.correo}
            onChange={handleOnChange}
            className="p-2 rounded text-base border border-[#B71C1C] w-full"
            placeholder="Escribe tu correo"
          />
        </div>

        <div className="w-full flex justify-center items-center gap-4">
          <Button title="Cancelar" eventOnClick={toggle} />
          <Button title={dataUser ? "Modificar" : "Agregar"} />
        </div>
      </form>
    </div>
  );
};

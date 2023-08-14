import { userRol } from "@/constants/userRol";
import React from "react";
import { Button } from "./Button";

export const CardInfoUser = ({ user, closeSession }) => {
  return (
    <div className="hidden group-hover:flex absolute right-8 top-16 bg-black text-white p-4 rounded-lg items-center justify-center flex-col gap-5 cursor-default">
      <section>
        <p>{userRol[user?.rol_id]}</p>
        <p>{user?.nombre}</p>
        <p>{user?.correo}</p>
      </section>
      <Button title="Cerrar Sesion" eventOnClick={closeSession} />
    </div>
  );
};

import React from "react";
import { TitlePage } from "../TitlePage";
import useFetch from "@/hooks/useFetch";
import { Button } from "../Button";

export const ModalDeleteProduct = ({ openModal, toggle, dataProduct }) => {
  if (!openModal) return;

  const { data, isLoading, error, fetchData } = useFetch(
    `http://localhost:3000/api/inventory/deleteInventory/${dataProduct?.id}`,
    { method: "DELETE" } // Opciones de la petición (puedes utilizar cualquier opción válida para fetch)
  );

  const handleSubmit = (e) => {
    fetchData();
    !isLoading && toggle();
  };

  return (
    <div
      className="absolute left-0 top-0 bottom-0 right-0 w-screen h-screen bg-black bg-opacity-75
    flex justify-center items-center"
    >
      <div className="bg-white w-1/2 p-5 rounded-lg flex  gap-4 flex-col">
        <TitlePage title="Eliminar un producto" />

        <p className="text-base text-center">
          Estas seguro de eliminar el producto {dataProduct?.nombre}?
        </p>
        <div className="w-full flex justify-center items-center gap-4">
          <Button title="Cancelar" eventOnClick={toggle} />
          <Button title="Eliminar" eventOnClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

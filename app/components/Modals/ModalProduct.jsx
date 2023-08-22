"use client";
import React, { useEffect, useState } from "react";
import { TitlePage } from "../TitlePage";
import { Button } from "../Button";
import useFetch from "@/hooks/useFetch";

const productData = {
  nombre: "",
  descripcion: "",
  precio: "",
  cantidad: "",
};

export const ModalProduct = ({ openModal, toggle, dataProduct }) => {
  if (!openModal) return;

  const [product, setProduct] = useState(productData);

  const { data, isLoading, error, fetchData } = useFetch(
    `http://localhost:3000/api/inventory/${
      dataProduct ? "modifyInventory" : "addInventory"
    }`,
    { method: `${dataProduct ? "PUT" : "POST"}` }, // Opciones de la petición (puedes utilizar cualquier opción válida para fetch)
    product
  );

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    fetchData();
    !isLoading && toggle();
  };

  useEffect(() => {
    dataProduct && setProduct(dataProduct);
    console.log(dataProduct);
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
          title={dataProduct ? "Modificar un producto" : "Agregar un producto"}
        />
        <div className="">
          <label htmlFor="nombre" className="block mb-2 text-base font-medium">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={product.nombre}
            onChange={handleOnChange}
            className="p-2 rounded text-base border border-[#B71C1C] w-full"
            placeholder="Escribe el nombre del producto"
          />
        </div>
        <div>
          <label
            htmlFor="descripcion"
            className="block mb-2 text-base font-medium"
          >
            Descripcion
          </label>
          <input
            type="text"
            name="descripcion"
            value={product.descripcion}
            onChange={handleOnChange}
            className="p-2 rounded text-base border border-[#B71C1C] w-full"
            placeholder="Escriba una descripcion del producto"
          />
        </div>
        <div>
          <label htmlFor="precio" className="block mb-2 text-base font-medium">
            Precio
          </label>
          <input
            type="number"
            name="precio"
            value={product.precio}
            onChange={handleOnChange}
            className="p-2 rounded text-base border border-[#B71C1C] w-full"
            placeholder="Escribe el precio del producto"
          />
        </div>
        <div>
          <label
            htmlFor="cantidad"
            className="block mb-2 text-base font-medium"
          >
            Cantidad
          </label>
          <input
            type="number"
            name="cantidad"
            value={product.cantidad}
            onChange={handleOnChange}
            className="p-2 rounded text-base border border-[#B71C1C] w-full"
            placeholder="Escribe la cantidad de productos"
          />
        </div>

        <div className="w-full flex justify-center items-center gap-4">
          <Button title="Cancelar" eventOnClick={toggle} />
          <Button title={dataProduct ? "Modificar" : "Agregar"} />
        </div>
      </form>
    </div>
  );
};

"use client";
import useFetch from "@/hooks/useFetch";
import { LayoutBase } from "../components/LayoutBase";
import { TitlePage } from "../components/TitlePage";
import { dataTableHeaderIventory } from "@/constants/dataTableInventory";
import { useEffect, useState } from "react";
import { faEdit, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TD } from "../components/Table/TD";
import { Button } from "../components/Button";
import { ModalProduct } from "../components/Modals/ModalProduct";
import { ModalDeleteProduct } from "../components/Modals/ModalDeleteProduct";

const Inventory = () => {
  const [productos, setProductos] = useState(null);
  const [openModalAddProductos, setOpenModalAddProductos] = useState(false);
  const [dataProductos, setDataProductos] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const { data, isLoading, error, fetchData } = useFetch(
    "http://localhost:3000/api/inventory",
    { method: "GET" }
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setProductos(data.data);
    }
  }, [data]);

  const toggleModalAddProductos = () => {
    setDataProductos(null);
    setOpenModalAddProductos(!openModalAddProductos);
    setTimeout(() => {
      fetchData();
    }, 1000);
  };

  const handleModifyProductos = (producto) => {
    toggleModalAddProductos();
    setDataProductos(producto);
  };

  const toggleModalDelete = () => {
    setDataProductos(null);
    setOpenModalDelete(!openModalDelete);
    setTimeout(() => {
      fetchData();
    }, 1000);
  };

  const handleDeleteProduct = (producto) => {
    toggleModalDelete();
    setDataProductos(producto);
  };
  return (
    <LayoutBase>
      <ModalProduct
        openModal={openModalAddProductos}
        toggle={toggleModalAddProductos}
        dataProduct={dataProductos}
      />
      <ModalDeleteProduct
        openModal={openModalDelete}
        toggle={toggleModalDelete}
        dataProduct={dataProductos}
      />

      <TitlePage title="Inventario" />

      <article className="flex justify-between items-center">
        <Button
          title="Agregar un producto"
          eventOnClick={toggleModalAddProductos}
        />
      </article>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {dataTableHeaderIventory.map((header, i) => (
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
            productos?.map((producto, index) => (
              <tr key={index}>
                <TD>{producto.nombre}</TD>
                <TD>{producto.descripcion}</TD>
                <TD>{producto.precio}</TD>
                <TD>{producto.cantidad}</TD>
                <td className="flex justify-center gap-4">
                  <Button
                    eventOnClick={() => handleModifyProductos(producto)}
                    icon={faEdit}
                  />
                  <Button
                    eventOnClick={() => handleDeleteProduct(producto)}
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

export default Inventory;

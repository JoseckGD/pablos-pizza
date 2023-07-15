"use client";

import useFetch from "@/hooks/useFetch";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Sells = () => {
  const bodyStyles = {
    backgroundColor: "#F5E9D8",
    minHeight: "100vh",
  };

  const logoStyles = {
    width: "70px",
  };

  const containerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: "20px",
  };

  const userStyles = {
    marginLeft: "10px",
    color: "white",
  };

  const listStyles = {
    listStyle: "none",
    padding: "0",
    display: "flex",
    alignItems: "center",
  };

  const listItemStyles = {
    marginRight: "10px",
  };

  const buttonStyles = {
    backgroundColor: "transparent",
    color: "#B71C1C",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "2px solid #B71C1C",
    fontSize: "16px",
    cursor: "pointer",
  };
  const buttonContainerStyles = {
    marginBottom: "20px",
    paddingLeft: "20px",
  };

  const tableContainerStyles = {
    backgroundColor: "transparent",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const tableStyles = {
    width: "80%",
    borderCollapse: "collapse",
  };
  const thStyles = {
    backgroundColor: "#B71C1C",
    color: "white",
    padding: "12px",
    textAlign: "left",
  };

  const tdStyles = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  };

  const selectedListItemStyles = {
    ...listItemStyles,
    backgroundColor: "#B71C1C",
    color: "white",
    fontWeight: "bold",
    padding: "8px 12px",
    borderRadius: "8px",
  };

  const { data, isLoading, error, fetchData } = useFetch(
    "http://localhost:3000/api/sells",
    { method: "GET" }, // Opciones de la petición (puedes utilizar cualquier opción válida para fetch)
    null, // Datos a enviar en la petición
    3000 // Tiempo de espera en milisegundos (opcional)
  );

  const [sells, setSells] = useLocalStorage("sellsSaveData", null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
    if (data.data.length > 0) {
      setSells(data.data);
    }
  }, [data]);

  return (
    <div style={bodyStyles}>
      <div className="container mx-auto">
        <div style={buttonContainerStyles}>
          <button style={buttonStyles}>Realizar Venta</button>
        </div>
        <div style={tableContainerStyles}>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={thStyles}>Vendedor</th>
                <th style={thStyles}>Fecha</th>
                <th style={thStyles}>Total</th>
              </tr>
            </thead>
            <tbody>
              {sells.map((itemSell) => (
                <tr>
                  <td style={tdStyles}>Vendedor {itemSell.usuario_id}</td>
                  <td style={tdStyles}>{itemSell.fecha}</td>
                  <td style={tdStyles}>${itemSell.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sells;

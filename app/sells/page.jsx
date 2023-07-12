"use client";

import useFetch from "@/hooks/useFetch";
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




  return (
    <div style={bodyStyles}>
      <nav className="bg-red-500 py-4">
        <div className="container mx-auto">
          <div style={containerStyles}>
            <div style={listStyles}>
              <a
                href="/"
                className="flex items-center text-white font-bold text-xl"
              >
                <img
                  src="https://www.pablospizza.com/wp-content/themes/pablopizza/images/logo-new.png"
                  alt="Logo"
                  className="mr-2"
                  style={logoStyles}
                />
              </a>
              <ul className="flex space-x-4" style={listStyles}>
                <li style={listItemStyles}>
                  <a href="/" className="text-white">
                    Inicio
                  </a>
                </li>
                <li style={selectedListItemStyles}>
                  <a href="/sells" className="text-white">
                    Venta
                  </a>
                </li>
                <li style={listItemStyles}>
                  <a href="" className="text-white">
                    Inventario
                  </a>
                </li>
                <li style={listItemStyles}>
                  <a href="" className="text-white">
                    Panel de Control
                  </a>
                </li>
              </ul>
            </div>
            <div style={userStyles}>
              Nombre de Usuario
            </div>
          </div>
        </div>
      </nav>

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
              <tr>
                <td style={tdStyles}>Vendedor 1</td>
                <td style={tdStyles}>01/07/2023</td>
                <td style={tdStyles}>$100.00</td>
              </tr>
              <tr>
                <td style={tdStyles}>Vendedor 2</td>
                <td style={tdStyles}>02/07/2023</td>
                <td style={tdStyles}>$150.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Sells;

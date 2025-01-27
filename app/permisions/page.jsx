"use client";

import useFetch from "@/hooks/useFetch";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


const Permisions = () => {
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
          <div className="container mx-auto">
            <div style={buttonContainerStyles}>
            </div>
            <div style={tableContainerStyles}>
              <table style={tableStyles}>
                <thead>
                  <tr>
                    <th style={thStyles}>Nombre</th>
                    <th style={thStyles}>Permisos</th>
                    <th style={thStyles}>Estado del empleado</th>
    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdStyles}>alberto</td>
                    <td style={tdStyles}>Gerente   <input name="Gerente" type="checkbox" /> Empleado   <input name="Empleado" type="checkbox" /></td>
                    <td style={tdStyles}>Activo   <input name="Activo" type="checkbox" /> Inactivo   <input name="Inactivo" type="checkbox" /></td>
    
                  </tr>
                  
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      );
      };

      export default Permisions;
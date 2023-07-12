"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUsuarioContext } from "../contexts/UsuarioContext";

const routes = { "/": "a", "/sells": "sells" };

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState(pathname.split("/")[1]);

  const { usuario } = useUsuarioContext();

  // useEffect(() => {
  //   console.log(pathname);
  //   console.log(routes[pathname]);
  // }, []);

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
    cursor: "pointer",
  };

  const selectedListItemStyles = {
    ...listItemStyles,
    backgroundColor: "#B71C1C",
    color: "white",
    fontWeight: "bold",
    padding: "8px 12px",
    borderRadius: "8px",
  };

  const handleClickMenu = (page) => {
    // console.log(page);
    router.push(`/${page}`);
    setPage(page);
  };

  return (
    <>
      {routes[pathname] && (
        <nav className="bg-red-500 py-4">
          <div className="container mx-auto">
            <div style={containerStyles}>
              <div style={listStyles}>
                <p
                  onClick={() => handleClickMenu("page")}
                  className="flex items-center text-white font-bold text-xl"
                >
                  <img
                    src="https://www.pablospizza.com/wp-content/themes/pablopizza/images/logo-new.png"
                    alt="Logo"
                    className="mr-2"
                    style={logoStyles}
                  />
                </p>
                <ul className="flex space-x-4" style={listStyles}>
                  <li
                    style={
                      page === "" ? selectedListItemStyles : listItemStyles
                    }
                  >
                    <p
                      onClick={() => handleClickMenu("")}
                      className="text-white"
                    >
                      Inicio
                    </p>
                  </li>
                  <li
                    style={
                      page === "sells" ? selectedListItemStyles : listItemStyles
                    }
                  >
                    <p
                      onClick={() => handleClickMenu("sells")}
                      className="text-white"
                    >
                      Venta
                    </p>
                  </li>
                  <li
                    style={
                      page === "inventary"
                        ? selectedListItemStyles
                        : listItemStyles
                    }
                  >
                    <p
                      onClick={() => handleClickMenu("inventary")}
                      className="text-white"
                    >
                      Inventario
                    </p>
                  </li>
                  <li style={listItemStyles}>
                    <a className="text-white">Panel de Control</a>
                  </li>
                </ul>
              </div>
              <div style={userStyles}>{usuario.nombre}</div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;

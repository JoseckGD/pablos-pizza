"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUsuarioContext } from "../contexts/UsuarioContext";
import { routes } from "@/constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { CardInfoUser } from "./CardInfoUser";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState(pathname.split("/")[1]);
  const [visibleInfo, setVisibleInfo] = useState(false);

  const { isAuthUser, usuario, cerrarSesion } = useUsuarioContext();

  useEffect(() => {
    setPage(pathname.split("/")[1]);
  }, [pathname]);

  const handleClickMenu = (page) => {
    // console.log(page);
    router.push(`/${page}`);
    setPage(page);
  };

  return (
    <>
      {isAuthUser === true && (
        <>
          <nav className="bg-red-500 h-20 py-4 px-8 flex items-center justify-between shadow-2xl">
            <p onClick={() => handleClickMenu("")} className="cursor-pointer">
              <img
                src="https://www.pablospizza.com/wp-content/themes/pablopizza/images/logo-new.png"
                alt="Logo"
                className="w-20"
              />
            </p>
            <ul className="flex list-none p-0 items-center gap-4 tracking-wide">
              {routes[usuario?.rol_id]?.map(
                ({ route, title, visible }) =>
                  visible && (
                    <li
                      className={`cursor-pointer px-4 py-2 rounded-full ${
                        page === route && "bg-[#B71C1C] font-bold"
                      } hover:bg-[#B71C1C]`}
                    >
                      <p
                        onClick={() => handleClickMenu(route)}
                        className="text-white"
                      >
                        {title}
                      </p>
                    </li>
                  )
              )}
            </ul>
            <p
              // onClick={() => setVisibleInfo(!visibleInfo)}
              className="group text-white p-2 w-12 h-12 rounded-full cursor-pointer bg-[#B71C1C] flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faUser} className="h-8 w-8" />
              <CardInfoUser user={usuario} closeSession={cerrarSesion} />
            </p>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;

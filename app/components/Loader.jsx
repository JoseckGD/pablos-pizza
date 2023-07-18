import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useUsuarioContext } from "../contexts/UsuarioContext";

const Loader = ({ children }) => {
  const { isAuthUser } = useUsuarioContext();
  return (
    <>
      {isAuthUser ? (
        children
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <FontAwesomeIcon
            icon={faPizzaSlice}
            bounce
            className="w-52 h-52 text-white animate-bounce"
          />
        </div>
      )}
    </>
  );
};

export default Loader;

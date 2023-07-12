"use client"
import { useLocalStorage } from '@/hooks/useLocalStorage';
import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto para el usuario
const UsuarioContext = createContext();

// Componente proveedor del contexto
export const UsuarioProvider = ({ children }) => {
    // Aquí puedes obtener la información del usuario que inició sesión
    // const [usuario, setUsuario] = useState(null);
    const [usuario, setUsuario] = useLocalStorage("userSaveData", []);


    // Aquí puedes crear las funciones que modificarán el estado del usuario
    const setDataUser = (usuario) => {
        setUsuario(usuario);
        // console.log(usuario);
    }


    const data = {
        usuario,
        setDataUser
    };

    return (
        <UsuarioContext.Provider value={data}>
            {children}
        </UsuarioContext.Provider>
    );
};

export const useUsuarioContext = () => {
    const context = useContext(UsuarioContext);
    if (!context) throw new Error("useContext debe usar con provider");
    return context;
};


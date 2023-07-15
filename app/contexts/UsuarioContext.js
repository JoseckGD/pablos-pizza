"use client"
import { useLocalStorage } from '@/hooks/useLocalStorage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Creamos el contexto para el usuario
const UsuarioContext = createContext();

// Componente proveedor del contexto
export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useLocalStorage("userSaveData", null);
    const [isAuthUser, setIsAuthUser] = useState(false);

    useEffect(() => {
        if (usuario) {
            setIsAuthUser(true);
        } else {
            setIsAuthUser(false);
        }
    }, [usuario]);

    const iniciarSesion = (usuario) => {
        setUsuario(usuario);
    };

    const cerrarSesion = () => {
        setUsuario(null);
    };

    const data = {
        usuario,
        iniciarSesion,
        cerrarSesion,
        isAuthUser
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

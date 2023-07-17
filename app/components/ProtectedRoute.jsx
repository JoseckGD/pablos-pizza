"use client";
import { useRouter } from "next/navigation";
import { useUsuarioContext } from "../contexts/UsuarioContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthUser } = useUsuarioContext();

  useEffect(() => {
    if (!isAuthUser) {
      router.push("/login"); // Redireccionar a la página de inicio de sesión si no hay un usuario autenticado
    }
  }, [isAuthUser, router]);

  return <>{children}</>; // Renderizar las rutas protegidas solo si el usuario está autenticado
};

export default ProtectedRoute;

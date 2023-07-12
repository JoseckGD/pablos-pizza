"use client";

import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import icono from "../assets/icon.svg";
import Image from "next/image";
import { useUsuarioContext } from "../contexts/UsuarioContext";

const initialForm = {
  username: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialForm);

  const { setDataUser } = useUsuarioContext();

  const router = useRouter();

  const { data, isLoading, error, fetchData } = useFetch(
    "http://localhost:3000/api/login",
    { method: "POST" }, // Opciones de la petición (puedes utilizar cualquier opción válida para fetch)
    form, // Datos a enviar en la petición
    3000 // Tiempo de espera en milisegundos (opcional)
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm(form);
    fetchData();
  };

  useEffect(() => {
    if (data && data.status == true) {
      setDataUser(data.data);
      router.push("/");
    }
  }, [data]);

  return (
    <div className="flex justify-around flex-row items-center h-screen">
      <div className="w-1/3 p-8 rounded-lg shadow bg-black">
        <form className="flex flex-col gap-14 ">
          <h2 className="text-4xl text-white text-center font-bold mb-4">
            Iniciar sesión
          </h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-white rounded-2xl text-xl font-bold mb-2"
            >
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              value={form.username}
              onChange={handleChange}
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white rounded-2xl text-xl font-bold mb-2"
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#FFD785] w-full text-black font-bold text-xl py-2 px-4 rounded focus:outline-none"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Ingresar"}
            </button>
          </div>
        </form>

        {/* Mostrar el error si ocurrió */}
        {error && <p className="text-red-500 text-lg">Error: {error}</p>}

        {/* Mostrar los datos */}
        {data && <p>{data.message}</p>}
      </div>
      <Image src={icono} alt="a" width={500} height={500} />
    </div>
  );
};

export default Login;

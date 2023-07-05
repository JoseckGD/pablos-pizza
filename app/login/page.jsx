"use client";

import useFetch from "@/hooks/useFetch";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const initialForm = {
  username: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialForm);

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
      redirect("/");
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 bg-neutral-500 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>

        {/* Mostrar el error si ocurrió */}
        {error && <div>Error: {error}</div>}

        {/* Mostrar los datos */}
        {data && <p>{data.message}</p>}
      </div>
    </div>
  );
};

export default Login;

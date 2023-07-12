"use client"
import { useEffect } from 'react';
import { useUsuarioContext } from './contexts/UsuarioContext';

export default function Home() {
  const { usuario } = useUsuarioContext();
  useEffect(() => {
    console.log(usuario);
  }, [])

  return (
    <div>
      <p>Datos</p>
      <p>{usuario.username}</p>
      <p>{usuario.id}</p>
    </div>
  )
}

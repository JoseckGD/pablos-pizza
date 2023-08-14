"use client";
import { LayoutBase } from "./components/LayoutBase";
import { useUsuarioContext } from "./contexts/UsuarioContext";
import ControlPanel from "./controlPanel/page";

export default function Home() {
  const { usuario } = useUsuarioContext();
  if (usuario) {
    return (<ControlPanel />)
  }
  return (
    <LayoutBase>
      <p>Home</p>
    </LayoutBase>
  );
}

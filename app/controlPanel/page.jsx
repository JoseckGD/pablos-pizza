"use client";
import icono from "../assets/cocinero_user.png";
import tomate from "../assets/tomate.png";
import harina from "../assets/harina.png";
import { LayoutBase } from "../components/LayoutBase";
import { TitlePage } from "../components/TitlePage";
import { Card } from "../components/Card";

const ControlPanel = () => {
  return (
    <LayoutBase>
      <TitlePage title="PANEL DE CONTROL" />
      <div className="grid grid-flow-row grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          route="/userManagement"
          title="Usuarios"
          icon={icono}
          description="Administra los usuarios."
        />

        <Card
          route="/sells"
          title="Ventas"
          icon={tomate}
          description="Administrar las ventas"
        />

        <Card
          route="/reportsStatistics"
          title="Reportes "
          icon={harina}
          description="Reportes de las ventas"
        />
      </div>
    </LayoutBase>
  );
};

export default ControlPanel;

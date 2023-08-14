"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import icono from "../assets/cocinero_user.png";
import tomate from "../assets/tomate.png";
import harina from "../assets/harina.png";
import queso from "../assets/queso.png";
import pizza from "../assets/pizza.png";
import Chart from "chart.js/auto";
import Link from "next/link";
import Loader from "../components/Loader";

const bodyStyles = {
  backgroundColor: "#F5E9D8",
  minHeight: "100vh",
  padding: "20px",
};

const cardStyles = {
  backgroundColor: "#EEEEEE",
  borderRadius: "8px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  width: "388px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  textAlign: "center",
  transition: "transform 0.3s ease",
  padding: "20px",
};

const cardContainerStyles = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  padding: "0 50px",
  marginBottom: "20px",
};

const imageStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "50px",
  marginBottom: "10px",
};

const titleStyles = {
  margin: "0",
  fontSize: "40px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: "10px",
};

const descriptionStyles = {
  margin: "0",
  fontSize: "24px",
  color: "#666666",
  marginTop: "10px",
};

const ControlPanel = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
      datasets: [
        {
          label: "Ventas",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    if (chartRef.current !== null) {
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: data,
        options: options,
      });
    }
  }, []);

  const handleCardHover = (e) => {
    e.target.style.transform = "scale(1.05)";
  };

  const handleCardLeave = (e) => {
    e.target.style.transform = "scale(1)";
  };

  return (
    <Loader>
      <div style={bodyStyles}>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "32px",
            color: "#B71C1C",
          }}
        >
          PANEL DE CONTROL
        </h1>
        <div className="card-container" style={cardContainerStyles}>
          <Link href="/userManagement">
            <div
              className="card"
              style={{ ...cardStyles, width: "388px", height: "377px" }}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="card-content">
                <h2 style={titleStyles}>Usuarios</h2>
                <div style={imageStyles}>
                  <Image src={icono} alt="Icono" width={200} height={200} />
                </div>
                <p style={descriptionStyles}>
                  Administra los usuarios del sistema.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/sells">
            <div
              className="card"
              style={{ ...cardStyles, width: "783px", height: "388px" }}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="card-content" style={{ width: "100%", height: "100%" }}>
                <h2>
                  <strong>Ventas</strong>
                </h2>
                <canvas ref={chartRef} style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
          </Link>
        </div>
        <div className="card-container" style={cardContainerStyles}>
          <Link href="/inventory">
            <div
              className="card"
              style={{ ...cardStyles, width: "704px", height: "388px" }}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="card-content">
                <h2 style={titleStyles}>Inventario</h2>
                <div style={imageStyles}>
                  <Image src={tomate} alt="Icono" width={150} height={150} />
                  <Image src={harina} alt="Icono" width={150} height={150} />
                  <Image src={queso} alt="Icono" width={140} height={150} />
                </div>
                <p style={descriptionStyles}>
                  Administra el inventario de productos.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/customMenu">
            <div
              className="card"
              style={{ ...cardStyles, width: "519px", height: "388px" }}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="card-content">
                <h2 style={titleStyles}>Menú</h2>
                <div style={imageStyles}>
                  <Image src={pizza} alt="Icono" width={210} height={210} />
                </div>
                <p style={descriptionStyles}>Personaliza el menú de opciones.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Loader>
  );
};

export default ControlPanel;


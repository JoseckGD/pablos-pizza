"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Loader from "../components/Loader";

const ReportsStatistics = () => {
  const chartRefs = [useRef(null), useRef(null), useRef(null)];

  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ventas",
        data: [50, 80, 45, 70, 90],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Gastos",
        data: [30, 40, 55, 25, 35],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const lineChartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ingresos",
        data: [150, 180, 145, 170, 190],
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const pieChartData = {
    labels: ["Rojo", "Azul", "Amarillo"],
    datasets: [
      {
        data: [30, 20, 50],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  useEffect(() => {
    chartRefs.forEach((chartRef, index) => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        let chartData, chartType;
        switch (index) {
          case 0:
            chartData = data;
            chartType = "bar";
            break;
          case 1:
            chartData = lineChartData;
            chartType = "line";
            break;
          case 2:
            chartData = pieChartData;
            chartType = "pie";
            break;
          default:
            break;
        }

        new Chart(ctx, {
          type: chartType,
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    });
  }, []);

  return (
    <Loader>
      <div className="p-5 bg-white">
        <h1 className="text-center font-bold text-4xl text-[#B71C1C] bg-white mb-5">
          Informes y Estadísticas
        </h1>
        <div className="bg-white flex flex-row items-center justify-around p-4">
          <div className="w-96 h-24">
            <canvas ref={chartRefs[0]}></canvas>
          </div>
          <div className="w-96 h-24">
            <canvas ref={chartRefs[1]}></canvas>
          </div>
          <div className="w-96 h-24">
            <canvas ref={chartRefs[2]}></canvas>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default ReportsStatistics;

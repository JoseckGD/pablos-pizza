"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Loader from "../components/Loader";
import useFetch from "@/hooks/useFetch";
import { LayoutBase } from "../components/LayoutBase";
import { TitlePage } from "../components/TitlePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";

const ReportsStatistics = () => {
  const chartRef = useRef(null);

  const [dataSells, setDataSells] = useState(null);

  const { data, isLoading, error, fetchData } = useFetch(
    "http://localhost:3000/api/sells/getSellsGlobal",
    { method: "GET" } // Opciones de la petición (puedes utilizar cualquier opción válida para fetch)
  );

  useEffect(() => {
    let _data;
    if (data) {
      setDataSells(data.sells);
      _data = {
        labels: data.sells.map((sell) => {
          return sell.fecha;
        }),
        datasets: [
          {
            label: "Ventas",
            data: data.sells.map((sell) => {
              return sell.total;
            }),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      };

      const ctx = chartRef.current.getContext("2d");

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      chartRef.current.chart = new Chart(ctx, {
        type: "bar",
        data: _data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    console.log(_data);
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LayoutBase>
      <TitlePage title={"Informes y Estadísticas"} />
      <div className="flex flex-row items-center justify-around p-4">
        {isLoading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="w-20 h-20 animate-spin"
          />
        ) : (
          <div className="w-full h-20">
            <canvas ref={chartRef}></canvas>
          </div>
        )}
      </div>
    </LayoutBase>
  );
};

export default ReportsStatistics;

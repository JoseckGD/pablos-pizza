"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Loader from "../components/Loader";
import useFetch from "@/hooks/useFetch";
import { LayoutBase } from "../components/LayoutBase";
import { TitlePage } from "../components/TitlePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SalesReport from "../components/SalesReport";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";

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
          const sellDate = new Date(sell.fecha);
          return sellDate.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
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
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  const generateReport = (startDate, endDate) => {
    const filteredSells = dataSells.filter((sell) => {
      const sellDate = new Date(sell.fecha);
      return sellDate >= new Date(startDate) && sellDate <= new Date(endDate);
    });

    const formattedLabels = filteredSells.map((sell) => {
      const sellDate = new Date(sell.fecha);
      return sellDate.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    });

    const _data = {
      labels: formattedLabels,
      datasets: [
        {
          label: "Ventas",
          data: filteredSells.map((sell) => sell.total),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    };

    setDataSells(filteredSells);

    if (chartRef.current.chart) {
      chartRef.current.chart.data = _data;
      chartRef.current.chart.update();
    }
  };

  const handleReset = () => {
    let _data;
    if (data) {
      setDataSells(data.sells);
      _data = {
        labels: data.sells.map((sell) => {
          const sellDate = new Date(sell.fecha);
          return sellDate.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
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

      if (chartRef.current.chart) {
        chartRef.current.chart.data = _data;
        chartRef.current.chart.update();
      }
    }
  };

  const generatePDF = (startDate, endDate) => {
    const pdf = new jsPDF();
    pdf.text("Estadistica de ventas", 10, 10);

    if (startDate.length === 0 && endDate.length === 0) {
      pdf.text(`Rango de datos: Todo el tiempo`, 10, 20);
    } else {
      pdf.text(`Rango de datos: ${startDate} - ${endDate}`, 10, 20);
    }

    // Generar una imagen de la gráfica
    const chartImage = chartRef.current.toDataURL("image/png");
    pdf.addImage(chartImage, "PNG", 10, 30, 190, 100); // Ajusta la posición y el tamaño

    // Agregar más contenido al PDF según tus necesidades
    const currentDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, "-");
    const pdfFileName = `sales_report_${currentDate}.pdf`;
    pdf.save(pdfFileName);
  };

  return (
    <LayoutBase>
      <TitlePage title={"Informes y Estadísticas"} />
      <SalesReport
        generateReport={generateReport}
        handleReset={handleReset}
        generatePDF={generatePDF}
      />
      <div className="flex flex-row items-center justify-around p-4 ">
        {isLoading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="w-20 h-20 animate-spin"
          />
        ) : (
          <div className="w-full p-4 h-full bg-gray-100 rounded-md shadow-md">
            <canvas ref={chartRef} height={150}></canvas>
          </div>
        )}
      </div>
    </LayoutBase>
  );
};

export default ReportsStatistics;

"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Loader from "../components/Loader";
import useFetch from "@/hooks/useFetch";
import { LayoutBase } from "../components/LayoutBase";
import { TitlePage } from "../components/TitlePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SalesReport from "../components/SalesReport";
import { faCircleInfo, faSpinner } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";

const ReportsStatistics = () => {
  const chartRef = useRef(null);

  const [dataSells, setDataSells] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { data, isLoading, error, fetchData } = useFetch(
    "http://localhost:3000/api/sells/getSellsGlobal",
    { method: "GET" }
  );

  useEffect(() => {
    handleReset();
    let _data;
    if (data) {
      const sortedSells = data.sells.sort((sellA, sellB) => {
        const dateA = new Date(sellA.fecha);
        const dateB = new Date(sellB.fecha);
        return dateA - dateB;
      });
      setDataSells(sortedSells);
      const groupedData = sortedSells.reduce((acc, sell) => {
        const sellDate = new Date(sell.fecha).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        if (!acc[sellDate]) {
          acc[sellDate] = 0;
        }
        acc[sellDate] += sell.total;
        return acc;
      }, {});

      const labels = Object.keys(groupedData);
      const totals = Object.values(groupedData);

      _data = {
        labels: labels,
        datasets: [
          {
            label: "Ventas",
            data: totals,
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
          plugins: {
            title: {
              fontSize: 20,
              display: true,
              text: "Ventas",
            },
          },
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
    handleReset();
    fetchData();
  }, []);

  const generateReport = (startDate, endDate) => {
    let filteredSells = dataSells;

    // Verifica si se proporciona startDate o endDate
    if (startDate || endDate) {
      // Si al menos uno de ellos se proporciona, filtra el arreglo dataSells
      filteredSells = dataSells.filter((venta) => {
        // Convierte la propiedad fecha de la venta en un objeto Date
        const fechaVenta = new Date(venta.fecha.slice(0, 10));

        // Verifica si solo se proporciona startDate (sin endDate)
        if (startDate && !endDate) {
          // Convierte las fechas a cadenas en formato ISO
          const startDateISO = new Date(startDate).toISOString().slice(0, 10);
          const fechaVentaISO = fechaVenta.toISOString().slice(0, 10);

          // Compara si las fechas en formato ISO son iguales
          return startDateISO === fechaVentaISO;
        }

        // Verifica si solo se proporciona endDate (sin startDate)
        if (endDate && !startDate) {
          // Convierte las fechas a cadenas en formato ISO
          const endDateISO = new Date(endDate).toISOString().slice(0, 10);
          const fechaVentaISO = fechaVenta.toISOString().slice(0, 10);

          // Compara si las fechas en formato ISO son iguales
          return endDateISO === fechaVentaISO;
        }

        // Si se proporcionan ambos startDate y endDate, filtra por rango de fechas
        return (
          fechaVenta >= new Date(startDate) && fechaVenta <= new Date(endDate)
        );
      });
    }

    if (filteredSells.length === 0) {
      setErrorMessage("No hay ventas en esa fecha o rango de fechas.");
      return;
    }

    setErrorMessage(null);

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

    if (chartRef.current.chart) {
      chartRef.current.chart.data = _data;
      chartRef.current.chart.update();
    }
  };

  const handleReset = () => {
    let _data;
    if (data) {
      setDataSells(data.sells);
      const groupedData = data.sells.reduce((acc, sell) => {
        const sellDate = new Date(sell.fecha).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        if (!acc[sellDate]) {
          acc[sellDate] = 0;
        }
        acc[sellDate] += sell.total;
        return acc;
      }, {});

      const labels = Object.keys(groupedData);
      const totals = Object.values(groupedData);

      _data = {
        labels: labels,
        datasets: [
          {
            label: "Ventas",
            data: totals,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      };

      if (chartRef.current.chart) {
        chartRef.current.chart.data = _data;
        chartRef.current.chart.update();
      }
    }
    setErrorMessage(null);
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
        setErrorMessage={setErrorMessage}
      />

      {errorMessage && (
        <div
          className="text-white bg-red-500 w-fit text-base p-4 rounded m-auto 
        flex flex-row justify-center items-center gap-2 my-2"
        >
          <FontAwesomeIcon icon={faCircleInfo} /> <p>{errorMessage}</p>
        </div>
      )}

      <div className="flex flex-row items-center justify-around mt-2">
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

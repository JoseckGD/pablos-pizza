import React, { useState } from "react";
import { Button } from "./Button";
import {
  faFilePdf,
  faFilter,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";

const SalesReport = ({
  generateReport,
  handleReset,
  generatePDF,
  setErrorMessage,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerateReport = () => {
    if (!startDate && !endDate) {
      setErrorMessage("Selecciona al menos una fecha.");
      return;
    }
    setErrorMessage(null);
    generateReport(startDate, endDate);
  };

  const handleGeneratePDF = () => {
    generatePDF(startDate, endDate);
  };

  const handleResetInput = () => {
    setStartDate("");
    setEndDate("");
    handleReset();
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md mb-2">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="flex flex-row gap-2 justify-between items-center">
            <label htmlFor="fechaInicio" className="text-right">
              Inicio:
            </label>
            <input
              id="fechaInicio"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border border-[#B71C1C] rounded focus:outline-none"
            />
          </div>

          <div className="flex flex-row gap-2 justify-between items-center">
            <label htmlFor="fechaFinal" className="text-right">
              Final:
            </label>
            <input
              id="fechaFinal"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border border-[#B71C1C] rounded focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-row justify-center items-center gap-4">
          <Button
            eventOnClick={() => handleGenerateReport()}
            title="Filtrar"
            icon={faFilter}
          />
          <Button
            eventOnClick={() => handleGeneratePDF()}
            title="Generar PDF"
            icon={faFilePdf}
          />
          <Button
            eventOnClick={() => handleResetInput()}
            secondary
            title="Reiniciar"
            icon={faRotate}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesReport;

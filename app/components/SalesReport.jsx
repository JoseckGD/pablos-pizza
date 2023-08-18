import React, { useState } from "react";
import { Button } from "./Button";

const SalesReport = ({ generateReport, handleReset, generatePDF }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerateReport = () => {
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
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <div className="flex items-center justify-center space-x-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <Button
          eventOnClick={() => handleGenerateReport()}
          title="Obtener Ventas"
        />

        <Button eventOnClick={() => handleGeneratePDF()} title="Generate PDF" />
        <Button
          eventOnClick={() => handleResetInput()}
          secondary
          title="Reiniciar"
        />
      </div>
    </div>
  );
};

export default SalesReport;

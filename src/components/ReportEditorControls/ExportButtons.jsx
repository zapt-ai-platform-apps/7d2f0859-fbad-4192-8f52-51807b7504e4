import React from 'react';
import { exportToPDF, exportToWord, exportToExcel } from '../../utils/exportReport';

function ExportButtons({ reportContent, tasks }) {
  const handleExportPDF = () => {
    const fileName = prompt('Enter file name for PDF (without extension):', 'report');
    if (fileName) {
      exportToPDF(reportContent, `${fileName}.pdf`);
    }
  };

  const handleExportWord = () => {
    const fileName = prompt('Enter file name for Word Document (without extension):', 'report');
    if (fileName) {
      exportToWord(reportContent, `${fileName}.docx`);
    }
  };

  const handleExportExcel = () => {
    const fileName = prompt('Enter file name for Excel Sheet (without extension):', 'report');
    if (fileName) {
      exportToExcel(tasks, `${fileName}.xlsx`);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleExportPDF}
        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Export as PDF
      </button>
      <button
        onClick={handleExportWord}
        className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Export as Word
      </button>
      <button
        onClick={handleExportExcel}
        className="bg-warning hover:bg-warning-dark text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Export as Excel
      </button>
    </div>
  );
}

export default ExportButtons;
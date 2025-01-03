import React from 'react';
import { exportToPDF, exportToWord, exportToExcel } from '../utils/exportReport';

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
    <>
      <button
        onClick={handleExportPDF}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Export as PDF
      </button>
      <button
        onClick={handleExportWord}
        className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Export as Word
      </button>
      <button
        onClick={handleExportExcel}
        className="px-6 py-3 bg-warning text-white rounded-lg hover:bg-warning-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Export as Excel
      </button>
    </>
  );
}

export default ExportButtons;
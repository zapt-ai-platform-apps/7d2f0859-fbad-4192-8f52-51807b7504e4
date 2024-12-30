import React, { useState } from 'react';
import ReportEditorContent from './ReportEditorContent';
import ReportEditorControls from './ReportEditorControls';

function ReportEditor({ reportContent, onSave, saving }) {
  const handleSave = () => {
    onSave(reportContent);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Task Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            tr:hover { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          ${reportContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-primary">Report Editor</h3>
      </div>
      <ReportEditorContent reportContent={reportContent} />
      <ReportEditorControls handleSave={handleSave} handlePrint={handlePrint} saving={saving} />
    </div>
  );
}

export default ReportEditor;
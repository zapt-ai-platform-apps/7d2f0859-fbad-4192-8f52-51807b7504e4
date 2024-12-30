import React, { useState } from 'react';
import ReportEditorContent from './ReportEditorContent';
import ReportEditorControls from './ReportEditorControls';

function ReportEditor(props) {
  const [reportContent, setReportContent] = useState(props.initialContent || '');
  const [editMode, setEditMode] = useState(true);

  const handleSave = () => {
    props.onSave(reportContent);
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

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-primary">Report Editor</h3>
        <button
          onClick={toggleEditMode}
          className="bg-muted text-white px-4 py-2 rounded hover:bg-muted-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          {editMode ? 'Preview' : 'Edit'}
        </button>
      </div>
      <ReportEditorContent
        reportContent={reportContent}
        setReportContent={setReportContent}
        editMode={editMode}
      />
      <ReportEditorControls
        handleSave={handleSave}
        handlePrint={handlePrint}
      />
    </div>
  );
}

export default ReportEditor;
import React, { useState } from 'react';

function ReportEditor(props) {
  const [reportContent, setReportContent] = useState(props.initialContent || '');
  const [editMode, setEditMode] = useState(true);

  const handleSave = () => {
    props.onSave(reportContent);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(reportContent);
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
      {editMode ? (
        <textarea
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
          className="w-full h-96 p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border resize-none"
        />
      ) : (
        <div
          className="w-full p-3 border border-muted rounded-lg box-border"
          dangerouslySetInnerHTML={{ __html: reportContent }}
        />
      )}
      <div className="flex space-x-4 mt-2">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          Save Report
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-muted text-white rounded-lg hover:bg-muted-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          Print Report
        </button>
      </div>
    </div>
  );
}

export default ReportEditor;
import React, { useState, useRef } from 'react';

function ReportEditor(props) {
  const [reportContent, setReportContent] = useState(props.initialContent || '');
  const reportRef = useRef();

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

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2 text-purple-600">Report Editor</h3>
      <div ref={reportRef} dangerouslySetInnerHTML={{ __html: reportContent }} className="w-full p-3 border border-gray-300 rounded-lg box-border" />
      <div className="flex space-x-4 mt-2">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          Save Report
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          Print Report
        </button>
      </div>
    </div>
  );
}

export default ReportEditor;
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
      <h3 className="text-xl font-bold mb-2 text-primary">Report Editor</h3>
      <div ref={reportRef} className="w-full p-3 border border-muted rounded-lg box-border">
        <textarea
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
          className="w-full h-48 p-2 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border resize-none"
        />
      </div>
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
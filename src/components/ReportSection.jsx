import React from 'react';
import generateReportContent from '../utils/generateReportContent';
import ReportEditor from './ReportEditor';
import SendReport from './SendReport';

function ReportSection(props) {
  const {
    tasks,
    showReportEditor,
    setShowReportEditor,
    reportContent,
    setReportContent,
  } = props;

  const handleGenerateReport = () => {
    const content = generateReportContent(tasks);
    setReportContent(content);
    setShowReportEditor(true);
  };

  const handleSaveReport = (content) => {
    setReportContent(content);
    alert('Report saved successfully');
  };

  return (
    <div>
      <div className="flex items-center mb-4 space-x-4">
        <button
          onClick={handleGenerateReport}
          className="bg-secondary text-white p-3 rounded-lg hover:bg-secondary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          Generate Report
        </button>
        {showReportEditor && (
          <button
            onClick={() => setShowReportEditor(false)}
            className="bg-danger text-white p-3 rounded-lg hover:bg-danger-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            Close Editor
          </button>
        )}
      </div>
      {showReportEditor && (
        <>
          <ReportEditor
            initialContent={reportContent}
            onSave={handleSaveReport}
          />
          <SendReport reportContent={reportContent} />
        </>
      )}
    </div>
  );
}

export default ReportSection;
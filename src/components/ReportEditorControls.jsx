import React from 'react';
import ExportButtons from './ExportButtons';
import ShadingToggle from './ShadingToggle';

function ReportEditorControls({
  handleSave,
  handlePrint,
  saving,
  columnShading,
  handleToggleShading,
  reportContent,
  tasks,
}) {
  return (
    <div className="flex flex-wrap space-x-4 mt-4">
      <button
        onClick={handleSave}
        className={`px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Report'}
      </button>
      <button
        onClick={handlePrint}
        className="px-6 py-3 bg-muted text-white rounded-lg hover:bg-muted-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Print Report
      </button>
      <ExportButtons reportContent={reportContent} tasks={tasks} />
      <ShadingToggle
        columnShading={columnShading}
        handleToggleShading={handleToggleShading}
      />
    </div>
  );
}

export default ReportEditorControls;
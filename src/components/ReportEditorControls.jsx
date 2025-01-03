import React from 'react';

function ReportEditorControls({ handleSave, handlePrint, saving, columnShading, handleToggleShading }) {
  return (
    <div className="flex space-x-4 mt-2">
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
      <button
        onClick={handleToggleShading}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        {columnShading ? 'Disable Column Shading' : 'Enable Column Shading'}
      </button>
    </div>
  );
}

export default ReportEditorControls;
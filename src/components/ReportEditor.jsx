import React, { useState, useEffect } from 'react';
import ReportEditorContent from './ReportEditorContent';
import ReportEditorControls from './ReportEditorControls';
import useUserSettings from '../hooks/useUserSettings';
import printReport from '../utils/printReport';

function ReportEditor({ reportContent, onSave, saving }) {
  const [columnShading, setColumnShading] = useState(false);
  const { logoUrl, customHeader, fetchSettings } = useUserSettings();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = () => {
    onSave(reportContent);
  };

  const handlePrint = () => {
    printReport(reportContent, columnShading);
  };

  const handleToggleShading = () => {
    setColumnShading(!columnShading);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-primary">Report Editor</h3>
      </div>
      <ReportEditorContent
        reportContent={reportContent}
        logoUrl={logoUrl}
        customHeader={customHeader}
        columnShading={columnShading}
      />
      <ReportEditorControls
        handleSave={handleSave}
        handlePrint={handlePrint}
        saving={saving}
        columnShading={columnShading}
        handleToggleShading={handleToggleShading}
      />
    </div>
  );
}

export default ReportEditor;
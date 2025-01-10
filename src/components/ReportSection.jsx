import React, { useState } from 'react';
import ReportEditor from './ReportEditor';
import { supabase } from '../supabaseClient';

function ReportSection(props) {
  const {
    tasks,
    showReportEditor,
    setShowReportEditor,
  } = props;

  const [saving, setSaving] = useState(false);

  const handleGenerateReport = () => {
    setShowReportEditor(true);
  };

  const handleSaveReport = async (reportContent) => {
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/saveReport', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportContent }),
      });

      if (response.ok) {
        alert('Report saved successfully');
      } else {
        const errorData = await response.json();
        alert('Failed to save report: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error saving report:', error);
      alert('Error saving report');
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center mb-4 space-x-4">
        <button
          onClick={handleGenerateReport}
          className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          Generate Report
        </button>
        {showReportEditor && (
          <button
            onClick={() => setShowReportEditor(false)}
            className="bg-danger hover:bg-danger-dark text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            Close Editor
          </button>
        )}
      </div>
      {showReportEditor && (
        <ReportEditor
          tasks={tasks}
          onSave={handleSaveReport}
          saving={saving}
        />
      )}
    </div>
  );
}

export default ReportSection;
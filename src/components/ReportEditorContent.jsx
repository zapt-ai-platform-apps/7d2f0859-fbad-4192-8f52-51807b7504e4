import React from 'react';

function ReportEditorContent({ reportContent, setReportContent, editMode }) {
  return editMode ? (
    <textarea
      value={reportContent}
      onChange={(e) => setReportContent(e.target.value)}
      className="w-full h-96 p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border resize-none"
    />
  ) : (
    <div
      className="w-full p-3 border border-muted rounded-lg box-border overflow-auto"
      dangerouslySetInnerHTML={{ __html: reportContent }}
    />
  );
}

export default ReportEditorContent;
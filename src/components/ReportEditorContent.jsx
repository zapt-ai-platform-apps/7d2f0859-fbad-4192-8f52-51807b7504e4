import React from 'react';

function ReportEditorContent({ reportContent, logoUrl, customHeader, columnShading }) {
  return (
    <div
      className="w-full p-3 border border-muted rounded-lg box-border overflow-auto"
    >
      <div dangerouslySetInnerHTML={{ __html: reportContent }} />
    </div>
  );
}

export default ReportEditorContent;
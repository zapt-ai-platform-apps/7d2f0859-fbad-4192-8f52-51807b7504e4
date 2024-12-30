import React from 'react';

function ReportEditorContent({ reportContent }) {
  return (
    <div
      className="w-full p-3 border border-muted rounded-lg box-border overflow-auto"
      dangerouslySetInnerHTML={{ __html: reportContent }}
    />
  );
}

export default ReportEditorContent;
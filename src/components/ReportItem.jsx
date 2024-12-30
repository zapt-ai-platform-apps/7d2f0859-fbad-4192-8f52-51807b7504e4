import React from 'react';

function ReportItem({ report }) {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Report from {new Date(report.createdAt).toLocaleString()}
      </h2>
      <div
        className="report-content overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: report.content }}
      />
    </div>
  );
}

export default ReportItem;
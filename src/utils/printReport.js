function printReport(reportContent, columnShading) {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Task Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          tr:nth-child(even) td { background-color: ${columnShading ? '#f9f9f9' : 'transparent'}; }
          footer { position: fixed; bottom: 0; left: 0; right: 0; text-align: left; font-size: 12px; }
        </style>
      </head>
      <body>
        ${reportContent}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

export default printReport;
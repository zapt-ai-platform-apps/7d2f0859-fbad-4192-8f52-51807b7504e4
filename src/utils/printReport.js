function printReport(reportContent, columnShading) {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Task Report</title>
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }
          body { font-family: Arial, sans-serif; padding: 0; margin: 0; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          tr:nth-child(even) td { background-color: ${columnShading ? '#f9f9f9' : 'transparent'}; }
          footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 12px;
          }
          .page-number:after {
            content: counter(page);
          }
        </style>
      </head>
      <body>
        ${reportContent}
        <footer>
          Page <span class="page-number"></span>
        </footer>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}

export default printReport;
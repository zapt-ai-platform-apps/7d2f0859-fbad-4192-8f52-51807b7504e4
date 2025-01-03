import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from 'docx';
import XLSX from 'xlsx';

export function exportToWord(reportContent, fileName = 'report.docx') {
  const doc = new Document();

  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(reportContent, 'text/html');
  const tables = htmlDoc.getElementsByTagName('table');

  let docContent = [];

  // Add custom header if any
  const headerElements = htmlDoc.querySelectorAll('h1');
  headerElements.forEach((header) => {
    docContent.push(
      new Paragraph({
        children: [new TextRun({ text: header.textContent, bold: true, size: 32 })],
        spacing: { after: 200 },
      })
    );
  });

  // Convert tables
  for (let table of tables) {
    const rows = table.rows;
    const docRows = [];
    for (let row of rows) {
      const cells = row.cells;
      const docCells = [];
      for (let cell of cells) {
        docCells.push(
          new TableCell({
            children: [new Paragraph(cell.textContent)],
          })
        );
      }
      docRows.push(new TableRow({ children: docCells }));
    }
    docContent.push(new Table({ rows: docRows, width: { size: 100, type: 'pct' } }));
  }

  const packer = new Packer();
  doc.addSection({ children: docContent });
  packer.toBlob(doc).then((blob) => {
    saveAs(blob, fileName);
  });
}

export function exportToExcel(tasks, fileName = 'report.xlsx') {
  const worksheetData = tasks.map((task) => ({
    'Ref No.': task.referenceNumber,
    Description: task.description,
    Project: task.project || 'N/A',
    'Due Date': task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : 'N/A',
    Status: task.status || 'N/A',
    Priority: task.priority || 'N/A',
    'Task Owner': task.taskOwner || 'Unassigned',
    Organisation: task.organisation || 'N/A',
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
}
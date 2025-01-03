import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF(reportContent, fileName = 'report.pdf') {
  const printArea = document.createElement('div');
  printArea.innerHTML = reportContent;
  document.body.appendChild(printArea);

  const canvas = await html2canvas(printArea, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);

  document.body.removeChild(printArea);
}
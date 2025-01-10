function generateReportContent(tasks, options = {}) {
  const { logoUrl, customHeader } = options;
  const today = new Date();
  const reportDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  let tableRows = tasks.map((task, index) => `
    <tr>
      <td>${task.referenceNumber}</td>
      <td>${task.description}</td>
      <td>${task.project || 'N/A'}</td>
      <td>${task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : 'N/A'}</td>
      <td>${task.status || 'N/A'}</td>
      <td>Priority ${task.priority || 'N/A'}</td>
      <td>${task.taskOwner || 'Unassigned'}</td>
      <td>${task.organisation || 'N/A'}</td>
    </tr>
  `).join('');

  return `
    <div style="text-align: center; margin-bottom: 20px;">
      ${logoUrl ? `<img src="${logoUrl}" alt="Logo" style="max-height: 100px;"/>` : ''}
      <h1>${customHeader || 'Task Report'}</h1>
    </div>
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Ref No.</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Project</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Due Date</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Status</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Priority</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Task Owner</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Organisation</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
}

export default generateReportContent;
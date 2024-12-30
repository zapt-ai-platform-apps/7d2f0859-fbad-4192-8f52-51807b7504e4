function generateReportContent(tasks) {
  let tableRows = tasks.map(task => `
    <tr>
      <td>${task.referenceNumber}</td>
      <td>${task.description}</td>
      <td>${task.project || 'N/A'}</td>
      <td>${task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : 'N/A'}</td>
      <td>${task.status || 'N/A'}</td>
      <td>${task.priority || 'N/A'}</td>
      <td>${task.taskOwner || 'Unassigned'}</td>
      <td>${task.organisation || 'N/A'}</td>
    </tr>
  `).join('');

  return `
    <style>
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
    </style>
    <table>
      <thead>
        <tr>
          <th>Ref No.</th>
          <th>Description</th>
          <th>Project</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Task Owner</th>
          <th>Organisation</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
}

export default generateReportContent;
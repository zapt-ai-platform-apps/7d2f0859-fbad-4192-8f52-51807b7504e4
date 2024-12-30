function generateReportContent(tasks) {
  let tableRows = tasks.map(task => `
    <tr>
      <td>${task.referenceNumber}</td>
      <td>${task.description}</td>
      <td>${task.project || 'N/A'}</td>
      <td>${task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : 'N/A'}</td>
      <td>${task.status || 'N/A'}</td>
      <td>${task.priority || 'N/A'}</td>
      <td>${task.organisation || 'N/A'}</td>
      <td>${task.taskOwner || 'Unassigned'}</td>
    </tr>
  `).join('');

  return `
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>Ref No.</th>
          <th>Description</th>
          <th>Project</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Organisation</th>
          <th>Task Owner</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
}

export default generateReportContent;
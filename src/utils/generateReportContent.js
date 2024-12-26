function generateReportContent(tasks) {
  return tasks
    .map((task) => {
      return `
Reference Number: ${task.referenceNumber}
Description: ${task.description}
Project: ${task.project || 'N/A'}
Due Date: ${task.dueDate ? task.dueDate.substring(0, 10) : 'N/A'}
Status: ${task.status || 'N/A'}
Priority: ${task.priority || 'N/A'}
Organisation: ${task.organisation || 'N/A'}
Allocated To: ${task.allocatedTo || 'Unassigned'}
`;
    })
    .join('\n');
}

export default generateReportContent;
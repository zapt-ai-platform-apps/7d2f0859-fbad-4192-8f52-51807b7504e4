import React from 'react';
import TaskTableHeader from './TaskTableHeader';
import TaskTableBody from './TaskTableBody';
import EditTaskForm from './EditTaskForm';

function TaskTable(props) {
  const [emailingTaskId, setEmailingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleEmailTask = async (taskId) => {
    const email = prompt('Enter recipient email:');
    if (!email) return;
    setEmailingTaskId(taskId);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/emailTask', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId: taskId,
          recipientEmail: email,
        }),
      });

      if (response.ok) {
        alert('Task emailed successfully');
      } else {
        const errorData = await response.json();
        alert('Error emailing task: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error emailing task:', error);
      alert('Error emailing task');
    } finally {
      setEmailingTaskId(null);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    setEditingTask(null);
    props.onTaskUpdated(updatedTask);
  };

  const handleDeleteTask = (taskId) => {
    setEditingTask(null);
    props.onTaskDeleted(taskId);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="w-full overflow-x-auto">
      {editingTask ? (
        <EditTaskForm
          task={editingTask}
          onTaskUpdated={handleUpdateTask}
          onTaskDeleted={handleDeleteTask}
          onCancel={handleCancelEdit}
        />
      ) : (
        <table className="w-full bg-white rounded-lg shadow-md">
          <TaskTableHeader handleSort={props.handleSort} />
          <TaskTableBody
            loading={props.loading}
            tasks={props.tasks}
            handleEmailTask={handleEmailTask}
            emailingTaskId={emailingTaskId}
            onEditTask={handleEditTask}
          />
        </table>
      )}
    </div>
  );
}

export default TaskTable;
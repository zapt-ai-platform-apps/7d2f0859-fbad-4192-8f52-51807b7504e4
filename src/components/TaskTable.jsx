import React, { useState } from 'react';
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

    try {
      await props.handleEmailTask(taskId, email);
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
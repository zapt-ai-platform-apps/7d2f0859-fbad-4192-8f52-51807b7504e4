import { createSignal, Show } from 'solid-js';
import { supabase } from '../supabaseClient';
import TaskTableHeader from './TaskTableHeader';
import TaskTableBody from './TaskTableBody';
import EditTaskForm from './EditTaskForm';

function TaskTable(props) {
  const [allocatingTaskId, setAllocatingTaskId] = createSignal(null);
  const [editingTask, setEditingTask] = createSignal(null);

  const handleAllocateTask = async (taskId) => {
    const email = prompt('Enter recipient email:');
    if (!email) return;
    setAllocatingTaskId(taskId);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/allocateTask', {
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
        alert('Task allocated successfully');
        props.fetchTasks();
      } else {
        const errorData = await response.json();
        alert('Error allocating task: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error allocating task:', error);
      alert('Error allocating task');
    } finally {
      setAllocatingTaskId(null);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    setEditingTask(null);
    props.onTaskUpdated(updatedTask);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div class="overflow-x-auto">
      <Show when={!editingTask()} fallback={
        <EditTaskForm
          task={editingTask()}
          onTaskUpdated={handleUpdateTask}
          onCancel={handleCancelEdit}
        />
      }>
        <table class="min-w-full bg-white rounded-lg shadow-md">
          <TaskTableHeader handleSort={props.handleSort} />
          <TaskTableBody
            loading={props.loading}
            tasks={props.tasks}
            handleAllocateTask={handleAllocateTask}
            allocatingTaskId={allocatingTaskId}
            onEditTask={handleEditTask}
          />
        </table>
      </Show>
    </div>
  );
}

export default TaskTable;
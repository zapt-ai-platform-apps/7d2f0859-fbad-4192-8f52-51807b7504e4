import { For, Show, createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';
import TaskTableRow from './TaskTableRow';

function TaskTable(props) {
  const [allocatingTaskId, setAllocatingTaskId] = createSignal(null);

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

  return (
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th
              class="px-4 py-2 cursor-pointer"
              onClick={() => props.handleSort('referenceNumber')}
            >
              Ref No.
            </th>
            <th
              class="px-4 py-2 cursor-pointer"
              onClick={() => props.handleSort('description')}
            >
              Description
            </th>
            <th
              class="px-4 py-2 cursor-pointer"
              onClick={() => props.handleSort('project')}
            >
              Project
            </th>
            <th
              class="px-4 py-2 cursor-pointer"
              onClick={() => props.handleSort('dueDate')}
            >
              Due Date
            </th>
            <th
              class="px-4 py-2 cursor-pointer"
              onClick={() => props.handleSort('status')}
            >
              Status
            </th>
            <th
              class="px-4 py-2 cursor-pointer"
              onClick={() => props.handleSort('priority')}
            >
              Priority
            </th>
            <th
              class="px-4 py-2 cursor-pointer"
              onClick={() => props.handleSort('organisation')}
            >
              Organisation
            </th>
            <th
              class="px-4 py-2 cursor-pointer"
              onClick={() => props.handleSort('allocatedTo')}
            >
              Allocated To
            </th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <Show
            when={!props.loading}
            fallback={
              <tr>
                <td colSpan="9" class="text-center p-4">
                  Loading tasks...
                </td>
              </tr>
            }
          >
            <For each={props.tasks()}>
              {(task) => (
                <TaskTableRow
                  task={task}
                  handleAllocateTask={handleAllocateTask}
                  allocatingTaskId={allocatingTaskId}
                />
              )}
            </For>
          </Show>
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
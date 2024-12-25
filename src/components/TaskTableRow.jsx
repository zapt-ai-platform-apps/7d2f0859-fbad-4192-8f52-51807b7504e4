import { format } from 'date-fns';

function TaskTableRow(props) {
  const { task, handleAllocateTask, allocatingTaskId } = props;

  return (
    <tr class="hover:bg-gray-100">
      <td class="border px-4 py-2">{task.referenceNumber}</td>
      <td class="border px-4 py-2">{task.description}</td>
      <td class="border px-4 py-2">{task.project}</td>
      <td class="border px-4 py-2">
        {task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : ''}
      </td>
      <td class="border px-4 py-2">{task.status}</td>
      <td class="border px-4 py-2">{task.priority}</td>
      <td class="border px-4 py-2">{task.organisation}</td>
      <td class="border px-4 py-2">
        <button
          class={`bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer ${allocatingTaskId() === task.id ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleAllocateTask(task.id)}
          disabled={allocatingTaskId() === task.id}
        >
          {allocatingTaskId() === task.id ? 'Allocating...' : 'Allocate'}
        </button>
      </td>
    </tr>
  );
}

export default TaskTableRow;
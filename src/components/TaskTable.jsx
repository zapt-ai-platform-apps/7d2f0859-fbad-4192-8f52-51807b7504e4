import { For, Show } from 'solid-js';
import { format } from 'date-fns';

function TaskTable(props) {
  return (
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th class="px-4 py-2 cursor-pointer" onClick={() => props.handleSort('referenceNumber')}>Ref No.</th>
            <th class="px-4 py-2 cursor-pointer" onClick={() => props.handleSort('description')}>Description</th>
            <th class="px-4 py-2 cursor-pointer" onClick={() => props.handleSort('project')}>Project</th>
            <th class="px-4 py-2 cursor-pointer" onClick={() => props.handleSort('dueDate')}>Due Date</th>
            <th class="px-4 py-2 cursor-pointer" onClick={() => props.handleSort('status')}>Status</th>
            <th class="px-4 py-2 cursor-pointer" onClick={() => props.handleSort('priority')}>Priority</th>
            <th class="px-4 py-2 cursor-pointer" onClick={() => props.handleSort('organisation')}>Organisation</th>
          </tr>
        </thead>
        <tbody>
          <Show
            when={!props.loading}
            fallback={
              <tr>
                <td colSpan="7" class="text-center p-4">
                  Loading tasks...
                </td>
              </tr>
            }
          >
            <For each={props.tasks()}>
              {(task) => (
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
                </tr>
              )}
            </For>
          </Show>
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
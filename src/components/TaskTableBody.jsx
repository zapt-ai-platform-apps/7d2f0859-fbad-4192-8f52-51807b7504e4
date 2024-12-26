import { For, Show } from 'solid-js';
import TaskTableRow from './TaskTableRow';

function TaskTableBody(props) {
  return (
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
              handleAllocateTask={props.handleAllocateTask}
              allocatingTaskId={props.allocatingTaskId}
              onEditTask={props.onEditTask}
            />
          )}
        </For>
      </Show>
    </tbody>
  );
}

export default TaskTableBody;
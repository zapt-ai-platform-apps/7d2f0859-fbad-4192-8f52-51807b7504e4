import React from 'react';
import TaskTableRow from './TaskTableRow';

function TaskTableBody(props) {
  return (
    <tbody>
      {!props.loading ? (
        props.tasks.map((task) => (
          <TaskTableRow
            key={task.id}
            task={task}
            onEditTask={props.onEditTask}
          />
        ))
      ) : (
        <tr>
          <td colSpan="9" className="text-center p-4">
            Loading tasks...
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default TaskTableBody;
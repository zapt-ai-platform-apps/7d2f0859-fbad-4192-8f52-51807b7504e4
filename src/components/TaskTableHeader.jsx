function TaskTableHeader(props) {
  return (
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
  );
}

export default TaskTableHeader;
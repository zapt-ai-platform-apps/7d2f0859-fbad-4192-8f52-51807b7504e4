import { createSignal, createMemo } from 'solid-js';
import TaskFilter from './TaskFilter';
import TaskTable from './TaskTable';

function TaskList(props) {
  const [filterText, setFilterText] = createSignal('');
  const [filterField, setFilterField] = createSignal('description');
  const [sortField, setSortField] = createSignal('dueDate');
  const [sortDirection, setSortDirection] = createSignal('asc');

  const filteredTasks = createMemo(() => {
    return props.tasks
      .filter((task) => {
        if (filterText() === '') return true;
        const field = task[filterField()];
        if (!field) return false;
        return field.toLowerCase().includes(filterText().toLowerCase());
      })
      .sort((a, b) => {
        let fieldA = a[sortField()];
        let fieldB = b[sortField()];
        if (fieldA < fieldB) return sortDirection() === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortDirection() === 'asc' ? 1 : -1;
        return 0;
      });
  });

  const handleSort = (field) => {
    if (sortField() === field) {
      setSortDirection(sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div>
      <h2 class="text-2xl font-bold mb-4 text-purple-600">Tasks</h2>
      <TaskFilter
        filterText={filterText}
        setFilterText={setFilterText}
        filterField={filterField}
        setFilterField={setFilterField}
      />
      <TaskTable
        tasks={filteredTasks}
        loading={props.loading}
        handleSort={handleSort}
      />
    </div>
  );
}

export default TaskList;
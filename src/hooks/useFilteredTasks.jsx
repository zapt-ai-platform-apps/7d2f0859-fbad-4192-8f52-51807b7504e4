import { createMemo } from 'solid-js';

function useFilteredTasks(tasks, filterText, filterField, sortField, sortDirection) {
  const filteredTasks = createMemo(() => {
    return tasks
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
  return filteredTasks;
}

export default useFilteredTasks;
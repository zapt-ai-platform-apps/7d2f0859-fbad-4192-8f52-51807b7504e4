import { useMemo } from 'react';

function useFilteredTasks(tasks, filterText, filterField, sortField, sortDirection) {
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filterText === '') return true;
        const field = task[filterField];
        if (!field) return false;
        return field.toLowerCase().includes(filterText.toLowerCase());
      })
      .sort((a, b) => {
        let fieldA = a[sortField];
        let fieldB = b[sortField];
        if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [tasks, filterText, filterField, sortField, sortDirection]);

  return filteredTasks;
}

export default useFilteredTasks;
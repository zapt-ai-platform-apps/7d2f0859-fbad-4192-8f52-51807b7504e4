import { createSignal } from 'solid-js';
import useFilteredTasks from './useFilteredTasks';

function useTaskFilterSort(tasks) {
  const [filterText, setFilterText] = createSignal('');
  const [filterField, setFilterField] = createSignal('description');
  const [sortField, setSortField] = createSignal('dueDate');
  const [sortDirection, setSortDirection] = createSignal('asc');

  const filteredTasks = useFilteredTasks(
    tasks,
    filterText,
    filterField,
    sortField,
    sortDirection
  );

  const handleSort = (field) => {
    if (sortField() === field) {
      setSortDirection(sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
    filterText,
    setFilterText,
    filterField,
    setFilterField,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    filteredTasks,
    handleSort,
  };
}

export default useTaskFilterSort;
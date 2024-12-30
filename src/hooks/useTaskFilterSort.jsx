import { useState } from 'react';
import useFilteredTasks from './useFilteredTasks';

function useTaskFilterSort(tasks) {
  const [filterText, setFilterText] = useState('');
  const [filterField, setFilterField] = useState('description');
  const [sortField, setSortField] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showOverdue, setShowOverdue] = useState(false);

  const filteredTasks = useFilteredTasks(
    tasks,
    filterText,
    filterField,
    sortField,
    sortDirection,
    showOverdue
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
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
    showOverdue,
    setShowOverdue,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    filteredTasks,
    handleSort,
  };
}

export default useTaskFilterSort;
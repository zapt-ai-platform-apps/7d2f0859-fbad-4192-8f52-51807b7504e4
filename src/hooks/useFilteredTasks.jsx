```jsx
import { useMemo } from 'react';

function useFilteredTasks(tasks, filterText, filterField, sortField, sortDirection, showOverdue, showCompleted) {
  const filteredTasks = useMemo(() => {
    const today = new Date();
    return tasks
      .filter((task) => {
        // Text filter
        if (filterText !== '') {
          const field = task[filterField];
          if (!field) return false;
          if (!field.toLowerCase().includes(filterText.toLowerCase())) return false;
        }

        // Overdue filter
        if (showOverdue) {
          if (!task.dueDate) return false;
          const dueDate = new Date(task.dueDate);
          if (dueDate < today && task.status !== 'Complete') {
            return true;
          }
          return false;
        }

        // Completed filter
        if (!showCompleted && task.status === 'Complete') {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        let fieldA = a[sortField];
        let fieldB = b[sortField];
        if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [tasks, filterText, filterField, sortField, sortDirection, showOverdue, showCompleted]);

  return filteredTasks;
}

export default useFilteredTasks;
```
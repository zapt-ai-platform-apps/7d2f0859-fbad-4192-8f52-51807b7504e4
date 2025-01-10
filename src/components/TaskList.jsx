import React, { useState } from 'react';
import useTaskFilterSort from '../hooks/useTaskFilterSort';
import TaskFilter from './TaskFilter';
import TaskTable from './TaskTable';
import ReportSection from './ReportSection';

function TaskList(props) {
  const {
    filterText,
    setFilterText,
    filterField,
    setFilterField,
    showOverdue,
    setShowOverdue,
    showCompleted,
    setShowCompleted,
    filteredTasks,
    handleSort,
  } = useTaskFilterSort(props.tasks);

  const [showReportEditor, setShowReportEditor] = useState(false);

  return (
    <div>
      <TaskFilter
        filterText={filterText}
        setFilterText={setFilterText}
        filterField={filterField}
        setFilterField={setFilterField}
        showOverdue={showOverdue}
        setShowOverdue={setShowOverdue}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />
      <ReportSection
        tasks={filteredTasks}
        showReportEditor={showReportEditor}
        setShowReportEditor={setShowReportEditor}
      />
      {!showReportEditor && (
        <TaskTable
          tasks={filteredTasks}
          loading={props.loading}
          handleSort={handleSort}
          fetchTasks={props.fetchTasks}
          onTaskUpdated={props.onTaskUpdated}
          onTaskDeleted={props.onTaskDeleted}
        />
      )}
    </div>
  );
}

export default TaskList;
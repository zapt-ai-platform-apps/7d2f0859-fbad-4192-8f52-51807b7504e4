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
    filteredTasks,
    handleSort,
  } = useTaskFilterSort(props.tasks);

  const [showReportEditor, setShowReportEditor] = useState(false);
  const [reportContent, setReportContent] = useState('');

  return (
    <div>
      <TaskFilter
        filterText={filterText}
        setFilterText={setFilterText}
        filterField={filterField}
        setFilterField={setFilterField}
        showOverdue={showOverdue}
        setShowOverdue={setShowOverdue}
      />
      <ReportSection
        tasks={filteredTasks}
        showReportEditor={showReportEditor}
        setShowReportEditor={setShowReportEditor}
        reportContent={reportContent}
        setReportContent={setReportContent}
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
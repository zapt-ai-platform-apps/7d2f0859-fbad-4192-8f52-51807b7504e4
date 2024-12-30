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
    filteredTasks,
    handleSort,
  } = useTaskFilterSort(props.tasks);

  const [showReportEditor, setShowReportEditor] = useState(false);
  const [reportContent, setReportContent] = useState('');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Tasks</h2>
      <TaskFilter
        filterText={filterText}
        setFilterText={setFilterText}
        filterField={filterField}
        setFilterField={setFilterField}
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
import { createSignal, Show } from 'solid-js';
import useFilteredTasks from '../hooks/useFilteredTasks';
import generateReportContent from '../utils/generateReportContent';
import TaskFilter from './TaskFilter';
import TaskTable from './TaskTable';
import ReportEditor from './ReportEditor';
import SendReport from './SendReport';

function TaskList(props) {
  const [filterText, setFilterText] = createSignal('');
  const [filterField, setFilterField] = createSignal('description');
  const [sortField, setSortField] = createSignal('dueDate');
  const [sortDirection, setSortDirection] = createSignal('asc');
  const [showReportEditor, setShowReportEditor] = createSignal(false);
  const [reportContent, setReportContent] = createSignal('');

  const filteredTasks = useFilteredTasks(
    props.tasks,
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

  const handleGenerateReport = () => {
    const content = generateReportContent(filteredTasks());
    setReportContent(content);
    setShowReportEditor(true);
  };

  const handleSaveReport = (content) => {
    setReportContent(content);
    alert('Report saved successfully');
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
      <div class="flex items-center mb-4 space-x-4">
        <button
          onClick={handleGenerateReport}
          class="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
        >
          Generate Report
        </button>
        <Show when={showReportEditor()}>
          <button
            onClick={() => setShowReportEditor(false)}
            class="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer"
          >
            Close Editor
          </button>
        </Show>
      </div>
      <Show when={showReportEditor()}>
        <ReportEditor
          initialContent={reportContent()}
          onSave={handleSaveReport}
        />
        <SendReport
          reportContent={reportContent()}
        />
      </Show>
      <Show when={!showReportEditor()}>
        <TaskTable
          tasks={filteredTasks}
          loading={props.loading}
          handleSort={handleSort}
          fetchTasks={props.fetchTasks}
        />
      </Show>
    </div>
  );
}

export default TaskList;
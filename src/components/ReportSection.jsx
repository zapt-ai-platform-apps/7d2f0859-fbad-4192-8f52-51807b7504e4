import { Show } from 'solid-js';
import generateReportContent from '../utils/generateReportContent';
import ReportEditor from './ReportEditor';
import SendReport from './SendReport';

function ReportSection(props) {
  const {
    tasks,
    showReportEditor,
    setShowReportEditor,
    reportContent,
    setReportContent,
  } = props;

  const handleGenerateReport = () => {
    const content = generateReportContent(tasks());
    setReportContent(content);
    setShowReportEditor(true);
  };

  const handleSaveReport = (content) => {
    setReportContent(content);
    alert('Report saved successfully');
  };

  return (
    <div>
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
        <SendReport reportContent={reportContent()} />
      </Show>
    </div>
  );
}

export default ReportSection;
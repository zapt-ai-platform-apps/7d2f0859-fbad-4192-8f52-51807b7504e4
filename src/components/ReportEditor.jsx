import { createSignal } from 'solid-js';

function ReportEditor(props) {
  const [reportContent, setReportContent] = createSignal(props.initialContent || '');

  const handleSave = () => {
    props.onSave(reportContent());
  };

  return (
    <div class="mb-4">
      <h3 class="text-xl font-bold mb-2 text-purple-600">Report Editor</h3>
      <textarea
        value={reportContent()}
        onInput={(e) => setReportContent(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        rows="10"
      />
      <button
        onClick={handleSave}
        class="mt-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Save Report
      </button>
    </div>
  );
}

export default ReportEditor;
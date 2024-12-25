function TaskStatusOrganisationFields(props) {
  const { formData, setFormData } = props;

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <input
          type="text"
          placeholder="Status"
          value={formData().status}
          onInput={(e) =>
            setFormData({ ...formData(), status: e.target.value })
          }
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Organisation
        </label>
        <input
          type="text"
          placeholder="Organisation"
          value={formData().organisation}
          onInput={(e) =>
            setFormData({ ...formData(), organisation: e.target.value })
          }
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
      </div>
    </div>
  );
}

export default TaskStatusOrganisationFields;
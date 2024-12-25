function TaskDatePriorityFields(props) {
  const { formData, setFormData } = props;

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={formData().dueDate}
          onInput={(e) =>
            setFormData({ ...formData(), dueDate: e.target.value })
          }
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          value={formData().priority}
          onInput={(e) =>
            setFormData({ ...formData(), priority: e.target.value })
          }
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
        >
          <option value="" disabled selected>
            Select Priority
          </option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  );
}

export default TaskDatePriorityFields;
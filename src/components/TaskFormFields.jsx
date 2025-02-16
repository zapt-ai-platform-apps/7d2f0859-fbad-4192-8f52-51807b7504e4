import React from 'react';
import ProjectSelect from './ProjectSelect';
import OrganisationSelect from './OrganisationSelect';
import PrioritySelector from './PrioritySelector';
import DescriptionField from './DescriptionField';
import DueDateField from './DueDateField';
import PriorityStatusField from './PriorityStatusField';
import StatusField from './StatusField';  // Added missing import
import TaskOwnerField from './TaskOwnerField';  // Added missing import

function TaskFormFields(props) {
  const { formData, setFormData } = props;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectSelect formData={formData} setFormData={setFormData} />

        <DescriptionField formData={formData} setFormData={setFormData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <OrganisationSelect formData={formData} setFormData={setFormData} />

        <DueDateField formData={formData} setFormData={setFormData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <PriorityStatusField formData={formData} setFormData={setFormData} />
        
        <StatusField formData={formData} setFormData={setFormData} />  {/* Ensure StatusField is used here */}
      </div>
      <div className="mt-4">
        <TaskOwnerField formData={formData} setFormData={setFormData} />  {/* Ensure TaskOwnerField is used */}
      </div>
    </>
  );
}

export default TaskFormFields;
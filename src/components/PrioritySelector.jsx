import React from 'react';

function getPriorityColor(value) {
  switch (value) {
    case '1':
      return 'bg-red-500';
    case '2':
      return 'bg-orange-500';
    case '3':
      return 'bg-blue-500';
    case '4':
      return 'bg-white border border-gray-300';
    default:
      return 'bg-gray-500';
  }
}

function PrioritySelector({ value, onChange }) {
  const options = [
    { value: '1', label: 'Priority 1' },
    { value: '2', label: 'Priority 2' },
    { value: '3', label: 'Priority 3' },
    { value: '4', label: 'Priority 4' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex items-center p-2 rounded-lg border ${value === option.value ? 'ring-2 ring-primary' : ''} cursor-pointer`}
        >
          <span className={`w-4 h-4 rounded-full mr-2 ${getPriorityColor(option.value)}`}></span>
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default PrioritySelector;
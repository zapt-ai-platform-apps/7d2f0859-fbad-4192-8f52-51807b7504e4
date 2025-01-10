```jsx
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

function PriorityDisplay({ value }) {
  return (
    <div className="flex items-center">
      <span className={`w-4 h-4 rounded-full mr-2 ${getPriorityColor(value)}`}></span>
      Priority {value}
    </div>
  );
}

export default PriorityDisplay;
```
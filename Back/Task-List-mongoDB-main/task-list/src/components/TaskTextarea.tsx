// TaskTextarea.tsx
import React from "react";

interface TaskTextareaProps {
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

const TaskTextarea: React.FC<TaskTextareaProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      className="py-2 px-1 border resize-none rounded w-full outline-none border-green-500 mr-2"
    />
  );
};

export default TaskTextarea;

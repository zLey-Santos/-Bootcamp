import React from "react";

interface TaskButtonProps {
  action: "delete" | "edit" | "save";
  onClick: () => void;
  className?: string;
}

const TaskButton: React.FC<TaskButtonProps> = ({ action, onClick, className }) => {
  let buttonText: string;
  let buttonColorClass: string;

  switch (action) {
    case "delete":
      buttonText = "Delete";
      buttonColorClass =
        "text-black  hover:text-white  font-bold uppercase ml-2 px-2 font-w rounded bg-red-500 hover:bg-red-700 border border-black";
      break;
    case "edit":
      buttonText = "Edit";
      buttonColorClass =
        "ttext-black  hover:text-white   font-bold uppercase ml-2 px-2 font-w rounded bg-amber-500 hover:bg-amber-700 border border-black";
      break;
    case "save":
      buttonText = "Save";
      buttonColorClass =
        "text-black  hover:text-white  font-bold uppercase ml-2 px-2 font-w rounded bg-green-500 hover:bg-green-700 border border-black";
      break;
    default:
      buttonText = "";
      buttonColorClass = "text-blue-500";
  }

  return (
    <button onClick={onClick} className={` ${buttonColorClass} ${className}`}>
      {buttonText}
    </button>
  );
};

export default TaskButton;

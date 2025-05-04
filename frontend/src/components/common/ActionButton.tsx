// components/common/ActionButton.tsx
import React from "react";

type ActionButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 w-full bg-blue-600 text-black font-bold rounded-lg hover:bg-blue-700 transition duration-300 ${className}`}
    >
      {text}
    </button>
  );
};

export default ActionButton;

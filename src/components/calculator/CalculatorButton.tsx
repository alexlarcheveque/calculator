"use client";

import { CalculatorButton as ButtonType } from "@/types/calculator";

interface CalculatorButtonProps {
  button: ButtonType;
  onClick: (value: string | number) => void;
  className?: string;
}

export default function CalculatorButton({
  button,
  onClick,
  className = "",
}: CalculatorButtonProps) {
  const getButtonStyle = () => {
    const baseStyle =
      "h-12 rounded-md font-medium transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    switch (button.type) {
      case "number":
        return `${baseStyle} bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300`;
      case "operator":
        return `${baseStyle} bg-blue-500 hover:bg-blue-600 text-white`;
      case "function":
        return `${baseStyle} bg-purple-500 hover:bg-purple-600 text-white text-sm`;
      case "equals":
        return `${baseStyle} bg-green-500 hover:bg-green-600 text-white`;
      case "clear":
        return `${baseStyle} bg-red-500 hover:bg-red-600 text-white`;
      case "memory":
        return `${baseStyle} bg-orange-500 hover:bg-orange-600 text-white text-sm`;
      default:
        return `${baseStyle} bg-gray-300 hover:bg-gray-400 text-gray-900`;
    }
  };

  const handleClick = () => {
    if (!button.isDisabled) {
      onClick(button.value);
    }
  };

  return (
    <button
      className={`${getButtonStyle()} ${button.className || ""} ${className}`}
      onClick={handleClick}
      disabled={button.isDisabled}
      title={typeof button.label === "string" ? button.label : ""}
    >
      <span dangerouslySetInnerHTML={{ __html: button.label }} />
    </button>
  );
}

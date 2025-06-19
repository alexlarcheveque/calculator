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
      "h-14 rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md backdrop-blur-sm border";

    switch (button.type) {
      case "number":
        return `${baseStyle} bg-white/80 hover:bg-white text-slate-800 border-slate-200/60 hover:border-slate-300 shadow-slate-200/40`;
      case "operator":
        return `${baseStyle} bg-blue-500 hover:bg-blue-600 text-white border-blue-400/50 shadow-blue-500/20 hover:shadow-blue-500/30`;
      case "function":
        return `${baseStyle} bg-slate-600 hover:bg-slate-700 text-white text-sm border-slate-500/50 shadow-slate-600/20 hover:shadow-slate-600/30`;
      case "equals":
        return `${baseStyle} bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400/50 shadow-emerald-500/20 hover:shadow-emerald-500/30`;
      case "clear":
        return `${baseStyle} bg-rose-500 hover:bg-rose-600 text-white border-rose-400/50 shadow-rose-500/20 hover:shadow-rose-500/30`;
      case "memory":
        return `${baseStyle} bg-amber-500 hover:bg-amber-600 text-white text-sm border-amber-400/50 shadow-amber-500/20 hover:shadow-amber-500/30`;
      default:
        return `${baseStyle} bg-slate-200/80 hover:bg-slate-300/80 text-slate-700 border-slate-300/60`;
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

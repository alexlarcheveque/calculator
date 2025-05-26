"use client";

import {
  CalculatorButton as ButtonType,
  CalculatorFunction,
} from "@/types/calculator";
import CalculatorButton from "./CalculatorButton";

interface CalculatorKeypadProps {
  onButtonClick: (value: string | number) => void;
  angleMode: "deg" | "rad";
  onAngleModeChange: (mode: "deg" | "rad") => void;
  memoryHasValue: boolean;
}

export default function CalculatorKeypad({
  onButtonClick,
  angleMode,
  onAngleModeChange,
  memoryHasValue,
}: CalculatorKeypadProps) {
  // Scientific function buttons
  const scientificButtons: ButtonType[][] = [
    [
      { label: "sin", value: CalculatorFunction.SIN, type: "function" },
      { label: "cos", value: CalculatorFunction.COS, type: "function" },
      { label: "tan", value: CalculatorFunction.TAN, type: "function" },
    ],
    [
      {
        label: "sin<sup>-1</sup>",
        value: CalculatorFunction.ASIN,
        type: "function",
      },
      {
        label: "cos<sup>-1</sup>",
        value: CalculatorFunction.ACOS,
        type: "function",
      },
      {
        label: "tan<sup>-1</sup>",
        value: CalculatorFunction.ATAN,
        type: "function",
      },
      { label: "π", value: CalculatorFunction.PI, type: "function" },
      { label: "e", value: CalculatorFunction.E, type: "function" },
    ],
    [
      {
        label: "x<sup>y</sup>",
        value: CalculatorFunction.POWER,
        type: "function",
      },
      {
        label: "x<sup>3</sup>",
        value: CalculatorFunction.CUBE,
        type: "function",
      },
      {
        label: "x<sup>2</sup>",
        value: CalculatorFunction.SQUARE,
        type: "function",
      },
      {
        label: "e<sup>x</sup>",
        value: CalculatorFunction.EXP,
        type: "function",
      },
      {
        label: "10<sup>x</sup>",
        value: CalculatorFunction.TEN_POWER,
        type: "function",
      },
    ],
    [
      {
        label: "<sup>y</sup>√x",
        value: CalculatorFunction.NTHROOT,
        type: "function",
      },
      {
        label: "<sup>3</sup>√x",
        value: CalculatorFunction.CBRT,
        type: "function",
      },
      { label: "√x", value: CalculatorFunction.SQRT, type: "function" },
      { label: "ln", value: CalculatorFunction.LN, type: "function" },
      { label: "log", value: CalculatorFunction.LOG, type: "function" },
    ],
    [
      { label: "(", value: "(", type: "function" },
      { label: ")", value: ")", type: "function" },
      { label: "1/x", value: CalculatorFunction.RECIPROCAL, type: "function" },
      { label: "%", value: CalculatorFunction.PERCENT, type: "function" },
      { label: "n!", value: CalculatorFunction.FACTORIAL, type: "function" },
    ],
  ];

  // Number and operation buttons
  const numberButtons: ButtonType[][] = [
    [
      { label: "7", value: 7, type: "number" },
      { label: "8", value: 8, type: "number" },
      { label: "9", value: 9, type: "number" },
      { label: "+", value: "+", type: "operator" },
      { label: "Back", value: CalculatorFunction.BACKSPACE, type: "clear" },
    ],
    [
      { label: "4", value: 4, type: "number" },
      { label: "5", value: 5, type: "number" },
      { label: "6", value: 6, type: "number" },
      { label: "–", value: "-", type: "operator" },
      { label: "Ans", value: CalculatorFunction.ANS, type: "function" },
    ],
    [
      { label: "1", value: 1, type: "number" },
      { label: "2", value: 2, type: "number" },
      { label: "3", value: 3, type: "number" },
      { label: "×", value: "*", type: "operator" },
      { label: "M+", value: CalculatorFunction.MEMORY_ADD, type: "memory" },
    ],
    [
      { label: "0", value: 0, type: "number" },
      { label: ".", value: ".", type: "number" },
      {
        label: "EXP",
        value: CalculatorFunction.EXP_NOTATION,
        type: "function",
      },
      { label: "÷", value: "/", type: "operator" },
      {
        label: "M-",
        value: CalculatorFunction.MEMORY_SUBTRACT,
        type: "memory",
      },
    ],
    [
      { label: "±", value: CalculatorFunction.NEGATE, type: "operator" },
      { label: "RND", value: CalculatorFunction.RANDOM, type: "function" },
      { label: "AC", value: CalculatorFunction.CLEAR, type: "clear" },
      { label: "=", value: CalculatorFunction.EQUALS, type: "equals" },
      {
        label: "MR",
        value: CalculatorFunction.MEMORY_RECALL,
        type: "memory",
        isDisabled: !memoryHasValue,
      },
    ],
  ];

  return (
    <div className="bg-white p-4 rounded-b-lg">
      {/* Angle mode selector */}
      <div className="mb-4 flex justify-center">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              angleMode === "deg"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => onAngleModeChange("deg")}
          >
            Deg
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              angleMode === "rad"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => onAngleModeChange("rad")}
          >
            Rad
          </button>
        </div>
      </div>

      {/* Scientific functions */}
      <div className="mb-4">
        {scientificButtons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2 mb-2">
            {row.map((button, buttonIndex) => (
              <CalculatorButton
                key={`${rowIndex}-${buttonIndex}`}
                button={button}
                onClick={onButtonClick}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Number pad and operations */}
      <div>
        {numberButtons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2 mb-2">
            {row.map((button, buttonIndex) => (
              <CalculatorButton
                key={`${rowIndex}-${buttonIndex}`}
                button={button}
                onClick={onButtonClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

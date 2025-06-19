"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CalculatorState,
  CalculationHistory,
  CalculatorFunction,
} from "@/types/calculator";
import {
  evaluateFunction,
  evaluateBasicOperation,
  formatNumber,
  getRandomNumber,
} from "@/utils/calculatorUtils";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorKeypad from "./CalculatorKeypad";
import FAQSection from "./FAQSection";

export default function CalculatorPage() {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    memory: 0,
    history: [],
    angleMode: "deg",
  });

  const [lastAnswer, setLastAnswer] = useState<number>(0);

  // Add calculation to history
  const addToHistory = useCallback((expression: string, result: string) => {
    const historyItem: CalculationHistory = {
      expression,
      result,
      timestamp: new Date(),
    };

    setState((prev) => {
      // Check if the last entry is the same to prevent duplicates
      const lastEntry = prev.history[prev.history.length - 1];
      if (
        lastEntry &&
        lastEntry.expression === expression &&
        lastEntry.result === result
      ) {
        return prev; // Don't add duplicate
      }

      return {
        ...prev,
        history: [...prev.history, historyItem].slice(-10), // Keep last 10 items
      };
    });
  }, []);

  // Handle number input
  const inputNumber = useCallback((num: string | number) => {
    const numStr = num.toString();

    setState((prev) => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: numStr,
          waitingForOperand: false,
        };
      }

      return {
        ...prev,
        display: prev.display === "0" ? numStr : prev.display + numStr,
      };
    });
  }, []);

  // Handle decimal point
  const inputDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: "0.",
          waitingForOperand: false,
        };
      }

      if (prev.display.indexOf(".") === -1) {
        return {
          ...prev,
          display: prev.display + ".",
        };
      }

      return prev;
    });
  }, []);

  // Handle basic operations
  const performOperation = useCallback(
    (nextOperation: string) => {
      const inputValue = parseFloat(state.display);

      setState((prev) => {
        if (prev.previousValue === null) {
          return {
            ...prev,
            previousValue: inputValue,
            operation: nextOperation,
            waitingForOperand: true,
          };
        }

        if (prev.operation && !prev.waitingForOperand) {
          try {
            const result = evaluateBasicOperation(
              prev.previousValue,
              prev.operation,
              inputValue
            );
            const formattedResult = formatNumber(result);

            // Only add to history when completing the final calculation (equals button)
            // Not for intermediate operations
            setLastAnswer(result);

            return {
              ...prev,
              display: formattedResult,
              previousValue: result,
              operation: nextOperation,
              waitingForOperand: true,
            };
          } catch (error) {
            return {
              ...prev,
              display: "Error",
              previousValue: null,
              operation: null,
              waitingForOperand: true,
            };
          }
        }

        return {
          ...prev,
          operation: nextOperation,
          waitingForOperand: true,
        };
      });
    },
    [state.display]
  );

  // Handle equals
  const calculate = useCallback(() => {
    const inputValue = parseFloat(state.display);

    setState((prev) => {
      if (prev.previousValue !== null && prev.operation) {
        try {
          const result = evaluateBasicOperation(
            prev.previousValue,
            prev.operation,
            inputValue
          );
          const formattedResult = formatNumber(result);

          addToHistory(
            `${prev.previousValue} ${prev.operation} ${inputValue}`,
            formattedResult
          );
          setLastAnswer(result);

          return {
            ...prev,
            display: formattedResult,
            previousValue: null,
            operation: null,
            waitingForOperand: true,
          };
        } catch (error) {
          return {
            ...prev,
            display: "Error",
            previousValue: null,
            operation: null,
            waitingForOperand: true,
          };
        }
      }

      return prev;
    });
  }, [state.display, state.previousValue, state.operation, addToHistory]);

  // Handle scientific functions
  const performFunction = useCallback(
    (func: CalculatorFunction) => {
      const inputValue = parseFloat(state.display);

      try {
        let result: number;
        let expression: string;

        switch (func) {
          case CalculatorFunction.PI:
            result = Math.PI;
            expression = "π";
            break;
          case CalculatorFunction.E:
            result = Math.E;
            expression = "e";
            break;
          case CalculatorFunction.RANDOM:
            result = getRandomNumber();
            expression = "random()";
            break;
          case CalculatorFunction.ANS:
            result = lastAnswer;
            expression = "Ans";
            break;
          default:
            result = evaluateFunction(func, inputValue, state.angleMode);
            expression = `${func}(${inputValue})`;
        }

        const formattedResult = formatNumber(result);
        addToHistory(expression, formattedResult);
        setLastAnswer(result);

        setState((prev) => ({
          ...prev,
          display: formattedResult,
          waitingForOperand: true,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          display: "Error",
          waitingForOperand: true,
        }));
      }
    },
    [state.display, state.angleMode, lastAnswer, addToHistory]
  );

  // Handle memory operations
  const performMemoryOperation = useCallback(
    (operation: CalculatorFunction) => {
      const inputValue = parseFloat(state.display);

      setState((prev) => {
        switch (operation) {
          case CalculatorFunction.MEMORY_ADD:
            return { ...prev, memory: prev.memory + inputValue };
          case CalculatorFunction.MEMORY_SUBTRACT:
            return { ...prev, memory: prev.memory - inputValue };
          case CalculatorFunction.MEMORY_RECALL:
            return {
              ...prev,
              display: formatNumber(prev.memory),
              waitingForOperand: true,
            };
          case CalculatorFunction.MEMORY_CLEAR:
            return { ...prev, memory: 0 };
          default:
            return prev;
        }
      });
    },
    [state.display]
  );

  // Handle clear operations
  const clear = useCallback((type: "all" | "entry" | "backspace") => {
    setState((prev) => {
      switch (type) {
        case "all":
          return {
            ...prev,
            display: "0",
            previousValue: null,
            operation: null,
            waitingForOperand: false,
          };
        case "entry":
          return {
            ...prev,
            display: "0",
            waitingForOperand: false,
          };
        case "backspace":
          if (prev.display.length > 1) {
            return {
              ...prev,
              display: prev.display.slice(0, -1),
            };
          } else {
            return {
              ...prev,
              display: "0",
            };
          }
        default:
          return prev;
      }
    });
  }, []);

  // Main button click handler
  const handleButtonClick = useCallback(
    (value: string | number) => {
      if (typeof value === "number") {
        inputNumber(value);
      } else if (value === ".") {
        inputDecimal();
      } else if (["+", "-", "*", "/"].includes(value)) {
        performOperation(value);
      } else if (
        Object.values(CalculatorFunction).includes(value as CalculatorFunction)
      ) {
        const func = value as CalculatorFunction;

        switch (func) {
          case CalculatorFunction.EQUALS:
            calculate();
            break;
          case CalculatorFunction.CLEAR:
            clear("all");
            break;
          case CalculatorFunction.BACKSPACE:
            clear("backspace");
            break;
          case CalculatorFunction.MEMORY_ADD:
          case CalculatorFunction.MEMORY_SUBTRACT:
          case CalculatorFunction.MEMORY_RECALL:
          case CalculatorFunction.MEMORY_CLEAR:
            performMemoryOperation(func);
            break;
          case CalculatorFunction.NEGATE:
            setState((prev) => ({
              ...prev,
              display: formatNumber(-parseFloat(prev.display)),
              waitingForOperand: true,
            }));
            break;
          default:
            performFunction(func);
        }
      } else if (value === "(" || value === ")") {
        // Handle parentheses (simplified implementation)
        setState((prev) => ({
          ...prev,
          display: prev.display === "0" ? value : prev.display + value,
        }));
      }
    },
    [
      inputNumber,
      inputDecimal,
      performOperation,
      calculate,
      clear,
      performMemoryOperation,
      performFunction,
    ]
  );

  // Handle angle mode change
  const handleAngleModeChange = useCallback((mode: "deg" | "rad") => {
    setState((prev) => ({ ...prev, angleMode: mode }));
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;

      if (/[0-9]/.test(key)) {
        handleButtonClick(parseInt(key));
      } else if (key === ".") {
        handleButtonClick(".");
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleButtonClick(key);
      } else if (key === "Enter" || key === "=") {
        handleButtonClick(CalculatorFunction.EQUALS);
      } else if (key === "Escape" || key === "c" || key === "C") {
        handleButtonClick(CalculatorFunction.CLEAR);
      } else if (key === "Backspace") {
        handleButtonClick(CalculatorFunction.BACKSPACE);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleButtonClick]);

  return (
    <div className="space-y-16">
      {/* Calculator Section */}
      <div className="flex justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <CalculatorDisplay
              input={
                state.operation
                  ? `${state.previousValue} ${state.operation}`
                  : ""
              }
              output={state.display}
              history={state.history}
            />
            <CalculatorKeypad
              onButtonClick={handleButtonClick}
              angleMode={state.angleMode}
              onAngleModeChange={handleAngleModeChange}
              memoryHasValue={state.memory !== 0}
            />
          </div>

          {/* Keyboard Shortcut Hint */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/30">
              <svg
                className="w-4 h-4 text-slate-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-sm text-slate-600 font-medium">
                Keyboard shortcuts supported
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 mx-4">
        <FAQSection />
      </div>
    </div>
  );
}

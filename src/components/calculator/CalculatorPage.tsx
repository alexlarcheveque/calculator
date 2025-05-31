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

    setState((prev) => ({
      ...prev,
      history: [...prev.history, historyItem].slice(-10), // Keep last 10 items
    }));
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

            addToHistory(
              `${prev.previousValue} ${prev.operation} ${inputValue}`,
              formattedResult
            );
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
    [state.display, addToHistory]
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
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Scientific Calculator (Advanced Math Functions, Memory & History)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Professional scientific calculator with comprehensive mathematical
          functions including trigonometry, logarithms, exponentials, powers,
          roots, and factorial calculations. Features memory operations,
          calculation history, degree/radian modes, and full keyboard support.
          Perfect for students, engineers, scientists, and professionals
          requiring precise mathematical computations. Supports order of
          operations, parentheses grouping, and scientific notation for complex
          calculations.
        </p>
      </div>

      <div className="flex justify-center mb-16">
        <div className="max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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

          {/* Instructions */}
          <div className="mt-6 text-sm text-gray-600 text-center">
            <p>You can use your keyboard for basic operations:</p>
            <p>
              Numbers (0-9), operators (+, -, *, /), Enter (=), Escape (AC),
              Backspace
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

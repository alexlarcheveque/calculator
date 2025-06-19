"use client";

import { useState } from "react";
import { TimeArithmeticValues, TimeArithmeticResult } from "@/types/time";
import {
  calculateTimeArithmetic,
  createEmptyTime,
} from "@/utils/timeCalculations";
import TimeArithmeticResults from "./TimeArithmeticResults";

export default function TimeArithmeticCalculator() {
  const [formValues, setFormValues] = useState<TimeArithmeticValues>({
    time1: createEmptyTime(),
    time2: createEmptyTime(),
    operation: "add",
  });

  const [result, setResult] = useState<TimeArithmeticResult | null>(null);

  const handleInputChange = (field: keyof TimeArithmeticValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimeChange = (
    timeField: "time1" | "time2",
    unit: keyof typeof formValues.time1,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    setFormValues((prev) => ({
      ...prev,
      [timeField]: {
        ...prev[timeField],
        [unit]: numValue,
      },
    }));
  };

  const calculate = () => {
    const calculationResult = calculateTimeArithmetic(
      formValues.time1,
      formValues.time2,
      formValues.operation
    );
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      time1: createEmptyTime(),
      time2: createEmptyTime(),
      operation: "add",
    });
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Calculator Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Instructions Section */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">
            Time Arithmetic Calculator
          </h3>
          <p className="text-blue-700 text-sm">
            This calculator can be used to "add" or "subtract" two time values.
            Input fields can be left blank, which will be taken as 0 by default.
            Enter time values in days, hours, minutes, and seconds format.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center font-semibold text-gray-700">Day</div>
            <div className="text-center font-semibold text-gray-700">Hour</div>
            <div className="text-center font-semibold text-gray-700">
              Minute
            </div>
            <div className="text-center font-semibold text-gray-700">
              Second
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <input
              type="number"
              min="0"
              value={formValues.time1.days || ""}
              onChange={(e) =>
                handleTimeChange("time1", "days", e.target.value)
              }
              className="px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
              placeholder="0"
            />
            <input
              type="number"
              min="0"
              max="23"
              value={formValues.time1.hours || ""}
              onChange={(e) =>
                handleTimeChange("time1", "hours", e.target.value)
              }
              className="px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
              placeholder="0"
            />
            <input
              type="number"
              min="0"
              max="59"
              value={formValues.time1.minutes || ""}
              onChange={(e) =>
                handleTimeChange("time1", "minutes", e.target.value)
              }
              className="px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
              placeholder="0"
            />
            <input
              type="number"
              min="0"
              max="59"
              value={formValues.time1.seconds || ""}
              onChange={(e) =>
                handleTimeChange("time1", "seconds", e.target.value)
              }
              className="px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
              placeholder="0"
            />
          </div>

          <div className="flex justify-center gap-6 my-6">
            <label className="flex items-center">
              <input
                type="radio"
                checked={formValues.operation === "add"}
                onChange={() => handleInputChange("operation", "add")}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-lg font-medium text-gray-700">Add +</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={formValues.operation === "subtract"}
                onChange={() => handleInputChange("operation", "subtract")}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-lg font-medium text-gray-700">
                Subtract −
              </span>
            </label>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <input
              type="number"
              min="0"
              value={formValues.time2.days || ""}
              onChange={(e) =>
                handleTimeChange("time2", "days", e.target.value)
              }
              className="px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
              placeholder="0"
            />
            <input
              type="number"
              min="0"
              max="23"
              value={formValues.time2.hours || ""}
              onChange={(e) =>
                handleTimeChange("time2", "hours", e.target.value)
              }
              className="px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
              placeholder="0"
            />
            <input
              type="number"
              min="0"
              max="59"
              value={formValues.time2.minutes || ""}
              onChange={(e) =>
                handleTimeChange("time2", "minutes", e.target.value)
              }
              className="px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
              placeholder="0"
            />
            <input
              type="number"
              min="0"
              max="59"
              value={formValues.time2.seconds || ""}
              onChange={(e) =>
                handleTimeChange("time2", "seconds", e.target.value)
              }
              className="px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
              placeholder="0"
            />
          </div>

          <div className="text-center text-2xl font-bold text-gray-600 my-4">
            =
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              value={result?.isValid ? result.result.days : ""}
              readOnly
              className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-center font-medium"
              placeholder="0"
            />
            <input
              type="text"
              value={result?.isValid ? result.result.hours : ""}
              readOnly
              className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-center font-medium"
              placeholder="0"
            />
            <input
              type="text"
              value={result?.isValid ? result.result.minutes : ""}
              readOnly
              className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-center font-medium"
              placeholder="0"
            />
            <input
              type="text"
              value={result?.isValid ? result.result.seconds : ""}
              readOnly
              className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-center font-medium"
              placeholder="0"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={calculate}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate
            </button>
            <button
              onClick={clear}
              className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {result && <TimeArithmeticResults result={result} />}
    </div>
  );
}

"use client";

import { useState } from "react";
import { TimeExpressionValues, TimeExpressionResult } from "@/types/time";
import { parseTimeExpression } from "@/utils/timeCalculations";
import TimeExpressionResults from "./TimeExpressionResults";

export default function TimeExpressionCalculator() {
  const [formValues, setFormValues] = useState<TimeExpressionValues>({
    expression: "1d 2h 3m 4s + 4h 5s - 2030s + 28h",
  });

  const [result, setResult] = useState<TimeExpressionResult | null>(null);

  const handleInputChange = (field: keyof TimeExpressionValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
    const calculationResult = parseTimeExpression(formValues.expression);
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      expression: "",
    });
    setResult(null);
  };

  const setExample = () => {
    setFormValues({
      expression: "1d 2h 3m 4s + 4h 5s - 2030s + 28h",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Time Calculator in Expression
      </h2>
      <p className="text-gray-600 mb-6">
        Use this calculator to add or subtract two or more time values in the
        form of an expression. An acceptable input has d, h, m, and s following
        each value, where d means days, h means hours, m means minutes, and s
        means seconds. The only acceptable operators are + and -. "1d 2h 3m 4s +
        4h 5s - 2030s" is an example of a valid expression.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="mb-4">
          <label
            htmlFor="expression"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Time Expression
          </label>
          <textarea
            id="expression"
            rows={3}
            value={formValues.expression}
            onChange={(e) => handleInputChange("expression", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter time expression (e.g., 1d 2h 3m 4s + 4h 5s - 2030s)"
          />
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={calculate}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={setExample}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Example
          </button>
          <button
            onClick={clear}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Clear
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-700 mb-2">
            Expression Format
          </h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>
              <strong>Units:</strong> d (days), h (hours), m (minutes), s
              (seconds)
            </p>
            <p>
              <strong>Operators:</strong> + (add), - (subtract)
            </p>
            <p>
              <strong>Examples:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>1d 2h 3m 4s</li>
              <li>5h + 30m - 15s</li>
              <li>2d 12h + 6h 30m - 1h 45m 30s</li>
              <li>100s + 2m - 30s</li>
            </ul>
          </div>
        </div>
      </div>

      {result && <TimeExpressionResults result={result} />}
    </div>
  );
}

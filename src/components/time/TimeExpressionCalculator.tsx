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
    <div className="space-y-6">
      {/* Calculator Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Instructions Section */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">
            Time Expression Calculator
          </h3>
          <p className="text-blue-700 text-sm">
            Use this calculator to add or subtract two or more time values in
            the form of an expression. An acceptable input has d, h, m, and s
            following each value, where d means days, h means hours, m means
            minutes, and s means seconds. The only acceptable operators are +
            and -.
          </p>
        </div>
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
              className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter time expression (e.g., 1d 2h 3m 4s + 4h 5s - 2030s)"
            />
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={calculate}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate
            </button>
            <button
              onClick={setExample}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Example
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

      {result && <TimeExpressionResults result={result} />}
    </div>
  );
}

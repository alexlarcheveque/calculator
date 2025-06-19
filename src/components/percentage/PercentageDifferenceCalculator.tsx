"use client";

import { useState } from "react";
import {
  PercentageDifferenceFormValues,
  PercentageDifferenceResult,
} from "@/types/percentage";
import {
  calculatePercentageDifference,
  formatNumber,
} from "@/utils/percentageCalculations";

export default function PercentageDifferenceCalculator() {
  const [formValues, setFormValues] = useState<PercentageDifferenceFormValues>({
    value1: "",
    value2: "",
  });

  const [result, setResult] = useState<PercentageDifferenceResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof PercentageDifferenceFormValues,
    value: string
  ) => {
    const numericValue = value === "" ? "" : parseFloat(value);
    setFormValues((prev) => ({ ...prev, [field]: numericValue }));
    setError("");
  };

  const calculate = () => {
    try {
      const { value1, value2 } = formValues;

      if (value1 === "" || value2 === "") {
        setError("Please enter both values");
        return;
      }

      const calculationResult = calculatePercentageDifference(
        Number(value1),
        Number(value2)
      );
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      value1: "",
      value2: "",
    });
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Instructions */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">
            How to Calculate Percentage Difference
          </h3>
          <p className="text-blue-700 text-sm">
            Enter two values below to calculate both the absolute difference and
            percentage difference between them. The percentage difference shows
            how much the values differ relative to their average.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4 text-lg flex-wrap gap-y-4">
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1 font-medium">
                VALUE 1
              </label>
              <input
                type="number"
                value={formValues.value1}
                onChange={(e) => handleInputChange("value1", e.target.value)}
                className="w-32 h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="?"
              />
            </div>
            <span className="text-lg font-medium text-gray-600">vs</span>
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1 font-medium">
                VALUE 2
              </label>
              <input
                type="number"
                value={formValues.value2}
                onChange={(e) => handleInputChange("value2", e.target.value)}
                className="w-32 h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="?"
              />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={calculate}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 focus:outline-none mr-3"
            >
              Calculate
            </button>
            <button
              onClick={clear}
              className="px-8 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors focus:ring-4 focus:ring-gray-200 focus:outline-none"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="text-center">
              <div className="inline-block p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                {error}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section - Integrated like Fraction Calculator */}
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Percentage Difference Calculator
          </h2>
          <p className="text-gray-600 mb-6">
            Calculate the absolute and percentage difference between two values.
            Percentage difference is useful for comparing values without
            considering which is larger.
          </p>

          {/* Result Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Result</h3>
          </div>

          {/* Main Result Display */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Absolute Difference:
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatNumber(result.difference, 4)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Percentage Difference:
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatNumber(result.percentageDifference, 4)}%
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Calculation Steps */}
          {result.steps.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Calculation steps:
              </h4>
              <div className="space-y-4">
                {result.steps.map((step, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step {index + 1}:
                    </div>
                    <div className="font-mono text-sm bg-white px-3 py-2 rounded border-l-2 border-blue-200">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

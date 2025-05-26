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
    <div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-20 text-right font-medium">Value 1:</label>
            <input
              type="number"
              value={formValues.value1}
              onChange={(e) => handleInputChange("value1", e.target.value)}
              className="flex-1 h-10 px-3 border border-gray-300 rounded"
              placeholder="Enter first value"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-20 text-right font-medium">Value 2:</label>
            <input
              type="number"
              value={formValues.value2}
              onChange={(e) => handleInputChange("value2", e.target.value)}
              className="flex-1 h-10 px-3 border border-gray-300 rounded"
              placeholder="Enter second value"
            />
          </div>
        </div>

        <div className="text-center mt-6 space-x-4">
          <button
            onClick={calculate}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-semibold text-lg mb-3">Result:</h3>

            <div className="space-y-2">
              <p className="text-lg">
                <strong>Absolute Difference:</strong>{" "}
                {formatNumber(result.difference, 4)}
              </p>
              <p className="text-lg">
                <strong>Percentage Difference:</strong>{" "}
                {formatNumber(result.percentageDifference, 4)}%
              </p>
            </div>

            {result.steps.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Calculation Steps:</h4>
                <div className="space-y-1">
                  {result.steps.map((step, index) => (
                    <p key={index} className="text-sm font-mono">
                      {step}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          <p>
            <strong>About Percentage Difference:</strong>
          </p>
          <p className="mt-1">
            Percentage difference measures the relative difference between two
            values as a percentage of their average. It's calculated as: |Value1
            - Value2| ÷ ((Value1 + Value2) ÷ 2) × 100
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  BasicPercentageFormValues,
  PercentageResult,
} from "@/types/percentage";
import {
  calculateBasicPercentage,
  formatNumber,
} from "@/utils/percentageCalculations";

export default function BasicPercentageCalculator() {
  const [formValues, setFormValues] = useState<BasicPercentageFormValues>({
    percentage: "",
    value: "",
    result: "",
  });

  const [result, setResult] = useState<PercentageResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof BasicPercentageFormValues,
    value: string
  ) => {
    const numericValue = value === "" ? "" : parseFloat(value);
    setFormValues((prev) => ({ ...prev, [field]: numericValue }));
    setError("");
  };

  const calculate = () => {
    try {
      const { percentage, value, result: resultValue } = formValues;

      // Count how many fields are filled
      const filledFields = [percentage, value, resultValue].filter(
        (val) => val !== ""
      ).length;

      if (filledFields !== 2) {
        setError("Please provide exactly two values to calculate the third");
        return;
      }

      const calculationResult = calculateBasicPercentage(
        percentage === "" ? undefined : Number(percentage),
        value === "" ? undefined : Number(value),
        resultValue === "" ? undefined : Number(resultValue)
      );

      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      percentage: "",
      value: "",
      result: "",
    });
    setResult(null);
    setError("");
  };

  return (
    <div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-center space-x-4 text-xl">
          <input
            type="number"
            value={formValues.percentage}
            onChange={(e) => handleInputChange("percentage", e.target.value)}
            className="w-24 h-12 text-center border border-gray-300 rounded text-lg"
            placeholder="?"
          />
          <span className="text-lg font-medium">% of</span>
          <input
            type="number"
            value={formValues.value}
            onChange={(e) => handleInputChange("value", e.target.value)}
            className="w-32 h-12 text-center border border-gray-300 rounded text-lg"
            placeholder="?"
          />
          <span className="text-lg font-medium">=</span>
          <input
            type="number"
            value={formValues.result}
            onChange={(e) => handleInputChange("result", e.target.value)}
            className="w-32 h-12 text-center border border-gray-300 rounded text-lg"
            placeholder="?"
          />
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
            <h3 className="font-semibold text-lg mb-2">Result:</h3>

            {result.percentage !== undefined && (
              <p className="text-lg">
                <strong>Percentage:</strong>{" "}
                {formatNumber(result.percentage, 4)}%
              </p>
            )}

            {result.value !== undefined && (
              <p className="text-lg">
                <strong>Value:</strong> {formatNumber(result.value, 4)}
              </p>
            )}

            {result.result !== undefined && (
              <p className="text-lg">
                <strong>Result:</strong> {formatNumber(result.result, 4)}
              </p>
            )}

            {result.steps.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Steps:</h4>
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
            <strong>Instructions:</strong>
          </p>
          <ul className="list-disc list-inside mt-1">
            <li>Enter any two values and leave the third blank</li>
            <li>
              Examples: "25% of 200 = ?", "? % of 150 = 30", "15% of ? = 45"
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

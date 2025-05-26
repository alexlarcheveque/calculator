"use client";

import { useState } from "react";
import {
  StandardDeviationFormValues,
  StandardDeviationResult,
} from "@/types/standardDeviation";
import {
  calculateStandardDeviation,
  CalculationType,
} from "@/utils/standardDeviationCalculations";
import StandardDeviationResults from "@/components/standard-deviation/StandardDeviationResults";

export default function StandardDeviationCalculator() {
  const [formValues, setFormValues] = useState<StandardDeviationFormValues>({
    dataInput: "10, 12, 23, 23, 16, 23, 21, 16",
    calculationType: "population",
  });

  const [result, setResult] = useState<StandardDeviationResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof StandardDeviationFormValues,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const calculate = () => {
    try {
      const calculationType =
        formValues.calculationType === "population"
          ? CalculationType.POPULATION
          : CalculationType.SAMPLE;

      const calculationResult = calculateStandardDeviation(
        formValues.dataInput,
        calculationType
      );

      setResult(calculationResult);

      if (!calculationResult.isValid) {
        setError(calculationResult.steps.join(", "));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      dataInput: "",
      calculationType: "population",
    });
    setResult(null);
    setError("");
  };

  return (
    <div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        {/* Data Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter numbers separated by commas:
          </label>
          <textarea
            value={formValues.dataInput}
            onChange={(e) => handleInputChange("dataInput", e.target.value)}
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 10, 12, 23, 23, 16, 23, 21, 16"
          />
        </div>

        {/* Calculation Type Selection */}
        <div className="mb-6">
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-gray-700">It is a:</span>

            <label className="flex items-center">
              <input
                type="radio"
                name="calculationType"
                value="population"
                checked={formValues.calculationType === "population"}
                onChange={(e) =>
                  handleInputChange("calculationType", e.target.value)
                }
                className="mr-2"
              />
              <span className="text-sm">Population</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="calculationType"
                value="sample"
                checked={formValues.calculationType === "sample"}
                onChange={(e) =>
                  handleInputChange("calculationType", e.target.value)
                }
                className="mr-2"
              />
              <span className="text-sm">Sample</span>
            </label>

            <div className="relative group">
              <svg
                className="w-4 h-4 text-gray-400 cursor-help"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-64 z-10">
                <div className="text-center">
                  <strong>Population:</strong> Select if the data contains all
                  measurable values, or all of the values you are interested in.
                  <br />
                  <br />
                  <strong>Sample:</strong> Select if the data is a sample of a
                  large or unlimited population and you wish to make a statement
                  about the entire population.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-center space-x-4">
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

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 text-sm text-gray-600">
          <p className="font-medium mb-2">Instructions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter numbers separated by commas (e.g., 1, 2, 3, 4, 5)</li>
            <li>Choose between Population or Sample calculation</li>
            <li>At least 2 numbers are required for calculation</li>
            <li>Decimal numbers are supported</li>
          </ul>
        </div>
      </div>

      {/* Results */}
      {result && result.isValid && <StandardDeviationResults result={result} />}
    </div>
  );
}

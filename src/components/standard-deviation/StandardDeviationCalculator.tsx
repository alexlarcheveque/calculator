"use client";

import { useState } from "react";
import {
  StandardDeviationFormValues,
  StandardDeviationResult,
} from "@/types/standardDeviation";
import { calculateStandardDeviation } from "@/utils/standardDeviationCalculations";
import { CalculationType } from "@/types/standardDeviation";
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
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">
          How to Use the Standard Deviation Calculator
        </h3>
        <div className="text-blue-700 space-y-2">
          <p className="font-medium">
            Calculate population or sample standard deviation:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Enter numbers separated by commas (e.g., 1, 2, 3, 4, 5)</li>
            <li>Choose between Population or Sample calculation</li>
            <li>At least 2 numbers are required for calculation</li>
            <li>Decimal numbers are fully supported</li>
            <li>Get comprehensive statistical analysis including outliers</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        {/* Data Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-3 text-center">
            Enter Your Data
          </label>
          <textarea
            value={formValues.dataInput}
            onChange={(e) => handleInputChange("dataInput", e.target.value)}
            className="w-full h-32 px-4 py-3 border-2 border-blue-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 transition-colors text-lg"
            placeholder="e.g., 10, 12, 23, 23, 16, 23, 21, 16"
          />
        </div>

        {/* Calculation Type Selection */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-800 mb-4 text-center">
            Data Type
          </label>

          <div className="flex justify-center space-x-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="calculationType"
                value="population"
                checked={formValues.calculationType === "population"}
                onChange={(e) =>
                  handleInputChange("calculationType", e.target.value)
                }
                className="w-5 h-5 text-blue-600 mr-3"
              />
              <span className="text-lg font-medium">Population</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="calculationType"
                value="sample"
                checked={formValues.calculationType === "sample"}
                onChange={(e) =>
                  handleInputChange("calculationType", e.target.value)
                }
                className="w-5 h-5 text-blue-600 mr-3"
              />
              <span className="text-lg font-medium">Sample</span>
            </label>
          </div>

          {/* Help Information */}
          <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">
                    Population
                  </h4>
                  <p>
                    Select if the data contains all measurable values, or all of
                    the values you are interested in.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Sample</h4>
                  <p>
                    Select if the data is a sample of a large or unlimited
                    population and you wish to make a statement about the entire
                    population.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-center space-x-4">
          <button
            onClick={calculate}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* Results */}
      {result && result.isValid && <StandardDeviationResults result={result} />}
    </div>
  );
}

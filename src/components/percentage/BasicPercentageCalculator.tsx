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
    <div className="space-y-6">
      {/* Main Calculator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Instructions styled like other percentage calculators */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">
            How to Use Basic Percentage Calculator
          </h3>
          <p className="text-blue-700 text-sm">
            Fill in any two values and leave the third one blank to find the
            missing value. This calculator solves the three main percentage
            problems: finding the result, percentage, or original value.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4 text-xl flex-wrap gap-y-4">
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1 font-medium">
                PERCENTAGE
              </label>
              <input
                type="number"
                value={formValues.percentage}
                onChange={(e) =>
                  handleInputChange("percentage", e.target.value)
                }
                className="w-24 h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="?"
              />
            </div>
            <span className="text-lg font-medium text-gray-600">% of</span>
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1 font-medium">
                VALUE
              </label>
              <input
                type="number"
                value={formValues.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
                className="w-32 h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="?"
              />
            </div>
            <span className="text-lg font-medium text-gray-600">=</span>
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1 font-medium">
                RESULT
              </label>
              <input
                type="number"
                value={formValues.result}
                onChange={(e) => handleInputChange("result", e.target.value)}
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
            Percentage Calculator
          </h2>
          <p className="text-gray-600 mb-6">
            The basic percentage calculator below will solve percentage problems
            step by step. Enter any two values to calculate the third missing
            value.
          </p>

          {/* Result Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Result</h3>
          </div>

          {/* Main Result Display */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-xl font-medium text-gray-800">
                {result.percentage !== undefined
                  ? formatNumber(result.percentage, 2)
                  : formValues.percentage}
                % of{" "}
                {result.value !== undefined
                  ? formatNumber(result.value, 2)
                  : formValues.value}{" "}
                ={" "}
                {result.result !== undefined
                  ? formatNumber(result.result, 2)
                  : formValues.result}
              </div>
            </div>

            {/* Highlighted missing value */}
            <div className="text-center">
              {result.percentage !== undefined &&
                formValues.percentage === "" && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">
                        Missing Percentage:
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatNumber(result.percentage, 2)}%
                      </span>
                    </div>
                  </div>
                )}

              {result.value !== undefined && formValues.value === "" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Missing Value:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatNumber(result.value, 2)}
                    </span>
                  </div>
                </div>
              )}

              {result.result !== undefined && formValues.result === "" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Missing Result:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatNumber(result.result, 2)}
                    </span>
                  </div>
                </div>
              )}
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

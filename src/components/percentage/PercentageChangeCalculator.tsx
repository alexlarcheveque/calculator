"use client";

import { useState } from "react";
import {
  PercentageChangeFormValues,
  PercentageChangeResult,
} from "@/types/percentage";
import {
  calculatePercentageChange,
  formatNumber,
} from "@/utils/percentageCalculations";

export default function PercentageChangeCalculator() {
  const [formValues, setFormValues] = useState<PercentageChangeFormValues>({
    originalValue: "",
    changeType: "increase",
    changePercentage: "",
    finalValue: "",
  });

  const [result, setResult] = useState<PercentageChangeResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof PercentageChangeFormValues,
    value: string | "increase" | "decrease"
  ) => {
    if (field === "changeType") {
      setFormValues((prev) => ({
        ...prev,
        [field]: value as "increase" | "decrease",
      }));
    } else {
      const numericValue = value === "" ? "" : parseFloat(value as string);
      setFormValues((prev) => ({ ...prev, [field]: numericValue }));
    }
    setError("");
  };

  const calculate = () => {
    try {
      const { originalValue, changePercentage, finalValue, changeType } =
        formValues;

      // Count how many fields are filled
      const filledFields = [originalValue, changePercentage, finalValue].filter(
        (val) => val !== ""
      ).length;

      if (filledFields !== 2) {
        setError("Please provide exactly two values to calculate the third");
        return;
      }

      const calculationResult = calculatePercentageChange(
        originalValue === "" ? undefined : Number(originalValue),
        changePercentage === "" ? undefined : Number(changePercentage),
        finalValue === "" ? undefined : Number(finalValue),
        changeType
      );

      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      originalValue: "",
      changeType: "increase",
      changePercentage: "",
      finalValue: "",
    });
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">
            How to Calculate Percentage Change
          </h3>
          <p className="text-blue-700 text-sm">
            Enter any two values below and leave the third blank to calculate
            percentage increase or decrease. Choose "increase" or "decrease" and
            the calculator will determine the missing value.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4 text-lg flex-wrap gap-y-4">
          <input
            type="number"
            value={formValues.originalValue}
            onChange={(e) => handleInputChange("originalValue", e.target.value)}
            className="w-32 h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
            placeholder="?"
          />

          <select
            value={formValues.changeType}
            onChange={(e) => handleInputChange("changeType", e.target.value)}
            className="h-12 px-3 border-2 border-emerald-300 rounded-lg text-lg bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-colors"
          >
            <option value="increase">Increase</option>
            <option value="decrease">Decrease</option>
          </select>

          <input
            type="number"
            value={formValues.changePercentage}
            onChange={(e) =>
              handleInputChange("changePercentage", e.target.value)
            }
            className="w-24 h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
            placeholder="?"
          />
          <span className="text-lg font-medium">% =</span>

          <input
            type="number"
            value={formValues.finalValue}
            onChange={(e) => handleInputChange("finalValue", e.target.value)}
            className="w-32 h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
            placeholder="?"
          />
        </div>

        <div className="flex justify-center mb-6 mt-6">
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

      {/* Results Section - Integrated like Fraction Calculator */}
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Percentage Change Calculator
          </h2>
          <p className="text-gray-600 mb-6">
            Calculate percentage increase or decrease between two values. Enter
            any two values to find the third missing value.
          </p>

          {/* Result Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Result</h3>
          </div>

          {/* Main Result Display */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-xl font-medium text-gray-800">
                {result.originalValue !== undefined
                  ? formatNumber(result.originalValue, 2)
                  : formValues.originalValue}{" "}
                {formValues.changeType === "increase"
                  ? "increased"
                  : "decreased"}{" "}
                by{" "}
                {result.changePercentage !== undefined
                  ? formatNumber(result.changePercentage, 2)
                  : formValues.changePercentage}
                % ={" "}
                {result.finalValue !== undefined
                  ? formatNumber(result.finalValue, 2)
                  : formValues.finalValue}
              </div>
            </div>

            <div className="space-y-3">
              {result.originalValue !== undefined &&
                formValues.originalValue === "" && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Original Value:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatNumber(result.originalValue, 4)}
                    </span>
                  </div>
                )}

              {result.changePercentage !== undefined &&
                formValues.changePercentage === "" && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Change Percentage:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatNumber(result.changePercentage, 4)}%
                    </span>
                  </div>
                )}

              {result.finalValue !== undefined &&
                formValues.finalValue === "" && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Final Value:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatNumber(result.finalValue, 4)}
                    </span>
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

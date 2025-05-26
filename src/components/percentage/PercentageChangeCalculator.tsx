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
    <div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-center space-x-4 text-lg flex-wrap">
          <input
            type="number"
            value={formValues.originalValue}
            onChange={(e) => handleInputChange("originalValue", e.target.value)}
            className="w-32 h-12 text-center border border-gray-300 rounded text-lg"
            placeholder="?"
          />

          <select
            value={formValues.changeType}
            onChange={(e) => handleInputChange("changeType", e.target.value)}
            className="h-12 px-3 border border-gray-300 rounded text-lg bg-white"
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
            className="w-24 h-12 text-center border border-gray-300 rounded text-lg"
            placeholder="?"
          />
          <span className="text-lg font-medium">% =</span>

          <input
            type="number"
            value={formValues.finalValue}
            onChange={(e) => handleInputChange("finalValue", e.target.value)}
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
            <h3 className="font-semibold text-lg mb-3">Result:</h3>

            <div className="space-y-2">
              {result.originalValue !== undefined && (
                <p className="text-lg">
                  <strong>Original Value:</strong>{" "}
                  {formatNumber(result.originalValue, 4)}
                </p>
              )}

              {result.changePercentage !== undefined && (
                <p className="text-lg">
                  <strong>Change Percentage:</strong>{" "}
                  {formatNumber(result.changePercentage, 4)}%
                </p>
              )}

              {result.finalValue !== undefined && (
                <p className="text-lg">
                  <strong>Final Value:</strong>{" "}
                  {formatNumber(result.finalValue, 4)}
                </p>
              )}

              {result.changeAmount !== undefined && (
                <p className="text-lg">
                  <strong>Change Amount:</strong>{" "}
                  {formatNumber(result.changeAmount, 4)}
                </p>
              )}
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
            <strong>Instructions:</strong>
          </p>
          <ul className="list-disc list-inside mt-1">
            <li>Enter any two values and leave the third blank</li>
            <li>
              Examples: "100 increase 25% = ?", "? decrease 10% = 90", "80
              increase ? % = 100"
            </li>
          </ul>

          <div className="mt-3">
            <p>
              <strong>About Percentage Change:</strong>
            </p>
            <p className="mt-1">
              Percentage increase/decrease calculates how much a value has
              changed relative to its original value. For increase: New Value =
              Original × (1 + percentage/100) For decrease: New Value = Original
              × (1 - percentage/100)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

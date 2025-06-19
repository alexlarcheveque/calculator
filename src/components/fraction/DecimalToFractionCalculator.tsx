"use client";

import { useState } from "react";
import { DecimalToFractionFormValues } from "@/types/fraction";
import {
  decimalToFraction,
  formatFraction,
} from "@/utils/fractionCalculations";
import DecimalDisplay from "./DecimalDisplay";
import DecimalToFractionCalculationSummary from "./DecimalToFractionCalculationSummary";

export default function DecimalToFractionCalculator() {
  const [formValues, setFormValues] = useState<DecimalToFractionFormValues>({
    decimal: 1.375,
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (value: number) => {
    setFormValues({ decimal: value });
    setError("");
  };

  const calculate = () => {
    try {
      const { decimal } = formValues;

      if (isNaN(decimal)) {
        setError("Please enter a valid decimal number");
        return;
      }

      const fraction = decimalToFraction(decimal);

      setResult({
        fraction,
        decimal,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({ decimal: 0 });
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center space-x-8 mb-8">
          {/* Decimal Input */}
          <div className="flex flex-col items-center">
            <input
              type="number"
              step="any"
              value={formValues.decimal}
              onChange={(e) =>
                handleInputChange(parseFloat(e.target.value) || 0)
              }
              className="w-32 h-12 text-center text-lg font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="1.375"
            />
            <div className="text-xs text-gray-500 mt-1">Decimal</div>
          </div>

          {/* Equals Sign */}
          <div className="text-3xl font-bold text-gray-600">=</div>

          {/* Result Display */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={
                result ? formatFraction(result.fraction).split("/")[0] : ""
              }
              readOnly
              className="w-20 h-12 text-center text-lg font-bold text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-lg focus:outline-none"
              placeholder="?"
            />
            <div className="w-20 h-0.5 bg-gray-800 my-2"></div>
            <input
              type="text"
              value={
                result
                  ? formatFraction(result.fraction).split("/")[1] || "1"
                  : ""
              }
              readOnly
              className="w-20 h-12 text-center text-lg font-bold text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-lg focus:outline-none"
              placeholder="?"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={calculate}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:ring-4 focus:ring-blue-200 focus:outline-none"
          >
            Calculate
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Result Display */}
        {result && !error && (
          <div className="text-center text-gray-600">
            <p>See detailed calculation below</p>
          </div>
        )}
      </div>

      {/* Detailed Calculation Steps */}
      {result && !error && (
        <DecimalToFractionCalculationSummary
          decimal={result.decimal}
          fraction={result.fraction}
        />
      )}
    </div>
  );
}

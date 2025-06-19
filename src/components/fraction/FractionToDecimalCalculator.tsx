"use client";

import { useState } from "react";
import { FractionToDecimalFormValues } from "@/types/fraction";
import { formatFraction } from "@/utils/fractionCalculations";
import DecimalDisplay from "./DecimalDisplay";
import FractionToDecimalCalculationSummary from "./FractionToDecimalCalculationSummary";

export default function FractionToDecimalCalculator() {
  const [formValues, setFormValues] = useState<FractionToDecimalFormValues>({
    numerator: 2,
    denominator: 7,
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof FractionToDecimalFormValues,
    value: number
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const calculate = () => {
    try {
      const { numerator, denominator } = formValues;

      if (denominator === 0) {
        setError("Denominator cannot be zero");
        return;
      }

      const decimal = numerator / denominator;

      setResult({
        numerator,
        denominator,
        decimal,
        percentage: decimal * 100,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      numerator: 0,
      denominator: 1,
    });
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center space-x-8 mb-8">
          {/* Fraction Input */}
          <div className="flex flex-col items-center">
            <input
              type="number"
              value={formValues.numerator}
              onChange={(e) =>
                handleInputChange("numerator", parseInt(e.target.value) || 0)
              }
              className="w-20 h-12 text-center text-lg font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="2"
            />
            <div className="w-20 h-0.5 bg-gray-800 my-2"></div>
            <input
              type="number"
              value={formValues.denominator}
              onChange={(e) =>
                handleInputChange("denominator", parseInt(e.target.value) || 1)
              }
              className="w-20 h-12 text-center text-lg font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="7"
            />
          </div>

          {/* Equals Sign */}
          <div className="text-3xl font-bold text-gray-600">=</div>

          {/* Result Display */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-12 text-center text-lg font-bold text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-lg flex items-center justify-center">
              {result ? result.decimal.toFixed(4) : "?"}
            </div>
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
        <FractionToDecimalCalculationSummary
          numerator={result.numerator}
          denominator={result.denominator}
          decimal={result.decimal}
          percentage={result.percentage}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { FractionToDecimalFormValues } from "@/types/fraction";
import { formatFraction } from "@/utils/fractionCalculations";

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
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="text-center p-2">
              <input
                type="number"
                value={formValues.numerator}
                onChange={(e) =>
                  handleInputChange("numerator", parseInt(e.target.value) || 0)
                }
                className="w-24 h-8 text-center border border-gray-300 rounded text-lg"
              />
            </td>
            <td
              rowSpan={3}
              className="text-center align-middle px-4 text-2xl font-bold"
            >
              = {result ? result.decimal.toFixed(6) : "?"}
            </td>
          </tr>
          <tr>
            <td className="bg-black h-0.5"></td>
          </tr>
          <tr>
            <td className="text-center p-2">
              <input
                type="number"
                value={formValues.denominator}
                onChange={(e) =>
                  handleInputChange(
                    "denominator",
                    parseInt(e.target.value) || 1
                  )
                }
                className="w-24 h-8 text-center border border-gray-300 rounded text-lg"
              />
            </td>
          </tr>
        </tbody>
      </table>

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
          <p className="text-lg">
            <strong>Fraction:</strong> {result.numerator}/{result.denominator}
          </p>
          <p className="text-lg">
            <strong>Decimal:</strong> {result.decimal}
          </p>
          <p className="text-lg">
            <strong>Decimal (6 places):</strong> {result.decimal.toFixed(6)}
          </p>
          <p className="text-lg">
            <strong>Percentage:</strong> {result.percentage.toFixed(4)}%
          </p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Examples:</strong>
        </p>
        <ul className="list-disc list-inside mt-1">
          <li>1/2 = 0.5</li>
          <li>3/4 = 0.75</li>
          <li>1/3 = 0.333333...</li>
          <li>22/7 ≈ 3.142857 (approximation of π)</li>
        </ul>
      </div>
    </div>
  );
}

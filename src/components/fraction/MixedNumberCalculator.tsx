"use client";

import { useState } from "react";
import {
  MixedNumberFormValues,
  FractionOperation,
  FractionResult,
} from "@/types/fraction";
import {
  performFractionOperation,
  formatFraction,
  parseMixedNumber,
} from "@/utils/fractionCalculations";

export default function MixedNumberCalculator() {
  const [formValues, setFormValues] = useState<MixedNumberFormValues>({
    mixedNumber1: "-2 3/4",
    operation: FractionOperation.ADD,
    mixedNumber2: "3 5/7",
  });

  const [result, setResult] = useState<FractionResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof MixedNumberFormValues,
    value: string | FractionOperation
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const calculate = () => {
    try {
      const { mixedNumber1, mixedNumber2, operation } = formValues;

      const frac1 = parseMixedNumber(mixedNumber1);
      const frac2 = parseMixedNumber(mixedNumber2);

      const calculationResult = performFractionOperation(
        frac1,
        frac2,
        operation
      );
      setResult(calculationResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid mixed number format. Use format like '2 3/4' or '-1 1/2'"
      );
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      mixedNumber1: "",
      operation: FractionOperation.ADD,
      mixedNumber2: "",
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
                type="text"
                value={formValues.mixedNumber1}
                onChange={(e) =>
                  handleInputChange("mixedNumber1", e.target.value)
                }
                className="w-32 h-10 text-center border border-gray-300 rounded text-lg"
                placeholder="-2 3/4"
                maxLength={10}
              />
            </td>
            <td className="text-center align-middle px-4">
              <select
                value={formValues.operation}
                onChange={(e) =>
                  handleInputChange(
                    "operation",
                    e.target.value as FractionOperation
                  )
                }
                className="w-16 h-10 text-center border border-gray-300 rounded text-lg"
              >
                <option value={FractionOperation.ADD}>+</option>
                <option value={FractionOperation.SUBTRACT}>-</option>
                <option value={FractionOperation.MULTIPLY}>×</option>
                <option value={FractionOperation.DIVIDE}>÷</option>
              </select>
            </td>
            <td className="text-center p-2">
              <input
                type="text"
                value={formValues.mixedNumber2}
                onChange={(e) =>
                  handleInputChange("mixedNumber2", e.target.value)
                }
                className="w-32 h-10 text-center border border-gray-300 rounded text-lg"
                placeholder="3 5/7"
                maxLength={10}
              />
            </td>
            <td className="text-center align-middle px-4 text-2xl font-bold">
              = {result ? formatFraction(result.simplified, true) : "?"}
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
            <strong>Mixed Number:</strong>{" "}
            {formatFraction(result.simplified, true)}
          </p>
          <p className="text-lg">
            <strong>Improper Fraction:</strong>{" "}
            {formatFraction(result.simplified)}
          </p>
          <p className="text-lg">
            <strong>Decimal:</strong> {result.decimal.toFixed(6)}
          </p>

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
          <strong>Format examples:</strong>
        </p>
        <ul className="list-disc list-inside mt-1">
          <li>Mixed numbers: "2 3/4", "-1 1/2"</li>
          <li>Fractions: "3/4", "-5/8"</li>
          <li>Whole numbers: "5", "-3"</li>
        </ul>
      </div>
    </div>
  );
}

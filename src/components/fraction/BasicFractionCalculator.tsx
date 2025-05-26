"use client";

import { useState } from "react";
import {
  BasicFractionFormValues,
  FractionOperation,
  FractionResult,
} from "@/types/fraction";
import {
  performFractionOperation,
  formatFraction,
} from "@/utils/fractionCalculations";

export default function BasicFractionCalculator() {
  const [formValues, setFormValues] = useState<BasicFractionFormValues>({
    numerator1: 2,
    denominator1: 7,
    operation: FractionOperation.ADD,
    numerator2: 3,
    denominator2: 8,
  });

  const [result, setResult] = useState<FractionResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof BasicFractionFormValues,
    value: number | FractionOperation
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const calculate = () => {
    try {
      const { numerator1, denominator1, numerator2, denominator2, operation } =
        formValues;

      if (denominator1 === 0 || denominator2 === 0) {
        setError("Denominator cannot be zero");
        return;
      }

      const frac1 = { numerator: numerator1, denominator: denominator1 };
      const frac2 = { numerator: numerator2, denominator: denominator2 };

      const calculationResult = performFractionOperation(
        frac1,
        frac2,
        operation
      );
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      numerator1: 0,
      denominator1: 1,
      operation: FractionOperation.ADD,
      numerator2: 0,
      denominator2: 1,
    });
    setResult(null);
    setError("");
  };

  return (
    <div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-center p-2">
                <input
                  type="number"
                  value={formValues.numerator1}
                  onChange={(e) =>
                    handleInputChange(
                      "numerator1",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-16 h-8 text-center border border-gray-300 rounded text-lg"
                  maxLength={8}
                />
              </td>
              <td rowSpan={3} className="text-center align-middle px-4">
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
                  type="number"
                  value={formValues.numerator2}
                  onChange={(e) =>
                    handleInputChange(
                      "numerator2",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-16 h-8 text-center border border-gray-300 rounded text-lg"
                  maxLength={8}
                />
              </td>
              <td
                rowSpan={3}
                className="text-center align-middle px-4 text-2xl font-bold"
              >
                =
              </td>
              <td className="text-center align-middle text-xl">
                {result ? formatFraction(result.simplified) : "?"}
              </td>
            </tr>
            <tr>
              <td className="bg-black h-0.5"></td>
              <td className="bg-black h-0.5"></td>
              <td className="bg-black h-0.5"></td>
            </tr>
            <tr>
              <td className="text-center p-2">
                <input
                  type="number"
                  value={formValues.denominator1}
                  onChange={(e) =>
                    handleInputChange(
                      "denominator1",
                      parseInt(e.target.value) || 1
                    )
                  }
                  className="w-16 h-8 text-center border border-gray-300 rounded text-lg"
                  maxLength={8}
                />
              </td>
              <td className="text-center p-2">
                <input
                  type="number"
                  value={formValues.denominator2}
                  onChange={(e) =>
                    handleInputChange(
                      "denominator2",
                      parseInt(e.target.value) || 1
                    )
                  }
                  className="w-16 h-8 text-center border border-gray-300 rounded text-lg"
                  maxLength={8}
                />
              </td>
              <td className="text-center align-middle text-xl">
                {result ? "?" : "?"}
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
              <strong>Fraction:</strong> {formatFraction(result.simplified)}
            </p>
            <p className="text-lg">
              <strong>Decimal:</strong> {result.decimal.toFixed(6)}
            </p>
            <p className="text-lg">
              <strong>Mixed Number:</strong>{" "}
              {formatFraction(result.simplified, true)}
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
      </div>
    </div>
  );
}

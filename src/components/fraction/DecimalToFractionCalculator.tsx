"use client";

import { useState } from "react";
import { DecimalToFractionFormValues } from "@/types/fraction";
import {
  decimalToFraction,
  formatFraction,
} from "@/utils/fractionCalculations";

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
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <table className="w-full">
        <tbody>
          <tr>
            <td
              rowSpan={3}
              className="text-center align-middle text-2xl font-bold px-4"
            >
              <input
                type="number"
                step="any"
                value={formValues.decimal}
                onChange={(e) =>
                  handleInputChange(parseFloat(e.target.value) || 0)
                }
                className="w-32 h-12 text-center border border-gray-300 rounded text-lg"
                placeholder="1.375"
              />
              <div className="mt-2 text-lg">=</div>
            </td>
            <td className="text-center align-middle text-xl">
              {result ? formatFraction(result.fraction).split("/")[0] : "?"}
            </td>
          </tr>
          <tr>
            <td className="bg-black h-0.5"></td>
          </tr>
          <tr>
            <td className="text-center align-middle text-xl">
              {result
                ? formatFraction(result.fraction).split("/")[1] || "1"
                : "?"}
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
            <strong>Decimal:</strong> {result.decimal}
          </p>
          <p className="text-lg">
            <strong>Fraction:</strong> {formatFraction(result.fraction)}
          </p>
          <p className="text-lg">
            <strong>Mixed Number:</strong>{" "}
            {formatFraction(result.fraction, true)}
          </p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Examples:</strong>
        </p>
        <ul className="list-disc list-inside mt-1">
          <li>0.5 = 1/2</li>
          <li>0.75 = 3/4</li>
          <li>1.375 = 1 3/8</li>
          <li>-0.25 = -1/4</li>
        </ul>
      </div>
    </div>
  );
}

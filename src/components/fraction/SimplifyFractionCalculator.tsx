"use client";

import { useState } from "react";
import { SimplifyFractionFormValues } from "@/types/fraction";
import {
  simplifyFraction,
  formatFraction,
  mixedToImproper,
} from "@/utils/fractionCalculations";

export default function SimplifyFractionCalculator() {
  const [formValues, setFormValues] = useState<SimplifyFractionFormValues>({
    wholeNumber: 2,
    numerator: 21,
    denominator: 98,
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof SimplifyFractionFormValues,
    value: number
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const calculate = () => {
    try {
      const { wholeNumber, numerator, denominator } = formValues;

      if (denominator === 0) {
        setError("Denominator cannot be zero");
        return;
      }

      // Convert to improper fraction if there's a whole number
      let fractionToSimplify;
      if (wholeNumber !== 0) {
        fractionToSimplify = mixedToImproper(
          wholeNumber,
          numerator,
          denominator
        );
      } else {
        fractionToSimplify = { numerator, denominator };
      }

      const simplified = simplifyFraction(fractionToSimplify);
      const decimal = simplified.numerator / simplified.denominator;

      setResult({
        original: fractionToSimplify,
        simplified,
        decimal,
        isAlreadySimplified:
          simplified.numerator === fractionToSimplify.numerator &&
          simplified.denominator === fractionToSimplify.denominator,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      wholeNumber: 0,
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
            <td rowSpan={3} className="text-center align-middle px-4">
              <input
                type="number"
                value={formValues.wholeNumber}
                onChange={(e) =>
                  handleInputChange(
                    "wholeNumber",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-20 h-10 text-center border border-gray-300 rounded text-lg"
                maxLength={10}
              />
            </td>
            <td className="text-center p-2">
              <input
                type="number"
                value={formValues.numerator}
                onChange={(e) =>
                  handleInputChange("numerator", parseInt(e.target.value) || 0)
                }
                className="w-20 h-8 text-center border border-gray-300 rounded text-lg"
                maxLength={10}
              />
            </td>
            <td
              rowSpan={3}
              className="text-center align-middle px-4 text-2xl font-bold"
            >
              = {result ? formatFraction(result.simplified, true) : "?"}
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
                className="w-20 h-8 text-center border border-gray-300 rounded text-lg"
                maxLength={10}
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

          {result.isAlreadySimplified ? (
            <p className="text-lg text-green-600">
              <strong>The fraction is already in its simplest form!</strong>
            </p>
          ) : (
            <>
              <p className="text-lg">
                <strong>Original:</strong>{" "}
                {formatFraction(result.original, true)}
              </p>
              <p className="text-lg">
                <strong>Simplified:</strong>{" "}
                {formatFraction(result.simplified, true)}
              </p>
            </>
          )}

          <p className="text-lg">
            <strong>Decimal:</strong> {result.decimal.toFixed(6)}
          </p>
          <p className="text-lg">
            <strong>Improper Fraction:</strong>{" "}
            {formatFraction(result.simplified)}
          </p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Instructions:</strong>
        </p>
        <ul className="list-disc list-inside mt-1">
          <li>Enter a whole number (optional), numerator, and denominator</li>
          <li>Leave whole number as 0 for simple fractions</li>
          <li>Example: 2 21/98 = 2 3/14</li>
        </ul>
      </div>
    </div>
  );
}

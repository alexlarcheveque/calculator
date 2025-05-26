"use client";

import { useState } from "react";
import {
  BigNumberFractionFormValues,
  FractionOperation,
} from "@/types/fraction";

export default function BigNumberFractionCalculator() {
  const [formValues, setFormValues] = useState<BigNumberFractionFormValues>({
    numerator1: "1234",
    denominator1: "748892928829",
    operation: FractionOperation.ADD,
    numerator2: "33434421132232234333",
    denominator2: "8877277388288288288",
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof BigNumberFractionFormValues,
    value: string | FractionOperation
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  // Helper function to find GCD for big integers
  const gcdBig = (a: bigint, b: bigint): bigint => {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b !== 0n) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Helper function to find LCM for big integers
  const lcmBig = (a: bigint, b: bigint): bigint => {
    return (a * b) / gcdBig(a, b);
  };

  const calculate = () => {
    try {
      const { numerator1, denominator1, numerator2, denominator2, operation } =
        formValues;

      // Convert to BigInt
      const num1 = BigInt(numerator1);
      const den1 = BigInt(denominator1);
      const num2 = BigInt(numerator2);
      const den2 = BigInt(denominator2);

      if (den1 === 0n || den2 === 0n) {
        setError("Denominator cannot be zero");
        return;
      }

      let resultNum: bigint;
      let resultDen: bigint;

      switch (operation) {
        case FractionOperation.ADD:
          const commonDenAdd = lcmBig(den1, den2);
          const adjustedNum1Add = num1 * (commonDenAdd / den1);
          const adjustedNum2Add = num2 * (commonDenAdd / den2);
          resultNum = adjustedNum1Add + adjustedNum2Add;
          resultDen = commonDenAdd;
          break;

        case FractionOperation.SUBTRACT:
          const commonDenSub = lcmBig(den1, den2);
          const adjustedNum1Sub = num1 * (commonDenSub / den1);
          const adjustedNum2Sub = num2 * (commonDenSub / den2);
          resultNum = adjustedNum1Sub - adjustedNum2Sub;
          resultDen = commonDenSub;
          break;

        case FractionOperation.MULTIPLY:
          resultNum = num1 * num2;
          resultDen = den1 * den2;
          break;

        case FractionOperation.DIVIDE:
          if (num2 === 0n) {
            setError("Cannot divide by zero");
            return;
          }
          resultNum = num1 * den2;
          resultDen = den1 * num2;
          break;

        default:
          setError("Invalid operation");
          return;
      }

      // Simplify the result
      const gcdResult = gcdBig(resultNum, resultDen);
      const simplifiedNum = resultNum / gcdResult;
      const simplifiedDen = resultDen / gcdResult;

      // Handle negative denominators
      let finalNum = simplifiedNum;
      let finalDen = simplifiedDen;
      if (finalDen < 0n) {
        finalNum = -finalNum;
        finalDen = -finalDen;
      }

      setResult({
        numerator: finalNum.toString(),
        denominator: finalDen.toString(),
        decimal: Number(finalNum) / Number(finalDen),
      });
    } catch (err) {
      setError("Invalid input. Please enter valid integers.");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      numerator1: "",
      denominator1: "",
      operation: FractionOperation.ADD,
      numerator2: "",
      denominator2: "",
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
                value={formValues.numerator1}
                onChange={(e) =>
                  handleInputChange("numerator1", e.target.value)
                }
                className="w-40 h-8 text-center border border-gray-300 rounded text-sm"
                placeholder="1234"
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
                type="text"
                value={formValues.numerator2}
                onChange={(e) =>
                  handleInputChange("numerator2", e.target.value)
                }
                className="w-40 h-8 text-center border border-gray-300 rounded text-sm"
                placeholder="33434421132232234333"
              />
            </td>
            <td
              rowSpan={3}
              className="text-center align-middle px-4 text-lg font-bold"
            >
              = ?
            </td>
          </tr>
          <tr>
            <td className="bg-black h-0.5"></td>
            <td className="bg-black h-0.5"></td>
          </tr>
          <tr>
            <td className="text-center p-2">
              <input
                type="text"
                value={formValues.denominator1}
                onChange={(e) =>
                  handleInputChange("denominator1", e.target.value)
                }
                className="w-40 h-8 text-center border border-gray-300 rounded text-sm"
                placeholder="748892928829"
              />
            </td>
            <td className="text-center p-2">
              <input
                type="text"
                value={formValues.denominator2}
                onChange={(e) =>
                  handleInputChange("denominator2", e.target.value)
                }
                className="w-40 h-8 text-center border border-gray-300 rounded text-sm"
                placeholder="8877277388288288288"
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
          <div className="space-y-2">
            <p className="text-sm break-all">
              <strong>Numerator:</strong> {result.numerator}
            </p>
            <p className="text-sm break-all">
              <strong>Denominator:</strong> {result.denominator}
            </p>
            <p className="text-lg">
              <strong>Decimal (approximate):</strong>{" "}
              {isFinite(result.decimal)
                ? result.decimal.toExponential(6)
                : "Too large to display"}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Instructions:</strong>
        </p>
        <ul className="list-disc list-inside mt-1">
          <li>
            Enter very large integers in the numerator and denominator fields
          </li>
          <li>
            This calculator uses arbitrary precision arithmetic for exact
            results
          </li>
          <li>
            Decimal approximations may lose precision for very large numbers
          </li>
        </ul>
      </div>
    </div>
  );
}

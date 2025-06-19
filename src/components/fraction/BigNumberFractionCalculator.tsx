"use client";

import { useState } from "react";
import {
  BigNumberFractionFormValues,
  FractionOperation,
} from "@/types/fraction";
import BigNumberCalculationSummary from "./BigNumberCalculationSummary";

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
    a = a < BigInt(0) ? -a : a;
    b = b < BigInt(0) ? -b : b;
    while (b !== BigInt(0)) {
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

      if (den1 === BigInt(0) || den2 === BigInt(0)) {
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
          if (num2 === BigInt(0)) {
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
      if (finalDen < BigInt(0)) {
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
    <div className="space-y-6">
      {/* Main Calculator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center space-x-4 mb-8">
          {/* First Fraction */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={formValues.numerator1}
              onChange={(e) => handleInputChange("numerator1", e.target.value)}
              className="w-32 h-12 text-center text-sm font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="1234"
            />
            <div className="w-32 h-0.5 bg-gray-800 my-2"></div>
            <input
              type="text"
              value={formValues.denominator1}
              onChange={(e) =>
                handleInputChange("denominator1", e.target.value)
              }
              className="w-32 h-12 text-center text-sm font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="748892928829"
            />
          </div>

          {/* Operation Selector */}
          <div className="flex flex-col items-center space-y-3">
            <select
              value={formValues.operation}
              onChange={(e) =>
                handleInputChange(
                  "operation",
                  e.target.value as FractionOperation
                )
              }
              className="px-4 py-3 text-lg font-medium bg-white border-2 border-emerald-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-colors"
            >
              <option value={FractionOperation.ADD}>+</option>
              <option value={FractionOperation.SUBTRACT}>−</option>
              <option value={FractionOperation.MULTIPLY}>×</option>
              <option value={FractionOperation.DIVIDE}>÷</option>
            </select>
          </div>

          {/* Second Fraction */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={formValues.numerator2}
              onChange={(e) => handleInputChange("numerator2", e.target.value)}
              className="w-32 h-12 text-center text-sm font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="33434421132232234333"
            />
            <div className="w-32 h-0.5 bg-gray-800 my-2"></div>
            <input
              type="text"
              value={formValues.denominator2}
              onChange={(e) =>
                handleInputChange("denominator2", e.target.value)
              }
              className="w-32 h-12 text-center text-sm font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="8877277388288288288"
            />
          </div>

          {/* Equals Sign */}
          <div className="text-3xl font-bold text-gray-600">=</div>

          {/* Result Display */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-24 text-center text-sm font-bold text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-lg flex items-center justify-center p-2">
              <div className="text-xs break-all">
                {result ? `${result.numerator}/${result.denominator}` : "?"}
              </div>
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
        <BigNumberCalculationSummary
          numerator1={formValues.numerator1}
          denominator1={formValues.denominator1}
          numerator2={formValues.numerator2}
          denominator2={formValues.denominator2}
          operation={formValues.operation}
          resultNumerator={result.numerator}
          resultDenominator={result.denominator}
          decimal={result.decimal}
        />
      )}

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-3">Instructions</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
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

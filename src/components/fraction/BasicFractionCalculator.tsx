"use client";

import React, { useState } from "react";
import {
  BasicFractionFormValues,
  FractionOperation,
  FractionResult,
} from "@/types/fraction";
import {
  performFractionOperation,
  formatFraction,
} from "@/utils/fractionCalculations";
import CalculationSummary from "./CalculationSummary";

export default function BasicFractionCalculator() {
  const [numerator1, setNumerator1] = useState<number | "">(2);
  const [denominator1, setDenominator1] = useState<number | "">(7);
  const [numerator2, setNumerator2] = useState<number | "">(3);
  const [denominator2, setDenominator2] = useState<number | "">(8);
  const [operation, setOperation] = useState<FractionOperation>(
    FractionOperation.ADD
  );
  const [result, setResult] = useState<FractionResult | null>(null);
  const [error, setError] = useState<string>("");

  const denominatorsValid =
    denominator1 !== "" &&
    denominator1 !== 0 &&
    denominator2 !== "" &&
    denominator2 !== 0;

  const calculate = () => {
    // Convert empty strings to 0 for numerators, but validate denominators
    const num1 = numerator1 === "" ? 0 : Number(numerator1);
    const den1 = denominator1 === "" ? 1 : Number(denominator1);
    const num2 = numerator2 === "" ? 0 : Number(numerator2);
    const den2 = denominator2 === "" ? 1 : Number(denominator2);

    if (den1 === 0 || den2 === 0) {
      setError("Denominators cannot be zero");
      setResult(null);
      return;
    }

    try {
      const calculationResult = performFractionOperation(
        { numerator: num1, denominator: den1 },
        { numerator: num2, denominator: den2 },
        operation
      );
      setResult(calculationResult);
      setError("");
    } catch (err) {
      setError("Invalid calculation");
      setResult(null);
    }
  };

  const handleNumeratorChange = (
    value: string,
    setter: (val: number | "") => void
  ) => {
    if (value === "") {
      setter("");
    } else {
      const num = Number(value);
      if (!isNaN(num)) {
        setter(num);
      }
    }
  };

  const handleDenominatorChange = (
    value: string,
    setter: (val: number | "") => void
  ) => {
    if (value === "") {
      setter("");
    } else {
      const num = Number(value);
      if (!isNaN(num)) {
        setter(num);
      }
    }
  };

  const clear = () => {
    setNumerator1(0);
    setDenominator1(1);
    setOperation(FractionOperation.ADD);
    setNumerator2(0);
    setDenominator2(1);
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center space-x-8 mb-8">
          {/* First Fraction */}
          <div className="flex flex-col items-center">
            <input
              type="number"
              value={numerator1}
              onChange={(e) =>
                handleNumeratorChange(e.target.value, setNumerator1)
              }
              className="w-20 h-12 text-center text-lg font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="2"
            />
            <div className="w-20 h-0.5 bg-gray-800 my-2"></div>
            <input
              type="number"
              value={denominator1}
              onChange={(e) =>
                handleDenominatorChange(e.target.value, setDenominator1)
              }
              className="w-20 h-12 text-center text-lg font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="7"
            />
          </div>

          {/* Operation Selector */}
          <div className="flex flex-col items-center space-y-3">
            <select
              value={operation}
              onChange={(e) =>
                setOperation(e.target.value as FractionOperation)
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
              type="number"
              value={numerator2}
              onChange={(e) =>
                handleNumeratorChange(e.target.value, setNumerator2)
              }
              className="w-20 h-12 text-center text-lg font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="3"
            />
            <div className="w-20 h-0.5 bg-gray-800 my-2"></div>
            <input
              type="number"
              value={denominator2}
              onChange={(e) =>
                handleDenominatorChange(e.target.value, setDenominator2)
              }
              className="w-20 h-12 text-center text-lg font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="8"
            />
          </div>

          {/* Equals Sign */}
          <div className="text-3xl font-bold text-gray-600">=</div>

          {/* Result Display - Always show input boxes */}
          <div className="flex flex-col items-center">
            <input
              type="number"
              value={result ? result.simplified.numerator : ""}
              readOnly
              className="w-20 h-12 text-center text-lg font-bold text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-lg focus:outline-none"
              placeholder="?"
            />
            <div className="w-20 h-0.5 bg-gray-800 my-2"></div>
            <input
              type="number"
              value={result ? result.simplified.denominator : ""}
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
            disabled={!denominatorsValid}
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

      <div className="mt-6">
        {/* Calculation Summary - shown only when there's a result */}
        {result && !error && (
          <CalculationSummary
            numerator1={numerator1 === "" ? 0 : Number(numerator1)}
            denominator1={denominator1 === "" ? 1 : Number(denominator1)}
            operation={operation}
            numerator2={numerator2 === "" ? 0 : Number(numerator2)}
            denominator2={denominator2 === "" ? 1 : Number(denominator2)}
            result={result}
          />
        )}
      </div>
    </div>
  );
}

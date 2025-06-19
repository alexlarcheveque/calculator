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
import MixedNumberCalculationSummary from "./MixedNumberCalculationSummary";

export default function MixedNumberCalculator() {
  const [formValues, setFormValues] = useState<MixedNumberFormValues>({
    mixedNumber1: "-2 3/4",
    operation: FractionOperation.ADD,
    mixedNumber2: "3 5/7",
  });

  const [result, setResult] = useState<FractionResult | null>(null);
  const [error, setError] = useState<string>("");
  const [convertedFractions, setConvertedFractions] = useState<{
    fraction1: { numerator: number; denominator: number };
    fraction2: { numerator: number; denominator: number };
  } | null>(null);

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
      setConvertedFractions({
        fraction1: frac1,
        fraction2: frac2,
      });
      setError("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid mixed number format. Use format like '2 3/4' or '-1 1/2'"
      );
      setResult(null);
      setConvertedFractions(null);
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
    setConvertedFractions(null);
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center space-x-8 mb-8">
          {/* First Mixed Number */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={formValues.mixedNumber1}
              onChange={(e) =>
                handleInputChange("mixedNumber1", e.target.value)
              }
              className="w-32 h-12 text-center text-lg font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="-2 3/4"
              maxLength={10}
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

          {/* Second Mixed Number */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={formValues.mixedNumber2}
              onChange={(e) =>
                handleInputChange("mixedNumber2", e.target.value)
              }
              className="w-32 h-12 text-center text-lg font-medium border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="3 5/7"
              maxLength={10}
            />
          </div>

          {/* Equals Sign */}
          <div className="text-3xl font-bold text-gray-600">=</div>

          {/* Result Display */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-12 text-center text-lg font-bold text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-lg flex items-center justify-center">
              {result ? formatFraction(result.simplified, true) : "?"}
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
      {result && !error && convertedFractions && (
        <MixedNumberCalculationSummary
          mixedNumber1={formValues.mixedNumber1}
          mixedNumber2={formValues.mixedNumber2}
          operation={formValues.operation}
          numerator1={convertedFractions.fraction1.numerator}
          denominator1={convertedFractions.fraction1.denominator}
          numerator2={convertedFractions.fraction2.numerator}
          denominator2={convertedFractions.fraction2.denominator}
          result={result}
        />
      )}
    </div>
  );
}

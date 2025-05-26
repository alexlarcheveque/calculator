"use client";

import { CompoundInterestResults } from "@/types/compoundInterest";
import {
  formatPercentage,
  getCompoundingFrequencyDisplayName,
} from "@/utils/compoundInterestCalculations";

interface CompoundInterestSummaryProps {
  results: CompoundInterestResults;
}

export default function CompoundInterestSummary({
  results,
}: CompoundInterestSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Interest Rate Conversion Results
      </h2>

      {/* Main Conversion Result */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {/* Input Rate */}
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Input Interest</div>
              <div className="text-lg font-semibold text-gray-800">
                {formatPercentage(results.inputRate, 2)}
              </div>
              <div className="text-xs text-gray-500">
                {getCompoundingFrequencyDisplayName(results.inputFrequency)}
              </div>
            </div>

            {/* Equals Sign */}
            <div className="text-3xl font-bold text-blue-600">=</div>

            {/* Output Rate */}
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Output Interest</div>
              <div className="text-2xl font-bold text-green-600">
                {formatPercentage(results.outputRate, 5)}
              </div>
              <div className="text-xs text-gray-500">
                {getCompoundingFrequencyDisplayName(results.outputFrequency)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Effective Annual Rate */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            Effective Annual Rate (APY)
          </div>
          <div className="text-xl font-semibold text-gray-800">
            {formatPercentage(results.effectiveAnnualRate, 5)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            True annual return regardless of compounding
          </div>
        </div>

        {/* Rate Difference */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Rate Difference</div>
          <div className="text-xl font-semibold text-gray-800">
            {formatPercentage(
              Math.abs(results.outputRate - results.inputRate),
              5
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {results.outputRate > results.inputRate ? "Higher" : "Lower"} than
            input rate
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          Understanding the conversion:
        </h3>
        <p className="text-xs text-yellow-700">
          {results.inputRate}% compounded{" "}
          {getCompoundingFrequencyDisplayName(
            results.inputFrequency
          ).toLowerCase()}
          is equivalent to {formatPercentage(results.outputRate, 5)} compounded{" "}
          {getCompoundingFrequencyDisplayName(
            results.outputFrequency
          ).toLowerCase()}
          . Both rates produce the same effective annual yield of{" "}
          {formatPercentage(results.effectiveAnnualRate, 5)}.
        </p>
      </div>
    </div>
  );
}

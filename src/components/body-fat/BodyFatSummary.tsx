"use client";

import { BodyFatResults, UnitSystem } from "@/types/bodyFat";
import { formatWeight, formatPercentage } from "@/utils/bodyFatCalculations";

interface BodyFatSummaryProps {
  results: BodyFatResults;
}

export default function BodyFatSummary({ results }: BodyFatSummaryProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Essential Fat":
        return "text-blue-600";
      case "Athletes":
        return "text-green-600";
      case "Fitness":
        return "text-purple-600";
      case "Average":
        return "text-yellow-600";
      case "Obese":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Results</h2>

      {/* Main Result */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-green-600 mb-2">
          Body Fat: {formatPercentage(results.bodyFatPercentageNavy)}
        </div>
        <div
          className={`text-lg font-medium ${getCategoryColor(
            results.bodyFatCategory
          )}`}
        >
          {results.bodyFatCategory}
        </div>
      </div>

      {/* Body Fat Visualization */}
      <div className="mb-6 text-center">
        <div className="relative inline-block">
          <div className="text-sm text-gray-600 mb-2">
            {formatPercentage(results.bodyFatPercentageNavy)}
          </div>
          <div className="w-80 h-4 bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 via-yellow-500 to-red-500 rounded-full relative">
            <div
              className="absolute top-0 w-2 h-4 bg-black rounded-full transform -translate-x-1"
              style={{
                left: `${Math.min(
                  Math.max((results.bodyFatPercentageNavy / 50) * 100, 0),
                  100
                )}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
          </div>
        </div>
      </div>

      {/* Detailed Results Table */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
          <span className="text-gray-600">Body Fat (U.S. Navy Method)</span>
          <span className="font-medium">
            {formatPercentage(results.bodyFatPercentageNavy)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
          <span className="text-gray-600">Body Fat Category</span>
          <span
            className={`font-medium ${getCategoryColor(
              results.bodyFatCategory
            )}`}
          >
            {results.bodyFatCategory}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
          <span className="text-gray-600">Body Fat Mass</span>
          <span className="font-medium">
            {formatWeight(results.bodyFatMass, results.unitSystem)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
          <span className="text-gray-600">Lean Body Mass</span>
          <span className="font-medium">
            {formatWeight(results.leanBodyMass, results.unitSystem)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
          <span className="text-gray-600">Ideal Body Fat for Given Age</span>
          <span className="font-medium">
            {formatPercentage(results.idealBodyFatPercentage)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
          <span className="text-gray-600">Body Fat to Lose to Reach Ideal</span>
          <span className="font-medium">
            {results.bodyFatToLose > 0
              ? formatWeight(results.bodyFatToLose, results.unitSystem)
              : "Already at ideal"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2">
          <span className="text-gray-600">Body Fat (BMI method)</span>
          <span className="font-medium">
            {formatPercentage(results.bodyFatPercentageBMI)}
          </span>
        </div>
      </div>

      {/* BMI Information */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">BMI Information</h3>
        <div className="text-sm text-blue-700">
          Your BMI is{" "}
          <span className="font-medium">{results.bmi.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

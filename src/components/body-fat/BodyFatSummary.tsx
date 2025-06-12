"use client";

import { BodyFatResults, UnitSystem } from "@/types/bodyFat";
import { formatWeight, formatPercentage } from "@/utils/bodyFatCalculations";

interface BodyFatSummaryProps {
  results: BodyFatResults;
}

export default function BodyFatSummary({ results }: BodyFatSummaryProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "essential fat":
        return "text-blue-600";
      case "athletes":
        return "text-green-600";
      case "fitness":
        return "text-emerald-600";
      case "average":
        return "text-yellow-600";
      case "obese":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Body Fat Analysis
      </h2>

      {/* Main Body Fat Result */}
      <div className="mb-6">
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
          <div className="text-sm text-gray-600 mb-1">Body Fat Percentage</div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {formatPercentage(results.bodyFatPercentageNavy)}
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {results.bodyFatCategory}
          </div>
        </div>
      </div>

      {/* Body Composition Breakdown */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Body Composition Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Body Fat Mass</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatWeight(results.bodyFatMass, results.unitSystem)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Total fat weight</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Lean Body Mass</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatWeight(results.leanBodyMass, results.unitSystem)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Muscle, bone, organs
            </div>
          </div>
        </div>
      </div>

      {/* Health Assessment */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Health Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Ideal Body Fat</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatPercentage(results.idealBodyFatPercentage)}
            </div>
            <div className="text-xs text-gray-500 mt-1">For your age group</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Body Fat to Lose</div>
            <div className="text-2xl font-bold text-gray-900">
              {results.bodyFatToLose > 0
                ? formatWeight(results.bodyFatToLose, results.unitSystem)
                : "Already ideal"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              To reach ideal range
            </div>
          </div>
        </div>
      </div>

      {/* BMI Information */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Additional Metrics
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">
            Body Mass Index (BMI)
          </div>
          <div className="text-xl font-bold text-gray-900">
            {results.bmi.toFixed(1)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Weight relative to height
          </div>
        </div>
      </div>
    </div>
  );
}

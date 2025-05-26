"use client";

import { BMIResults } from "@/types/bmi";
import { formatNumber, formatWeight } from "@/utils/bmiCalculations";

interface BMISummaryProps {
  results: BMIResults;
}

export default function BMISummary({ results }: BMISummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Result</h2>
      </div>

      {/* Main BMI Result */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          BMI = {formatNumber(results.bmi, 1)} kg/m²
        </div>
        <div
          className="text-lg font-semibold"
          style={{ color: results.categoryColor }}
        >
          ({results.category})
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Healthy BMI Range</div>
          <div className="text-lg font-semibold text-blue-600">
            18.5 - 25 kg/m²
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Healthy Weight Range</div>
          <div className="text-lg font-semibold text-green-600">
            {formatWeight(
              results.healthyWeightRange.min,
              results.healthyWeightRange.unit
            )}{" "}
            -{" "}
            {formatWeight(
              results.healthyWeightRange.max,
              results.healthyWeightRange.unit
            )}
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">BMI Prime</div>
          <div className="text-lg font-semibold text-purple-600">
            {formatNumber(results.bmiPrime, 2)}
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Ponderal Index</div>
          <div className="text-lg font-semibold text-orange-600">
            {formatNumber(results.ponderalIndex, 1)} kg/m³
          </div>
        </div>
      </div>

      {/* Weight Recommendations */}
      {(results.weightToLose || results.weightToGain) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">
            Weight Recommendation
          </h3>
          {results.weightToLose && (
            <p className="text-sm text-yellow-700">
              To reach a healthy weight, consider losing{" "}
              <span className="font-semibold">
                {formatWeight(
                  results.weightToLose,
                  results.healthyWeightRange.unit
                )}
              </span>
            </p>
          )}
          {results.weightToGain && (
            <p className="text-sm text-yellow-700">
              To reach a healthy weight, consider gaining{" "}
              <span className="font-semibold">
                {formatWeight(
                  results.weightToGain,
                  results.healthyWeightRange.unit
                )}
              </span>
            </p>
          )}
        </div>
      )}

      {/* Additional Information */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Healthy BMI range: 18.5 kg/m² - 25 kg/m²</li>
          <li>
            • Healthy weight for your height:{" "}
            {formatWeight(
              results.healthyWeightRange.min,
              results.healthyWeightRange.unit
            )}{" "}
            -{" "}
            {formatWeight(
              results.healthyWeightRange.max,
              results.healthyWeightRange.unit
            )}
          </li>
          <li>• BMI Prime: {formatNumber(results.bmiPrime, 2)}</li>
          <li>
            • Ponderal Index: {formatNumber(results.ponderalIndex, 1)} kg/m³
          </li>
        </ul>
      </div>
    </div>
  );
}

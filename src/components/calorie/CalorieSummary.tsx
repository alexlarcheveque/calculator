"use client";

import { CalorieResults, ResultUnit } from "@/types/calorie";
import { formatCalories, formatNumber } from "@/utils/calorieCalculations";

interface CalorieSummaryProps {
  results: CalorieResults;
  resultUnit: ResultUnit;
}

export default function CalorieSummary({
  results,
  resultUnit,
}: CalorieSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Calorie Requirements
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BMR and Maintenance */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              Basal Metabolic Rate (BMR)
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {formatCalories(results.bmr, resultUnit)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Calories burned at rest
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-800 mb-2">
              Maintenance Calories
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {formatCalories(results.maintenanceCalories, resultUnit)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Calories to maintain current weight
            </p>
          </div>
        </div>

        {/* Weight Goals */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Weight Loss Goals
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                <div>
                  <span className="font-medium text-orange-800">Mild Loss</span>
                  <span className="text-sm text-gray-600 block">
                    0.5 lbs/week
                  </span>
                </div>
                <span className="font-bold text-orange-600">
                  {formatCalories(results.weightLossCalories.mild, resultUnit)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                <div>
                  <span className="font-medium text-red-800">
                    Moderate Loss
                  </span>
                  <span className="text-sm text-gray-600 block">1 lb/week</span>
                </div>
                <span className="font-bold text-red-600">
                  {formatCalories(
                    results.weightLossCalories.moderate,
                    resultUnit
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-100 rounded">
                <div>
                  <span className="font-medium text-red-900">
                    Aggressive Loss
                  </span>
                  <span className="text-sm text-gray-600 block">
                    2 lbs/week
                  </span>
                </div>
                <span className="font-bold text-red-700">
                  {formatCalories(
                    results.weightLossCalories.aggressive,
                    resultUnit
                  )}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Weight Gain Goals
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <div>
                  <span className="font-medium text-blue-800">Mild Gain</span>
                  <span className="text-sm text-gray-600 block">
                    0.5 lbs/week
                  </span>
                </div>
                <span className="font-bold text-blue-600">
                  {formatCalories(results.weightGainCalories.mild, resultUnit)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <div>
                  <span className="font-medium text-purple-800">
                    Moderate Gain
                  </span>
                  <span className="text-sm text-gray-600 block">1 lb/week</span>
                </div>
                <span className="font-bold text-purple-600">
                  {formatCalories(
                    results.weightGainCalories.moderate,
                    resultUnit
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-100 rounded">
                <div>
                  <span className="font-medium text-purple-900">
                    Aggressive Gain
                  </span>
                  <span className="text-sm text-gray-600 block">
                    2 lbs/week
                  </span>
                </div>
                <span className="font-bold text-purple-700">
                  {formatCalories(
                    results.weightGainCalories.aggressive,
                    resultUnit
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Macronutrients */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Recommended Macronutrients (Based on Maintenance Calories)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <h4 className="font-medium text-red-800 mb-2">Protein</h4>
            <p className="text-xl font-bold text-red-600">
              {formatNumber(results.macronutrients.protein.grams)}g
            </p>
            <p className="text-sm text-gray-600">
              {formatCalories(
                results.macronutrients.protein.calories,
                resultUnit
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {results.macronutrients.protein.percentage}% of calories
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <h4 className="font-medium text-yellow-800 mb-2">Carbohydrates</h4>
            <p className="text-xl font-bold text-yellow-600">
              {formatNumber(results.macronutrients.carbs.grams)}g
            </p>
            <p className="text-sm text-gray-600">
              {formatCalories(
                results.macronutrients.carbs.calories,
                resultUnit
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {results.macronutrients.carbs.percentage}% of calories
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <h4 className="font-medium text-green-800 mb-2">Fat</h4>
            <p className="text-xl font-bold text-green-600">
              {formatNumber(results.macronutrients.fat.grams)}g
            </p>
            <p className="text-sm text-gray-600">
              {formatCalories(results.macronutrients.fat.calories, resultUnit)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {results.macronutrients.fat.percentage}% of calories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

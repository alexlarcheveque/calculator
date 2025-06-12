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
        Daily Calorie Requirements
      </h2>

      {/* Daily Calorie Needs Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Daily Calorie Needs
        </h3>
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
          <div className="text-sm text-gray-600 mb-1">Maintenance Calories</div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {formatCalories(results.maintenanceCalories, resultUnit)}
          </div>
          <div className="text-lg font-semibold text-gray-800">
            To maintain current weight
          </div>
        </div>
      </div>

      {/* Calorie Breakdown Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Calorie Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">
              Basal Metabolic Rate (BMR)
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCalories(results.bmr, resultUnit)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Calories burned at rest
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Activity Calories</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCalories(
                results.maintenanceCalories - results.bmr,
                resultUnit
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              From daily activities
            </div>
          </div>
        </div>
      </div>

      {/* Weight Management Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Weight Management Targets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weight Loss Goals */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Weight Loss Goals
            </h4>
            <div className="space-y-2">
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-orange-800">
                      Mild Loss
                    </div>
                    <div className="text-xs text-gray-600">0.5 lbs/week</div>
                  </div>
                  <div className="text-lg font-bold text-orange-600">
                    {formatCalories(
                      results.weightLossCalories.mild,
                      resultUnit
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-red-800">
                      Moderate Loss
                    </div>
                    <div className="text-xs text-gray-600">1 lb/week</div>
                  </div>
                  <div className="text-lg font-bold text-red-600">
                    {formatCalories(
                      results.weightLossCalories.moderate,
                      resultUnit
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-red-100 p-3 rounded-lg border border-red-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-red-900">
                      Aggressive Loss
                    </div>
                    <div className="text-xs text-gray-600">2 lbs/week</div>
                  </div>
                  <div className="text-lg font-bold text-red-700">
                    {formatCalories(
                      results.weightLossCalories.aggressive,
                      resultUnit
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weight Gain Goals */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Weight Gain Goals
            </h4>
            <div className="space-y-2">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-blue-800">
                      Mild Gain
                    </div>
                    <div className="text-xs text-gray-600">0.5 lbs/week</div>
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatCalories(
                      results.weightGainCalories.mild,
                      resultUnit
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-purple-800">
                      Moderate Gain
                    </div>
                    <div className="text-xs text-gray-600">1 lb/week</div>
                  </div>
                  <div className="text-lg font-bold text-purple-600">
                    {formatCalories(
                      results.weightGainCalories.moderate,
                      resultUnit
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg border border-purple-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-purple-900">
                      Aggressive Gain
                    </div>
                    <div className="text-xs text-gray-600">2 lbs/week</div>
                  </div>
                  <div className="text-lg font-bold text-purple-700">
                    {formatCalories(
                      results.weightGainCalories.aggressive,
                      resultUnit
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Macronutrient Information Section */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Recommended Macronutrients
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-sm text-gray-600 mb-1">Protein</div>
            <div className="text-xl font-bold text-gray-900">
              {formatNumber(results.macronutrients.protein.grams)}g
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {formatCalories(
                results.macronutrients.protein.calories,
                resultUnit
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {results.macronutrients.protein.percentage}% of calories
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-sm text-gray-600 mb-1">Carbohydrates</div>
            <div className="text-xl font-bold text-gray-900">
              {formatNumber(results.macronutrients.carbs.grams)}g
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {formatCalories(
                results.macronutrients.carbs.calories,
                resultUnit
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {results.macronutrients.carbs.percentage}% of calories
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-sm text-gray-600 mb-1">Fat</div>
            <div className="text-xl font-bold text-gray-900">
              {formatNumber(results.macronutrients.fat.grams)}g
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {formatCalories(results.macronutrients.fat.calories, resultUnit)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {results.macronutrients.fat.percentage}% of calories
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

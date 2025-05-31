"use client";

import { CalorieResults, ResultUnit, UnitSystem } from "@/types/calorie";
import { formatCalories, formatNumber } from "@/utils/calorieCalculations";

interface MacroTableProps {
  results: CalorieResults;
  resultUnit: ResultUnit;
  unitSystem: UnitSystem;
}

export default function MacroTable({
  results,
  resultUnit,
  unitSystem,
}: MacroTableProps) {
  const { protein, carbs, fat } = results.macronutrients;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Recommended Macronutrients (Based on Maintenance Calories)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <h3 className="font-medium text-red-800 mb-2">Protein</h3>
          <p className="text-xl font-bold text-red-600">
            {formatNumber(protein.grams)}g
          </p>
          <p className="text-sm text-gray-600">
            {formatCalories(protein.calories, resultUnit)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {protein.percentage}% of calories
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <h3 className="font-medium text-yellow-800 mb-2">Carbohydrates</h3>
          <p className="text-xl font-bold text-yellow-600">
            {formatNumber(carbs.grams)}g
          </p>
          <p className="text-sm text-gray-600">
            {formatCalories(carbs.calories, resultUnit)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {carbs.percentage}% of calories
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg text-center">
          <h3 className="font-medium text-green-800 mb-2">Fat</h3>
          <p className="text-xl font-bold text-green-600">
            {formatNumber(fat.grams)}g
          </p>
          <p className="text-sm text-gray-600">
            {formatCalories(fat.calories, resultUnit)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {fat.percentage}% of calories
          </p>
        </div>
      </div>
    </div>
  );
}

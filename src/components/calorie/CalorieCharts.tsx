"use client";

import { CalorieResults, ResultUnit } from "@/types/calorie";
import MacronutrientChart from "./MacronutrientChart";
import CalorieGoalsChart from "./CalorieGoalsChart";

interface CalorieChartsProps {
  results: CalorieResults;
  resultUnit: ResultUnit;
}

export default function CalorieCharts({
  results,
  resultUnit,
}: CalorieChartsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Visual Breakdown
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Macronutrient Distribution */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Macronutrient Distribution
          </h3>
          <div className="h-80">
            <MacronutrientChart results={results} resultUnit={resultUnit} />
          </div>
        </div>

        {/* Calorie Goals Comparison */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Calorie Goals Comparison
          </h3>
          <div className="h-80">
            <CalorieGoalsChart results={results} resultUnit={resultUnit} />
          </div>
        </div>
      </div>
    </div>
  );
}

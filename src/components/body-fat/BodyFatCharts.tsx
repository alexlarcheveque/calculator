"use client";

import { BodyFatResults, Gender } from "@/types/bodyFat";
import BodyCompositionChart from "./BodyCompositionChart";
import CategoryComparisonChart from "./CategoryComparisonChart";

interface BodyFatChartsProps {
  results: BodyFatResults;
  gender: Gender;
}

export default function BodyFatCharts({ results, gender }: BodyFatChartsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Body Composition Analysis
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Body Composition Pie Chart */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-700">
            Body Composition
          </h3>
          <div className="h-64">
            <BodyCompositionChart results={results} />
          </div>
        </div>

        {/* Category Comparison Chart */}
        <div className="flex flex-col">
          <h3 className="text-lg font-medium mb-4 text-gray-700">
            Body Fat Categories
          </h3>
          <div className="flex-1">
            <CategoryComparisonChart results={results} gender={gender} />
          </div>
        </div>
      </div>
    </div>
  );
}

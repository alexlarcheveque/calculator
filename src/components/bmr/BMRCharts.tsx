"use client";

import { BMRResults, BMRFormValues } from "@/types/bmr";
import ActivityLevelChart from "./ActivityLevelChart";

interface BMRChartsProps {
  results: BMRResults;
  formValues: BMRFormValues;
}

export default function BMRCharts({ results, formValues }: BMRChartsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Activity Level Comparison
      </h2>

      <div className="space-y-6">
        <ActivityLevelChart results={results} formValues={formValues} />
      </div>
    </div>
  );
}

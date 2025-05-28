"use client";

import { RefinanceResults } from "@/types/refinance";
import BreakEvenChart from "./BreakEvenChart";

interface RefinanceChartsProps {
  results: RefinanceResults;
}

export default function RefinanceCharts({ results }: RefinanceChartsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm mr-4 text-primary-600 border-b-2 border-primary-500`}
          aria-label="View payment distribution chart"
        >
          Break-Even Analysis
        </button>
      </div>

      <div className="h-64 sm:h-96">
        <BreakEvenChart results={results} />
      </div>
    </div>
  );
}

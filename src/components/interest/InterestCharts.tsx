"use client";

import { useState } from "react";
import {
  InterestCalculatorInput,
  InterestCalculatorResult,
} from "./InterestPage";
import BreakdownPieChart from "./BreakdownPieChart";
import AccumulationLineChart from "./AccumulationLineChart";

interface InterestChartsProps {
  inputs: Partial<InterestCalculatorInput>;
  results: InterestCalculatorResult;
}

export default function InterestCharts({
  inputs,
  results,
}: InterestChartsProps) {
  const [activeTab, setActiveTab] = useState<"breakdown" | "growth">(
    "breakdown"
  );

  if (!results) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("breakdown")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "breakdown"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View investment breakdown chart"
        >
          Investment Breakdown
        </button>
        <button
          onClick={() => setActiveTab("growth")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "growth"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View investment growth chart"
        >
          Investment Growth Over Time
        </button>
      </div>

      <div className="h-96">
        {activeTab === "breakdown" ? (
          <BreakdownPieChart results={results} />
        ) : (
          <AccumulationLineChart
            schedule={results.accumulationSchedule}
            investmentLengthYears={inputs.investmentLengthYears || 0}
          />
        )}
      </div>
    </div>
  );
}

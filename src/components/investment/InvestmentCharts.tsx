"use client";

import { useState } from "react";
import { InvestmentResults, AccumulationDataPoint } from "@/types/investment";
import InvestmentPieChart from "./InvestmentPieChart";
import AccumulationChart from "./AccumulationChart";

interface InvestmentChartsProps {
  results: InvestmentResults;
  accumulationData: AccumulationDataPoint[];
}

export default function InvestmentCharts({
  results,
  accumulationData,
}: InvestmentChartsProps) {
  const [activeTab, setActiveTab] = useState<"composition" | "accumulation">(
    "composition"
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Investment Breakdown
      </h2>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("composition")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "composition"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View investment composition chart"
        >
          Investment Composition
        </button>
        <button
          onClick={() => setActiveTab("accumulation")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "accumulation"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View accumulation over time chart"
        >
          Accumulation Over Time
        </button>
      </div>

      <div className="h-96">
        {activeTab === "composition" ? (
          <InvestmentPieChart results={results} />
        ) : (
          <AccumulationChart data={accumulationData} />
        )}
      </div>
    </div>
  );
}

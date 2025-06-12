"use client";

import { useState } from "react";
import { IdealWeightResults } from "@/types/idealWeight";
import FormulaComparisonChart from "./FormulaComparisonChart";
import BMICategoriesChart from "./BMICategoriesChart";

interface IdealWeightChartsProps {
  results: IdealWeightResults;
}

type TabType = "formulas" | "bmi";

export default function IdealWeightCharts({ results }: IdealWeightChartsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("formulas");

  const tabs = [
    { id: "formulas" as TabType, label: "Formula Comparison" },
    { id: "bmi" as TabType, label: "BMI Categories" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Chart Content */}
      <div className="w-full h-full">
        {activeTab === "formulas" && (
          <FormulaComparisonChart results={results} />
        )}
        {activeTab === "bmi" && <BMICategoriesChart results={results} />}
        {/* Weight Ranges chart removed as per request */}
      </div>
    </div>
  );
}

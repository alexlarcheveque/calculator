"use client";

import { useState } from "react";
import { BMRResults, BMRFormValues } from "@/types/bmr";
import ActivityLevelChart from "./ActivityLevelChart";
import BMRAgeProgressionChart from "./BMRAgeProgressionChart";
import FormulaComparisonChart from "./FormulaComparisonChart";

interface BMRChartsProps {
  results: BMRResults;
  formValues: BMRFormValues;
}

type TabType = "activity" | "age" | "formulas";

export default function BMRCharts({ results, formValues }: BMRChartsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("activity");

  const tabs = [
    { id: "activity" as TabType, label: "Activity Levels" },
    { id: "age" as TabType, label: "Age Progression" },
    { id: "formulas" as TabType, label: "Formula Comparison" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        BMR Analysis Charts
      </h2>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
      <div>
        {activeTab === "activity" && (
        <ActivityLevelChart results={results} formValues={formValues} />
        )}
        {activeTab === "age" && (
          <BMRAgeProgressionChart results={results} formValues={formValues} />
        )}
        {activeTab === "formulas" && (
          <FormulaComparisonChart results={results} formValues={formValues} />
        )}
      </div>
    </div>
  );
}

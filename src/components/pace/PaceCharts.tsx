"use client";

import { useState } from "react";
import { PaceResults, PaceFormValues } from "@/types/pace";
import TrainingZonesChart from "./TrainingZonesChart";
import PerformanceComparisonChart from "./PerformanceComparisonChart";

interface PaceChartsProps {
  results: PaceResults;
  formValues: PaceFormValues;
}

type TabType = "zones" | "performance";

export default function PaceCharts({ results, formValues }: PaceChartsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("zones");

  const tabs = [
    { id: "performance" as TabType, label: "Performance Comparison" },
    { id: "zones" as TabType, label: "Training Zones" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Pace Analysis Charts
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
      <div className="h-full">
        {activeTab === "zones" && (
          <TrainingZonesChart results={results} formValues={formValues} />
        )}
        {activeTab === "performance" && (
          <PerformanceComparisonChart
            results={results}
            formValues={formValues}
          />
        )}
      </div>
    </div>
  );
}

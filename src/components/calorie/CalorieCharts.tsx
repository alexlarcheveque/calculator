"use client";

import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState<
    "macronutrients" | "calorie-goals"
  >("macronutrients");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("macronutrients")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "macronutrients"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View macronutrient distribution chart"
        >
          Macronutrients
        </button>
        <button
          onClick={() => setActiveTab("calorie-goals")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "calorie-goals"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View calorie goals comparison chart"
        >
          Calorie Goals
        </button>
      </div>

      <div className="w-full">
        {activeTab === "macronutrients" ? (
          <div>
            <MacronutrientChart results={results} resultUnit={resultUnit} />
          </div>
        ) : (
          <div>
            <CalorieGoalsChart results={results} resultUnit={resultUnit} />
          </div>
        )}
      </div>
    </div>
  );
}

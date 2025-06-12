"use client";

import { useState } from "react";
import { BodyFatResults, Gender } from "@/types/bodyFat";
import BodyCompositionChart from "./BodyCompositionChart";
import CategoryComparisonChart from "./CategoryComparisonChart";

interface BodyFatChartsProps {
  results: BodyFatResults;
  gender: Gender;
}

export default function BodyFatCharts({ results, gender }: BodyFatChartsProps) {
  const [activeTab, setActiveTab] = useState<"composition" | "categories">(
    "categories"
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("categories")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "categories"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View body fat categories chart"
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab("composition")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "composition"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View body composition chart"
        >
          Body Composition
        </button>
      </div>

      <div className="w-full">
        {activeTab === "categories" && (
          <div>
            <CategoryComparisonChart results={results} gender={gender} />
          </div>
        )}
        {activeTab === "composition" && (
          <div>
            <BodyCompositionChart results={results} />
          </div>
        )}
      </div>
    </div>
  );
}

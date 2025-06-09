"use client";

import { useState } from "react";
import { IncomeTaxResults, TaxCalculationBreakdown } from "@/types/incomeTax";
import TaxBracketChart from "./TaxBracketChart";
import DeductionsChart from "./DeductionsChart";

interface IncomeTaxChartsProps {
  results: IncomeTaxResults;
  breakdown: TaxCalculationBreakdown;
}

export default function IncomeTaxCharts({
  results,
  breakdown,
}: IncomeTaxChartsProps) {
  const [activeTab, setActiveTab] = useState<"brackets" | "deductions">(
    "brackets"
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("brackets")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "brackets"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View tax bracket breakdown"
        >
          Tax Bracket Breakdown
        </button>
        <button
          onClick={() => setActiveTab("deductions")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "deductions"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View deductions analysis"
        >
          Deductions Analysis
        </button>
      </div>

      <div className="w-full">
        {activeTab === "brackets" && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <TaxBracketChart breakdown={breakdown} />
          </div>
        )}

        {activeTab === "deductions" && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Deductions Comparison
            </h3>
            <DeductionsChart breakdown={breakdown} />
          </div>
        )}
      </div>
    </div>
  );
}

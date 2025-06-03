"use client";

import { useState } from "react";
import {
  AutoLoanResults,
  AutoLoanMonthlyAmortizationDataPoint,
} from "@/types/autoLoan";
import AutoLoanPaymentDistributionChart from "./PaymentDistributionChart";
import AutoLoanAmortizationChart from "./AmortizationChart";

interface AutoLoanChartsProps {
  results: AutoLoanResults | null;
  amortizationData: AutoLoanMonthlyAmortizationDataPoint[];
  loanTermMonths: number;
}

export default function AutoLoanCharts({
  results,
  amortizationData,
  loanTermMonths,
}: AutoLoanChartsProps) {
  const [activeTab, setActiveTab] = useState<string>("breakdown");

  if (!results) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">
          Charts will appear here once calculations are made.
        </p>
      </div>
    );
  }

  const tabs = [
    { id: "breakdown", label: "Loan Breakdown" },
    { id: "amortization", label: "Amortization Over Time" },
  ];

  // Ensure activeTab is valid
  if (!tabs.find((tab) => tab.id === activeTab) && tabs.length > 0) {
    setActiveTab(tabs[0].id);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 font-medium text-sm mr-4 ${
              activeTab === tab.id
                ? "text-primary-600 border-b-2 border-primary-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label={`View ${tab.label} chart`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="h-96 w-full">
        {activeTab === "breakdown" && (
          <AutoLoanPaymentDistributionChart
            key={`breakdown-${JSON.stringify(results)}`}
            results={results}
          />
        )}
        {activeTab === "amortization" && (
          <AutoLoanAmortizationChart
            key={`amortization-${JSON.stringify(results)}`}
            data={amortizationData}
            loanTermMonths={loanTermMonths}
          />
        )}
      </div>
    </div>
  );
}

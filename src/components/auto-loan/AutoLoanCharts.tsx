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
  const [activeTab, setActiveTab] = useState<"breakdown" | "amortization">(
    "breakdown"
  );

  if (!results) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">
          Charts will appear here once calculations are made.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("breakdown")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "breakdown"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View loan breakdown chart"
        >
          Loan Breakdown
        </button>
        <button
          onClick={() => setActiveTab("amortization")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "amortization"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View amortization schedule chart"
        >
          Amortization Over Time
        </button>
      </div>

      <div className="h-96">
        {" "}
        {/* Fixed height for chart area */}
        {activeTab === "breakdown" ? (
          <AutoLoanPaymentDistributionChart results={results} />
        ) : (
          <AutoLoanAmortizationChart
            data={amortizationData}
            loanTermMonths={loanTermMonths}
          />
        )}
      </div>
    </div>
  );
}

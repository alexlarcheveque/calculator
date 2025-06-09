"use client";

import { useState } from "react";
import {
  InterestRateResults,
  AmortizationDataPoint,
} from "@/types/interestRate";
import AmortizationChart from "@/components/interest-rate/AmortizationChart";
import PaymentDistributionChart from "@/components/interest-rate/PaymentDistributionChart";

interface InterestRateChartsProps {
  results: InterestRateResults;
  amortizationData: AmortizationDataPoint[];
}

export default function InterestRateCharts({
  results,
  amortizationData,
}: InterestRateChartsProps) {
  const [activeTab, setActiveTab] = useState<"payment" | "amortization">(
    "payment"
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("payment")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "payment"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Payment Breakdown
        </button>
        <button
          onClick={() => setActiveTab("amortization")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "amortization"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Loan Amortization
        </button>
      </div>

      <div className="w-full h-96">
        {activeTab === "payment" ? (
          <PaymentDistributionChart results={results} />
        ) : (
          <AmortizationChart data={amortizationData} />
        )}
      </div>
    </div>
  );
}

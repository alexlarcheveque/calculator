"use client";

import { useState } from "react";
import { MortgageResults, AmortizationDataPoint } from "@/types/mortgage";
import PaymentDistributionChart from "./PaymentDistributionChart";
import AmortizationChart from "./AmortizationChart";

interface MortgageChartsProps {
  results: MortgageResults;
  amortizationData: AmortizationDataPoint[];
}

export default function MortgageCharts({
  results,
  amortizationData,
}: MortgageChartsProps) {
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
          aria-label="View payment distribution chart"
        >
          Payment Distribution
        </button>
        <button
          onClick={() => setActiveTab("amortization")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "amortization"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View amortization chart"
        >
          Amortization Schedule
        </button>
      </div>

      <div className="w-full">
        {activeTab === "payment" ? (
          <PaymentDistributionChart results={results} />
        ) : (
          <AmortizationChart data={amortizationData} />
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { PaymentResults, PaymentAmortizationDataPoint } from "@/types/payment";
import PaymentDistributionChart from "./PaymentDistributionChart";
import AmortizationChart from "./AmortizationChart";

interface PaymentChartsProps {
  results: PaymentResults;
  amortizationData: PaymentAmortizationDataPoint[];
}

export default function PaymentCharts({
  results,
  amortizationData,
}: PaymentChartsProps) {
  const [activeTab, setActiveTab] = useState<"payment" | "amortization">(
    "payment"
  );

  // Create a unique key based on the data to force re-render
  const chartKey = `${results.loanAmount}-${results.totalPayments}-${results.totalInterest}-${amortizationData.length}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("payment")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "payment"
              ? "text-blue-600 border-b-2 border-blue-500"
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
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View amortization chart"
        >
          Balance Over Time
        </button>
      </div>

      <div className="h-96">
        {activeTab === "payment" ? (
          <PaymentDistributionChart
            key={`payment-${chartKey}`}
            results={results}
          />
        ) : (
          <AmortizationChart
            key={`amortization-${chartKey}`}
            data={amortizationData}
          />
        )}
      </div>
    </div>
  );
}

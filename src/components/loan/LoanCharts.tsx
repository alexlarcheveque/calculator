"use client";

import { useState } from "react";
import {
  LoanResult,
  LoanType,
  LoanInput,
  AmortizedLoanResult,
  AmortizedLoanInput,
  DeferredLoanResult,
  DeferredLoanInput,
  BondLoanResult,
  BondLoanInput,
  formatCurrency,
} from "./LoanPage";
import PaymentDistributionChart from "./PaymentDistributionChart";
import AmortizationOverTimeChart from "./AmortizationOverTimeChart";

interface LoanChartsProps {
  loanType: LoanType;
  results: LoanResult;
  inputs: LoanInput;
}

export default function LoanCharts({
  loanType,
  results,
  inputs,
}: LoanChartsProps) {
  const [activeTab, setActiveTab] = useState<string>("distribution");

  if (!results) {
    return null;
  }

  let tabs: Array<{ id: string; label: string }> = [];
  if (loanType === "amortized") {
    tabs = [
      { id: "distribution", label: "Payment Distribution" },
      { id: "overTime", label: "Amortization Over Time" },
    ];
    if (activeTab === "growth" || activeTab === "components")
      setActiveTab("distribution");
  } else if (loanType === "deferred") {
    tabs = [{ id: "distribution", label: "Loan Breakdown" }];
    if (activeTab === "overTime" || activeTab === "components")
      setActiveTab("distribution");
  } else if (loanType === "bond") {
    tabs = [{ id: "distribution", label: "Discount Breakdown" }];
    if (activeTab === "overTime" || activeTab === "growth")
      setActiveTab("distribution");
  }

  if (!tabs.find((tab) => tab.id === activeTab) && tabs.length > 0) {
    setActiveTab(tabs[0].id);
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 font-medium text-sm mr-4 ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label={`View ${tab.label} chart`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full">
        {loanType === "amortized" && activeTab === "distribution" && (
          <PaymentDistributionChart
            key={`dist-amort-${JSON.stringify(results)}`}
            loanType={loanType}
            results={results}
          />
        )}
        {loanType === "amortized" && activeTab === "overTime" && (
          <AmortizationOverTimeChart
            key={`amort-overtime-${JSON.stringify(results)}`}
            data={(results as AmortizedLoanResult).amortizationSchedule || []}
            formatCurrency={formatCurrency}
          />
        )}

        {loanType === "deferred" && activeTab === "distribution" && (
          <PaymentDistributionChart
            key={`dist-def-${JSON.stringify(results)}`}
            loanType={loanType}
            results={results}
          />
        )}

        {loanType === "bond" && activeTab === "distribution" && (
          <PaymentDistributionChart
            key={`dist-bond-${JSON.stringify(results)}`}
            loanType={loanType}
            results={results}
          />
        )}
      </div>
    </div>
  );
}

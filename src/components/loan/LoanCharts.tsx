"use client";

import { LoanResult, LoanType } from "./LoanPage";
import PaymentDistributionChart from "./PaymentDistributionChart";

interface LoanChartsProps {
  loanType: LoanType;
  results: LoanResult;
}

export default function LoanCharts({ loanType, results }: LoanChartsProps) {
  // Only render the chart if there are results to display
  if (!results) {
    return null;
  }
  // For Bond and Deferred, principal and interest are the main components.
  // For Amortized, it's also principal and total interest over the loan life, displayed in the chart.

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">
        Loan Breakdown
      </h2>
      <PaymentDistributionChart
        key={JSON.stringify(results)}
        loanType={loanType}
        results={results}
      />
    </div>
  );
}

import { RefinanceResults } from "@/types/refinance";
import { formatCurrency } from "@/utils/refinanceCalculations";

interface LoanComparisonSummaryProps {
  results: RefinanceResults;
  currentInterestRate: number;
}

export default function LoanComparisonSummary({
  results,
  currentInterestRate,
}: LoanComparisonSummaryProps) {
  const formatPercentage = (value: number, decimals: number = 3): string => {
    return `${value.toFixed(decimals)}%`;
  };

  const monthsDifference =
    results.currentRemainingPayments -
    (results.timeToPayOffNew.years * 12 + results.timeToPayOffNew.months);
  const aprDifference = currentInterestRate - results.newLoanAPR;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Loan Comparison Summary
      </h2>

      {/* Summary Text */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-700 leading-relaxed">
          The APR for the new loan is {formatPercentage(results.newLoanAPR)},
          which is {formatPercentage(Math.abs(aprDifference))}{" "}
          {aprDifference > 0 ? "lower" : "higher"} than the{" "}
          {formatPercentage(currentInterestRate, 1)} interest rate of the
          current loan. Refinancing would be financially{" "}
          <span className="font-semibold">
            {results.totalCostSavings > 0 ? "less expensive" : "more expensive"}
          </span>
          .
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* New Monthly Payment */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">New monthly payment</div>
          <div className="text-2xl font-bold text-gray-800">
            {formatCurrency(results.newMonthlyPayment)}
          </div>
        </div>

        {/* Monthly Savings */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">
            {results.monthlyPaymentDifference < 0
              ? "Monthly savings"
              : "Monthly increase"}
          </div>
          <div
            className={`text-2xl font-bold ${
              results.monthlyPaymentDifference < 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {formatCurrency(Math.abs(results.monthlyPaymentDifference))}
            <span className="text-sm font-normal text-gray-600">/month</span>
          </div>
        </div>

        {/* Time Difference */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">Loan term change</div>
          <div
            className={`text-2xl font-bold ${
              monthsDifference > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {Math.abs(monthsDifference)}
            <span className="text-sm font-normal text-gray-600"> months </span>
            <span className="text-sm font-normal">
              {monthsDifference > 0 ? "faster" : "longer"}
            </span>
          </div>
        </div>

        {/* Total Cost Impact */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">
            {results.totalCostSavings > 0
              ? "Total lifetime savings"
              : "Total extra cost"}
          </div>
          <div
            className={`text-2xl font-bold ${
              results.totalCostSavings > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(Math.abs(results.totalCostSavings))}
          </div>
        </div>

        {/* Upfront Cost */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">Upfront cost</div>
          <div className="text-2xl font-bold text-gray-800">
            {formatCurrency(results.totalClosingCosts)}
          </div>
        </div>

        {/* Break Even Point */}
        {results.breakEvenMonths > 0 && results.breakEvenMonths < 360 && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Break even point</div>
            <div className="text-2xl font-bold text-gray-800">
              {results.breakEvenMonths}
              <span className="text-sm font-normal text-gray-600"> months</span>
            </div>
          </div>
        )}
      </div>

      {/* Cash Out Information (if applicable) */}
      {results.netCashOut > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Cash Out Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-green-600">Cash out amount</div>
              <div className="text-xl font-bold text-green-800">
                {formatCurrency(results.netCashOut)}
              </div>
            </div>
            <div>
              <div className="text-sm text-green-600">
                Take home after costs
              </div>
              <div className="text-xl font-bold text-green-800">
                {formatCurrency(results.netCashOut - results.totalClosingCosts)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

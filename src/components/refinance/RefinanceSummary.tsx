import { RefinanceResults } from "@/types/refinance";
import {
  formatCurrency,
  formatCurrencyDetailed,
} from "@/utils/refinanceCalculations";

interface RefinanceSummaryProps {
  results: RefinanceResults;
}

export default function RefinanceSummary({ results }: RefinanceSummaryProps) {
  const isPositiveSavings = results.monthlyPaymentDifference < 0;
  const hasBreakEven =
    results.breakEvenMonths > 0 && results.breakEvenMonths < 360; // 30 years max

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Refinance Summary
      </h2>

      {/* Main Comparison Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Monthly Payment Comparison
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Current Payment</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.currentMonthlyPayment)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Monthly principal & interest
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-sm text-blue-600">New Payment</div>
            <div className="text-2xl font-bold text-blue-800">
              {formatCurrency(results.newMonthlyPayment)}
            </div>
            <div className="text-xs text-blue-500 mt-1">
              Monthly principal & interest
            </div>
          </div>

          <div
            className={`p-4 rounded-lg border ${
              isPositiveSavings
                ? "bg-green-50 border-green-100"
                : "bg-red-50 border-red-100"
            }`}
          >
            <div
              className={`text-sm ${
                isPositiveSavings ? "text-green-600" : "text-red-600"
              }`}
            >
              Monthly Difference
            </div>
            <div
              className={`text-2xl font-bold ${
                isPositiveSavings ? "text-green-800" : "text-red-800"
              }`}
            >
              {formatCurrency(Math.abs(results.monthlyPaymentDifference))}
            </div>
            <div
              className={`text-xs mt-1 ${
                isPositiveSavings ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositiveSavings ? "Monthly savings" : "Monthly increase"}
            </div>
          </div>
        </div>
      </div>

      {/* Break-Even Analysis */}
      {hasBreakEven && (
        <div className="mb-6">
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
            <div className="text-sm text-yellow-600 font-medium">
              Break-Even Point
            </div>
            <div className="text-3xl font-bold text-yellow-800 mb-2">
              {Math.floor(results.breakEvenMonths / 12)} years{" "}
              {results.breakEvenMonths % 12} months
            </div>
            <div className="text-sm text-yellow-600">
              Time to recover closing costs through monthly savings
            </div>
          </div>
        </div>
      )}

      {/* Financial Overview */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Financial Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">New Loan Amount</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.newLoanAmount)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Remaining balance + cash out + costs
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Closing Costs</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalClosingCosts)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Points: {formatCurrency(results.pointsCost)} + Fees:{" "}
              {formatCurrency(results.totalClosingCosts - results.pointsCost)}
            </div>
          </div>

          {results.netCashOut !== 0 && (
            <div
              className={`p-4 rounded-lg border col-span-1 sm:col-span-2 ${
                results.netCashOut > 0
                  ? "bg-blue-50 border-blue-100"
                  : "bg-orange-50 border-orange-100"
              }`}
            >
              <div
                className={`text-sm ${
                  results.netCashOut > 0 ? "text-blue-600" : "text-orange-600"
                }`}
              >
                {results.netCashOut > 0
                  ? "Net Cash Received"
                  : "Net Cash Contributed"}
              </div>
              <div
                className={`text-2xl font-bold ${
                  results.netCashOut > 0 ? "text-blue-800" : "text-orange-800"
                }`}
              >
                {formatCurrency(Math.abs(results.netCashOut))}
              </div>
              <div
                className={`text-xs mt-1 ${
                  results.netCashOut > 0 ? "text-blue-500" : "text-orange-500"
                }`}
              >
                {results.netCashOut > 0
                  ? "Cash you receive after closing costs"
                  : "Additional cash you pay at closing"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interest Comparison */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Interest Comparison
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">
              Current Loan Remaining Interest
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.currentTotalRemainingInterest)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Interest left to pay on current loan
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">New Loan Total Interest</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.newTotalInterest)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total interest on new loan
            </div>
          </div>

          <div
            className={`p-4 rounded-lg border col-span-1 sm:col-span-2 ${
              results.totalInterestSavings > 0
                ? "bg-green-50 border-green-100"
                : "bg-red-50 border-red-100"
            }`}
          >
            <div
              className={`text-sm ${
                results.totalInterestSavings > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {results.totalInterestSavings > 0
                ? "Interest Savings"
                : "Additional Interest Cost"}
            </div>
            <div
              className={`text-2xl font-bold ${
                results.totalInterestSavings > 0
                  ? "text-green-800"
                  : "text-red-800"
              }`}
            >
              {formatCurrency(Math.abs(results.totalInterestSavings))}
            </div>
            <div
              className={`text-xs mt-1 ${
                results.totalInterestSavings > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {results.totalInterestSavings > 0
                ? "Total interest savings over loan life"
                : "Additional interest you will pay"}
            </div>
          </div>
        </div>
      </div>

      {/* Time Comparison */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Payoff Time Comparison
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Current Loan Payoff</div>
            <div className="text-xl font-bold text-gray-800">
              {results.timeToPayOffCurrent.years}y{" "}
              {results.timeToPayOffCurrent.months}m
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Time remaining on current loan
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">New Loan Payoff</div>
            <div className="text-xl font-bold text-gray-800">
              {results.timeToPayOffNew.years}y {results.timeToPayOffNew.months}m
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Full term of new loan
            </div>
          </div>

          <div
            className={`p-4 rounded-lg border ${
              results.timeToPayOffNew.years * 12 +
                results.timeToPayOffNew.months <
              results.timeToPayOffCurrent.years * 12 +
                results.timeToPayOffCurrent.months
                ? "bg-green-50 border-green-100"
                : "bg-red-50 border-red-100"
            }`}
          >
            <div
              className={`text-sm ${
                results.timeToPayOffNew.years * 12 +
                  results.timeToPayOffNew.months <
                results.timeToPayOffCurrent.years * 12 +
                  results.timeToPayOffCurrent.months
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Time Difference
            </div>
            <div
              className={`text-xl font-bold ${
                results.timeToPayOffNew.years * 12 +
                  results.timeToPayOffNew.months <
                results.timeToPayOffCurrent.years * 12 +
                  results.timeToPayOffCurrent.months
                  ? "text-green-800"
                  : "text-red-800"
              }`}
            >
              {results.timeSavings.years}y {results.timeSavings.months}m
            </div>
            <div
              className={`text-xs mt-1 ${
                results.timeToPayOffNew.years * 12 +
                  results.timeToPayOffNew.months <
                results.timeToPayOffCurrent.years * 12 +
                  results.timeToPayOffCurrent.months
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {results.timeToPayOffNew.years * 12 +
                results.timeToPayOffNew.months <
              results.timeToPayOffCurrent.years * 12 +
                results.timeToPayOffCurrent.months
                ? "Time saved"
                : "Additional time"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

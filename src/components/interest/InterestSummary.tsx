import {
  InterestCalculatorResult,
  formatCurrency, // Assuming this will be in InterestPage.tsx or a shared utils file
} from "./InterestPage";

interface InterestSummaryProps {
  results: InterestCalculatorResult;
}

export default function InterestSummary({ results }: InterestSummaryProps) {
  if (!results) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">
          Enter your investment details to see the results.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Investment Summary
      </h2>

      {/* Final Balance Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Final Results
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Main Ending Balance */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-sm text-gray-600">Ending Balance</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.endingBalance)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total value after investment period
            </div>
          </div>

          {/* Buying Power After Inflation */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-sm text-gray-600">
              Buying Power (After Inflation)
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.buyingPowerAfterInflation)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Value in today's purchasing power
            </div>
          </div>
        </div>
      </div>

      {/* Investment Breakdown Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Investment Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">
              Total Principal Invested
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalPrincipal)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Initial investment plus contributions
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Contributions</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalContributions)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Additional contributions made
            </div>
          </div>
        </div>
      </div>

      {/* Interest Earnings Section */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Interest Earnings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="text-sm text-gray-600">Total Interest Earned</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalInterest)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total growth from compound interest
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">
              Interest from Initial Investment
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.interestOfInitialInvestment)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Growth from starting amount
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">
              Interest from Contributions
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.interestOfContributions)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Growth from additional contributions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

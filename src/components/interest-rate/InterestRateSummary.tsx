import { InterestRateResults } from "@/types/interestRate";
import {
  formatCurrency,
  formatPercentage,
} from "@/utils/interestRateCalculations";

interface InterestRateSummaryProps {
  results: InterestRateResults;
}

export default function InterestRateSummary({
  results,
}: InterestRateSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Results</h2>
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm text-gray-500">Calculated</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Interest Rate */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Interest Rate</p>
              <p className="text-2xl font-bold text-blue-800">
                {formatPercentage(results.interestRate)}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Total of Payments */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">
                Total of {results.totalPayments} monthly payments
              </p>
              <p className="text-2xl font-bold text-green-800">
                {formatCurrency(results.totalOfPayments)}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Interest Paid */}
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">
                Total Interest Paid
              </p>
              <p className="text-2xl font-bold text-orange-800">
                {formatCurrency(results.totalInterestPaid)}
              </p>
            </div>
            <div className="p-2 bg-orange-100 rounded-full">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Loan Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Loan Amount</p>
            <p className="font-semibold text-gray-800">
              {formatCurrency(results.loanAmount)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Monthly Payment</p>
            <p className="font-semibold text-gray-800">
              {formatCurrency(results.monthlyPayment)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Loan Term</p>
            <p className="font-semibold text-gray-800">
              {results.loanTermYears > 0 && `${results.loanTermYears} years`}
              {results.loanTermYears > 0 && results.loanTermMonths > 0 && " "}
              {results.loanTermMonths > 0 && `${results.loanTermMonths} months`}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Payments</p>
            <p className="font-semibold text-gray-800">
              {results.totalPayments} payments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

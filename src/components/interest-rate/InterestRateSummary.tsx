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
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Interest Rate Results
      </h2>

      {/* Main Results Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Calculated Rate
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Interest Rate */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600">Interest Rate</div>
            <div className="text-2xl font-bold text-blue-800">
              {formatPercentage(results.interestRate)}
            </div>
            <div className="text-xs text-blue-500 mt-1">
              Annual Percentage Rate (APR)
            </div>
          </div>

          {/* Total of Payments */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total of Payments</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalOfPayments)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {results.totalPayments} payments
            </div>
          </div>

          {/* Total Interest Paid */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Interest Paid</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalInterestPaid)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Over loan term</div>
          </div>
        </div>
      </div>

      {/* Loan Details Section */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Loan Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Loan Amount</div>
            <div className="text-lg font-bold text-gray-800">
              {formatCurrency(results.loanAmount)}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Monthly Payment</div>
            <div className="text-lg font-bold text-gray-800">
              {formatCurrency(results.monthlyPayment)}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Loan Term</div>
            <div className="text-lg font-bold text-gray-800">
              {results.loanTermYears > 0 && `${results.loanTermYears} years`}
              {results.loanTermYears > 0 && results.loanTermMonths > 0 && " "}
              {results.loanTermMonths > 0 && `${results.loanTermMonths} months`}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Payments</div>
            <div className="text-lg font-bold text-gray-800">
              {results.totalPayments} payments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

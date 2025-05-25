import { WithdrawalResults } from "@/types/retirement";
import { formatCurrency } from "@/utils/formatters";

interface WithdrawalSummaryProps {
  results: WithdrawalResults;
}

export default function WithdrawalSummary({ results }: WithdrawalSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Withdrawal Analysis Summary
      </h2>

      {/* Savings at Retirement */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Retirement Savings
        </h3>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-sm text-gray-600">
            Total Savings at Retirement
          </div>
          <div className="text-2xl font-bold text-blue-700">
            {formatCurrency(results.savingsAtRetirement)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Accumulated savings when you retire
          </div>
        </div>
      </div>

      {/* Monthly Withdrawal Options */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Monthly Withdrawal Amount
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-gray-600">
              Monthly Withdrawal (Nominal)
            </div>
            <div className="text-2xl font-bold text-green-700">
              {formatCurrency(results.monthlyWithdrawalAmount)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Amount in future dollars
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-sm text-gray-600">
              Monthly Withdrawal (Today's $)
            </div>
            <div className="text-2xl font-bold text-purple-700">
              {formatCurrency(results.monthlyWithdrawalAmountInflationAdjusted)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Purchasing power in today's dollars
            </div>
          </div>
        </div>
      </div>

      {/* Retirement Totals */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Retirement Totals
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Withdrawals</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalWithdrawals)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total amount withdrawn during retirement
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Years in Retirement</div>
            <div className="text-2xl font-bold text-gray-800">
              {results.yearsInRetirement}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Expected retirement duration
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="text-sm text-yellow-800">
          <strong>Note:</strong> These calculations assume your savings will
          last exactly through your expected life span. Consider planning for a
          longer life expectancy or lower withdrawal rates for added security.
        </div>
      </div>
    </div>
  );
}

import { RefinanceResults } from "@/types/refinance";
import { formatCurrency } from "@/utils/refinanceCalculations";

interface LoanComparisonDetailsProps {
  results: RefinanceResults;
  currentInterestRate: number;
}

export default function LoanComparisonDetails({
  results,
  currentInterestRate,
}: LoanComparisonDetailsProps) {
  const formatPercentage = (value: number, decimals: number = 3): string => {
    return `${value.toFixed(decimals)}%`;
  };

  const formatDifference = (
    value: number,
    isPercentage: boolean = false,
    isCurrency: boolean = false
  ): string => {
    if (value === 0) return "$0.00";

    if (isCurrency) {
      const formatted = formatCurrency(Math.abs(value));
      return value < 0 ? `-${formatted}` : `+${formatted}`;
    }

    if (isPercentage) {
      const formatted = formatPercentage(Math.abs(value));
      return value < 0 ? `-${formatted}` : `+${formatted}`;
    }

    return value < 0 ? `${value}` : `+${value}`;
  };

  const monthsDifference =
    results.currentRemainingPayments -
    (results.timeToPayOffNew.years * 12 + results.timeToPayOffNew.months);
  const aprDifference = currentInterestRate - results.newLoanAPR;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Loan Comparison Details
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
                Metric
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">
                Current Loan (Remaining)
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">
                New Loan
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">
                Difference
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Principal/Loan Amount */}
            <tr>
              <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                Principal/loan amount
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatCurrency(results.currentLoanRemainingBalance)}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatCurrency(results.newLoanAmount)}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatDifference(
                  results.newLoanAmount - results.currentLoanRemainingBalance,
                  false,
                  true
                )}
              </td>
            </tr>

            {/* Monthly Payment */}
            <tr className="bg-gray-25">
              <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                Monthly payment
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatCurrency(results.currentMonthlyPayment)}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatCurrency(results.newMonthlyPayment)}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                <span
                  className={
                    results.monthlyPaymentDifference < 0
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {formatDifference(
                    results.monthlyPaymentDifference,
                    false,
                    true
                  )}
                </span>
              </td>
            </tr>

            {/* Length */}
            <tr>
              <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                Length
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {results.currentRemainingPayments} months
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {results.timeToPayOffNew.years * 12 +
                  results.timeToPayOffNew.months}{" "}
                months
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                <span
                  className={
                    monthsDifference > 0
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {formatDifference(-monthsDifference)} months
                </span>
              </td>
            </tr>

            {/* Interest Rate/APR */}
            <tr className="bg-gray-25">
              <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                Interest rate/APR
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatPercentage(currentInterestRate, 1)}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatPercentage(results.newLoanAPR)}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                <span
                  className={
                    aprDifference > 0
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {formatDifference(-aprDifference, true)}
                </span>
              </td>
            </tr>

            {/* Total Monthly Payments */}
            <tr>
              <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                Total monthly payments
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatCurrency(results.currentTotalRemainingPayments)}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatCurrency(results.newTotalPayments)}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                <span
                  className={
                    results.totalCostSavings > 0
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {formatDifference(-results.totalCostSavings, false, true)}
                </span>
              </td>
            </tr>

            {/* Total Interest */}
            <tr className="bg-gray-25">
              <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                Total interest
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatCurrency(results.currentTotalRemainingInterest)}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatCurrency(results.newTotalInterest)}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                <span
                  className={
                    results.totalInterestSavings > 0
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {formatDifference(-results.totalInterestSavings, false, true)}
                </span>
              </td>
            </tr>

            {/* Cost + Points (Upfront) */}
            <tr>
              <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                Cost + points (upfront)
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                —
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {formatCurrency(results.totalClosingCosts)}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                —
              </td>
            </tr>

            {/* Cash Out (if applicable) */}
            {results.netCashOut > 0 && (
              <tr className="bg-gray-25">
                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                  Cash out
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  $0.00
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {formatCurrency(results.netCashOut)}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  —
                </td>
              </tr>
            )}

            {/* Take Home Amount After Cost/Point (if cash out) */}
            {results.netCashOut > 0 && (
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                  Take home amount after cost/point
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  $0.00
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {formatCurrency(
                    results.netCashOut - results.totalClosingCosts
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  —
                </td>
              </tr>
            )}

            {/* Time to Recover Cost/Point */}
            <tr className="bg-gray-25">
              <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                Time to recover cost/point
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                —
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {results.breakEvenMonths > 0 && results.breakEvenMonths < 360
                  ? `${results.breakEvenMonths} months`
                  : "Not applicable"}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                —
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Additional Notes */}
      <div className="mt-4 text-xs text-gray-500">
        <p>* Calculations include points and fees in APR computation</p>
        <p>
          * Green values indicate savings/benefits, red values indicate
          costs/disadvantages
        </p>
      </div>
    </div>
  );
}

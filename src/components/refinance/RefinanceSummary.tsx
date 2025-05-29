import { RefinanceResults } from "@/types/refinance";
import { formatCurrency } from "@/utils/refinanceCalculations";

interface LoanComparisonSummaryProps {
  results: RefinanceResults;
  currentInterestRate: number;
  newInterestRate: number;
}

export default function LoanComparisonSummary({
  results,
  currentInterestRate,
  newInterestRate,
}: LoanComparisonSummaryProps) {
  const formatPercentage = (value: number, decimals: number = 2): string => {
    return `${value.toFixed(decimals)}%`;
  };

  const aprDifference = currentInterestRate - results.newLoanAPR;
  let aprComparisonText;
  let isFavorableAPRDifference = false;
  if (aprDifference > 0.001) {
    aprComparisonText = "lower than";
    isFavorableAPRDifference = true;
  } else if (aprDifference < -0.001) {
    aprComparisonText = "higher than";
    isFavorableAPRDifference = false;
  } else {
    aprComparisonText = "effectively the same as";
    // Consider this neutral or slightly unfavorable for simplicity unless APR is strictly lower
    isFavorableAPRDifference = results.newLoanAPR < currentInterestRate - 0.001;
  }

  const financialVerdictText =
    results.totalCostSavings > 0 ? "less expensive" : "more expensive";
  const isFavorableVerdict = results.totalCostSavings > 0;

  const monthlyDifferenceText =
    results.monthlyPaymentDifference < 0 ? "decrease" : "increase";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Refinance Summary
      </h2>

      {/* Informational Verdict Card - Option 1 */}
      <div
        className={`mb-6 p-4 rounded-lg border ${
          isFavorableVerdict
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        } text-left`}
      >
        <p
          className={`text-sm ${
            isFavorableVerdict ? "text-green-700" : "text-red-700"
          } leading-relaxed`}
        >
          Your new estimated monthly payment would be{" "}
          <strong
            className={isFavorableVerdict ? "text-green-800" : "text-red-800"}
          >
            {formatCurrency(results.newMonthlyPayment)}
          </strong>
          . This is a {monthlyDifferenceText} of{" "}
          <strong
            className={isFavorableVerdict ? "text-green-800" : "text-red-800"}
          >
            {formatCurrency(Math.abs(results.monthlyPaymentDifference))}
          </strong>{" "}
          per month. Overall, refinancing would be financially{" "}
          <strong
            className={isFavorableVerdict ? "text-green-800" : "text-red-800"}
          >
            {financialVerdictText}
          </strong>
          .
        </p>
      </div>

      {/* Key Comparison */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Key Comparison
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Current Payment</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.currentMonthlyPayment)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              at {formatPercentage(currentInterestRate)} interest rate
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">New Payment</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.newMonthlyPayment)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              at {formatPercentage(newInterestRate)} interest rate
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line Impact */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Bottom Line Impact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Monthly Change</div>
            <div
              className={`text-2xl font-bold ${
                results.monthlyPaymentDifference < 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {results.monthlyPaymentDifference < 0 ? "" : "+"}
              {results.monthlyPaymentDifference < 0
                ? formatCurrency(Math.abs(results.monthlyPaymentDifference))
                : formatCurrency(results.monthlyPaymentDifference)}
            </div>
            <div
              className={`text-xs mt-1 ${
                results.monthlyPaymentDifference < 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {results.monthlyPaymentDifference < 0
                ? "Monthly savings"
                : "Monthly increase"}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Cost Impact</div>
            <div
              className={`text-2xl font-bold ${
                results.totalCostSavings > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {results.totalCostSavings > 0 ? "" : "+"}
              {formatCurrency(Math.abs(results.totalCostSavings))}
            </div>
            <div
              className={`text-xs mt-1 ${
                results.totalCostSavings > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {results.totalCostSavings > 0
                ? "Lifetime savings"
                : "Extra lifetime cost"}
            </div>
          </div>
        </div>
      </div>

      {/* Upfront Cost */}
      <div className={results.cashOutAmount !== 0 ? "mb-6" : ""}>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Upfront Cost
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="text-sm text-gray-600">Total Closing Costs</div>
          <div className="text-2xl font-bold text-gray-800">
            {formatCurrency(results.totalClosingCosts)}
          </div>
          {results.breakEvenMonths > 0 && results.breakEvenMonths < 360 && (
            <div className="text-xs text-gray-500 mt-1">
              Break-even in {results.breakEvenMonthsFormatted}
            </div>
          )}
        </div>
      </div>

      {/* Cash Out (if applicable) */}
      {results.cashOutAmount !== 0 && (
        <div>
          <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
            Cash Out from Home Equity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-600">Amount You'll Receive</div>
              <div className="text-2xl font-bold text-gray-800">
                {formatCurrency(results.cashOutAmount)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Cash from your home's equity
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-600">
                {results.netCashOut > 0
                  ? "Cash You'll Receive"
                  : "Extra Cash Needed"}
              </div>
              <div
                className={`text-2xl font-bold ${
                  results.netCashOut > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(Math.abs(results.netCashOut))}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {results.netCashOut > 0
                  ? "After paying closing costs"
                  : "To fully cover closing costs"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

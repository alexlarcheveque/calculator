import { PaymentResults, PaymentCalculatorMode } from "@/types/payment";
import { formatCurrency, formatPercentage } from "@/utils/paymentCalculations";

interface PaymentSummaryProps {
  results: PaymentResults;
  calculatorMode: PaymentCalculatorMode;
}

export default function PaymentSummary({
  results,
  calculatorMode,
}: PaymentSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Payment Summary
      </h2>

      {/* Main Result Section */}
      <div className="mb-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          {calculatorMode === PaymentCalculatorMode.FIXED_TERM ? (
            <>
              <div className="text-sm text-blue-600 font-medium">
                Monthly Payment
              </div>
              <div className="text-3xl font-bold text-blue-800 mb-2">
                {formatCurrency(results.monthlyPayment!)}
              </div>
              <div className="text-sm text-blue-600">
                You will need to pay {formatCurrency(results.monthlyPayment!)}{" "}
                every month to payoff the debt.
              </div>
            </>
          ) : (
            <>
              <div className="text-sm text-blue-600 font-medium">
                Time to Pay Off Debt
              </div>
              <div className="text-3xl font-bold text-blue-800 mb-2">
                {results.payoffTimeYears} years {results.payoffTimeMonths}{" "}
                months
              </div>
              <div className="text-sm text-blue-600">
                Time required to pay off the loan with your monthly payment.
              </div>
            </>
          )}
        </div>
      </div>

      {/* Financial Summary Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Financial Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total of All Payments</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalPayments)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Principal + Interest over loan life
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Interest</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalInterest)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Interest paid over loan life
            </div>
          </div>
        </div>
      </div>

      {/* Principal vs Interest Breakdown */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Payment Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Principal</div>
            <div className="text-xl font-bold text-gray-800">
              {formatCurrency(results.loanAmount)}
            </div>
            <div className="text-sm font-medium text-blue-600">
              {formatPercentage(results.principalPercentage)} of total payments
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Interest</div>
            <div className="text-xl font-bold text-gray-800">
              {formatCurrency(results.totalInterest)}
            </div>
            <div className="text-sm font-medium text-green-600">
              {formatPercentage(results.interestPercentage)} of total payments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

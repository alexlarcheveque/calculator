import { MortgageResults } from "@/types/mortgage";
import {
  formatCurrencyDetailed,
  formatCurrency,
} from "@/utils/mortgageCalculations";

interface MortgageSummaryProps {
  results: MortgageResults;
}

export default function MortgageSummary({ results }: MortgageSummaryProps) {
  // Format the payoff date
  const payoffDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(results.payoffDate);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Payment Summary
      </h2>

      {/* Monthly Payments Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Monthly Payments
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Principal & Interest */}
          <div className="bg-primary-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Principal & Interest</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrencyDetailed(results.monthlyPrincipalAndInterest)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Monthly mortgage payment
            </div>
          </div>

          {/* Main Monthly Payment */}
          <div className="bg-gray-50 p-4 rounded-lg border border-primary-100">
            <div className="text-sm text-gray-600">Total Monthly Payment</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrencyDetailed(results.totalMonthlyPayment)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Including principal, interest, taxes & insurance
            </div>
          </div>
          {/* Additional Monthly Expenses */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="text-sm text-gray-600">Property Tax:</div>
              <div className="text-sm font-medium text-gray-800">
                {formatCurrencyDetailed(results.monthlyPropertyTax)}
              </div>
            </div>
            <div className="flex justify-between items-center mb-1">
              <div className="text-sm text-gray-600">Home Insurance:</div>
              <div className="text-sm font-medium text-gray-800">
                {formatCurrencyDetailed(results.monthlyHomeInsurance)}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">HOA:</div>
              <div className="text-sm font-medium text-gray-800">
                {formatCurrencyDetailed(results.monthlyHOA)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Overview Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Loan Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Loan Amount</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.loanAmount)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Total principal</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Payoff Date</div>
            <div className="text-2xl font-bold text-gray-800">{payoffDate}</div>
            <div className="text-xs text-gray-500 mt-1">
              When your mortgage will be paid off
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">
              Recommended Gross Income
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency((results.totalMonthlyPayment / 0.28) * 12) +
                "/yr"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Based on standard 28% gross income affordability rule
            </div>
          </div>
        </div>
      </div>

      {/* Lifetime Totals Section */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Lifetime Totals
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Loan Payment</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalPaymentAmount)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Excluding property tax, home insurance, and HOA
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Interest</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalInterestPaid)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Over the life of the loan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

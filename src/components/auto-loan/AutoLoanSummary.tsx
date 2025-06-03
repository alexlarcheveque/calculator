import { AutoLoanResults } from "@/types/autoLoan";
import {
  formatCurrency,
  formatCurrencyDetailed,
} from "@/utils/autoLoanCalculations";

interface AutoLoanSummaryProps {
  results: AutoLoanResults | null; // Allow null for initial state
}

export default function AutoLoanSummary({ results }: AutoLoanSummaryProps) {
  if (!results) {
    // You could return a placeholder, a loading state, or null
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">
          Enter details in the form to see the summary.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Loan Summary
      </h2>

      {/* Key Metrics Section */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
        <h3 className="text-md font-medium mb-1 text-gray-600">
          Monthly Payment
        </h3>
        <div className="text-3xl font-bold text-gray-800 mb-3">
          {formatCurrencyDetailed(results.monthlyPayment)}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Total Loan Amount</div>
            <div className="font-medium text-gray-700">
              {formatCurrency(results.totalLoanAmount)}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Sales Tax</div>
            <div className="font-medium text-gray-700">
              {formatCurrency(results.salesTaxAmount)}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Upfront Payment</div>
            <div className="font-medium text-gray-700">
              {formatCurrency(results.upfrontPayment)}
            </div>
          </div>
        </div>
      </div>

      {/* Totals Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Loan Totals
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total of Payments</div>
            <div className="text-xl font-bold text-gray-800">
              {formatCurrency(results.totalLoanPayments)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              All monthly payments combined
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Loan Interest</div>
            <div className={"text-xl font-bold text-gray-800"}>
              {formatCurrency(results.totalLoanInterest)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Interest paid over loan term
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Cost</div>
            <div className="text-xl font-bold text-gray-800">
              {formatCurrency(results.totalCost)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Price, interest, tax, fees
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

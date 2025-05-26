import { IncomeTaxResults } from "@/types/incomeTax";
import {
  formatCurrency,
  formatPercentage,
} from "@/utils/incomeTaxCalculations";

interface IncomeTaxSummaryProps {
  results: IncomeTaxResults;
}

export default function IncomeTaxSummary({ results }: IncomeTaxSummaryProps) {
  const isRefund = results.refundOrOwed > 0;
  const refundOrOwedAmount = Math.abs(results.refundOrOwed);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Tax Calculation Summary
      </h2>

      {/* Main Result */}
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            {isRefund ? "Expected Refund" : "Amount Owed"}
          </h3>
          <div
            className={`text-3xl font-bold ${
              isRefund ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(refundOrOwedAmount)}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {isRefund
              ? "You may receive a refund"
              : "Additional tax payment required"}
          </p>
        </div>
      </div>

      {/* Income Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
            Income Summary
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Gross Income:</span>
              <span className="font-medium">
                {formatCurrency(results.grossIncome)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Adjusted Gross Income:</span>
              <span className="font-medium">
                {formatCurrency(results.adjustedGrossIncome)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxable Income:</span>
              <span className="font-medium">
                {formatCurrency(results.taxableIncome)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
            Tax Summary
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Federal Tax Owed:</span>
              <span className="font-medium">
                {formatCurrency(results.federalTaxOwed)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Tax Withheld:</span>
              <span className="font-medium">
                {formatCurrency(results.totalTaxWithheld)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Credits:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(results.totalCredits)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Deductions */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4">
          Deductions Used
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Standard Deduction</div>
            <div className="font-medium">
              {formatCurrency(results.standardDeduction)}
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Itemized Deductions</div>
            <div className="font-medium">
              {formatCurrency(results.itemizedDeductions)}
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded border border-blue-200">
            <div className="text-sm text-gray-600">Deduction Used</div>
            <div className="font-medium text-blue-600">
              {formatCurrency(results.deductionUsed)}
            </div>
            <div className="text-xs text-gray-500">
              {results.deductionUsed === results.standardDeduction
                ? "Standard"
                : "Itemized"}
            </div>
          </div>
        </div>
      </div>

      {/* Tax Credits Breakdown */}
      {results.totalCredits > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4">
            Tax Credits Applied
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.childTaxCredit > 0 && (
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-gray-600">Child Tax Credit:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(results.childTaxCredit)}
                </span>
              </div>
            )}

            {results.childCareCredit > 0 && (
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-gray-600">Child Care Credit:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(results.childCareCredit)}
                </span>
              </div>
            )}

            {results.educationCredit > 0 && (
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-gray-600">Education Credit:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(results.educationCredit)}
                </span>
              </div>
            )}

            {results.earnedIncomeCredit > 0 && (
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-gray-600">Earned Income Credit:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(results.earnedIncomeCredit)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tax Rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-medium text-gray-800 mb-2">Effective Tax Rate</h4>
          <div className="text-2xl font-bold text-blue-600">
            {formatPercentage(results.effectiveTaxRate)}
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Percentage of total income paid in taxes
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-medium text-gray-800 mb-2">Marginal Tax Rate</h4>
          <div className="text-2xl font-bold text-purple-600">
            {formatPercentage(results.marginalTaxRate)}
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Tax rate on your next dollar of income
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• This is an estimate based on the information provided</li>
          <li>
            • Actual tax calculations may vary based on additional factors
          </li>
          <li>• Consult a tax professional for complex situations</li>
          <li>
            • Results are based on current tax brackets and standard deductions
          </li>
        </ul>
      </div>
    </div>
  );
}

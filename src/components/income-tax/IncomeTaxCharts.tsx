"use client";

import { IncomeTaxResults, TaxCalculationBreakdown } from "@/types/incomeTax";
import { formatCurrency } from "@/utils/incomeTaxCalculations";
import TaxBracketChart from "./TaxBracketChart";
import DeductionsChart from "./DeductionsChart";

interface IncomeTaxChartsProps {
  results: IncomeTaxResults;
  breakdown: TaxCalculationBreakdown;
}

export default function IncomeTaxCharts({
  results,
  breakdown,
}: IncomeTaxChartsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Tax Breakdown Charts
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tax Bracket Breakdown */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Tax by Bracket
          </h3>
          <TaxBracketChart breakdown={breakdown} />
        </div>

        {/* Deductions Comparison */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Deductions Comparison
          </h3>
          <DeductionsChart breakdown={breakdown} />
        </div>
      </div>

      {/* Income Flow Chart */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Income Flow</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Gross Income</div>
              <div className="text-lg font-bold text-blue-600">
                {formatCurrency(results.grossIncome)}
              </div>
            </div>

            <div className="text-2xl text-gray-400">→</div>

            <div className="text-center">
              <div className="text-sm text-gray-600">AGI</div>
              <div className="text-lg font-bold text-green-600">
                {formatCurrency(results.adjustedGrossIncome)}
              </div>
            </div>

            <div className="text-2xl text-gray-400">→</div>

            <div className="text-center">
              <div className="text-sm text-gray-600">Taxable Income</div>
              <div className="text-lg font-bold text-purple-600">
                {formatCurrency(results.taxableIncome)}
              </div>
            </div>

            <div className="text-2xl text-gray-400">→</div>

            <div className="text-center">
              <div className="text-sm text-gray-600">
                {results.refundOrOwed > 0 ? "Refund" : "Owed"}
              </div>
              <div
                className={`text-lg font-bold ${
                  results.refundOrOwed > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(Math.abs(results.refundOrOwed))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credits Summary */}
      {results.totalCredits > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Tax Credits Applied
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.childTaxCredit > 0 && (
              <div className="bg-green-50 p-3 rounded text-center">
                <div className="text-sm text-gray-600">Child Tax</div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(results.childTaxCredit)}
                </div>
              </div>
            )}

            {results.childCareCredit > 0 && (
              <div className="bg-blue-50 p-3 rounded text-center">
                <div className="text-sm text-gray-600">Child Care</div>
                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(results.childCareCredit)}
                </div>
              </div>
            )}

            {results.educationCredit > 0 && (
              <div className="bg-purple-50 p-3 rounded text-center">
                <div className="text-sm text-gray-600">Education</div>
                <div className="text-lg font-bold text-purple-600">
                  {formatCurrency(results.educationCredit)}
                </div>
              </div>
            )}

            {results.earnedIncomeCredit > 0 && (
              <div className="bg-yellow-50 p-3 rounded text-center">
                <div className="text-sm text-gray-600">EITC</div>
                <div className="text-lg font-bold text-yellow-600">
                  {formatCurrency(results.earnedIncomeCredit)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

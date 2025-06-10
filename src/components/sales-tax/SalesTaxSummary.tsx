import { SalesTaxResults } from "@/types/salesTax";
import { formatCurrency, formatPercentage } from "@/utils/salesTaxCalculations";

interface SalesTaxSummaryProps {
  results: SalesTaxResults;
}

export default function SalesTaxSummary({ results }: SalesTaxSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Calculation Results
      </h2>

      {/* Price Breakdown Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Price Breakdown
        </h3>
        <div className="flex items-center justify-center bg-gray-50 p-8 rounded-lg border border-gray-100">
          <div className="flex items-center space-x-8 text-2xl">
            <div className="text-center">
              <div className="font-bold text-gray-800 text-3xl">
                {formatCurrency(results.beforeTaxPrice)}
              </div>
              <div className="text-sm text-gray-500 mt-2">Before Tax</div>
            </div>

            <div className="text-4xl font-bold text-gray-600">+</div>

            <div className="text-center">
              <div className="font-bold text-blue-600 text-3xl">
                {formatCurrency(results.salesTaxAmount)}
              </div>
              <div className="text-sm text-gray-500 mt-2">Sales Tax</div>
            </div>

            <div className="text-4xl font-bold text-gray-600">=</div>

            <div className="text-center">
              <div className="font-bold text-green-600 text-4xl">
                {formatCurrency(results.afterTaxPrice)}
              </div>
              <div className="text-sm text-gray-500 mt-2">Total Price</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Analysis Section */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Tax Analysis
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Tax Portion of Total</div>
            <div className="text-lg font-bold text-gray-800">
              {results.afterTaxPrice > 0
                ? formatPercentage(
                    (results.salesTaxAmount / results.afterTaxPrice) * 100
                  )
                : "0.00%"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              How much of your total goes to tax
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Tax Per $100</div>
            <div className="text-lg font-bold text-gray-800">
              {formatCurrency(results.salesTaxRate)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Tax amount on $100 purchase
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

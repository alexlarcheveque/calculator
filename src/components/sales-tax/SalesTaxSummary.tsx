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

      {/* Main Results Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Sales Tax Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Before Tax Price */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Before Tax Price</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.beforeTaxPrice)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Original price without tax
            </div>
          </div>

          {/* Sales Tax Amount */}
          <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
            <div className="text-sm text-gray-600">Sales Tax Amount</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.salesTaxAmount)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Tax added to purchase
            </div>
          </div>

          {/* After Tax Price */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-sm text-gray-600">After Tax Price</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.afterTaxPrice)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total amount to pay
            </div>
          </div>
        </div>
      </div>

      {/* Tax Rate Information */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Tax Rate Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-sm text-gray-600">Sales Tax Rate</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatPercentage(results.salesTaxRate)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Percentage applied to purchase
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">
              Tax as Percentage of Total
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {results.afterTaxPrice > 0
                ? formatPercentage(
                    (results.salesTaxAmount / results.afterTaxPrice) * 100
                  )
                : "0.00%"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Tax portion of final price
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Additional Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Effective Tax Rate</div>
            <div className="text-lg font-bold text-gray-800">
              {results.beforeTaxPrice > 0
                ? formatPercentage(
                    (results.salesTaxAmount / results.beforeTaxPrice) * 100
                  )
                : "0.00%"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Tax as percentage of pre-tax price
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Tax Per Dollar</div>
            <div className="text-lg font-bold text-gray-800">
              {results.salesTaxRate > 0
                ? formatCurrency(results.salesTaxRate / 100)
                : formatCurrency(0)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Tax amount per $1.00 spent
            </div>
          </div>
        </div>
      </div>

      {/* Quick Comparison */}
      {results.beforeTaxPrice > 0 && results.salesTaxRate > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            Quick Comparison
          </h4>
          <div className="text-sm text-yellow-700">
            <p>
              • For every $100 spent before tax, you pay{" "}
              <span className="font-semibold">
                {formatCurrency(100 + results.salesTaxRate)}
              </span>{" "}
              total
            </p>
            <p>
              • The tax adds{" "}
              <span className="font-semibold">
                {formatCurrency(results.salesTaxRate)}
              </span>{" "}
              to every $100 purchase
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

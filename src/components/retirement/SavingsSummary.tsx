import { SavingsResults } from "@/types/retirement";
import { formatCurrency } from "@/utils/formatters";

interface SavingsSummaryProps {
  results: SavingsResults;
}

export default function SavingsSummary({ results }: SavingsSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Savings Plan Summary
      </h2>

      {/* Monthly & Annual Contributions */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Required Contributions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-gray-600">Monthly Contribution</div>
            <div className="text-2xl font-bold text-blue-700">
              {formatCurrency(results.monthlyContributionNeeded)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Required monthly savings
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-gray-600">Annual Contribution</div>
            <div className="text-2xl font-bold text-green-700">
              {formatCurrency(results.annualContributionNeeded)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Required yearly savings
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Contribution Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Contributions</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalContributions)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Amount you'll contribute over {results.yearsToRetirement} years
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Investment Growth</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalGrowth)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Growth from compound interest
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Timeline
        </h3>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-sm text-gray-600">Years to Retirement</div>
          <div className="text-2xl font-bold text-purple-700">
            {results.yearsToRetirement}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Time to reach your goal
          </div>
        </div>
      </div>
    </div>
  );
}

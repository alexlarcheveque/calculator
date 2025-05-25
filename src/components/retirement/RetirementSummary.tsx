import { RetirementResults } from "@/types/retirement";
import { formatCurrency } from "@/utils/formatters";

interface RetirementSummaryProps {
  results: RetirementResults;
}

export default function RetirementSummary({ results }: RetirementSummaryProps) {
  const isShortfall = results.shortfallOrSurplus < 0;
  const absoluteAmount = Math.abs(results.shortfallOrSurplus);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Retirement Analysis Summary
      </h2>

      {/* Key Results Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Key Results
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Shortfall or Surplus */}
          <div
            className={`p-4 rounded-lg border ${
              isShortfall
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200"
            }`}
          >
            <div className="text-sm text-gray-600">
              {isShortfall ? "Retirement Shortfall" : "Retirement Surplus"}
            </div>
            <div
              className={`text-2xl font-bold ${
                isShortfall ? "text-red-700" : "text-green-700"
              }`}
            >
              {formatCurrency(absoluteAmount)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {isShortfall
                ? "Additional savings needed"
                : "Extra savings available"}
            </div>
          </div>

          {/* Income Needed */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-gray-600">Annual Income Needed</div>
            <div className="text-2xl font-bold text-blue-700">
              {formatCurrency(results.incomeNeededAtRetirement)}
            </div>
            <div className="text-xs text-gray-500 mt-1">At retirement age</div>
          </div>

          {/* Total Needed */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-sm text-gray-600">Total Needed</div>
            <div className="text-2xl font-bold text-purple-700">
              {formatCurrency(results.totalNeededAtRetirement)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              To support retirement income
            </div>
          </div>
        </div>
      </div>

      {/* Savings Projection Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Savings Projection
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">
              Projected Savings at Retirement
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.projectedSavingsAtRetirement)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Based on current savings and future contributions
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Contributions</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalContributionsByRetirement)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              You will contribute over {results.yearsToRetirement} years
            </div>
          </div>
        </div>
      </div>

      {/* Action Required Section */}
      {isShortfall && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
            Action Required
          </h3>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-sm text-gray-600">
              Additional Monthly Savings Needed
            </div>
            <div className="text-2xl font-bold text-red-700">
              {formatCurrency(results.monthlyAdditionalSavingsNeeded)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              To meet your retirement goal
            </div>
          </div>
        </div>
      )}

      {/* Timeline Section */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Timeline
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Years to Retirement</div>
            <div className="text-2xl font-bold text-gray-800">
              {results.yearsToRetirement}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Time to save and invest
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Years in Retirement</div>
            <div className="text-2xl font-bold text-gray-800">
              {results.yearsInRetirement}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Expected retirement duration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

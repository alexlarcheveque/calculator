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
      {/* Retirement Status Banner */}
      <div
        className={`mb-6 p-4 rounded-lg ${
          isShortfall
            ? "bg-red-50 border border-red-200"
            : "bg-green-50 border border-green-200"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-2 ${
            isShortfall ? "text-red-700" : "text-green-700"
          }`}
        >
          {isShortfall
            ? "Action Needed: Retirement Shortfall"
            : "On Track: Retirement Plan"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">
              {isShortfall ? "Total Shortfall Amount" : "Retirement Surplus"}
            </div>
            <div
              className={`text-2xl font-bold ${
                isShortfall ? "text-red-700" : "text-green-700"
              }`}
            >
              {formatCurrency(Math.round(absoluteAmount), false)}
            </div>
          </div>
          {isShortfall && (
            <div>
              <div className="text-sm text-gray-600">
                Additional Monthly Savings Needed
              </div>
              <div className="text-2xl font-bold text-red-700">
                {formatCurrency(results.monthlyAdditionalSavingsNeeded, false)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Progress Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Your Progress
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-gray-600">Current Trajectory</div>
            <div className="text-2xl font-bold text-blue-700">
              {formatCurrency(results.projectedSavingsAtRetirement, false)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Projected savings at retirement
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-gray-600">Target Goal</div>
            <div className="text-2xl font-bold text-green-700">
              {formatCurrency(results.totalNeededAtRetirement, false)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total needed for retirement
            </div>
          </div>
        </div>
      </div>

      {/* Retirement Income Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Income Planning
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Annual Income Goal</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.incomeNeededAtRetirement, false)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Desired yearly income in retirement
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">
              Total Planned Contributions
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalContributionsByRetirement, false)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Your contributions over {results.yearsToRetirement} years
            </div>
          </div>
        </div>
      </div>

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
              Time left to save and invest
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

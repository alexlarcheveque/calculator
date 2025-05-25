import { DurationResults } from "@/types/retirement";
import { formatCurrency } from "@/utils/formatters";

interface DurationSummaryProps {
  results: DurationResults;
}

export default function DurationSummary({ results }: DurationSummaryProps) {
  const isMoneyFinite = isFinite(results.monthsLastingTotal);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Money Duration Analysis
      </h2>

      {/* Duration Results */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          How Long Your Money Will Last
        </h3>
        {isMoneyFinite ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-sm text-gray-600">Duration in Years</div>
              <div className="text-2xl font-bold text-blue-700">
                {results.yearsLasting}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Years your money will last
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-sm text-gray-600">Additional Months</div>
              <div className="text-2xl font-bold text-green-700">
                {results.monthsLasting}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Extra months beyond full years
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-gray-600">Duration</div>
            <div className="text-2xl font-bold text-green-700">Forever</div>
            <div className="text-xs text-gray-500 mt-1">
              Your investment returns exceed withdrawal rate
            </div>
          </div>
        )}
      </div>

      {/* Depletion Information */}
      {isMoneyFinite && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
            Depletion Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="text-sm text-gray-600">Depletion Date</div>
              <div className="text-2xl font-bold text-red-700">
                {results.depletionDate.toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                When your money runs out
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-sm text-gray-600">Total Withdrawn</div>
              <div className="text-2xl font-bold text-purple-700">
                {formatCurrency(results.totalWithdrawn)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Total amount you'll withdraw
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Timeline */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Detailed Timeline
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="text-sm text-gray-600">Total Duration</div>
          <div className="text-2xl font-bold text-gray-800">
            {isMoneyFinite
              ? `${Math.floor(results.monthsLastingTotal)} months`
              : "Infinite"}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {isMoneyFinite
              ? `Approximately ${results.yearsLasting} years and ${results.monthsLasting} months`
              : "Your investments will continue to grow faster than you withdraw"}
          </div>
        </div>
      </div>

      {/* Warning for Short Duration */}
      {isMoneyFinite && results.yearsLasting < 10 && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-sm text-red-800">
            <strong>Warning:</strong> Your current withdrawal rate is quite high
            relative to your savings. Consider reducing your monthly withdrawals
            or increasing your investment returns to make your money last
            longer.
          </div>
        </div>
      )}

      {/* Positive Note for Long Duration */}
      {!isMoneyFinite && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-800">
            <strong>Great news!</strong> Your investment returns exceed your
            withdrawal rate, meaning your money will continue to grow over time.
            You have a sustainable withdrawal strategy.
          </div>
        </div>
      )}
    </div>
  );
}

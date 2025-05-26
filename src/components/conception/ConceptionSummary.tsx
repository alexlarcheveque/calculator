import { ConceptionResults } from "@/types/conception";
import { formatDate, formatShortDate } from "@/utils/conceptionCalculations";

interface ConceptionSummaryProps {
  results: ConceptionResults;
}

export default function ConceptionSummary({ results }: ConceptionSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Conception & Fertility Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ovulation Date */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
          <h3 className="text-sm font-medium text-pink-800 mb-1">
            Estimated Ovulation Date
          </h3>
          <p className="text-lg font-semibold text-pink-900">
            {formatShortDate(results.ovulationDate)}
          </p>
          <p className="text-xs text-pink-700 mt-1">
            Most likely day of ovulation
          </p>
        </div>

        {/* Due Date */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-800 mb-1">
            Estimated Due Date
          </h3>
          <p className="text-lg font-semibold text-blue-900">
            {formatShortDate(results.dueDate)}
          </p>
          <p className="text-xs text-blue-700 mt-1">
            If conception occurs this cycle
          </p>
        </div>

        {/* Fertility Window */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-sm font-medium text-green-800 mb-1">
            Fertility Window
          </h3>
          <p className="text-sm font-semibold text-green-900">
            {formatShortDate(results.fertilityWindowStart)} -{" "}
            {formatShortDate(results.fertilityWindowEnd)}
          </p>
          <p className="text-xs text-green-700 mt-1">
            6-day window for conception
          </p>
        </div>

        {/* Most Likely Conception Date */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
          <h3 className="text-sm font-medium text-amber-800 mb-1">
            Most Likely Conception
          </h3>
          <p className="text-sm font-semibold text-amber-900">
            {formatShortDate(results.conceptionDateRange.mostLikely)}
          </p>
          <p className="text-xs text-amber-700 mt-1">Highest probability day</p>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="mt-6 space-y-4">
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Detailed Timeline
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">
                Fertility window starts:
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatDate(results.fertilityWindowStart)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Ovulation date:</span>
              <span className="text-sm font-medium text-gray-900">
                {formatDate(results.ovulationDate)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">
                Fertility window ends:
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatDate(results.fertilityWindowEnd)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">
                Conception date range:
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatShortDate(results.conceptionDateRange.earliest)} -{" "}
                {formatShortDate(results.conceptionDateRange.latest)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Estimated due date:</span>
              <span className="text-sm font-medium text-gray-900">
                {formatDate(results.dueDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Current Pregnancy Status */}
        {results.currentWeek !== undefined && (
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-sm font-medium text-purple-800 mb-2">
              Current Status
            </h3>
            <p className="text-sm text-purple-700">
              If you conceived during this cycle, you would currently be
              approximately{" "}
              <span className="font-semibold">
                {results.currentWeek} weeks and {results.currentDay} days
              </span>{" "}
              pregnant.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

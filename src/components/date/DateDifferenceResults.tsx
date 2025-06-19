import { DateDifferenceResult } from "@/types/date";
import { formatNumber, formatDate } from "@/utils/dateCalculations";

interface DateDifferenceResultsProps {
  result: DateDifferenceResult;
}

export default function DateDifferenceResults({
  result,
}: DateDifferenceResultsProps) {
  if (!result.isValid) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Invalid Input
          </h3>
          <p className="text-red-700">Please check your dates and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Date Difference Calculator
      </h2>
      <p className="text-gray-600 mb-6">
        Calculate the exact time difference between two dates. Results show
        various time units and business day analysis for planning purposes.
      </p>

      {/* Result Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Result</h3>
      </div>

      {/* Main Result Display */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">
              Time Period Breakdown
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Years:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatNumber(result.years)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Months:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatNumber(result.months)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Weeks:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatNumber(result.weeks)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Days:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatNumber(result.days)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Total Time</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Days:</span>
                <span className="text-xl font-bold text-green-600">
                  {formatNumber(result.totalDays)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Weeks:</span>
                <span className="text-xl font-bold text-green-600">
                  {formatNumber(Math.floor(result.totalWeeks))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Months:</span>
                <span className="text-xl font-bold text-green-600">
                  {formatNumber(Math.floor(result.totalMonths))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Years:</span>
                <span className="text-xl font-bold text-green-600">
                  {formatNumber(Math.floor(result.totalYears))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="font-semibold text-green-700 mb-3">
            Business Day Analysis
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatNumber(result.businessDays)}
              </div>
              <div className="text-sm text-gray-600">Business Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {formatNumber(result.weekendDays)}
              </div>
              <div className="text-sm text-gray-600">Weekend Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(result.holidayDays)}
              </div>
              <div className="text-sm text-gray-600">Holiday Days</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-700 mb-2">Summary</h4>
          <p className="text-blue-800">
            From{" "}
            <span className="font-bold">{formatDate(result.startDate)}</span> to{" "}
            <span className="font-bold">{formatDate(result.endDate)}</span> is{" "}
            <span className="font-bold">
              {result.years > 0 &&
                `${result.years} year${result.years !== 1 ? "s" : ""}`}
              {result.years > 0 && result.months > 0 && ", "}
              {result.months > 0 &&
                `${result.months} month${result.months !== 1 ? "s" : ""}`}
              {(result.years > 0 || result.months > 0) &&
                result.days > 0 &&
                ", and "}
              {result.days > 0 &&
                `${result.days} day${result.days !== 1 ? "s" : ""}`}
              {result.years === 0 &&
                result.months === 0 &&
                result.days === 0 &&
                "0 days"}
            </span>{" "}
            ({formatNumber(result.totalDays)} total days).
          </p>
        </div>
      </div>
    </div>
  );
}

import { TimeArithmeticResult } from "@/types/time";
import { formatNumber, convertTime } from "@/utils/timeCalculations";

interface TimeArithmeticResultsProps {
  result: TimeArithmeticResult;
}

export default function TimeArithmeticResults({
  result,
}: TimeArithmeticResultsProps) {
  if (!result.isValid) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Invalid Input
        </h3>
        <p className="text-red-700">{result.formatted}</p>
      </div>
    );
  }

  const conversions = convertTime(result.result);

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Result</h3>
        <p className="text-gray-600 mb-4">
          The calculated time after performing the arithmetic operation.
        </p>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {result.formatted}
          </div>
          <div className="text-lg text-blue-700">
            Total:{" "}
            <span className="text-blue-600">
              {formatNumber(result.totalSeconds)}
            </span>{" "}
            seconds
          </div>
        </div>

        <hr className="border-gray-200 my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">
              Time Components
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Days:</span>
                <span className="font-medium text-blue-600">
                  {formatNumber(result.result.days)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hours:</span>
                <span className="font-medium text-blue-600">
                  {formatNumber(result.result.hours)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minutes:</span>
                <span className="font-medium text-blue-600">
                  {formatNumber(result.result.minutes)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seconds:</span>
                <span className="font-medium text-blue-600">
                  {formatNumber(result.result.seconds)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Total Time</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Days:</span>
                <span className="font-medium text-green-600">
                  {formatNumber(result.breakdown.totalDays)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Hours:</span>
                <span className="font-medium text-green-600">
                  {formatNumber(result.breakdown.totalHours)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Minutes:</span>
                <span className="font-medium text-green-600">
                  {formatNumber(result.breakdown.totalMinutes)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Seconds:</span>
                <span className="font-medium text-green-600">
                  {formatNumber(result.breakdown.totalSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Conversions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Time Conversions
        </h3>
        <p className="text-gray-600 mb-4">
          The result expressed in different time units for reference.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {conversions.weeks.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Weeks</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {conversions.months.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Months</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {conversions.years.toFixed(3)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Years</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">
              {formatNumber(conversions.milliseconds)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Milliseconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}

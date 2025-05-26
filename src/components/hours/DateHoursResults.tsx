import { DateHoursCalculationResult } from "@/types/hours";
import { formatNumber, formatDecimal } from "@/utils/hoursCalculations";

interface DateHoursResultsProps {
  result: DateHoursCalculationResult;
}

export default function DateHoursResults({ result }: DateHoursResultsProps) {
  if (!result.isValid) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Invalid Input
        </h3>
        <p className="text-red-700">{result.error || result.formatted}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">
          Date Hours Calculation Result
        </h3>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {result.formatted}
          </div>
          <div className="text-lg text-green-700">
            {formatDecimal(result.breakdown.decimalHours)} hours (decimal)
          </div>
          <div className="text-md text-green-600 mt-2">
            Total: {formatNumber(result.breakdown.totalHours)} hours,{" "}
            {formatNumber(result.breakdown.totalMinutes)} minutes
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-700 mb-3">
              Time Breakdown
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Days:</span>
                <span className="font-medium">
                  {formatNumber(result.breakdown.days)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Hours:</span>
                <span className="font-medium">
                  {formatNumber(result.breakdown.hours)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Minutes:</span>
                <span className="font-medium">
                  {formatNumber(result.breakdown.minutes)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Hours:</span>
                <span className="font-medium">
                  {formatNumber(result.breakdown.totalHours)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Minutes:</span>
                <span className="font-medium">
                  {formatNumber(result.breakdown.totalMinutes)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Decimal Hours:</span>
                <span className="font-medium">
                  {formatDecimal(result.breakdown.decimalHours)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-700 mb-3">
              Work Time Calculations
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Work Days (8h):</span>
                <span className="font-medium">
                  {formatDecimal(result.breakdown.decimalHours / 8)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Work Weeks (40h):</span>
                <span className="font-medium">
                  {formatDecimal(result.breakdown.decimalHours / 40)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Work Months (160h):</span>
                <span className="font-medium">
                  {formatDecimal(result.breakdown.decimalHours / 160)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Seconds:</span>
                <span className="font-medium">
                  {formatNumber(result.breakdown.totalMinutes * 60)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Weeks:</span>
                <span className="font-medium">
                  {formatDecimal(result.breakdown.days / 7)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Months (30.44 days):</span>
                <span className="font-medium">
                  {formatDecimal(result.breakdown.days / 30.44)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-700 mb-2">Summary</h4>
        <p className="text-blue-800">
          The time difference between the two dates is{" "}
          <span className="font-bold">{result.formatted}</span>, which equals{" "}
          <span className="font-bold">
            {formatDecimal(result.breakdown.decimalHours)} decimal hours
          </span>{" "}
          or{" "}
          <span className="font-bold">
            {formatNumber(result.breakdown.totalMinutes)} total minutes
          </span>
          .
        </p>
      </div>
    </div>
  );
}

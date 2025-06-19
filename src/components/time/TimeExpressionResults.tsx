import { TimeExpressionResult } from "@/types/time";
import {
  formatNumber,
  convertTime,
  formatTimeShort,
} from "@/utils/timeCalculations";

interface TimeExpressionResultsProps {
  result: TimeExpressionResult;
}

export default function TimeExpressionResults({
  result,
}: TimeExpressionResultsProps) {
  if (!result.isValid) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Invalid Expression
        </h3>
        <p className="text-red-700">{result.error || result.formatted}</p>
      </div>
    );
  }

  const conversions = convertTime(result.result);

  const getUnitName = (unit: string) => {
    switch (unit) {
      case "d":
        return "days";
      case "h":
        return "hours";
      case "m":
        return "minutes";
      case "s":
        return "seconds";
      default:
        return unit;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Result</h3>
        <p className="text-gray-600 mb-4">
          The calculated time from evaluating the time expression.
        </p>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {result.formatted}
          </div>
          <div className="text-lg text-blue-700">
            Short format:{" "}
            <span className="text-blue-600">
              {formatTimeShort(result.result)}
            </span>
          </div>
          <div className="text-sm text-blue-600 mt-2">
            Total:{" "}
            <span className="font-semibold">
              {formatNumber(result.totalSeconds)}
            </span>{" "}
            seconds
          </div>
        </div>

        <hr className="border-gray-200 my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Time Breakdown</h4>
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
            <h4 className="font-semibold text-gray-700 mb-3">Parsed Tokens</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {result.parsedTokens.map((token, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {index > 0 && token.operator && (
                      <span className="mr-1">{token.operator}</span>
                    )}
                    {token.value} {getUnitName(token.unit)}
                  </span>
                  <span className="font-medium text-green-600">
                    {token.value}
                    {token.unit}
                  </span>
                </div>
              ))}
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

      {/* Expression Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Expression Summary
        </h3>
        <p className="text-gray-600 mb-4">
          A summary of the evaluated expression.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <p className="text-blue-800">
            The expression evaluates to{" "}
            <span className="font-bold text-blue-600">{result.formatted}</span>,
            which equals{" "}
            <span className="font-bold text-blue-600">
              {formatNumber(result.totalSeconds)} seconds
            </span>{" "}
            total.
          </p>
        </div>
      </div>
    </div>
  );
}

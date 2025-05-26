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
    <div className="mt-6 space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-purple-800 mb-4">
          Expression Calculation Result
        </h3>

        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            {result.formatted}
          </div>
          <div className="text-lg text-purple-700">
            Short format: {formatTimeShort(result.result)}
          </div>
          <div className="text-sm text-purple-600 mt-2">
            Total: {formatNumber(result.totalSeconds)} seconds
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-purple-700 mb-3">
              Time Breakdown
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Days:</span>
                <span className="font-medium">
                  {formatNumber(result.result.days)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Hours:</span>
                <span className="font-medium">
                  {formatNumber(result.result.hours)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Minutes:</span>
                <span className="font-medium">
                  {formatNumber(result.result.minutes)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Seconds:</span>
                <span className="font-medium">
                  {formatNumber(result.result.seconds)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-700 mb-3">
              Parsed Tokens
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {result.parsedTokens.map((token, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {index > 0 && token.operator && (
                      <span className="mr-1">{token.operator}</span>
                    )}
                    {token.value} {getUnitName(token.unit)}
                  </span>
                  <span className="font-medium text-purple-600">
                    {token.value}
                    {token.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="font-semibold text-green-700 mb-3">Time Conversions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {conversions.weeks.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Weeks</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {conversions.months.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Months</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {conversions.years.toFixed(3)}
            </div>
            <div className="text-sm text-gray-600">Years</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {formatNumber(conversions.milliseconds)}
            </div>
            <div className="text-sm text-gray-600">Milliseconds</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-700 mb-2">Expression Summary</h4>
        <p className="text-blue-800">
          The expression evaluates to{" "}
          <span className="font-bold">{result.formatted}</span>, which equals{" "}
          <span className="font-bold">
            {formatNumber(result.totalSeconds)} seconds
          </span>{" "}
          total.
        </p>
      </div>
    </div>
  );
}

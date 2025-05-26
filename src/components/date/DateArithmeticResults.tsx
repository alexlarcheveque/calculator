import { DateArithmeticResult } from "@/types/date";
import { formatDate } from "@/utils/dateCalculations";

interface DateArithmeticResultsProps {
  result: DateArithmeticResult;
}

export default function DateArithmeticResults({
  result,
}: DateArithmeticResultsProps) {
  if (!result.isValid) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Invalid Input
        </h3>
        <p className="text-red-700">Please check your date and try again.</p>
      </div>
    );
  }

  const operationText = result.operation === "add" ? "Adding" : "Subtracting";
  const prepositionText = result.operation === "add" ? "to" : "from";

  const getOperationSummary = () => {
    const parts = [];

    if (result.yearsAdded !== 0) {
      parts.push(
        `${Math.abs(result.yearsAdded)} year${
          Math.abs(result.yearsAdded) !== 1 ? "s" : ""
        }`
      );
    }
    if (result.monthsAdded !== 0) {
      parts.push(
        `${Math.abs(result.monthsAdded)} month${
          Math.abs(result.monthsAdded) !== 1 ? "s" : ""
        }`
      );
    }
    if (result.weeksAdded !== 0) {
      parts.push(
        `${Math.abs(result.weeksAdded)} week${
          Math.abs(result.weeksAdded) !== 1 ? "s" : ""
        }`
      );
    }
    if (result.daysAdded !== 0) {
      const dayType = result.businessDaysCalculated ? "business day" : "day";
      parts.push(
        `${Math.abs(result.daysAdded)} ${dayType}${
          Math.abs(result.daysAdded) !== 1 ? "s" : ""
        }`
      );
    }

    if (parts.length === 0) {
      return "no time";
    }

    if (parts.length === 1) {
      return parts[0];
    }

    if (parts.length === 2) {
      return `${parts[0]} and ${parts[1]}`;
    }

    return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">
          Date Calculation Result
        </h3>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {formatDate(result.resultDate)}
          </div>
          <div className="text-lg text-green-700">
            {result.resultDate.toLocaleDateString("en-US", { weekday: "long" })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-700 mb-3">
              Calculation Details
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Start Date:</span>
                <span className="font-medium">
                  {formatDate(result.startDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Operation:</span>
                <span className="font-medium capitalize">
                  {result.operation}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Result Date:</span>
                <span className="font-medium">
                  {formatDate(result.resultDate)}
                </span>
              </div>
              {result.businessDaysCalculated && (
                <div className="flex justify-between">
                  <span className="text-gray-700">Calculation Type:</span>
                  <span className="font-medium">Business Days</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-700 mb-3">
              Time Added/Subtracted
            </h4>
            <div className="space-y-2">
              {result.yearsAdded !== 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-700">Years:</span>
                  <span className="font-medium">
                    {result.yearsAdded > 0 ? "+" : ""}
                    {result.yearsAdded}
                  </span>
                </div>
              )}
              {result.monthsAdded !== 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-700">Months:</span>
                  <span className="font-medium">
                    {result.monthsAdded > 0 ? "+" : ""}
                    {result.monthsAdded}
                  </span>
                </div>
              )}
              {result.weeksAdded !== 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-700">Weeks:</span>
                  <span className="font-medium">
                    {result.weeksAdded > 0 ? "+" : ""}
                    {result.weeksAdded}
                  </span>
                </div>
              )}
              {result.daysAdded !== 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-700">
                    {result.businessDaysCalculated ? "Business Days:" : "Days:"}
                  </span>
                  <span className="font-medium">
                    {result.daysAdded > 0 ? "+" : ""}
                    {result.daysAdded}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-700 mb-2">Summary</h4>
        <p className="text-blue-800">
          {operationText}{" "}
          <span className="font-bold">{getOperationSummary()}</span>{" "}
          {prepositionText}{" "}
          <span className="font-bold">{formatDate(result.startDate)}</span>{" "}
          results in{" "}
          <span className="font-bold">{formatDate(result.resultDate)}</span>.
        </p>
      </div>
    </div>
  );
}

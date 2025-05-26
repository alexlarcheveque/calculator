import { DueDateResults } from "@/types/dueDate";
import { formatDate, getWeeksAndDaysText } from "@/utils/dueDateCalculations";

interface DueDateSummaryProps {
  results: DueDateResults;
}

export default function DueDateSummary({ results }: DueDateSummaryProps) {
  const getTrimesterText = (trimester: number) => {
    switch (trimester) {
      case 1:
        return "First Trimester";
      case 2:
        return "Second Trimester";
      case 3:
        return "Third Trimester";
      default:
        return "Pre-pregnancy";
    }
  };

  const getStatusText = () => {
    if (results.daysUntilDue < 0) {
      return `${Math.abs(results.daysUntilDue)} days overdue`;
    } else if (results.daysUntilDue === 0) {
      return "Due today!";
    } else {
      return `${results.daysUntilDue} days until due date`;
    }
  };

  const getTermStatus = () => {
    const today = new Date();
    if (today >= results.fullTermStart && today <= results.fullTermEnd) {
      return "Full Term";
    } else if (today < results.fullTermStart) {
      return "Preterm";
    } else {
      return "Post Term";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Due Date Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Results */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Estimated Due Date
            </h3>
            <p className="text-2xl font-bold text-blue-900">
              {formatDate(results.dueDate)}
            </p>
            <p className="text-sm text-blue-700 mt-1">{getStatusText()}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Current Progress
            </h3>
            <p className="text-xl font-bold text-green-900">
              {getWeeksAndDaysText(
                results.gestationalAge.weeks,
                results.gestationalAge.days
              )}
            </p>
            <p className="text-sm text-green-700">
              {getTrimesterText(results.trimester)} •{" "}
              {results.percentageComplete.toFixed(1)}% complete
            </p>
            <p className="text-sm text-green-700">Status: {getTermStatus()}</p>
          </div>
        </div>

        {/* Important Dates */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Important Dates
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Conception Date:</span>
                <span className="font-medium">
                  {formatDate(results.conceptionDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Implantation Date:</span>
                <span className="font-medium">
                  {formatDate(results.implantationDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End of 1st Trimester:</span>
                <span className="font-medium">
                  {formatDate(results.firstTrimesterEnd)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End of 2nd Trimester:</span>
                <span className="font-medium">
                  {formatDate(results.secondTrimesterEnd)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Viability (24 weeks):</span>
                <span className="font-medium">
                  {formatDate(results.viabilityDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Full Term Starts:</span>
                <span className="font-medium">
                  {formatDate(results.fullTermStart)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Full Term Ends:</span>
                <span className="font-medium">
                  {formatDate(results.fullTermEnd)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Pregnancy Progress</span>
          <span>{results.percentageComplete.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, results.percentageComplete)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Conception</span>
          <span>Due Date</span>
        </div>
      </div>
    </div>
  );
}

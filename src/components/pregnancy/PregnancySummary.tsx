import { PregnancyResults } from "@/types/pregnancy";
import { formatDate } from "@/utils/pregnancyCalculations";

interface PregnancySummaryProps {
  results: PregnancyResults;
}

export default function PregnancySummary({ results }: PregnancySummaryProps) {
  const getTrimesterName = (trimester: number): string => {
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

  const getTrimesterColor = (trimester: number): string => {
    switch (trimester) {
      case 1:
        return "bg-green-100 text-green-800";
      case 2:
        return "bg-blue-100 text-blue-800";
      case 3:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysUntilDueText = (days: number): string => {
    if (days < 0) {
      return `${Math.abs(days)} days overdue`;
    } else if (days === 0) {
      return "Due today!";
    } else {
      return `${days} days until due date`;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Pregnancy Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Due Date */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600 mb-1">Due Date</h3>
          <p className="text-lg font-semibold text-blue-900">
            {formatDate(results.dueDate)}
          </p>
          <p className="text-sm text-blue-700 mt-1">
            {getDaysUntilDueText(results.daysUntilDue)}
          </p>
        </div>

        {/* Current Progress */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-600 mb-1">
            Current Progress
          </h3>
          <p className="text-lg font-semibold text-green-900">
            {results.gestationalAge}
          </p>
          <div
            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-2 ${getTrimesterColor(
              results.trimester
            )}`}
          >
            {getTrimesterName(results.trimester)}
          </div>
        </div>

        {/* Fetal Age */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-600 mb-1">
            Fetal Age
          </h3>
          <p className="text-lg font-semibold text-purple-900">
            {results.fetalAge}
          </p>
          <p className="text-sm text-purple-700 mt-1">Since conception</p>
        </div>

        {/* Conception Date */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-orange-600 mb-1">
            Conception Date
          </h3>
          <p className="text-lg font-semibold text-orange-900">
            {formatDate(results.conceptionDate)}
          </p>
          <p className="text-sm text-orange-700 mt-1">Estimated</p>
        </div>

        {/* Last Period */}
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-pink-600 mb-1">
            Last Period
          </h3>
          <p className="text-lg font-semibold text-pink-900">
            {formatDate(results.lastPeriodDate)}
          </p>
          <p className="text-sm text-pink-700 mt-1">First day (LMP)</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((results.currentWeek / 40) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-700">
            {Math.round((results.currentWeek / 40) * 100)}% complete
          </p>
        </div>
      </div>

      {/* Key Dates Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Key Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Gestational Age:</span>
            <span className="font-medium">{results.gestationalAge}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Fetal Age:</span>
            <span className="font-medium">{results.fetalAge}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Current Week:</span>
            <span className="font-medium">Week {results.currentWeek}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Trimester:</span>
            <span className="font-medium">
              {getTrimesterName(results.trimester)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

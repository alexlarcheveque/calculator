import { BMRResults, BMRFormValues } from "@/types/bmr";
import { formatNumber } from "@/utils/bmrCalculations";

interface BMRSummaryProps {
  results: BMRResults;
  formValues: BMRFormValues;
}

export default function BMRSummary({ results, formValues }: BMRSummaryProps) {
  const unit = formValues.resultUnit === "calories" ? "Calories/day" : "kJ/day";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Result</h2>
        <button
          className="text-gray-400 hover:text-gray-600"
          title="Save this calculation"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-green-600 mb-2">
          BMR = {formatNumber(results.bmr)} {unit}
        </div>
        <p className="text-sm text-gray-600">Using {results.formula} formula</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium text-gray-800 mb-3">
          Daily calorie needs based on activity level
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Sedentary: little or no exercise
            </span>
            <span className="font-medium">
              {formatNumber(results.activityLevels.sedentary)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Exercise 1-3 times/week</span>
            <span className="font-medium">
              {formatNumber(results.activityLevels.lightlyActive)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Exercise 4-5 times/week</span>
            <span className="font-medium">
              {formatNumber(results.activityLevels.moderatelyActive)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              Daily exercise or intense exercise 3-4 times/week
            </span>
            <span className="font-medium">
              {formatNumber(results.activityLevels.veryActive)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              Intense exercise 6-7 times/week
            </span>
            <span className="font-medium">
              {formatNumber(results.activityLevels.extremelyActive)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              Very intense exercise daily, or physical job
            </span>
            <span className="font-medium">
              {formatNumber(results.activityLevels.superActive)}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500">
          <p>
            <strong>Exercise:</strong> 15-30 minutes of elevated heart rate
            activity.
          </p>
          <p>
            <strong>Intense exercise:</strong> 45-120 minutes of elevated heart
            rate activity.
          </p>
          <p>
            <strong>Very intense exercise:</strong> 2+ hours of elevated heart
            rate activity.
          </p>
        </div>
      </div>
    </div>
  );
}

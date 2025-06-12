import { BMRResults, BMRFormValues } from "@/types/bmr";
import { formatNumber } from "@/utils/bmrCalculations";

interface BMRSummaryProps {
  results: BMRResults;
  formValues: BMRFormValues;
}

export default function BMRSummary({ results, formValues }: BMRSummaryProps) {
  const unit = formValues.resultUnit === "calories" ? "Calories/day" : "kJ/day";

  const getActivityLevelDescription = (multiplier: number) => {
    if (multiplier <= 1.2) return "Sedentary";
    if (multiplier <= 1.375) return "Lightly Active";
    if (multiplier <= 1.55) return "Moderately Active";
    if (multiplier <= 1.725) return "Very Active";
    if (multiplier <= 1.9) return "Extremely Active";
    return "Super Active";
  };

  const getFormulaDescription = (formula: string) => {
    switch (formula) {
      case "Mifflin-St Jeor":
        return "Most accurate for general population";
      case "Harris-Benedict":
        return "Traditional formula, slightly higher estimates";
      case "Katch-McArdle":
        return "Best for lean individuals";
      default:
        return "Selected formula";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">BMR Analysis</h2>

      {/* Main BMR Result */}
      <div className="mb-6">
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
          <div className="text-sm text-gray-600 mb-1">Basal Metabolic Rate</div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {formatNumber(results.bmr)} {unit}
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {getFormulaDescription(results.formula)}
      </div>
        </div>
      </div>

      {/* Daily Calorie Needs */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Daily Calorie Needs by Activity Level
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-sm text-green-600 mb-1">Sedentary</div>
            <div className="text-lg font-bold text-green-900">
              {formatNumber(results.activityLevels.sedentary)}{" "}
              {formValues.resultUnit === "calories" ? "calories" : "kJ"}
            </div>
            <div className="text-xs text-green-500 mt-1">
              Little/no exercise
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="text-sm text-yellow-600 mb-1">Lightly Active</div>
            <div className="text-lg font-bold text-yellow-900">
              {formatNumber(results.activityLevels.lightlyActive)}{" "}
              {formValues.resultUnit === "calories" ? "calories" : "kJ"}
            </div>
            <div className="text-xs text-yellow-500 mt-1">
              Exercise 1-3x/week
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <div className="text-sm text-orange-600 mb-1">
              Moderately Active
            </div>
            <div className="text-lg font-bold text-orange-900">
              {formatNumber(results.activityLevels.moderatelyActive)}{" "}
              {formValues.resultUnit === "calories" ? "calories" : "kJ"}
            </div>
            <div className="text-xs text-orange-500 mt-1">
              Exercise 4-5x/week
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="text-sm text-red-600 mb-1">Very Active</div>
            <div className="text-lg font-bold text-red-900">
              {formatNumber(results.activityLevels.veryActive)}{" "}
              {formValues.resultUnit === "calories" ? "calories" : "kJ"}
            </div>
            <div className="text-xs text-red-500 mt-1">Daily exercise</div>
          </div>
        </div>
      </div>

      {/* Health Insights */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Health Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Weight Management</div>
            <div className="text-lg font-bold text-gray-900">
              {formatNumber(results.activityLevels.sedentary - 500)} -{" "}
              {formatNumber(results.activityLevels.lightlyActive - 500)}{" "}
              {formValues.resultUnit === "calories" ? "calories" : "kJ"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Calories weight loss (1 lb/week)
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Muscle Building</div>
            <div className="text-lg font-bold text-gray-900">
              {formatNumber(results.activityLevels.moderatelyActive + 300)} -{" "}
              {formatNumber(results.activityLevels.veryActive + 500)}{" "}
              {formValues.resultUnit === "calories" ? "calories" : "kJ"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Caloric surplus for gains
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

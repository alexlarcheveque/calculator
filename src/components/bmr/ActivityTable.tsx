import { BMRResults, BMRFormValues } from "@/types/bmr";
import { getActivityLevels, formatNumber } from "@/utils/bmrCalculations";

interface ActivityTableProps {
  results: BMRResults;
  formValues: BMRFormValues;
}

export default function ActivityTable({
  results,
  formValues,
}: ActivityTableProps) {
  const activityLevels = getActivityLevels(results.bmr, formValues.resultUnit);
  const unit = formValues.resultUnit === "calories" ? "Calories" : "kJ";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Detailed Activity Level Breakdown
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                Activity Level
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                Description
              </th>
              <th className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700">
                Multiplier
              </th>
              <th className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700">
                Daily {unit}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50">
              <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                BMR (Base)
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                Basal Metabolic Rate - energy needed at rest
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-center text-gray-700">
                1.0
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-center font-medium text-blue-600">
                {formatNumber(results.bmr)}
              </td>
            </tr>
            {activityLevels.map((level, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                  {level.level}
                </td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700 capitalize">
                  {level.description}
                </td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-center text-gray-700">
                  {level.multiplier}
                </td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-center font-medium text-gray-900">
                  {formatNumber(level.calories)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="font-medium text-blue-900 mb-2">
          Understanding Activity Levels
        </h3>
        <div className="text-sm text-blue-800 space-y-1">
          <p>
            <strong>Sedentary:</strong> Desk job with little or no exercise
          </p>
          <p>
            <strong>Lightly Active:</strong> Light exercise/sports 1-3 days/week
          </p>
          <p>
            <strong>Moderately Active:</strong> Moderate exercise/sports 3-5
            days/week
          </p>
          <p>
            <strong>Very Active:</strong> Hard exercise/sports 6-7 days a week
          </p>
          <p>
            <strong>Extremely Active:</strong> Very hard exercise/sports &
            physical job
          </p>
          <p>
            <strong>Super Active:</strong> Very hard exercise/sports, physical
            job, or training twice a day
          </p>
        </div>
      </div>
    </div>
  );
}

import { IdealWeightResults, UnitSystem } from "@/types/idealWeight";
import {
  formatWeight,
  getAllFormulaResults,
} from "@/utils/idealWeightCalculations";

interface IdealWeightSummaryProps {
  results: IdealWeightResults;
}

export default function IdealWeightSummary({
  results,
}: IdealWeightSummaryProps) {
  const formulaResults = getAllFormulaResults(results);
  const weightUnit = results.unitSystem === UnitSystem.IMPERIAL ? "lbs" : "kg";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Result</h2>
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        The ideal weight based on popular formulas:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Formula
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">
                Ideal Weight
              </th>
            </tr>
          </thead>
          <tbody>
            {formulaResults.map((formula, index) => (
              <tr
                key={formula.name}
                className={`border-b border-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4 text-gray-700">{formula.name}</td>
                <td className="py-3 px-4 text-center">
                  <span className="font-semibold text-green-600">
                    {formatWeight(formula.weight, results.unitSystem)}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="border-b border-gray-100 bg-blue-50">
              <td className="py-3 px-4 text-gray-700 font-medium">
                Healthy BMI Range
              </td>
              <td className="py-3 px-4 text-center">
                <span className="font-semibold text-green-600">
                  {formatWeight(results.bmiRangeMin, results.unitSystem)}
                </span>
                <span className="text-gray-500 mx-1">-</span>
                <span className="font-semibold text-green-600">
                  {formatWeight(results.bmiRangeMax, results.unitSystem)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">
          Important Note
        </h3>
        <p className="text-sm text-blue-700">
          These calculations are for reference only and should not be considered
          medical advice. Ideal body weight varies based on many factors
          including muscle mass, bone density, and overall health. Consult with
          a healthcare professional for personalized guidance.
        </p>
      </div>
    </div>
  );
}

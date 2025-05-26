import { FinalGradePlanningResult } from "@/types/grade";
import {
  formatGrade,
  getGradeColor,
  getGradeDescription,
  percentageToLetter,
} from "@/utils/gradeCalculations";

interface FinalGradeResultsProps {
  result: FinalGradePlanningResult;
}

export default function FinalGradeResults({ result }: FinalGradeResultsProps) {
  if (!result.isValid) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Invalid Input
        </h3>
        <p className="text-red-700">{result.error}</p>
      </div>
    );
  }

  const achievabilityColor = result.isAchievable
    ? "text-green-600"
    : "text-red-600";
  const achievabilityBg = result.isAchievable
    ? "bg-green-50 border-green-200"
    : "bg-red-50 border-red-200";

  return (
    <div className="mt-6 space-y-6">
      <div className={`border rounded-lg p-6 ${achievabilityBg}`}>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Final Grade Planning Result
        </h3>

        <div className="text-center mb-6">
          <div className={`text-4xl font-bold mb-2 ${achievabilityColor}`}>
            {formatGrade(result.requiredGrade)}%
          </div>
          <div className="text-lg text-gray-700 mb-2">
            Required Grade on Final Exam
          </div>
          <div className={`text-lg font-semibold ${achievabilityColor}`}>
            {result.isAchievable ? "✓ Achievable" : "✗ Not Achievable"}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Letter Grade Equivalent: {percentageToLetter(result.requiredGrade)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Current Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Current Grade:</span>
                <span className="font-medium">
                  {formatGrade(result.currentGrade)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Current Letter Grade:</span>
                <span className="font-medium">
                  {percentageToLetter(result.currentGrade)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Current Description:</span>
                <span
                  className={`font-medium ${getGradeColor(
                    result.currentGrade
                  )}`}
                >
                  {getGradeDescription(result.currentGrade).split(" (")[0]}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Target Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Target Grade:</span>
                <span className="font-medium">
                  {formatGrade(result.targetGrade)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Final Exam Weight:</span>
                <span className="font-medium">
                  {formatGrade(result.finalWeight)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Current Work Weight:</span>
                <span className="font-medium">
                  {formatGrade(100 - result.finalWeight)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-4">
          Detailed Analysis
        </h4>

        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border">
            <h5 className="font-semibold text-gray-800 mb-2">
              Calculation Breakdown
            </h5>
            <div className="text-sm text-gray-700 space-y-1">
              <div>
                Current Grade Contribution: {formatGrade(result.currentGrade)}%
                × {formatGrade(100 - result.finalWeight)}% ={" "}
                {formatGrade(
                  (result.currentGrade * (100 - result.finalWeight)) / 100
                )}
                %
              </div>
              <div>Target Total Grade: {formatGrade(result.targetGrade)}%</div>
              <div>
                Required Final Contribution:{" "}
                {formatGrade(
                  result.targetGrade -
                    (result.currentGrade * (100 - result.finalWeight)) / 100
                )}
                %
              </div>
              <div>
                Required Final Grade: {formatGrade(result.requiredGrade)}%
              </div>
            </div>
          </div>

          {result.isAchievable ? (
            <div className="p-4 bg-green-100 rounded-lg border border-green-300">
              <h5 className="font-semibold text-green-800 mb-2">
                Success Strategy
              </h5>
              <div className="text-sm text-green-700 space-y-2">
                <p>
                  To achieve your target grade of{" "}
                  {formatGrade(result.targetGrade)}%, you need to score{" "}
                  {formatGrade(result.requiredGrade)}% on your final exam.
                </p>
                <p>
                  This is equivalent to earning a{" "}
                  <strong>{percentageToLetter(result.requiredGrade)}</strong> on
                  your final exam.
                </p>
                {result.requiredGrade <= 70 && (
                  <p className="text-green-600 font-medium">
                    This target is very achievable with moderate effort!
                  </p>
                )}
                {result.requiredGrade > 70 && result.requiredGrade <= 85 && (
                  <p className="text-yellow-600 font-medium">
                    This target requires good preparation but is definitely
                    achievable.
                  </p>
                )}
                {result.requiredGrade > 85 && result.requiredGrade <= 95 && (
                  <p className="text-orange-600 font-medium">
                    This target requires excellent preparation and performance.
                  </p>
                )}
                {result.requiredGrade > 95 && (
                  <p className="text-red-600 font-medium">
                    This target requires near-perfect performance on the final
                    exam.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-100 rounded-lg border border-red-300">
              <h5 className="font-semibold text-red-800 mb-2">
                Challenge Analysis
              </h5>
              <div className="text-sm text-red-700 space-y-2">
                <p>
                  Unfortunately, achieving your target grade of{" "}
                  {formatGrade(result.targetGrade)}% is not possible even with a
                  perfect score on the final exam.
                </p>
                <p>
                  The required grade of {formatGrade(result.requiredGrade)}%
                  exceeds the maximum possible score of 100%.
                </p>
                <p className="font-medium">
                  Consider: Adjusting your target grade, seeking extra credit
                  opportunities, or discussing grade improvement options with
                  your instructor.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grade Scenarios */}
      {result.isAchievable && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Final Exam Grade Scenarios
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { grade: 100, description: "Perfect Score" },
              { grade: 95, description: "Excellent (A)" },
              { grade: 90, description: "Very Good (A-)" },
              { grade: 85, description: "Good (B+)" },
              { grade: 80, description: "Above Average (B-)" },
              { grade: 75, description: "Average (C+)" },
              { grade: 70, description: "Below Average (C-)" },
              { grade: 65, description: "Poor (D)" },
              { grade: 60, description: "Very Poor (D-)" },
            ].map((scenario) => {
              const finalGrade =
                (result.currentGrade * (100 - result.finalWeight)) / 100 +
                (scenario.grade * result.finalWeight) / 100;
              const meetsTarget = finalGrade >= result.targetGrade;

              return (
                <div
                  key={scenario.grade}
                  className={`p-3 rounded-lg border ${
                    meetsTarget
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <div className="font-semibold text-sm">
                    {scenario.description}
                  </div>
                  <div className="text-xs text-gray-600">
                    {scenario.grade}% on final
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      meetsTarget ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    Final Grade: {formatGrade(finalGrade)}%
                  </div>
                  {meetsTarget && (
                    <div className="text-xs text-green-600">✓ Meets target</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

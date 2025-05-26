import { GPAPlanningResult } from "@/types/gpa";
import {
  formatGPA,
  formatNumber,
  gradePointsToLetter,
  getGPAClassification,
  getGPAClassificationColor,
} from "@/utils/gpaCalculations";

interface GPAPlanningResultsProps {
  result: GPAPlanningResult;
}

export default function GPAPlanningResults({
  result,
}: GPAPlanningResultsProps) {
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
          GPA Planning Result
        </h3>

        <div className="text-center mb-6">
          <div className={`text-4xl font-bold mb-2 ${achievabilityColor}`}>
            {formatGPA(result.requiredGPA)}
          </div>
          <div className="text-lg text-gray-700 mb-2">
            Required GPA for Future Courses
          </div>
          <div className={`text-lg font-semibold ${achievabilityColor}`}>
            {result.isAchievable ? "✓ Achievable" : "✗ Not Achievable"}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Letter Grade Equivalent: {gradePointsToLetter(result.requiredGPA)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Current Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Current GPA:</span>
                <span className="font-medium">
                  {formatGPA(result.currentGPA)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Current Credits:</span>
                <span className="font-medium">
                  {formatNumber(result.currentCredits)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Current Classification:</span>
                <span
                  className={`font-medium ${getGPAClassificationColor(
                    result.currentGPA
                  )}`}
                >
                  {getGPAClassification(result.currentGPA)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Target Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Target GPA:</span>
                <span className="font-medium">
                  {formatGPA(result.targetGPA)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Additional Credits:</span>
                <span className="font-medium">
                  {formatNumber(result.additionalCredits)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Credits:</span>
                <span className="font-medium">
                  {formatNumber(result.totalCredits)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Target Classification:</span>
                <span
                  className={`font-medium ${getGPAClassificationColor(
                    result.targetGPA
                  )}`}
                >
                  {getGPAClassification(result.targetGPA)}
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
                Current Quality Points:{" "}
                {formatGPA(result.currentGPA * result.currentCredits)}
              </div>
              <div>
                Target Total Quality Points:{" "}
                {formatGPA(result.targetGPA * result.totalCredits)}
              </div>
              <div>
                Required Additional Quality Points:{" "}
                {formatGPA(
                  result.targetGPA * result.totalCredits -
                    result.currentGPA * result.currentCredits
                )}
              </div>
              <div>Required GPA: {formatGPA(result.requiredGPA)}</div>
            </div>
          </div>

          {result.isAchievable ? (
            <div className="p-4 bg-green-100 rounded-lg border border-green-300">
              <h5 className="font-semibold text-green-800 mb-2">
                Success Strategy
              </h5>
              <div className="text-sm text-green-700 space-y-2">
                <p>
                  To achieve your target GPA of {formatGPA(result.targetGPA)},
                  you need to maintain an average of{" "}
                  {formatGPA(result.requiredGPA)} in your next{" "}
                  {result.additionalCredits} credits.
                </p>
                <p>
                  This is equivalent to earning mostly{" "}
                  <strong>{gradePointsToLetter(result.requiredGPA)}</strong>{" "}
                  grades in your upcoming courses.
                </p>
                {result.requiredGPA <= 3.0 && (
                  <p className="text-green-600 font-medium">
                    This target is very achievable with consistent effort!
                  </p>
                )}
                {result.requiredGPA > 3.0 && result.requiredGPA <= 3.7 && (
                  <p className="text-yellow-600 font-medium">
                    This target requires good performance but is definitely
                    achievable.
                  </p>
                )}
                {result.requiredGPA > 3.7 && (
                  <p className="text-orange-600 font-medium">
                    This target requires excellent performance in all future
                    courses.
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
                  Unfortunately, achieving your target GPA of{" "}
                  {formatGPA(result.targetGPA)} is not possible with only{" "}
                  {result.additionalCredits} additional credits.
                </p>
                <p>
                  The required GPA of {formatGPA(result.requiredGPA)} exceeds
                  the maximum possible GPA of 4.3.
                </p>
                <p className="font-medium">
                  Consider: Taking more credits, adjusting your target GPA, or
                  exploring grade replacement options.
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
            Grade Scenarios
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { gpa: 4.0, grade: "A", description: "All A's" },
              { gpa: 3.5, grade: "A-/B+", description: "Mix of A's and B's" },
              { gpa: 3.0, grade: "B", description: "All B's" },
              { gpa: 2.5, grade: "B-/C+", description: "Mix of B's and C's" },
              { gpa: 2.0, grade: "C", description: "All C's" },
            ].map((scenario) => {
              const finalGPA =
                (result.currentGPA * result.currentCredits +
                  scenario.gpa * result.additionalCredits) /
                result.totalCredits;
              const meetsTarget = finalGPA >= result.targetGPA;

              return (
                <div
                  key={scenario.gpa}
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
                    {scenario.grade} average
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      meetsTarget ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    Final GPA: {formatGPA(finalGPA)}
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

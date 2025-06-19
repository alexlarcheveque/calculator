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
    ? "text-blue-600"
    : "text-red-600";
  const achievabilityBg = result.isAchievable
    ? "bg-blue-50 border-blue-200"
    : "bg-red-50 border-red-200";

  return (
    <div className="mt-6 space-y-6">
      {/* Main Result */}
      <div className={`border rounded-lg p-6 ${achievabilityBg}`}>
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

        {/* Key Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-sm text-gray-600 mb-1">Current Status</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatGPA(result.currentGPA)}
            </div>
            <div className="text-sm text-gray-600">
              {formatNumber(result.currentCredits)} credits
            </div>
          </div>

          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-sm text-gray-600 mb-1">Target Status</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatGPA(result.targetGPA)}
            </div>
            <div className="text-sm text-gray-600">
              {formatNumber(result.totalCredits)} total credits
            </div>
          </div>
        </div>

        {/* Strategy */}
        {result.isAchievable ? (
          <div className="p-4 bg-blue-100 rounded-lg border border-blue-300">
            <h5 className="font-semibold text-blue-800 mb-2">
              Success Strategy
            </h5>
            <div className="text-sm text-blue-700">
              <p className="mb-2">
                To achieve your target GPA of {formatGPA(result.targetGPA)}, you
                need to maintain an average of{" "}
                <strong>{formatGPA(result.requiredGPA)}</strong> in your next{" "}
                {result.additionalCredits} credits.
              </p>
              <p>
                This is equivalent to earning mostly{" "}
                <strong>{gradePointsToLetter(result.requiredGPA)}</strong>{" "}
                grades in your upcoming courses.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-red-100 rounded-lg border border-red-300">
            <h5 className="font-semibold text-red-800 mb-2">
              Challenge Analysis
            </h5>
            <div className="text-sm text-red-700">
              <p className="mb-2">
                Unfortunately, achieving your target GPA of{" "}
                {formatGPA(result.targetGPA)} is not possible with only{" "}
                {result.additionalCredits} additional credits.
              </p>
              <p>
                Consider taking more credits, adjusting your target GPA, or
                exploring grade replacement options.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Grade Scenarios - Only show if achievable */}
      {result.isAchievable && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Grade Scenarios
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { gpa: 4.0, grade: "A", description: "All A's" },
              { gpa: 3.5, grade: "A-/B+", description: "Mix of A's and B's" },
              { gpa: 3.0, grade: "B", description: "All B's" },
            ].map((scenario) => {
              const finalGPA =
                (result.currentGPA * result.currentCredits +
                  scenario.gpa * result.additionalCredits) /
                result.totalCredits;
              const meetsTarget = finalGPA >= result.targetGPA;

              return (
                <div
                  key={scenario.gpa}
                  className={`p-3 rounded-lg border text-center ${
                    meetsTarget
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <div className="font-semibold text-sm">
                    {scenario.description}
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    {scenario.grade} average
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      meetsTarget ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    Final GPA: {formatGPA(finalGPA)}
                  </div>
                  {meetsTarget && (
                    <div className="text-xs text-blue-600 mt-1">
                      ✓ Meets target
                    </div>
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

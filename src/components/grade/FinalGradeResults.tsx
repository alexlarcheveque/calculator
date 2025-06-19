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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white rounded-lg border">
            <div className="text-sm text-gray-600">Current Grade</div>
            <div className="text-lg font-semibold">
              {formatGrade(result.currentGrade)}%
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border">
            <div className="text-sm text-gray-600">Target Grade</div>
            <div className="text-lg font-semibold">
              {formatGrade(result.targetGrade)}%
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border">
            <div className="text-sm text-gray-600">Final Exam Weight</div>
            <div className="text-lg font-semibold">
              {formatGrade(result.finalWeight)}%
            </div>
          </div>
        </div>
      </div>

      {/* Simple Strategy */}
      {result.isAchievable ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">
            What You Need
          </h4>
          <div className="text-blue-700">
            <p className="mb-2">
              To achieve your target grade of{" "}
              <strong>{formatGrade(result.targetGrade)}%</strong>, you need to
              score <strong>{formatGrade(result.requiredGrade)}%</strong> on
              your final exam.
            </p>
            <p>
              This is equivalent to earning a{" "}
              <strong>{percentageToLetter(result.requiredGrade)}</strong> on
              your final exam.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-red-800 mb-3">
            Not Achievable
          </h4>
          <div className="text-red-700">
            <p className="mb-2">
              Unfortunately, achieving your target grade of{" "}
              {formatGrade(result.targetGrade)}% is not possible even with a
              perfect score on the final exam.
            </p>
            <p>
              Consider adjusting your target grade or discussing extra credit
              opportunities with your instructor.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

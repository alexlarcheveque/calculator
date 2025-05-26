import { GradeCalculationResult } from "@/types/grade";
import {
  formatGrade,
  formatWeight,
  formatNumber,
  getGradeColor,
  getGradeDescription,
  percentageToLetter,
} from "@/utils/gradeCalculations";

interface GradeResultsProps {
  result: GradeCalculationResult;
}

export default function GradeResults({ result }: GradeResultsProps) {
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

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-800 mb-4">
          Grade Calculation Result
        </h3>

        <div className="text-center mb-6">
          <div
            className={`text-4xl font-bold mb-2 ${getGradeColor(
              result.currentGrade
            )}`}
          >
            {formatGrade(result.currentGrade)}%
          </div>
          <div className="text-lg text-blue-700 mb-2">Current Grade</div>
          <div
            className={`text-lg font-semibold ${getGradeColor(
              result.currentGrade
            )}`}
          >
            {getGradeDescription(result.currentGrade)}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Letter Grade: {result.letterGrade}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Current Grade:</span>
                <span className="font-medium">
                  {formatGrade(result.currentGrade)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Letter Grade:</span>
                <span className="font-medium">{result.letterGrade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Weight:</span>
                <span className="font-medium">
                  {formatWeight(result.totalWeight)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Weighted Score:</span>
                <span className="font-medium">
                  {formatGrade(result.weightedScore)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-blue-700 mb-3">
              Grade Distribution
            </h4>
            <div className="space-y-2">
              {["A", "B", "C", "D", "F"].map((letterGrade) => {
                const count = result.assignments.filter((assignment) => {
                  const assignmentLetterGrade = percentageToLetter(
                    assignment.gradePoints
                  );
                  return assignmentLetterGrade.charAt(0) === letterGrade;
                }).length;

                return (
                  <div key={letterGrade} className="flex justify-between">
                    <span className="text-gray-700">{letterGrade} Grades:</span>
                    <span className="font-medium">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Details */}
      {result.assignments.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Assignment Details
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Assignment
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Grade
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Weight
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Grade Points
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Weighted Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.assignments.map((assignment, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {assignment.name || "Unnamed Assignment"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {assignment.grade}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatWeight(assignment.weight)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatGrade(assignment.gradePoints)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatGrade(assignment.weightedPoints)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td className="border border-gray-300 px-4 py-2">Total</td>
                  <td className="border border-gray-300 px-4 py-2">-</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatWeight(result.totalWeight)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">-</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatGrade(result.weightedScore)}
                  </td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td className="border border-gray-300 px-4 py-2">Grade</td>
                  <td className="border border-gray-300 px-4 py-2" colSpan={4}>
                    {formatGrade(result.weightedScore)} ÷{" "}
                    {formatWeight(result.totalWeight)} ={" "}
                    {formatGrade(result.currentGrade)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grade Scale Reference */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-green-800 mb-4">
          Grade Scale Reference
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-semibold text-green-700 mb-2">A Range</div>
            <div>A+ = 97-100%</div>
            <div>A = 93-96%</div>
            <div>A- = 90-92%</div>
          </div>
          <div>
            <div className="font-semibold text-green-700 mb-2">B Range</div>
            <div>B+ = 87-89%</div>
            <div>B = 83-86%</div>
            <div>B- = 80-82%</div>
          </div>
          <div>
            <div className="font-semibold text-green-700 mb-2">C Range</div>
            <div>C+ = 77-79%</div>
            <div>C = 73-76%</div>
            <div>C- = 70-72%</div>
          </div>
          <div>
            <div className="font-semibold text-green-700 mb-2">D/F Range</div>
            <div>D+ = 67-69%</div>
            <div>D = 63-66%</div>
            <div>D- = 60-62%</div>
            <div>F = 0-59%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

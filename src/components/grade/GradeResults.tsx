import { GradeCalculationResult } from "@/types/grade";
import {
  formatGrade,
  formatWeight,
  formatNumber,
  getGradeColor,
  getGradeDescription,
  percentageToLetter,
} from "@/utils/gradeCalculations";
import { useState } from "react";

interface GradeResultsProps {
  result: GradeCalculationResult;
}

export default function GradeResults({ result }: GradeResultsProps) {
  const [showGradeScale, setShowGradeScale] = useState(false);

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
      {/* Main Result */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
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
            {getGradeDescription(result.currentGrade)} ({result.letterGrade})
          </div>
          <div className="text-sm text-gray-600 mt-4">
            Based on {result.assignments.length} assignments totaling{" "}
            {formatWeight(result.totalWeight)} of course weight
          </div>
        </div>
      </div>

      {/* Assignment Details */}
      {result.assignments.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Assignment Breakdown
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
                    Contribution
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
                      {formatGrade(assignment.weightedPoints)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-100 font-semibold">
                  <td className="border border-gray-300 px-4 py-2">Total</td>
                  <td className="border border-gray-300 px-4 py-2">-</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatWeight(result.totalWeight)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatGrade(result.weightedScore)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grade Scale Reference - Collapsible */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <button
          onClick={() => setShowGradeScale(!showGradeScale)}
          className="w-full flex justify-between items-center text-left"
        >
          <h4 className="text-lg font-semibold text-gray-800">
            Grade Scale Reference
          </h4>
          <span className="text-gray-500">{showGradeScale ? "−" : "+"}</span>
        </button>

        {showGradeScale && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-semibold text-blue-700 mb-2">A Range</div>
              <div>A+ = 97-100%</div>
              <div>A = 93-96%</div>
              <div>A- = 90-92%</div>
            </div>
            <div>
              <div className="font-semibold text-blue-700 mb-2">B Range</div>
              <div>B+ = 87-89%</div>
              <div>B = 83-86%</div>
              <div>B- = 80-82%</div>
            </div>
            <div>
              <div className="font-semibold text-blue-700 mb-2">C Range</div>
              <div>C+ = 77-79%</div>
              <div>C = 73-76%</div>
              <div>C- = 70-72%</div>
            </div>
            <div>
              <div className="font-semibold text-blue-700 mb-2">D/F Range</div>
              <div>D+ = 67-69%</div>
              <div>D = 63-66%</div>
              <div>D- = 60-62%</div>
              <div>F = 0-59%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

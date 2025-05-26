import { GPACalculationResult } from "@/types/gpa";
import {
  formatGPA,
  formatNumber,
  getGPAClassification,
  getGPAClassificationColor,
  gradePointsToLetter,
} from "@/utils/gpaCalculations";

interface GPAResultsProps {
  result: GPACalculationResult;
}

export default function GPAResults({ result }: GPAResultsProps) {
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

  const displayGPA = result.cumulativeGPA || result.currentGPA;
  const displayCredits = result.cumulativeCredits || result.totalCredits;

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-800 mb-4">
          GPA Calculation Result
        </h3>

        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {formatGPA(displayGPA)}
          </div>
          <div className="text-lg text-blue-700 mb-2">Grade Point Average</div>
          <div
            className={`text-lg font-semibold ${getGPAClassificationColor(
              displayGPA
            )}`}
          >
            {getGPAClassification(displayGPA)}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Letter Grade Equivalent: {gradePointsToLetter(displayGPA)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Current Semester GPA:</span>
                <span className="font-medium">
                  {formatGPA(result.currentGPA)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Current Semester Credits:</span>
                <span className="font-medium">
                  {formatNumber(result.totalCredits)}
                </span>
              </div>
              {result.cumulativeGPA && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cumulative GPA:</span>
                    <span className="font-medium">
                      {formatGPA(result.cumulativeGPA)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Credits:</span>
                    <span className="font-medium">
                      {formatNumber(result.cumulativeCredits!)}
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-700">Quality Points:</span>
                <span className="font-medium">
                  {formatGPA(result.totalGradePoints)}
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
                const count = result.courses.filter((course) => {
                  const courseLetterGrade = gradePointsToLetter(
                    course.gradePoints
                  );
                  return courseLetterGrade.charAt(0) === letterGrade;
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

      {/* Course Details */}
      {result.courses.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Course Details
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Course
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Credits
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Grade
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Grade Points
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Quality Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.courses.map((course, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {course.name || "Unnamed Course"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {course.credits}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {course.grade}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatGPA(course.gradePoints)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatGPA(course.qualityPoints)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td className="border border-gray-300 px-4 py-2">Total</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.totalCredits}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">-</td>
                  <td className="border border-gray-300 px-4 py-2">-</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatGPA(result.totalGradePoints)}
                  </td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td className="border border-gray-300 px-4 py-2">GPA</td>
                  <td className="border border-gray-300 px-4 py-2" colSpan={4}>
                    {formatGPA(result.totalGradePoints)} ÷ {result.totalCredits}{" "}
                    = {formatGPA(result.currentGPA)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GPA Scale Reference */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-green-800 mb-4">
          Grade Scale Reference
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-semibold text-green-700 mb-2">A Range</div>
            <div>A+ = 4.3</div>
            <div>A = 4.0</div>
            <div>A- = 3.7</div>
          </div>
          <div>
            <div className="font-semibold text-green-700 mb-2">B Range</div>
            <div>B+ = 3.3</div>
            <div>B = 3.0</div>
            <div>B- = 2.7</div>
          </div>
          <div>
            <div className="font-semibold text-green-700 mb-2">C Range</div>
            <div>C+ = 2.3</div>
            <div>C = 2.0</div>
            <div>C- = 1.7</div>
          </div>
          <div>
            <div className="font-semibold text-green-700 mb-2">D/F Range</div>
            <div>D+ = 1.3</div>
            <div>D = 1.0</div>
            <div>D- = 0.7</div>
            <div>F = 0.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

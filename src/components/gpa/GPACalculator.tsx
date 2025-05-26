"use client";

import { useState } from "react";
import {
  Course,
  GPACalculationValues,
  GPACalculationResult,
} from "@/types/gpa";
import {
  calculateGPA,
  createEmptyCourse,
  LETTER_GRADES,
} from "@/utils/gpaCalculations";
import GPAResults from "./GPAResults";

export default function GPACalculator() {
  const [formValues, setFormValues] = useState<GPACalculationValues>({
    courses: [
      { id: "1", name: "Math", credits: 3, grade: "A", gradePoints: 4.0 },
      { id: "2", name: "English", credits: 3, grade: "B+", gradePoints: 3.3 },
      { id: "3", name: "History", credits: 2, grade: "A-", gradePoints: 3.7 },
      createEmptyCourse(),
      createEmptyCourse(),
    ],
    gradeFormat: "letter",
    includePriorGPA: false,
    priorGPA: undefined,
    priorCredits: undefined,
  });

  const [result, setResult] = useState<GPACalculationResult | null>(null);

  const handleCourseChange = (
    courseId: string,
    field: keyof Course,
    value: string | number
  ) => {
    setFormValues((prev) => ({
      ...prev,
      courses: prev.courses.map((course) =>
        course.id === courseId ? { ...course, [field]: value } : course
      ),
    }));
  };

  const addCourse = () => {
    setFormValues((prev) => ({
      ...prev,
      courses: [
        ...prev.courses,
        createEmptyCourse(),
        createEmptyCourse(),
        createEmptyCourse(),
      ],
    }));
  };

  const handleGradeFormatChange = (
    format: "letter" | "percentage" | "point"
  ) => {
    setFormValues((prev) => ({
      ...prev,
      gradeFormat: format,
      courses: prev.courses.map((course) => ({
        ...course,
        grade: "", // Reset grades when format changes
      })),
    }));
  };

  const handlePriorGPAToggle = (include: boolean) => {
    setFormValues((prev) => ({
      ...prev,
      includePriorGPA: include,
      priorGPA: include ? 0 : undefined,
      priorCredits: include ? 0 : undefined,
    }));
  };

  const calculate = () => {
    const calculationResult = calculateGPA(
      formValues.courses,
      formValues.gradeFormat,
      formValues.includePriorGPA,
      formValues.priorGPA,
      formValues.priorCredits
    );
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      courses: [
        createEmptyCourse(),
        createEmptyCourse(),
        createEmptyCourse(),
        createEmptyCourse(),
        createEmptyCourse(),
      ],
      gradeFormat: "letter",
      includePriorGPA: false,
      priorGPA: undefined,
      priorCredits: undefined,
    });
    setResult(null);
  };

  const renderGradeInput = (course: Course) => {
    switch (formValues.gradeFormat) {
      case "letter":
        return (
          <select
            value={course.grade}
            onChange={(e) =>
              handleCourseChange(course.id, "grade", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-</option>
            {LETTER_GRADES.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        );

      case "percentage":
        return (
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={course.grade}
            onChange={(e) =>
              handleCourseChange(course.id, "grade", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="85.5"
          />
        );

      case "point":
        return (
          <input
            type="number"
            min="0"
            max="4.3"
            step="0.1"
            value={course.grade}
            onChange={(e) =>
              handleCourseChange(course.id, "grade", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="3.7"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">GPA Calculator</h2>
      <p className="text-gray-600 mb-6">
        Use this calculator to calculate grade point average (GPA) and generate
        a GPA report. If you use percentage grades, have grades on a different
        scale or in high school with AP/IB classes, please change the "Settings"
        to input specific values.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        {/* Settings */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade Format:
              </label>
              <div className="space-y-2">
                {[
                  { value: "letter", label: "Letter (A, B, C, etc.)" },
                  { value: "percentage", label: "Percentage (0-100)" },
                  { value: "point", label: "Point Value (0-4.3)" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="gradeFormat"
                      value={option.value}
                      checked={formValues.gradeFormat === option.value}
                      onChange={(e) =>
                        handleGradeFormatChange(
                          e.target.value as "letter" | "percentage" | "point"
                        )
                      }
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formValues.includePriorGPA}
                  onChange={(e) => handlePriorGPAToggle(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Add GPA of prior semesters
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Prior GPA Section */}
        {formValues.includePriorGPA && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">
              Prior Semester's GPA (optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prior Semester's GPA:
                </label>
                <input
                  type="number"
                  min="0"
                  max="4.3"
                  step="0.01"
                  value={formValues.priorGPA || ""}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      priorGPA: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="3.50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credits Completed:
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formValues.priorCredits || ""}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      priorCredits: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="30"
                />
              </div>
            </div>
          </div>
        )}

        {/* Courses Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Course (optional)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Credits
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {formValues.courses.map((course) => (
                <tr key={course.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) =>
                        handleCourseChange(course.id, "name", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Course name"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="1"
                      value={course.credits || ""}
                      onChange={(e) =>
                        handleCourseChange(
                          course.id,
                          "credits",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="3"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {renderGradeInput(course)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={addCourse}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            + add more courses
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={calculate}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {result && <GPAResults result={result} />}
    </div>
  );
}

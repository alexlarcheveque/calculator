"use client";

import { useState } from "react";
import {
  Assignment,
  GradeCalculationValues,
  GradeCalculationResult,
} from "@/types/grade";
import {
  calculateWeightedGrade,
  createEmptyAssignment,
  LETTER_GRADES,
} from "@/utils/gradeCalculations";
import GradeResults from "./GradeResults";

export default function GradeCalculator() {
  const [formValues, setFormValues] = useState<GradeCalculationValues>({
    assignments: [
      { id: "1", name: "Homework 1", grade: "90", weight: 5, gradePoints: 90 },
      { id: "2", name: "Project", grade: "B", weight: 20, gradePoints: 84.5 },
      {
        id: "3",
        name: "Midterm exam",
        grade: "88",
        weight: 20,
        gradePoints: 88,
      },
      createEmptyAssignment(),
      createEmptyAssignment(),
      createEmptyAssignment(),
      createEmptyAssignment(),
      createEmptyAssignment(),
    ],
    gradeFormat: "percentage",
    weightFormat: "percentage",
    showPlanning: true,
    finalGradeGoal: "",
    remainingWeight: 55,
  });

  const [result, setResult] = useState<GradeCalculationResult | null>(null);

  const handleAssignmentChange = (
    assignmentId: string,
    field: keyof Assignment,
    value: string | number
  ) => {
    setFormValues((prev) => ({
      ...prev,
      assignments: prev.assignments.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, [field]: value }
          : assignment
      ),
    }));

    // Update remaining weight when weights change
    if (field === "weight") {
      updateRemainingWeight();
    }
  };

  const addAssignments = () => {
    setFormValues((prev) => ({
      ...prev,
      assignments: [
        ...prev.assignments,
        createEmptyAssignment(),
        createEmptyAssignment(),
        createEmptyAssignment(),
      ],
    }));
  };

  const handleGradeFormatChange = (format: "percentage" | "letter") => {
    setFormValues((prev) => ({
      ...prev,
      gradeFormat: format,
      assignments: prev.assignments.map((assignment) => ({
        ...assignment,
        grade: "", // Reset grades when format changes
      })),
    }));
  };

  const handleWeightFormatChange = (format: "percentage" | "points") => {
    setFormValues((prev) => ({
      ...prev,
      weightFormat: format,
    }));
  };

  const handlePlanningToggle = (show: boolean) => {
    setFormValues((prev) => ({
      ...prev,
      showPlanning: show,
    }));
  };

  const updateRemainingWeight = () => {
    if (formValues.weightFormat === "percentage") {
      const totalWeight = formValues.assignments.reduce((sum, assignment) => {
        return sum + (assignment.weight || 0);
      }, 0);
      const remaining = Math.max(0, 100 - totalWeight);
      setFormValues((prev) => ({
        ...prev,
        remainingWeight: remaining,
      }));
    }
  };

  const calculate = () => {
    const calculationResult = calculateWeightedGrade(
      formValues.assignments,
      formValues.gradeFormat,
      formValues.weightFormat
    );
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      assignments: [
        createEmptyAssignment(),
        createEmptyAssignment(),
        createEmptyAssignment(),
        createEmptyAssignment(),
        createEmptyAssignment(),
        createEmptyAssignment(),
        createEmptyAssignment(),
        createEmptyAssignment(),
      ],
      gradeFormat: "percentage",
      weightFormat: "percentage",
      showPlanning: true,
      finalGradeGoal: "",
      remainingWeight: 100,
    });
    setResult(null);
  };

  const renderGradeInput = (assignment: Assignment) => {
    switch (formValues.gradeFormat) {
      case "letter":
        return (
          <select
            value={assignment.grade}
            onChange={(e) =>
              handleAssignmentChange(assignment.id, "grade", e.target.value)
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
            value={assignment.grade}
            onChange={(e) =>
              handleAssignmentChange(assignment.id, "grade", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="85.5"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Grade Calculator
      </h2>
      <p className="text-gray-600 mb-6">
        Use this calculator to find out the grade of a course based on weighted
        averages. This calculator accepts both numerical as well as letter
        grades. It also can calculate the grade needed for the remaining
        assignments in order to get a desired grade for an ongoing course.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        {/* Assignments Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Assignment/Exam (optional)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Grade
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Weight
                </th>
              </tr>
            </thead>
            <tbody>
              {formValues.assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={assignment.name}
                      onChange={(e) =>
                        handleAssignmentChange(
                          assignment.id,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Assignment name"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {renderGradeInput(assignment)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max={
                        formValues.weightFormat === "percentage"
                          ? "100"
                          : undefined
                      }
                      step="0.1"
                      value={assignment.weight || ""}
                      onChange={(e) =>
                        handleAssignmentChange(
                          assignment.id,
                          "weight",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      onBlur={updateRemainingWeight}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={
                        formValues.weightFormat === "percentage" ? "20" : "100"
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={addAssignments}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            + add more rows
          </button>
        </div>

        {/* Final Grade Planning */}
        {formValues.showPlanning && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Final Grade Planning (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Final Grade Goal:
                </label>
                {formValues.gradeFormat === "letter" ? (
                  <select
                    value={formValues.finalGradeGoal || ""}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        finalGradeGoal: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">-</option>
                    {LETTER_GRADES.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formValues.finalGradeGoal || ""}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        finalGradeGoal: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="85"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight of Remaining Tasks:
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formValues.remainingWeight || ""}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      remainingWeight: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="40"
                />
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade Format:
              </label>
              <div className="space-y-2">
                {[
                  { value: "percentage", label: "Points, percentage, mix" },
                  { value: "letter", label: "Letters" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="gradeFormat"
                      value={option.value}
                      checked={formValues.gradeFormat === option.value}
                      onChange={(e) =>
                        handleGradeFormatChange(
                          e.target.value as "percentage" | "letter"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight Format:
              </label>
              <div className="space-y-2">
                {[
                  { value: "percentage", label: "Percentage" },
                  { value: "points", label: "Points" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="weightFormat"
                      value={option.value}
                      checked={formValues.weightFormat === option.value}
                      onChange={(e) =>
                        handleWeightFormatChange(
                          e.target.value as "percentage" | "points"
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
                  checked={formValues.showPlanning}
                  onChange={(e) => handlePlanningToggle(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Show Final Grade Planning Options
                </span>
              </label>
            </div>
          </div>
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

      {result && <GradeResults result={result} />}
    </div>
  );
}

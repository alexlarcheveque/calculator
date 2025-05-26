"use client";

import { useState } from "react";
import {
  FinalGradePlanningValues,
  FinalGradePlanningResult,
} from "@/types/grade";
import { calculateRequiredFinalGrade } from "@/utils/gradeCalculations";
import FinalGradeResults from "./FinalGradeResults";

export default function FinalGradeCalculator() {
  const [formValues, setFormValues] = useState<FinalGradePlanningValues>({
    currentGrade: 88,
    targetGrade: 85,
    finalWeight: 40,
  });

  const [result, setResult] = useState<FinalGradePlanningResult | null>(null);

  const handleInputChange = (
    field: keyof FinalGradePlanningValues,
    value: number
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
    const calculationResult = calculateRequiredFinalGrade(
      formValues.currentGrade,
      formValues.targetGrade,
      formValues.finalWeight
    );
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      currentGrade: 0,
      targetGrade: 0,
      finalWeight: 0,
    });
    setResult(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Final Grade Calculator
      </h2>
      <p className="text-gray-600 mb-6">
        Use this calculator to find out the grade needed on the final exam in
        order to get a desired grade in a course. It accepts letter grades,
        percentage grades, and other numerical inputs.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your current grade:
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={formValues.currentGrade}
              onChange={(e) =>
                handleInputChange(
                  "currentGrade",
                  parseFloat(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="88"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              The grade you want:
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={formValues.targetGrade}
              onChange={(e) =>
                handleInputChange(
                  "targetGrade",
                  parseFloat(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="85"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your final is worth:
              <span className="ml-1 text-xs text-gray-500">
                (percentage of total grade)
              </span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={formValues.finalWeight}
              onChange={(e) =>
                handleInputChange(
                  "finalWeight",
                  parseFloat(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="40"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={calculate}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
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

      {result && <FinalGradeResults result={result} />}
    </div>
  );
}

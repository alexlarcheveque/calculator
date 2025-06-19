"use client";

import { useState } from "react";
import { GPAPlanningValues, GPAPlanningResult } from "@/types/gpa";
import { calculateRequiredGPA } from "@/utils/gpaCalculations";
import GPAPlanningResults from "./GPAPlanningResults";

export default function GPAPlanningCalculator() {
  const [formValues, setFormValues] = useState<GPAPlanningValues>({
    currentGPA: 2.8,
    targetGPA: 3.0,
    currentCredits: 25,
    additionalCredits: 15,
    gpaScale: "4.0",
  });

  const [result, setResult] = useState<GPAPlanningResult | null>(null);

  const handleInputChange = (
    field: keyof GPAPlanningValues,
    value: number | "" | string
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
    const calculationResult = calculateRequiredGPA(
      typeof formValues.currentGPA === "string" ? 0 : formValues.currentGPA,
      typeof formValues.targetGPA === "string" ? 0 : formValues.targetGPA,
      typeof formValues.currentCredits === "string"
        ? 0
        : formValues.currentCredits,
      typeof formValues.additionalCredits === "string"
        ? 0
        : formValues.additionalCredits,
      formValues.gpaScale
    );
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      currentGPA: "",
      targetGPA: "",
      currentCredits: "",
      additionalCredits: "",
      gpaScale: "4.0",
    });
    setResult(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        GPA Planning Calculator
      </h2>
      <p className="text-gray-600 mb-6">
        The calculator can be used to determine the minimum GPA required in
        future courses to raise GPA to a desired level or maintain the GPA above
        a certain level.
      </p>

      {/* GPA Scale Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          GPA Scale:
        </label>
        <div className="flex flex-wrap gap-4">
          {[
            {
              value: "4.0",
              label: "4.0 Scale (Standard)",
              description: "A = 4.0, most common",
            },
            {
              value: "4.3",
              label: "4.3 Scale (Plus/Minus)",
              description: "A+ = 4.3, includes plus grades",
            },
            {
              value: "5.0",
              label: "5.0 Scale (Weighted)",
              description: "A = 5.0 in honors/AP classes",
            },
          ].map((scale) => (
            <label
              key={scale.value}
              className={`flex-1 min-w-48 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                formValues.gpaScale === scale.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="gpaScale"
                value={scale.value}
                checked={formValues.gpaScale === scale.value}
                onChange={(e) => handleInputChange("gpaScale", e.target.value)}
                className="sr-only"
              />
              <div className="font-medium text-gray-800">{scale.label}</div>
              <div className="text-xs text-gray-600 mt-1">
                {scale.description}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current GPA:
            </label>
            <input
              type="number"
              min="0"
              max={
                formValues.gpaScale === "5.0"
                  ? "5.0"
                  : formValues.gpaScale === "4.3"
                  ? "4.3"
                  : "4.0"
              }
              step="0.01"
              value={formValues.currentGPA}
              onChange={(e) =>
                handleInputChange(
                  "currentGPA",
                  e.target.value === "" ? "" : parseFloat(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2.80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target GPA:
            </label>
            <input
              type="number"
              min="0"
              max={
                formValues.gpaScale === "5.0"
                  ? "5.0"
                  : formValues.gpaScale === "4.3"
                  ? "4.3"
                  : "4.0"
              }
              step="0.01"
              value={formValues.targetGPA}
              onChange={(e) =>
                handleInputChange(
                  "targetGPA",
                  e.target.value === "" ? "" : parseFloat(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="3.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Credits:
              <span className="ml-1 text-xs text-gray-500">
                (The number of credits you achieved so far)
              </span>
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={formValues.currentCredits}
              onChange={(e) =>
                handleInputChange(
                  "currentCredits",
                  e.target.value === "" ? "" : parseInt(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Credits:
              <span className="ml-1 text-xs text-gray-500">
                (The number of credits you plan to take in the future)
              </span>
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={formValues.additionalCredits}
              onChange={(e) =>
                handleInputChange(
                  "additionalCredits",
                  e.target.value === "" ? "" : parseInt(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="15"
            />
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

      {result && <GPAPlanningResults result={result} />}
    </div>
  );
}

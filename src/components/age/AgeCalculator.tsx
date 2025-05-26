"use client";

import { useState, useEffect } from "react";
import { AgeFormValues, AgeResult } from "@/types/age";
import { calculateAge } from "@/utils/ageCalculations";
import AgeResults from "@/components/age/AgeResults";

export default function AgeCalculator() {
  const [formValues, setFormValues] = useState<AgeFormValues>({
    birthDate: "",
    targetDate: "",
  });

  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState<string>("");

  // Set default dates on component mount
  useEffect(() => {
    const today = new Date();
    const defaultBirthDate = new Date(
      today.getFullYear() - 25,
      today.getMonth(),
      today.getDate()
    );

    setFormValues({
      birthDate: defaultBirthDate.toISOString().split("T")[0],
      targetDate: today.toISOString().split("T")[0],
    });
  }, []);

  const handleInputChange = (field: keyof AgeFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const calculate = () => {
    try {
      const calculationResult = calculateAge(
        formValues.birthDate,
        formValues.targetDate
      );

      setResult(calculationResult);

      if (!calculationResult.isValid) {
        setError(
          "Please check your dates. Birth date must be before target date."
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    const today = new Date();
    const defaultBirthDate = new Date(
      today.getFullYear() - 25,
      today.getMonth(),
      today.getDate()
    );

    setFormValues({
      birthDate: defaultBirthDate.toISOString().split("T")[0],
      targetDate: today.toISOString().split("T")[0],
    });
    setResult(null);
    setError("");
  };

  const setToday = () => {
    const today = new Date();
    setFormValues((prev) => ({
      ...prev,
      targetDate: today.toISOString().split("T")[0],
    }));
  };

  return (
    <div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">
            Modify the values and click the calculate button to use
          </p>
        </div>

        {/* Date Inputs */}
        <div className="space-y-6">
          {/* Birth Date */}
          <div className="flex items-center justify-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-32 text-right">
              Date of Birth
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={formValues.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Target Date */}
          <div className="flex items-center justify-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-32 text-right">
              Age at the Date of
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={formValues.targetDate}
                onChange={(e) =>
                  handleInputChange("targetDate", e.target.value)
                }
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <button
                onClick={setToday}
                className="px-3 py-2 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Today
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-center mt-6 space-x-4">
          <button
            onClick={calculate}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 text-sm text-gray-600">
          <p className="font-medium mb-2">Instructions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Select your birth date using the date picker</li>
            <li>Choose the target date to calculate your age at that time</li>
            <li>Click "Today" to quickly set the target date to today</li>
            <li>The calculator will show your exact age in multiple formats</li>
          </ul>
        </div>
      </div>

      {/* Results */}
      {result && result.isValid && <AgeResults result={result} />}
    </div>
  );
}

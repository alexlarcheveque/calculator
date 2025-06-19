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

    const formatLocalDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setFormValues({
      birthDate: formatLocalDate(defaultBirthDate),
      targetDate: formatLocalDate(today),
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

    const formatLocalDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setFormValues({
      birthDate: formatLocalDate(defaultBirthDate),
      targetDate: formatLocalDate(today),
    });
    setResult(null);
    setError("");
  };

  const setToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const localDateString = `${year}-${month}-${day}`;

    setFormValues((prev) => ({
      ...prev,
      targetDate: localDateString,
    }));
  };

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="text-center text-blue-700">
            <p className="font-medium">
              Enter your birth date and a target date to calculate your exact
              age
            </p>
          </div>
        </div>

        {/* Date Inputs */}
        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Birth Date Section */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="text-center">
                  <div className="mb-4">
                    <svg
                      className="w-8 h-8 text-blue-500 mx-auto mb-2"
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
                    <h4 className="text-lg font-semibold text-gray-800">
                      Date of Birth
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      When were you born?
                    </p>
                  </div>
                  <input
                    type="date"
                    value={formValues.birthDate}
                    onChange={(e) =>
                      handleInputChange("birthDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg text-center"
                  />
                </div>
              </div>

              {/* Target Date Section */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="text-center">
                  <div className="mb-4">
                    <svg
                      className="w-8 h-8 text-green-500 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Calculate Age At
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Target date for age calculation
                    </p>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="date"
                      value={formValues.targetDate}
                      onChange={(e) =>
                        handleInputChange("targetDate", e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg text-center"
                    />
                    <button
                      onClick={setToday}
                      className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium text-sm"
                    >
                      🗓️ Set to Today
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={calculate}
                className="bg-blue-600 text-white px-10 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
              >
                Calculate Age
              </button>
              <button
                onClick={clear}
                className="bg-gray-500 text-white px-8 py-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-r-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Error:</strong> {error}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Results Section - Separate Container */}
      {result && result.isValid && <AgeResults result={result} />}
    </div>
  );
}

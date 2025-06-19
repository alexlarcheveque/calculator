"use client";

import { useState } from "react";
import { CommonPhraseFormValues, PercentageResult } from "@/types/percentage";
import {
  calculateWhatIsPercentOf,
  calculateWhatPercentOf,
  calculatePercentOfWhat,
  formatNumber,
} from "@/utils/percentageCalculations";

export default function CommonPhrasesCalculator() {
  const [formValues, setFormValues] = useState<CommonPhraseFormValues>({
    phrase1Value: "",
    phrase1Percentage: "",
    phrase2Value1: "",
    phrase2Value2: "",
    phrase3Value: "",
    phrase3Percentage: "",
  });

  const [results, setResults] = useState<{
    phrase1?: PercentageResult;
    phrase2?: PercentageResult;
    phrase3?: PercentageResult;
  }>({});

  const [errors, setErrors] = useState<{
    phrase1?: string;
    phrase2?: string;
    phrase3?: string;
  }>({});

  const handleInputChange = (
    field: keyof CommonPhraseFormValues,
    value: string
  ) => {
    const numericValue = value === "" ? "" : parseFloat(value);
    setFormValues((prev) => ({ ...prev, [field]: numericValue }));

    // Clear related error
    if (field.startsWith("phrase1")) {
      setErrors((prev) => ({ ...prev, phrase1: undefined }));
    } else if (field.startsWith("phrase2")) {
      setErrors((prev) => ({ ...prev, phrase2: undefined }));
    } else if (field.startsWith("phrase3")) {
      setErrors((prev) => ({ ...prev, phrase3: undefined }));
    }
  };

  const calculatePhrase1 = () => {
    try {
      const { phrase1Percentage, phrase1Value } = formValues;

      if (phrase1Percentage === "" || phrase1Value === "") {
        setErrors((prev) => ({ ...prev, phrase1: "Please enter both values" }));
        return;
      }

      const result = calculateWhatIsPercentOf(
        Number(phrase1Percentage),
        Number(phrase1Value)
      );
      setResults((prev) => ({ ...prev, phrase1: result }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        phrase1: err instanceof Error ? err.message : "An error occurred",
      }));
      setResults((prev) => ({ ...prev, phrase1: undefined }));
    }
  };

  const calculatePhrase2 = () => {
    try {
      const { phrase2Value1, phrase2Value2 } = formValues;

      if (phrase2Value1 === "" || phrase2Value2 === "") {
        setErrors((prev) => ({ ...prev, phrase2: "Please enter both values" }));
        return;
      }

      const result = calculateWhatPercentOf(
        Number(phrase2Value1),
        Number(phrase2Value2)
      );
      setResults((prev) => ({ ...prev, phrase2: result }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        phrase2: err instanceof Error ? err.message : "An error occurred",
      }));
      setResults((prev) => ({ ...prev, phrase2: undefined }));
    }
  };

  const calculatePhrase3 = () => {
    try {
      const { phrase3Value, phrase3Percentage } = formValues;

      if (phrase3Value === "" || phrase3Percentage === "") {
        setErrors((prev) => ({ ...prev, phrase3: "Please enter both values" }));
        return;
      }

      const result = calculatePercentOfWhat(
        Number(phrase3Value),
        Number(phrase3Percentage)
      );
      setResults((prev) => ({ ...prev, phrase3: result }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        phrase3: err instanceof Error ? err.message : "An error occurred",
      }));
      setResults((prev) => ({ ...prev, phrase3: undefined }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Instructions styled like other percentage calculators */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">
            How to Use Common Phrases Calculator
          </h3>
          <p className="text-blue-700 text-sm">
            Solve common percentage word problems by filling in the blanks. Each
            phrase represents a different type of percentage calculation. Enter
            the known values and click Calculate to find the missing value.
          </p>
        </div>

        <div className="space-y-8">
          {/* What is X% of Y? */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              What is X% of Y?
            </h4>
            <div className="flex items-center justify-center space-x-3 text-lg flex-wrap gap-y-4">
              <span className="text-gray-600">what is</span>
              <input
                type="number"
                value={formValues.phrase1Percentage}
                onChange={(e) =>
                  handleInputChange("phrase1Percentage", e.target.value)
                }
                className="w-20 h-12 text-center border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="?"
              />
              <span className="text-gray-600">% of</span>
              <input
                type="number"
                value={formValues.phrase1Value}
                onChange={(e) =>
                  handleInputChange("phrase1Value", e.target.value)
                }
                className="w-24 h-12 text-center border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="?"
              />
              <button
                onClick={calculatePhrase1}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 focus:outline-none"
              >
                Calculate
              </button>
            </div>

            {errors.phrase1 && (
              <div className="mt-4 text-center">
                <div className="inline-block p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                  {errors.phrase1}
                </div>
              </div>
            )}

            {results.phrase1 && (
              <div className="mt-6">
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="text-center mb-4">
                    <div className="text-xl font-medium text-gray-800">
                      {formValues.phrase1Percentage}% of{" "}
                      {formValues.phrase1Value} ={" "}
                      {formatNumber(results.phrase1.result!, 2)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">
                          Answer:
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          {formatNumber(results.phrase1.result!, 4)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {results.phrase1.steps.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Calculation steps:
                    </h4>
                    <div className="space-y-4">
                      {results.phrase1.steps.map((step, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm font-medium text-gray-600 mb-2">
                            Step {index + 1}:
                          </div>
                          <div className="font-mono text-sm bg-white px-3 py-2 rounded border-l-2 border-blue-200">
                            {step}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* X is what percent of Y? */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              X is what percent of Y?
            </h4>
            <div className="flex items-center justify-center space-x-3 text-lg flex-wrap gap-y-4">
              <input
                type="number"
                value={formValues.phrase2Value1}
                onChange={(e) =>
                  handleInputChange("phrase2Value1", e.target.value)
                }
                className="w-24 h-12 text-center border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="?"
              />
              <span className="text-gray-600">is what percent of</span>
              <input
                type="number"
                value={formValues.phrase2Value2}
                onChange={(e) =>
                  handleInputChange("phrase2Value2", e.target.value)
                }
                className="w-24 h-12 text-center border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="?"
              />
              <button
                onClick={calculatePhrase2}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 focus:outline-none"
              >
                Calculate
              </button>
            </div>

            {errors.phrase2 && (
              <div className="mt-4 text-center">
                <div className="inline-block p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                  {errors.phrase2}
                </div>
              </div>
            )}

            {results.phrase2 && (
              <div className="mt-6">
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="text-center mb-4">
                    <div className="text-xl font-medium text-gray-800">
                      {formValues.phrase2Value1} is{" "}
                      {formatNumber(results.phrase2.percentage!, 2)}% of{" "}
                      {formValues.phrase2Value2}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">
                          Answer:
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          {formatNumber(results.phrase2.percentage!, 4)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {results.phrase2.steps.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Calculation steps:
                    </h4>
                    <div className="space-y-4">
                      {results.phrase2.steps.map((step, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm font-medium text-gray-600 mb-2">
                            Step {index + 1}:
                          </div>
                          <div className="font-mono text-sm bg-white px-3 py-2 rounded border-l-2 border-blue-200">
                            {step}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* X is Y% of what? */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              X is Y% of what?
            </h4>
            <div className="flex items-center justify-center space-x-3 text-lg flex-wrap gap-y-4">
              <input
                type="number"
                value={formValues.phrase3Value}
                onChange={(e) =>
                  handleInputChange("phrase3Value", e.target.value)
                }
                className="w-24 h-12 text-center border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="?"
              />
              <span className="text-gray-600">is</span>
              <input
                type="number"
                value={formValues.phrase3Percentage}
                onChange={(e) =>
                  handleInputChange("phrase3Percentage", e.target.value)
                }
                className="w-20 h-12 text-center border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="?"
              />
              <span className="text-gray-600">% of what?</span>
              <button
                onClick={calculatePhrase3}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 focus:outline-none"
              >
                Calculate
              </button>
            </div>

            {errors.phrase3 && (
              <div className="mt-4 text-center">
                <div className="inline-block p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                  {errors.phrase3}
                </div>
              </div>
            )}

            {results.phrase3 && (
              <div className="mt-6">
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="text-center mb-4">
                    <div className="text-xl font-medium text-gray-800">
                      {formValues.phrase3Value} is{" "}
                      {formValues.phrase3Percentage}% of{" "}
                      {formatNumber(results.phrase3.value!, 2)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">
                          Answer:
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          {formatNumber(results.phrase3.value!, 4)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {results.phrase3.steps.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Calculation steps:
                    </h4>
                    <div className="space-y-4">
                      {results.phrase3.steps.map((step, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm font-medium text-gray-600 mb-2">
                            Step {index + 1}:
                          </div>
                          <div className="font-mono text-sm bg-white px-3 py-2 rounded border-l-2 border-blue-200">
                            {step}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

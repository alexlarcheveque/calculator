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
      {/* What is X% of Y? */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 text-lg">
          <span>what is</span>
          <input
            type="number"
            value={formValues.phrase1Percentage}
            onChange={(e) =>
              handleInputChange("phrase1Percentage", e.target.value)
            }
            className="w-20 h-10 text-center border border-gray-300 rounded"
            placeholder="?"
          />
          <span>% of</span>
          <input
            type="number"
            value={formValues.phrase1Value}
            onChange={(e) => handleInputChange("phrase1Value", e.target.value)}
            className="w-24 h-10 text-center border border-gray-300 rounded"
            placeholder="?"
          />
          <button
            onClick={calculatePhrase1}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
        </div>

        {errors.phrase1 && (
          <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {errors.phrase1}
          </div>
        )}

        {results.phrase1 && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="font-semibold">
              Answer: {formatNumber(results.phrase1.result!, 4)}
            </p>
            <div className="mt-2 text-sm">
              {results.phrase1.steps.map((step, index) => (
                <p key={index} className="font-mono">
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* X is what % of Y? */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 text-lg">
          <input
            type="number"
            value={formValues.phrase2Value1}
            onChange={(e) => handleInputChange("phrase2Value1", e.target.value)}
            className="w-24 h-10 text-center border border-gray-300 rounded"
            placeholder="?"
          />
          <span>is what % of</span>
          <input
            type="number"
            value={formValues.phrase2Value2}
            onChange={(e) => handleInputChange("phrase2Value2", e.target.value)}
            className="w-24 h-10 text-center border border-gray-300 rounded"
            placeholder="?"
          />
          <button
            onClick={calculatePhrase2}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
        </div>

        {errors.phrase2 && (
          <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {errors.phrase2}
          </div>
        )}

        {results.phrase2 && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="font-semibold">
              Answer: {formatNumber(results.phrase2.percentage!, 4)}%
            </p>
            <div className="mt-2 text-sm">
              {results.phrase2.steps.map((step, index) => (
                <p key={index} className="font-mono">
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* X is Y% of what? */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 text-lg">
          <input
            type="number"
            value={formValues.phrase3Value}
            onChange={(e) => handleInputChange("phrase3Value", e.target.value)}
            className="w-24 h-10 text-center border border-gray-300 rounded"
            placeholder="?"
          />
          <span>is</span>
          <input
            type="number"
            value={formValues.phrase3Percentage}
            onChange={(e) =>
              handleInputChange("phrase3Percentage", e.target.value)
            }
            className="w-20 h-10 text-center border border-gray-300 rounded"
            placeholder="?"
          />
          <span>% of what</span>
          <button
            onClick={calculatePhrase3}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
        </div>

        {errors.phrase3 && (
          <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {errors.phrase3}
          </div>
        )}

        {results.phrase3 && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="font-semibold">
              Answer: {formatNumber(results.phrase3.value!, 4)}
            </p>
            <div className="mt-2 text-sm">
              {results.phrase3.steps.map((step, index) => (
                <p key={index} className="font-mono">
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

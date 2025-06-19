"use client";

import { useState } from "react";
import { SimpleRandomFormValues, RandomResult } from "@/types/random";
import { generateSimpleRandomInteger } from "@/utils/randomGenerations";

export default function SimpleRandomGenerator() {
  const [formValues, setFormValues] = useState<SimpleRandomFormValues>({
    lowerLimit: 1,
    upperLimit: 100,
  });

  const [result, setResult] = useState<RandomResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof SimpleRandomFormValues,
    value: string
  ) => {
    const numericValue = value === "" ? "" : parseFloat(value);
    setFormValues((prev) => ({ ...prev, [field]: numericValue }));
    setError("");
  };

  const generate = () => {
    try {
      const { lowerLimit, upperLimit } = formValues;

      if (lowerLimit === "" || upperLimit === "") {
        setError("Please enter both lower and upper limits");
        return;
      }

      const generationResult = generateSimpleRandomInteger(
        Number(lowerLimit),
        Number(upperLimit)
      );
      setResult(generationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      lowerLimit: 1,
      upperLimit: 100,
    });
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Main Generator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Instructions styled like percentage calculators */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">
            How to Use Simple Random Generator
          </h3>
          <p className="text-blue-700 text-sm mb-3">
            Generate a random integer within your specified range. Enter the
            lower and upper limits to define your range.
          </p>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>
              • Both limits are inclusive (the generated number can equal either
              limit)
            </li>
            <li>• Supports very large integers up to a few thousand digits</li>
            <li>• Lower limit must be less than or equal to upper limit</li>
          </ul>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4 text-lg flex-wrap gap-y-4">
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1 font-medium">
                LOWER LIMIT
              </label>
              <input
                type="number"
                value={formValues.lowerLimit}
                onChange={(e) =>
                  handleInputChange("lowerLimit", e.target.value)
                }
                className="w-32 h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="1"
              />
            </div>
            <span className="text-lg font-medium text-gray-600">to</span>
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1 font-medium">
                UPPER LIMIT
              </label>
              <input
                type="number"
                value={formValues.upperLimit}
                onChange={(e) =>
                  handleInputChange("upperLimit", e.target.value)
                }
                className="w-32 h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="100"
              />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={generate}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 focus:outline-none mr-3"
            >
              Generate
            </button>
            <button
              onClick={clear}
              className="px-8 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors focus:ring-4 focus:ring-gray-200 focus:outline-none"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="text-center">
              <div className="inline-block p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                {error}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Random Number Generator
          </h2>
          <p className="text-gray-600 mb-6">
            Your randomly generated number within the specified range.
          </p>

          {/* Result Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Generated Number
            </h3>
          </div>

          {/* Main Result Display */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {result.numbers[0]}
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Range:</span>
                <span className="text-lg font-medium text-gray-800">
                  {result.settings.lowerLimit} to {result.settings.upperLimit}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Generated at:</span>
                <span className="text-lg font-medium text-gray-800">
                  {result.generatedAt.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

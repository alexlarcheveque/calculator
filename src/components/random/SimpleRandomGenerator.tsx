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
    <div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-24 text-right font-medium">Lower Limit:</label>
            <input
              type="number"
              value={formValues.lowerLimit}
              onChange={(e) => handleInputChange("lowerLimit", e.target.value)}
              className="flex-1 h-10 px-3 border border-gray-300 rounded text-left"
              placeholder="Enter lower limit"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-24 text-right font-medium">Upper Limit:</label>
            <input
              type="number"
              value={formValues.upperLimit}
              onChange={(e) => handleInputChange("upperLimit", e.target.value)}
              className="flex-1 h-10 px-3 border border-gray-300 rounded text-left"
              placeholder="Enter upper limit"
            />
          </div>
        </div>

        <div className="text-center mt-6 space-x-4">
          <button
            onClick={generate}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Generate
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-semibold text-lg mb-3">Generated Number:</h3>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {result.numbers[0]}
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>
                <strong>Range:</strong> {result.settings.lowerLimit} to{" "}
                {result.settings.upperLimit}
              </p>
              <p>
                <strong>Generated at:</strong>{" "}
                {result.generatedAt.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          <p>
            <strong>Instructions:</strong>
          </p>
          <ul className="list-disc list-inside mt-1">
            <li>
              Enter the lower and upper limits for your random number range
            </li>
            <li>
              Both limits are inclusive (the generated number can equal either
              limit)
            </li>
            <li>Supports very large integers up to a few thousand digits</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

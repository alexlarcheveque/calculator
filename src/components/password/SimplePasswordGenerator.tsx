"use client";

import { useState } from "react";
import { PasswordResult } from "@/types/password";
import { generateSimplePassword } from "@/utils/passwordUtils";
import PasswordResults from "./PasswordResults";

export default function SimplePasswordGenerator() {
  const [length, setLength] = useState<number | "">(12);
  const [result, setResult] = useState<PasswordResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleLengthChange = (value: string) => {
    const numericValue = value === "" ? "" : parseInt(value, 10);
    setLength(numericValue);
    setError("");
  };

  const generate = () => {
    try {
      if (length === "") {
        setError("Please enter password length");
        return;
      }

      const generationResult = generateSimplePassword(Number(length));
      setResult(generationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setLength(12);
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Main Generator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Simple Password Generator
        </h2>
        <p className="text-gray-600 mb-6">
          Generate a secure password quickly with a mix of uppercase, lowercase,
          numbers, and symbols. Just choose your desired length.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4 text-lg">
              <div className="flex flex-col items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Length:
                </label>
                <input
                  type="number"
                  min="4"
                  max="128"
                  value={length}
                  onChange={(e) => handleLengthChange(e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  placeholder="12"
                />
              </div>
              <span className="text-lg font-medium text-gray-600 mt-6">
                characters
              </span>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={generate}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Generate Password
              </button>
              <button
                onClick={clear}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
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
      </div>

      {/* Results Section */}
      {result && <PasswordResults result={result} />}
    </div>
  );
}

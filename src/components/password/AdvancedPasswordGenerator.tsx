"use client";

import { useState } from "react";
import { PasswordFormValues, PasswordResult } from "@/types/password";
import { generatePasswords } from "@/utils/passwordUtils";
import PasswordResults from "./PasswordResults";

export default function AdvancedPasswordGenerator() {
  const [formValues, setFormValues] = useState<PasswordFormValues>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
    customSymbols: "",
    count: 1,
  });

  const [result, setResult] = useState<PasswordResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof PasswordFormValues,
    value: string | boolean | number
  ) => {
    if (typeof value === "boolean") {
      setFormValues((prev) => ({ ...prev, [field]: value }));
    } else if (
      typeof value === "string" &&
      (field === "length" || field === "count")
    ) {
      const numericValue = value === "" ? "" : parseInt(value, 10);
      setFormValues((prev) => ({ ...prev, [field]: numericValue }));
    } else {
      setFormValues((prev) => ({ ...prev, [field]: value }));
    }
    setError("");
  };

  const generate = () => {
    try {
      const generationResult = generatePasswords(formValues);
      setResult(generationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      excludeSimilar: false,
      excludeAmbiguous: false,
      customSymbols: "",
      count: 1,
    });
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Main Generator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Advanced Password Generator
        </h2>
        <p className="text-gray-600 mb-6">
          Customize every aspect of your password generation. Choose character
          types, exclude problematic characters, and generate multiple passwords
          at once.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="space-y-6">
            {/* Basic Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Length:
                </label>
                <input
                  type="number"
                  min="4"
                  max="128"
                  value={formValues.length}
                  onChange={(e) => handleInputChange("length", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Passwords:
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formValues.count}
                  onChange={(e) => handleInputChange("count", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1"
                />
              </div>
            </div>

            {/* Character Types */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-800 mb-4">
                Include Character Types
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formValues.includeUppercase}
                    onChange={(e) =>
                      handleInputChange("includeUppercase", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Uppercase Letters (A-Z)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formValues.includeLowercase}
                    onChange={(e) =>
                      handleInputChange("includeLowercase", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Lowercase Letters (a-z)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formValues.includeNumbers}
                    onChange={(e) =>
                      handleInputChange("includeNumbers", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Numbers (0-9)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formValues.includeSymbols}
                    onChange={(e) =>
                      handleInputChange("includeSymbols", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Symbols (!@#$%^&*)
                  </span>
                </label>
              </div>
            </div>

            {/* Custom Symbols */}
            {formValues.includeSymbols && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Symbols (Optional):
                </label>
                <input
                  type="text"
                  value={formValues.customSymbols || ""}
                  onChange={(e) =>
                    handleInputChange("customSymbols", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="!@#$%^&*()_+-=[]{}|;:,.<>?"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to use default symbols, or specify your own
                  characters
                </p>
              </div>
            )}

            {/* Exclusion Options */}
            <div>
              <h4 className="block text-sm font-medium text-gray-700 mb-3">
                Exclusion Options:
              </h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formValues.excludeSimilar}
                    onChange={(e) =>
                      handleInputChange("excludeSimilar", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Exclude Similar Characters (il1Lo0O)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formValues.excludeAmbiguous}
                    onChange={(e) =>
                      handleInputChange("excludeAmbiguous", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Exclude Ambiguous Characters (&lt;{}&gt;[]()/)
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={generate}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Generate Password
                {formValues.count !== 1 && formValues.count !== "" ? "s" : ""}
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

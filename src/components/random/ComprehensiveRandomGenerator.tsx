"use client";

import { useState, useEffect } from "react";
import { ComprehensiveRandomFormValues, RandomResult } from "@/types/random";
import {
  generateRandomNumbers,
  canGenerateUniqueNumbers,
} from "@/utils/randomGenerations";

export default function ComprehensiveRandomGenerator() {
  const [formValues, setFormValues] = useState<ComprehensiveRandomFormValues>({
    lowerLimit: 0.2,
    upperLimit: 112.5,
    count: 1,
    allowDuplication: true,
    sortOrder: "none",
    numberType: "decimal",
    precision: 50,
  });

  const [result, setResult] = useState<RandomResult | null>(null);
  const [error, setError] = useState<string>("");
  const [showAdvancedOptions, setShowAdvancedOptions] =
    useState<boolean>(false);

  // Show/hide advanced options based on count
  useEffect(() => {
    const count = Number(formValues.count);
    setShowAdvancedOptions(count > 1);
  }, [formValues.count]);

  const handleInputChange = (
    field: keyof ComprehensiveRandomFormValues,
    value: string | boolean
  ) => {
    if (typeof value === "boolean") {
      setFormValues((prev) => ({ ...prev, [field]: value }));
    } else {
      const numericValue = value === "" ? "" : parseFloat(value);
      setFormValues((prev) => ({ ...prev, [field]: numericValue }));
    }
    setError("");
  };

  const handleSelectChange = (
    field: keyof ComprehensiveRandomFormValues,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const generate = () => {
    try {
      const {
        lowerLimit,
        upperLimit,
        count,
        allowDuplication,
        sortOrder,
        numberType,
        precision,
      } = formValues;

      if (lowerLimit === "" || upperLimit === "" || count === "") {
        setError("Please enter lower limit, upper limit, and count");
        return;
      }

      if (numberType === "decimal" && precision === "") {
        setError("Please enter precision for decimal numbers");
        return;
      }

      // Check if unique generation is possible when duplication is not allowed
      if (!allowDuplication && Number(count) > 1) {
        const canGenerate = canGenerateUniqueNumbers(
          Number(lowerLimit),
          Number(upperLimit),
          Number(count),
          numberType,
          numberType === "decimal" ? Number(precision) : undefined
        );

        if (!canGenerate && numberType === "integer") {
          setError(
            "Cannot generate that many unique integers in the specified range"
          );
          return;
        }
      }

      const generationResult = generateRandomNumbers({
        min: Number(lowerLimit),
        max: Number(upperLimit),
        count: Number(count),
        type: numberType,
        precision: numberType === "decimal" ? Number(precision) : undefined,
        allowDuplication,
        sort: sortOrder,
      });

      setResult(generationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      lowerLimit: 0.2,
      upperLimit: 112.5,
      count: 1,
      allowDuplication: true,
      sortOrder: "none",
      numberType: "decimal",
      precision: 50,
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
            How to Use Comprehensive Random Generator
          </h3>
          <p className="text-blue-700 text-sm mb-3">
            Generate multiple random numbers with advanced options. Configure
            the range, quantity, and number type for your needs.
          </p>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>
              • Choose between integers and decimals with custom precision
            </li>
            <li>• Generate up to 10,000 numbers at once</li>
            <li>
              • Configure duplication and sorting options for multiple numbers
            </li>
            <li>• Both limits are inclusive in the generated range</li>
          </ul>
        </div>

        <div className="space-y-6">
          {/* Basic Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1 font-medium">
                LOWER LIMIT
              </label>
              <input
                type="number"
                step="any"
                value={formValues.lowerLimit}
                onChange={(e) =>
                  handleInputChange("lowerLimit", e.target.value)
                }
                className="w-full h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="0.2"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1 font-medium">
                UPPER LIMIT
              </label>
              <input
                type="number"
                step="any"
                value={formValues.upperLimit}
                onChange={(e) =>
                  handleInputChange("upperLimit", e.target.value)
                }
                className="w-full h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="112.5"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1 font-medium">
                COUNT
              </label>
              <input
                type="number"
                min="1"
                max="10000"
                value={formValues.count}
                onChange={(e) => handleInputChange("count", e.target.value)}
                className="w-full h-12 text-center border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                placeholder="1"
              />
            </div>
          </div>

          {/* Number Type Selection */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Number Type</h4>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="numberType"
                  checked={formValues.numberType === "integer"}
                  onChange={() => handleSelectChange("numberType", "integer")}
                  className="mr-2 text-blue-600"
                />
                <span className="text-gray-700">Integer</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="numberType"
                  checked={formValues.numberType === "decimal"}
                  onChange={() => handleSelectChange("numberType", "decimal")}
                  className="mr-2 text-blue-600"
                />
                <span className="text-gray-700">Decimal</span>
              </label>
            </div>

            {formValues.numberType === "decimal" && (
              <div className="mt-4 flex items-center space-x-3">
                <label className="text-sm font-medium text-gray-700">
                  Precision:
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formValues.precision}
                  onChange={(e) =>
                    handleInputChange("precision", e.target.value)
                  }
                  className="w-20 h-10 px-3 border-2 border-blue-300 rounded-lg text-center focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                  placeholder="50"
                />
                <span className="text-sm text-gray-600">digits</span>
              </div>
            )}
          </div>

          {/* Advanced Options - shown when count > 1 */}
          {showAdvancedOptions && (
            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-gray-800 mb-3">
                Advanced Options
              </h4>

              <div>
                <p className="font-medium text-gray-700 mb-2">
                  Allow duplication in results?
                </p>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="duplication"
                      checked={formValues.allowDuplication}
                      onChange={() =>
                        handleInputChange("allowDuplication", true)
                      }
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="duplication"
                      checked={!formValues.allowDuplication}
                      onChange={() =>
                        handleInputChange("allowDuplication", false)
                      }
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-2">
                  Sort the results?
                </p>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      checked={formValues.sortOrder === "asc"}
                      onChange={() => handleSelectChange("sortOrder", "asc")}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-gray-700">Ascending</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      checked={formValues.sortOrder === "desc"}
                      onChange={() => handleSelectChange("sortOrder", "desc")}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-gray-700">Descending</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      checked={formValues.sortOrder === "none"}
                      onChange={() => handleSelectChange("sortOrder", "none")}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>
          )}

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
            Comprehensive Random Generator
          </h2>
          <p className="text-gray-600 mb-6">
            Your randomly generated numbers with the specified configuration.
          </p>

          {/* Result Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Generated Numbers ({result.numbers.length})
            </h3>
          </div>

          {/* Main Result Display */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            {result.numbers.length === 1 ? (
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-4">
                  {result.numbers[0]}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-80 overflow-y-auto">
                {result.numbers.map((num, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded-lg border-2 border-blue-100 text-center font-mono text-sm hover:border-blue-300 transition-colors"
                  >
                    {num}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settings Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">
              Generation Settings
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Count:</span>
                <span className="font-medium">{result.settings.count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Range:</span>
                <span className="font-medium">
                  {result.settings.lowerLimit} to {result.settings.upperLimit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium capitalize">
                  {result.settings.numberType}
                </span>
              </div>
              {result.settings.precision && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Precision:</span>
                  <span className="font-medium">
                    {result.settings.precision} digits
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Duplication:</span>
                <span className="font-medium">
                  {result.settings.allowDuplication ? "Allowed" : "Not allowed"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sort:</span>
                <span className="font-medium">
                  {result.settings.sortOrder === "none"
                    ? "None"
                    : result.settings.sortOrder === "asc"
                    ? "Ascending"
                    : "Descending"}
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Generated at:</span>
                <span className="font-medium">
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

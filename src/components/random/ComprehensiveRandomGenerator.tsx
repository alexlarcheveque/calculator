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
    <div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-24 text-right font-medium">Lower Limit:</label>
            <input
              type="number"
              step="any"
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
              step="any"
              value={formValues.upperLimit}
              onChange={(e) => handleInputChange("upperLimit", e.target.value)}
              className="flex-1 h-10 px-3 border border-gray-300 rounded text-left"
              placeholder="Enter upper limit"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-24 text-right font-medium">Generate:</label>
            <input
              type="number"
              min="1"
              max="10000"
              value={formValues.count}
              onChange={(e) => handleInputChange("count", e.target.value)}
              className="w-20 h-10 px-3 border border-gray-300 rounded text-center"
              placeholder="1"
            />
            <span>numbers</span>
          </div>

          {/* Advanced Options - shown when count > 1 */}
          {showAdvancedOptions && (
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="font-medium mb-2">
                    Allow duplication in results?
                  </p>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="duplication"
                        checked={formValues.allowDuplication}
                        onChange={() =>
                          handleInputChange("allowDuplication", true)
                        }
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="duplication"
                        checked={!formValues.allowDuplication}
                        onChange={() =>
                          handleInputChange("allowDuplication", false)
                        }
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Sort the results?</p>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sort"
                        checked={formValues.sortOrder === "asc"}
                        onChange={() => handleSelectChange("sortOrder", "asc")}
                        className="mr-2"
                      />
                      Ascending
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sort"
                        checked={formValues.sortOrder === "desc"}
                        onChange={() => handleSelectChange("sortOrder", "desc")}
                        className="mr-2"
                      />
                      Descending
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sort"
                        checked={formValues.sortOrder === "none"}
                        onChange={() => handleSelectChange("sortOrder", "none")}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="border-t pt-4 space-y-4">
            <div>
              <p className="font-medium mb-2">Type of result to generate?</p>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="numberType"
                    checked={formValues.numberType === "integer"}
                    onChange={() => handleSelectChange("numberType", "integer")}
                    className="mr-2"
                  />
                  Integer
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="numberType"
                    checked={formValues.numberType === "decimal"}
                    onChange={() => handleSelectChange("numberType", "decimal")}
                    className="mr-2"
                  />
                  Decimal
                </label>
              </div>
            </div>

            {formValues.numberType === "decimal" && (
              <div className="flex items-center space-x-4">
                <label className="font-medium">Precision:</label>
                <input
                  type="number"
                  min="0"
                  max="999"
                  value={formValues.precision}
                  onChange={(e) =>
                    handleInputChange("precision", e.target.value)
                  }
                  className="w-20 h-10 px-3 border border-gray-300 rounded text-center"
                  placeholder="50"
                />
                <span>digits</span>
              </div>
            )}
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
            <h3 className="font-semibold text-lg mb-3">Generated Numbers:</h3>

            <div className="mb-4">
              {result.numbers.length === 1 ? (
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {result.numbers[0]}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-60 overflow-y-auto">
                  {result.numbers.map((num, index) => (
                    <div
                      key={index}
                      className="bg-white p-2 rounded border text-center font-mono text-sm"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Count:</strong> {result.settings.count}
              </p>
              <p>
                <strong>Range:</strong> {result.settings.lowerLimit} to{" "}
                {result.settings.upperLimit}
              </p>
              <p>
                <strong>Type:</strong> {result.settings.numberType}
              </p>
              {result.settings.precision && (
                <p>
                  <strong>Precision:</strong> {result.settings.precision} digits
                </p>
              )}
              <p>
                <strong>Duplication:</strong>{" "}
                {result.settings.allowDuplication ? "Allowed" : "Not allowed"}
              </p>
              <p>
                <strong>Sort:</strong>{" "}
                {result.settings.sortOrder === "none"
                  ? "None"
                  : result.settings.sortOrder === "asc"
                  ? "Ascending"
                  : "Descending"}
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
            <li>Enter the range and number of values to generate</li>
            <li>Choose between integers and decimals with custom precision</li>
            <li>
              For multiple numbers, configure duplication and sorting options
            </li>
            <li>Maximum 10,000 numbers can be generated at once</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

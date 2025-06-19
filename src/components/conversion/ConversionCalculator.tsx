"use client";

import React, { useState } from "react";
import {
  ConversionCategory,
  ConversionFormValues,
  ConversionResult,
} from "@/types/conversion";
import {
  performConversion,
  getUnitsForCategory,
  unitCategories,
} from "@/utils/conversionUtils";
import ConversionResults from "./ConversionResults";

const ConversionCalculator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ConversionCategory>(
    ConversionCategory.LENGTH
  );
  const [formValues, setFormValues] = useState<ConversionFormValues>({
    fromValue: "",
    fromUnit: "meter",
    toUnit: "kilometer",
    category: ConversionCategory.LENGTH,
  });
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleCategoryChange = (category: ConversionCategory) => {
    setActiveCategory(category);
    const units = getUnitsForCategory(category);
    setFormValues({
      fromValue: "",
      fromUnit: units[0]?.id || "",
      toUnit: units[1]?.id || units[0]?.id || "",
      category,
    });
    setResult(null);
    setError("");
  };

  const handleInputChange = (
    field: keyof ConversionFormValues,
    value: string | number
  ) => {
    const newValues = { ...formValues, [field]: value };
    setFormValues(newValues);
    setError("");

    // Auto-convert if we have a valid number
    if (field === "fromValue" && value !== "" && !isNaN(Number(value))) {
      try {
        const conversionResult = performConversion(newValues);
        setResult(conversionResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Conversion failed");
      }
    } else if (
      field !== "fromValue" &&
      newValues.fromValue !== "" &&
      !isNaN(Number(newValues.fromValue))
    ) {
      try {
        const conversionResult = performConversion(newValues);
        setResult(conversionResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Conversion failed");
      }
    } else {
      setResult(null);
    }
  };

  const currentUnits = getUnitsForCategory(activeCategory);

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Conversion Type
        </h2>
        <div className="flex flex-wrap gap-2">
          {unitCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion Form */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Convert {unitCategories.find((c) => c.id === activeCategory)?.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Section */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fromValue"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                From
              </label>
              <input
                type="number"
                id="fromValue"
                value={formValues.fromValue}
                onChange={(e) => handleInputChange("fromValue", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter value to convert"
                step="any"
              />
            </div>

            <div>
              <label
                htmlFor="fromUnit"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Unit
              </label>
              <select
                id="fromUnit"
                value={formValues.fromUnit}
                onChange={(e) => handleInputChange("fromUnit", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                size={Math.min(currentUnits.length, 8)}
              >
                {currentUnits.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* To Section */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="toValue"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                To
              </label>
              <input
                type="text"
                id="toValue"
                value={result ? result.toValue.toString() : ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700"
                placeholder="Result will appear here"
                readOnly
              />
            </div>

            <div>
              <label
                htmlFor="toUnit"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Unit
              </label>
              <select
                id="toUnit"
                value={formValues.toUnit}
                onChange={(e) => handleInputChange("toUnit", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                size={Math.min(currentUnits.length, 8)}
              >
                {currentUnits.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>

      {/* Results */}
      {result && <ConversionResults result={result} />}
    </div>
  );
};

export default ConversionCalculator;

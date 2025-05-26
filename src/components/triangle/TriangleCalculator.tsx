"use client";

import { useState } from "react";
import { TriangleFormValues, TriangleResult } from "@/types/triangle";
import {
  solveTriangle,
  validateTriangleInput,
} from "@/utils/triangleCalculations";
import TriangleResults from "@/components/triangle/TriangleResults";

export default function TriangleCalculator() {
  const [formValues, setFormValues] = useState<TriangleFormValues>({
    sideA: "",
    sideB: "",
    sideC: 60,
    angleA: "",
    angleB: "",
    angleC: "",
    angleUnit: "degrees",
  });

  const [result, setResult] = useState<TriangleResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    field: keyof TriangleFormValues,
    value: string | boolean
  ) => {
    if (field === "angleUnit") {
      setFormValues((prev) => ({
        ...prev,
        [field]: value as "degrees" | "radians",
      }));
    } else {
      const numericValue = value === "" ? "" : parseFloat(value as string);
      setFormValues((prev) => ({ ...prev, [field]: numericValue }));
    }
    setError("");
  };

  const calculate = () => {
    try {
      const input = {
        sideA: formValues.sideA === "" ? undefined : Number(formValues.sideA),
        sideB: formValues.sideB === "" ? undefined : Number(formValues.sideB),
        sideC: formValues.sideC === "" ? undefined : Number(formValues.sideC),
        angleA:
          formValues.angleA === "" ? undefined : Number(formValues.angleA),
        angleB:
          formValues.angleB === "" ? undefined : Number(formValues.angleB),
        angleC:
          formValues.angleC === "" ? undefined : Number(formValues.angleC),
        angleUnit: formValues.angleUnit,
      };

      const validation = validateTriangleInput(input);
      if (!validation.isValid) {
        setError(validation.errors.join(", "));
        setResult(null);
        return;
      }

      const calculationResult = solveTriangle(input);
      setResult(calculationResult);

      if (!calculationResult.isValid) {
        setError("Unable to solve triangle with given values");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const clear = () => {
    setFormValues({
      sideA: "",
      sideB: "",
      sideC: "",
      angleA: "",
      angleB: "",
      angleC: "",
      angleUnit: "degrees",
    });
    setResult(null);
    setError("");
  };

  const angleSymbol = formValues.angleUnit === "degrees" ? "°" : "";

  return (
    <div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        {/* Triangle Diagram */}
        <div className="mb-6">
          <div className="relative mx-auto w-80 h-64 bg-white border rounded-lg flex items-center justify-center">
            <svg
              width="300"
              height="200"
              viewBox="0 0 300 200"
              className="absolute"
            >
              {/* Triangle */}
              <polygon
                points="150,30 50,170 250,170"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
              />

              {/* Side labels */}
              <text
                x="100"
                y="105"
                textAnchor="middle"
                className="text-sm font-medium fill-blue-600"
              >
                c
              </text>
              <text
                x="200"
                y="105"
                textAnchor="middle"
                className="text-sm font-medium fill-blue-600"
              >
                b
              </text>
              <text
                x="150"
                y="190"
                textAnchor="middle"
                className="text-sm font-medium fill-blue-600"
              >
                a
              </text>

              {/* Angle labels */}
              <text
                x="150"
                y="45"
                textAnchor="middle"
                className="text-sm font-medium fill-red-600"
              >
                C
              </text>
              <text
                x="60"
                y="165"
                textAnchor="middle"
                className="text-sm font-medium fill-red-600"
              >
                A
              </text>
              <text
                x="240"
                y="165"
                textAnchor="middle"
                className="text-sm font-medium fill-red-600"
              >
                B
              </text>
            </svg>
          </div>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sides */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Sides</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <label className="w-16 text-right font-medium">Side a:</label>
                <input
                  type="number"
                  step="any"
                  value={formValues.sideA}
                  onChange={(e) => handleInputChange("sideA", e.target.value)}
                  className="flex-1 h-10 px-3 border border-gray-300 rounded"
                  placeholder="Enter side a"
                />
              </div>
              <div className="flex items-center space-x-3">
                <label className="w-16 text-right font-medium">Side b:</label>
                <input
                  type="number"
                  step="any"
                  value={formValues.sideB}
                  onChange={(e) => handleInputChange("sideB", e.target.value)}
                  className="flex-1 h-10 px-3 border border-gray-300 rounded"
                  placeholder="Enter side b"
                />
              </div>
              <div className="flex items-center space-x-3">
                <label className="w-16 text-right font-medium">Side c:</label>
                <input
                  type="number"
                  step="any"
                  value={formValues.sideC}
                  onChange={(e) => handleInputChange("sideC", e.target.value)}
                  className="flex-1 h-10 px-3 border border-gray-300 rounded"
                  placeholder="Enter side c"
                />
              </div>
            </div>
          </div>

          {/* Angles */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Angles</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <label className="w-16 text-right font-medium">Angle A:</label>
                <input
                  type="number"
                  step="any"
                  value={formValues.angleA}
                  onChange={(e) => handleInputChange("angleA", e.target.value)}
                  className="flex-1 h-10 px-3 border border-gray-300 rounded"
                  placeholder={`Enter angle A${angleSymbol}`}
                />
                <span className="w-8 text-left">{angleSymbol}</span>
              </div>
              <div className="flex items-center space-x-3">
                <label className="w-16 text-right font-medium">Angle B:</label>
                <input
                  type="number"
                  step="any"
                  value={formValues.angleB}
                  onChange={(e) => handleInputChange("angleB", e.target.value)}
                  className="flex-1 h-10 px-3 border border-gray-300 rounded"
                  placeholder={`Enter angle B${angleSymbol}`}
                />
                <span className="w-8 text-left">{angleSymbol}</span>
              </div>
              <div className="flex items-center space-x-3">
                <label className="w-16 text-right font-medium">Angle C:</label>
                <input
                  type="number"
                  step="any"
                  value={formValues.angleC}
                  onChange={(e) => handleInputChange("angleC", e.target.value)}
                  className="flex-1 h-10 px-3 border border-gray-300 rounded"
                  placeholder={`Enter angle C${angleSymbol}`}
                />
                <span className="w-8 text-left">{angleSymbol}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Angle Unit Selection */}
        <div className="mt-6 text-center">
          <label className="font-medium mr-3">Angle Unit:</label>
          <select
            value={formValues.angleUnit}
            onChange={(e) => handleInputChange("angleUnit", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="degrees">degree °</option>
            <option value="radians">radian</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="text-center mt-6 space-x-4">
          <button
            onClick={calculate}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 text-sm text-gray-600">
          <p className="font-medium mb-2">Instructions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide at least 3 values including at least one side</li>
            <li>
              When radians are selected, you can use values like π/2, π/4, etc.
            </li>
            <li>The calculator will solve for all unknown values</li>
            <li>All angles in a triangle must sum to 180° (or π radians)</li>
          </ul>
        </div>
      </div>

      {/* Results */}
      {result && (
        <TriangleResults result={result} angleUnit={formValues.angleUnit} />
      )}
    </div>
  );
}

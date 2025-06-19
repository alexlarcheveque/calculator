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
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">
          How to Use the Triangle Calculator
        </h3>
        <div className="text-blue-700 space-y-2">
          <p className="font-medium">
            To solve a triangle, you need at least 3 values including at least
            one side:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>
              Enter any combination of sides (a, b, c) and angles (A, B, C)
            </li>
            <li>Choose between degrees or radians for angle measurements</li>
            <li>For radians, you can use values like π/2, π/4, etc.</li>
            <li>The calculator will solve for all unknown values</li>
            <li>All angles in a triangle must sum to 180° (or π radians)</li>
          </ul>
        </div>
      </div>

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
            <h3 className="text-lg font-semibold mb-4 text-center">Sides</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Side a</label>
                <input
                  type="number"
                  step="any"
                  value={formValues.sideA}
                  onChange={(e) => handleInputChange("sideA", e.target.value)}
                  className="w-full h-12 px-4 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter side a"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Side b</label>
                <input
                  type="number"
                  step="any"
                  value={formValues.sideB}
                  onChange={(e) => handleInputChange("sideB", e.target.value)}
                  className="w-full h-12 px-4 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter side b"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Side c</label>
                <input
                  type="number"
                  step="any"
                  value={formValues.sideC}
                  onChange={(e) => handleInputChange("sideC", e.target.value)}
                  className="w-full h-12 px-4 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter side c"
                />
              </div>
            </div>
          </div>

          {/* Angles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">Angles</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Angle A
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="any"
                    value={formValues.angleA}
                    onChange={(e) =>
                      handleInputChange("angleA", e.target.value)
                    }
                    className="flex-1 h-12 px-4 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder={`Enter angle A${angleSymbol}`}
                  />
                  <span className="w-8 text-center font-medium">
                    {angleSymbol}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Angle B
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="any"
                    value={formValues.angleB}
                    onChange={(e) =>
                      handleInputChange("angleB", e.target.value)
                    }
                    className="flex-1 h-12 px-4 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder={`Enter angle B${angleSymbol}`}
                  />
                  <span className="w-8 text-center font-medium">
                    {angleSymbol}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Angle C
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="any"
                    value={formValues.angleC}
                    onChange={(e) =>
                      handleInputChange("angleC", e.target.value)
                    }
                    className="flex-1 h-12 px-4 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder={`Enter angle C${angleSymbol}`}
                  />
                  <span className="w-8 text-center font-medium">
                    {angleSymbol}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Angle Unit Selection */}
        <div className="mt-8 text-center">
          <label className="block text-sm font-medium mb-3">Angle Unit</label>
          <select
            value={formValues.angleUnit}
            onChange={(e) => handleInputChange("angleUnit", e.target.value)}
            className="px-4 py-3 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          >
            <option value="degrees">degree °</option>
            <option value="radians">radian</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="text-center mt-8 space-x-4">
          <button
            onClick={calculate}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <TriangleResults result={result} angleUnit={formValues.angleUnit} />
      )}
    </div>
  );
}

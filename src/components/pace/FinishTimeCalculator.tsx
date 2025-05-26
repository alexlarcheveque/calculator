"use client";

import React, { useState } from "react";
import {
  DistanceUnit,
  FinishTimeFormValues,
  FinishTimeResults,
} from "@/types/pace";
import { calculateFinishTime } from "@/utils/paceCalculations";

export default function FinishTimeCalculator() {
  const [formValues, setFormValues] = useState<FinishTimeFormValues>({
    currentDistance: 1,
    currentDistanceUnit: DistanceUnit.MILES,
    elapsedTime: "6:15",
    fullDistance: 5,
    fullDistanceUnit: DistanceUnit.MILES,
  });
  const [results, setResults] = useState<FinishTimeResults | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "currentDistance" || name === "fullDistance") {
      setFormValues((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCalculate = () => {
    const calculatedResults = calculateFinishTime(formValues);
    setResults(calculatedResults);
  };

  const handleClear = () => {
    setFormValues({
      currentDistance: 0,
      currentDistanceUnit: DistanceUnit.MILES,
      elapsedTime: "",
      fullDistance: 0,
      fullDistanceUnit: DistanceUnit.MILES,
    });
    setResults(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Finish Time Calculator
      </h3>
      <p className="text-gray-600 mb-6">
        The following calculator can be used to estimate a person's finish time
        based on the time and distance covered in a race at the point the
        calculator is used.
      </p>

      <div className="space-y-4">
        {/* Current Distance Traveled */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Distance Traveled
            </label>
          </div>
          <div>
            <input
              type="number"
              name="currentDistance"
              value={formValues.currentDistance || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              step="0.1"
              min="0"
            />
          </div>
          <div>
            <select
              name="currentDistanceUnit"
              value={formValues.currentDistanceUnit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.values(DistanceUnit).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Elapsed Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Elapsed Time
            </label>
          </div>
          <div>
            <input
              type="text"
              name="elapsedTime"
              value={formValues.elapsedTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="hh:mm:ss"
            />
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            hh:mm:ss
          </div>
        </div>

        {/* Full Distance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Distance
            </label>
          </div>
          <div>
            <input
              type="number"
              name="fullDistance"
              value={formValues.fullDistance || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              step="0.1"
              min="0"
            />
          </div>
          <div>
            <select
              name="fullDistanceUnit"
              value={formValues.fullDistanceUnit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.values(DistanceUnit).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={handleCalculate}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Results */}
      {results && results.estimatedFinishTime && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="text-lg font-semibold mb-3 text-gray-800">
            Finish Time Projection
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded border">
              <p className="text-sm text-gray-600 font-medium">
                Estimated Finish Time
              </p>
              <p className="text-lg font-semibold text-green-800 font-mono">
                {results.estimatedFinishTime}
              </p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="text-sm text-gray-600 font-medium">
                Remaining Time
              </p>
              <p className="text-lg font-semibold text-gray-800 font-mono">
                {results.remainingTime}
              </p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="text-sm text-gray-600 font-medium">
                Remaining Distance
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {results.remainingDistance}
              </p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="text-sm text-gray-600 font-medium">Current Pace</p>
              <p className="text-lg font-semibold text-gray-800 font-mono">
                {results.currentPace}
              </p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="text-sm text-gray-600 font-medium">
                Projected Total Time
              </p>
              <p className="text-lg font-semibold text-gray-800 font-mono">
                {results.projectedTotalTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

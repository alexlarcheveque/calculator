"use client";

import React, { useState } from "react";
import {
  PaceUnit,
  PaceConverterFormValues,
  PaceConverterResults,
} from "@/types/pace";
import { convertPace } from "@/utils/paceCalculations";

export default function PaceConverter() {
  const [formValues, setFormValues] = useState<PaceConverterFormValues>({
    fromPace: "5:30",
    fromPaceUnit: PaceUnit.TIME_PER_MILE,
    toPaceUnit: PaceUnit.TIME_PER_KILOMETER,
  });
  const [results, setResults] = useState<PaceConverterResults | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    const calculatedResults = convertPace(formValues);
    setResults(calculatedResults);
  };

  const handleClear = () => {
    setFormValues({
      fromPace: "",
      fromPaceUnit: PaceUnit.TIME_PER_MILE,
      toPaceUnit: PaceUnit.TIME_PER_KILOMETER,
    });
    setResults(null);
  };

  const isTimeBasedPaceUnit = (unit: PaceUnit) => {
    return (
      unit === PaceUnit.TIME_PER_MILE || unit === PaceUnit.TIME_PER_KILOMETER
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Pace Converter
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* From Pace Input */}
        <div className="text-center">
          <input
            type={
              isTimeBasedPaceUnit(formValues.fromPaceUnit) ? "text" : "number"
            }
            name="fromPace"
            value={formValues.fromPace}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center"
            placeholder={
              isTimeBasedPaceUnit(formValues.fromPaceUnit)
                ? "hh:mm:ss"
                : "Enter speed"
            }
            step={
              isTimeBasedPaceUnit(formValues.fromPaceUnit) ? undefined : "0.1"
            }
          />
          {isTimeBasedPaceUnit(formValues.fromPaceUnit) && (
            <div className="text-xs text-gray-500 mt-1">hh:mm:ss</div>
          )}
        </div>

        {/* From Unit Selector */}
        <div>
          <select
            name="fromPaceUnit"
            value={formValues.fromPaceUnit}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={PaceUnit.TIME_PER_MILE}>Per Mile</option>
            <option value={PaceUnit.TIME_PER_KILOMETER}>Per Kilometer</option>
            <option value={PaceUnit.MILES_PER_HOUR}>Miles Per Hour</option>
            <option value={PaceUnit.KILOMETERS_PER_HOUR}>
              Kilometers Per Hour
            </option>
            <option value={PaceUnit.METERS_PER_MINUTE}>
              Meters Per Minute
            </option>
            <option value={PaceUnit.METERS_PER_SECOND}>
              Meters Per Second
            </option>
            <option value={PaceUnit.YARDS_PER_MINUTE}>Yards Per Minute</option>
            <option value={PaceUnit.YARDS_PER_SECOND}>Yards Per Second</option>
          </select>
        </div>

        {/* Equals Sign */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">=</div>
        </div>

        {/* To Unit Selector */}
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-600">?</span>
            <select
              name="toPaceUnit"
              value={formValues.toPaceUnit}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={PaceUnit.TIME_PER_MILE}>Per Mile</option>
              <option value={PaceUnit.TIME_PER_KILOMETER}>Per Kilometer</option>
              <option value={PaceUnit.MILES_PER_HOUR}>Miles Per Hour</option>
              <option value={PaceUnit.KILOMETERS_PER_HOUR}>
                Kilometers Per Hour
              </option>
              <option value={PaceUnit.METERS_PER_MINUTE}>
                Meters Per Minute
              </option>
              <option value={PaceUnit.METERS_PER_SECOND}>
                Meters Per Second
              </option>
              <option value={PaceUnit.YARDS_PER_MINUTE}>
                Yards Per Minute
              </option>
              <option value={PaceUnit.YARDS_PER_SECOND}>
                Yards Per Second
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
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

      {/* Results */}
      {results && results.convertedPace && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-center">
            <p className="text-sm text-blue-600 font-medium mb-2">
              Conversion Result
            </p>
            <div className="text-lg text-gray-800">
              <span className="font-mono">{results.fromFormatted}</span>
              <span className="mx-3 text-blue-600 font-bold">=</span>
              <span className="font-mono font-bold text-blue-800">
                {results.convertedPace}
              </span>
              <span className="ml-2 text-gray-600">
                {formValues.toPaceUnit === PaceUnit.TIME_PER_MILE && "per mile"}
                {formValues.toPaceUnit === PaceUnit.TIME_PER_KILOMETER &&
                  "per kilometer"}
                {formValues.toPaceUnit === PaceUnit.MILES_PER_HOUR && "mph"}
                {formValues.toPaceUnit === PaceUnit.KILOMETERS_PER_HOUR &&
                  "kph"}
                {formValues.toPaceUnit === PaceUnit.METERS_PER_MINUTE &&
                  "m/min"}
                {formValues.toPaceUnit === PaceUnit.METERS_PER_SECOND && "m/s"}
                {formValues.toPaceUnit === PaceUnit.YARDS_PER_MINUTE &&
                  "yd/min"}
                {formValues.toPaceUnit === PaceUnit.YARDS_PER_SECOND && "yd/s"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

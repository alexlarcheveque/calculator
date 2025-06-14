"use client";

import { useState } from "react";
import {
  CalculatorType,
  DistanceUnit,
  PaceUnit,
  PaceFormValues,
} from "@/types/pace";
import { getPresetDistances } from "@/utils/paceCalculations";

interface PaceFormProps {
  values: PaceFormValues;
  onChange: (name: string, value: string | number) => void;
  onPresetChange: (updates: Partial<PaceFormValues>) => void;
}

export default function PaceForm({
  values,
  onChange,
  onPresetChange,
}: PaceFormProps) {
  const [activeTab, setActiveTab] = useState<CalculatorType>(
    CalculatorType.PACE
  );

  const presetDistances = getPresetDistances();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // If distance unit is changing, automatically update pace unit too
    if (name === "distanceUnit") {
      const updates: Partial<PaceFormValues> = {
        distanceUnit: value as DistanceUnit,
      };

      // Automatically set the appropriate pace unit
      if (value === DistanceUnit.MILES) {
        updates.paceUnit = PaceUnit.TIME_PER_MILE;
      } else if (value === DistanceUnit.KILOMETERS) {
        updates.paceUnit = PaceUnit.TIME_PER_KILOMETER;
      }

      onPresetChange(updates);
    } else {
      onChange(name, value);
    }
  };

  const handleTabChange = (calculatorType: CalculatorType) => {
    setActiveTab(calculatorType);
    onChange("calculatorType", calculatorType);
  };

  const handlePresetDistance = (distance: number, unit: DistanceUnit) => {
    const updates: Partial<PaceFormValues> = {
      distance,
      distanceUnit: unit,
    };

    // Automatically set the appropriate pace unit based on the distance unit
    if (unit === DistanceUnit.MILES) {
      updates.paceUnit = PaceUnit.TIME_PER_MILE;
    } else if (unit === DistanceUnit.KILOMETERS) {
      updates.paceUnit = PaceUnit.TIME_PER_KILOMETER;
    }

    onPresetChange(updates);
  };

  const isTimeBasedPaceUnit = (unit: PaceUnit) => {
    return (
      unit === PaceUnit.TIME_PER_MILE || unit === PaceUnit.TIME_PER_KILOMETER
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Pace Calculator
      </h2>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {Object.values(CalculatorType).map((type) => (
            <button
              key={type}
              onClick={() => handleTabChange(type)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === type
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {type === CalculatorType.PACE && "Pace"}
              {type === CalculatorType.TIME && "Time"}
              {type === CalculatorType.DISTANCE && "Distance"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* Time Input - Show when calculating pace or distance */}
        {(activeTab === CalculatorType.PACE ||
          activeTab === CalculatorType.DISTANCE) && (
          <div className="form-group">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Time
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                id="time"
                name="time"
                pattern="^[0-9]{2}:[0-9]{2}:[0-9]{2}$"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.time}
                onChange={handleChange}
                placeholder="00:50:25"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Format: hh:mm:ss (e.g., 00:50:25)
            </p>
          </div>
        )}

        {/* Distance Input - Show when calculating pace or time */}
        {(activeTab === CalculatorType.PACE ||
          activeTab === CalculatorType.TIME) && (
          <div className="form-group">
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Distance
            </label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="number"
                  id="distance"
                  name="distance"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={values.distance}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="w-32">
                <select
                  name="distanceUnit"
                  value={values.distanceUnit}
                  onChange={handleChange}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={DistanceUnit.MILES}>Miles</option>
                  <option value={DistanceUnit.KILOMETERS}>Kilometers</option>
                </select>
              </div>
            </div>

            {/* Preset Distance Buttons */}
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-2">Or pick an event:</p>
              <div className="flex flex-wrap gap-1">
                {presetDistances.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() =>
                      handlePresetDistance(preset.distance, preset.unit)
                    }
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border text-gray-700 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pace Input - Show when calculating time or distance */}
        {(activeTab === CalculatorType.TIME ||
          activeTab === CalculatorType.DISTANCE) && (
          <div className="form-group">
            <label
              htmlFor="pace"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Pace
            </label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type={
                    isTimeBasedPaceUnit(values.paceUnit) ? "text" : "number"
                  }
                  id="pace"
                  name="pace"
                  pattern={
                    isTimeBasedPaceUnit(values.paceUnit)
                      ? "^[0-9]{2}:[0-9]{2}:[0-9]{2}$"
                      : undefined
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={values.pace}
                  onChange={handleChange}
                  placeholder={
                    isTimeBasedPaceUnit(values.paceUnit)
                      ? "00:08:10"
                      : "Enter speed"
                  }
                  step={
                    isTimeBasedPaceUnit(values.paceUnit) ? undefined : "0.1"
                  }
                />
              </div>
              <div className="w-40">
                <select
                  name="paceUnit"
                  value={values.paceUnit}
                  onChange={handleChange}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={PaceUnit.TIME_PER_MILE}>Per Mile</option>
                  <option value={PaceUnit.MILES_PER_HOUR}>
                    Miles Per Hour
                  </option>
                  <option value={PaceUnit.TIME_PER_KILOMETER}>
                    Per Kilometer
                  </option>
                  <option value={PaceUnit.KILOMETERS_PER_HOUR}>
                    Kilometers Per Hour
                  </option>
                </select>
              </div>
            </div>
            {isTimeBasedPaceUnit(values.paceUnit) && (
              <p className="mt-1 text-xs text-gray-500">
                Format: hh:mm:ss (e.g., 00:08:10)
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

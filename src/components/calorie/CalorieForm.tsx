"use client";

import { useState } from "react";
import {
  CalorieFormValues,
  Gender,
  ActivityLevel,
  BMRFormula,
  UnitSystem,
  ResultUnit,
} from "@/types/calorie";
import {
  getActivityLevelDescription,
  getBMRFormulaDescription,
  convertHeightToMetric,
  convertWeightToMetric,
  convertHeightToImperial,
  convertWeightToImperial,
} from "@/utils/calorieCalculations";

interface CalorieFormProps {
  values: CalorieFormValues;
  onChange: (name: string, value: number | string) => void;
  onMultipleChanges?: (updates: Partial<CalorieFormValues>) => void;
}

export default function CalorieForm({
  values,
  onChange,
  onMultipleChanges,
}: CalorieFormProps) {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      onChange(name, value);
    } else if (type === "number") {
      // Handle empty string to allow clearing the input
      if (value === "") {
        // Don't set to 0 immediately, let the input be empty
        return;
      } else {
        const numericValue = parseFloat(value);
        // Only set numeric value if it's a valid number
        if (!isNaN(numericValue)) {
      onChange(name, numericValue);
        }
      }
    } else {
      onChange(name, value);
    }
  };

  const handleUnitSystemChange = (newSystem: UnitSystem) => {
    if (newSystem !== values.unitSystem) {
      let newValues: Partial<CalorieFormValues> = { unitSystem: newSystem };

      if (newSystem === UnitSystem.METRIC) {
        // Convert from imperial to metric
        newValues.heightCm = convertHeightToMetric(
          values.heightFeet,
          values.heightInches
        );
        newValues.weightKg = convertWeightToMetric(values.weightLbs);
      } else {
        // Convert from metric to imperial
        const { feet, inches } = convertHeightToImperial(values.heightCm);
        newValues.heightFeet = feet;
        newValues.heightInches = inches;
        newValues.weightLbs = convertWeightToImperial(values.weightKg);
      }

      // Use bulk update if available, otherwise fall back to individual updates
      if (onMultipleChanges) {
        onMultipleChanges(newValues);
      } else {
      Object.entries(newValues).forEach(([key, value]) => {
        onChange(key, value);
      });
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Personal Information
      </h2>

      {/* Unit System Toggle */}
      <div className="mb-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            type="button"
            onClick={() => handleUnitSystemChange(UnitSystem.IMPERIAL)}
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              values.unitSystem === UnitSystem.IMPERIAL
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            US Units
          </button>
          <button
            type="button"
            onClick={() => handleUnitSystemChange(UnitSystem.METRIC)}
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              values.unitSystem === UnitSystem.METRIC
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Metric Units
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Age */}
        <div className="form-group">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="block w-full pl-2 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={values.age}
            onChange={handleChange}
            min="15"
            max="80"
            step="1"
          />
          <p className="mt-1 text-xs text-gray-500">Ages 15 - 80</p>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value={Gender.MALE}
                checked={values.gender === Gender.MALE}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value={Gender.FEMALE}
                checked={values.gender === Gender.FEMALE}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Female</span>
            </label>
          </div>
        </div>

        {/* Height */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height
          </label>
          {values.unitSystem === UnitSystem.IMPERIAL ? (
            <div className="flex space-x-2">
              <div className="flex-1">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="heightFeet"
                    name="heightFeet"
                    className="block w-full pl-2 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.heightFeet}
                    onChange={handleChange}
                    min="3"
                    max="8"
                    step="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">feet</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="heightInches"
                    name="heightInches"
                    className="block w-full pl-2 pr-16 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.heightInches}
                    onChange={handleChange}
                    min="0"
                    max="11"
                    step="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">inches</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="heightCm"
                name="heightCm"
                className="block w-full pl-2 pr-8 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.heightCm}
                onChange={handleChange}
                min="100"
                max="250"
                step="0.1"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">cm</span>
              </div>
            </div>
          )}
        </div>

        {/* Weight */}
        <div className="form-group">
          <label
            htmlFor={
              values.unitSystem === UnitSystem.IMPERIAL
                ? "weightLbs"
                : "weightKg"
            }
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Weight
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id={
                values.unitSystem === UnitSystem.IMPERIAL
                  ? "weightLbs"
                  : "weightKg"
              }
              name={
                values.unitSystem === UnitSystem.IMPERIAL
                  ? "weightLbs"
                  : "weightKg"
              }
              className="block w-full pl-2 pr-16 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={
                values.unitSystem === UnitSystem.IMPERIAL
                  ? values.weightLbs
                  : values.weightKg
              }
              onChange={handleChange}
              min={values.unitSystem === UnitSystem.IMPERIAL ? "50" : "20"}
              max={values.unitSystem === UnitSystem.IMPERIAL ? "500" : "200"}
              step={values.unitSystem === UnitSystem.IMPERIAL ? "1" : "0.1"}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">
                {values.unitSystem === UnitSystem.IMPERIAL ? "pounds" : "kg"}
              </span>
            </div>
          </div>
        </div>

        {/* Activity Level */}
        <div className="form-group">
          <label
            htmlFor="activityLevel"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Activity Level
          </label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={values.activityLevel}
            onChange={handleChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.values(ActivityLevel).map((level) => (
              <option key={level} value={level}>
                {getActivityLevelDescription(level)}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Settings */}
        <div className="form-group">
          <button
            type="button"
            onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            {showAdvancedSettings ? "- Settings" : "+ Settings"}
          </button>

          {showAdvancedSettings && (
            <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-md">
              {/* Result Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Results unit:
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="resultUnit"
                      value={ResultUnit.CALORIES}
                      checked={values.resultUnit === ResultUnit.CALORIES}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Calories</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="resultUnit"
                      value={ResultUnit.KILOJOULES}
                      checked={values.resultUnit === ResultUnit.KILOJOULES}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Kilojoules
                    </span>
                  </label>
                </div>
              </div>

              {/* BMR Formula */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BMR estimation formula:
                </label>
                <div className="space-y-2">
                  {Object.values(BMRFormula).map((formula) => (
                    <label key={formula} className="flex items-center">
                      <input
                        type="radio"
                        name="bmrFormula"
                        value={formula}
                        checked={values.bmrFormula === formula}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {getBMRFormulaDescription(formula)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Body Fat Percentage (for Katch-McArdle) */}
              {values.bmrFormula === BMRFormula.KATCH_MCARDLE && (
                <div>
                  <label
                    htmlFor="bodyFatPercentage"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Body Fat Percentage
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="bodyFatPercentage"
                      name="bodyFatPercentage"
                      className="block w-full pl-2 pr-8 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={values.bodyFatPercentage || 0}
                      onChange={handleChange}
                      min="5"
                      max="50"
                      step="0.1"
                      placeholder="20"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">%</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    <a
                      href="/body-fat-calculator"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Calculate your body fat percentage
                    </a>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Exercise Information */}
      <div className="mt-6 text-xs text-gray-600 space-y-1">
        <div>
          <strong>Exercise:</strong> 15-30 minutes of elevated heart rate
          activity.
        </div>
        <div>
          <strong>Intense exercise:</strong> 45-120 minutes of elevated heart
          rate activity.
        </div>
        <div>
          <strong>Very intense exercise:</strong> 2+ hours of elevated heart
          rate activity.
        </div>
      </div>
    </div>
  );
}

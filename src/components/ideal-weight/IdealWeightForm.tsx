"use client";

import { IdealWeightFormValues, UnitSystem, Gender } from "@/types/idealWeight";

interface IdealWeightFormProps {
  values: IdealWeightFormValues;
  onChange: (name: string, value: number | string) => void;
}

export default function IdealWeightForm({
  values,
  onChange,
}: IdealWeightFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "unitSystem" || name === "gender") {
      onChange(name, value);
    } else {
      const numericValue = parseFloat(value) || 0;
      onChange(name, numericValue);
    }
  };

  const handleUnitSystemChange = (unitSystem: UnitSystem) => {
    onChange("unitSystem", unitSystem);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Personal Details
      </h2>

      <div className="space-y-6">
        {/* Unit System Toggle */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Unit System
          </label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => handleUnitSystemChange(UnitSystem.IMPERIAL)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                values.unitSystem === UnitSystem.IMPERIAL
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              US Units
            </button>
            <button
              type="button"
              onClick={() => handleUnitSystemChange(UnitSystem.METRIC)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                values.unitSystem === UnitSystem.METRIC
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Metric Units
            </button>
          </div>
        </div>

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
            className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={values.age}
            onChange={handleChange}
            min="2"
            max="80"
            step="1"
            placeholder="Enter your age"
          />
          <p className="mt-2 text-xs text-gray-500">Ages 2 - 80</p>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gender
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={Gender.MALE}
                checked={values.gender === Gender.MALE}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-gray-700">Male</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={Gender.FEMALE}
                checked={values.gender === Gender.FEMALE}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-gray-700">Female</span>
            </label>
          </div>
        </div>

        {/* Height - Imperial */}
        {values.unitSystem === UnitSystem.IMPERIAL && (
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  id="heightFeet"
                  name="heightFeet"
                  className="block w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={values.heightFeet}
                  onChange={handleChange}
                  min="3"
                  max="8"
                  step="1"
                  placeholder="5"
                />
                <span className="absolute right-4 top-3 text-gray-500 text-sm font-medium">
                  feet
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="heightInches"
                  name="heightInches"
                  className="block w-full px-4 py-3 pr-16 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={values.heightInches}
                  onChange={handleChange}
                  min="0"
                  max="11"
                  step="0.1"
                  placeholder="10"
                />
                <span className="absolute right-4 top-3 text-gray-500 text-sm font-medium">
                  inches
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Height - Metric */}
        {values.unitSystem === UnitSystem.METRIC && (
          <div className="form-group">
            <label
              htmlFor="heightCm"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Height
            </label>
            <div className="relative">
              <input
                type="number"
                id="heightCm"
                name="heightCm"
                className="block w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={values.heightCm}
                onChange={handleChange}
                min="100"
                max="250"
                step="0.1"
                placeholder="180"
              />
              <span className="absolute right-4 top-3 text-gray-500 text-sm font-medium">
                cm
              </span>
            </div>
          </div>
        )}

        {/* Calculate Button */}
        <div className="form-group pt-4">
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-lg shadow-sm"
          >
            Calculate
          </button>
        </div>

        {/* Clear Button */}
        <div className="form-group">
          <button
            type="button"
            onClick={() => {
              onChange("age", 25);
              onChange("gender", Gender.MALE);
              onChange("heightFeet", 5);
              onChange("heightInches", 10);
              onChange("heightCm", 180);
            }}
            className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

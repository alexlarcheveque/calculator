"use client";

import { BMIFormValues, UnitSystem, Gender } from "@/types/bmi";

interface BMIFormProps {
  values: BMIFormValues;
  onChange: (name: string, value: number | string) => void;
}

export default function BMIForm({ values, onChange }: BMIFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "unitSystem" || name === "gender") {
      onChange(name, value);
    } else {
      if (value === "" || value === null || value === undefined) {
        onChange(name, "");
      } else {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          onChange(name, numericValue);
        }
      }
    }
  };

  const handleUnitSystemChange = (newUnitSystem: UnitSystem) => {
    onChange("unitSystem", newUnitSystem);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        BMI Calculator
      </h2>

      <div className="space-y-4">
        {/* Unit System Toggle */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit System
          </label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => handleUnitSystemChange(UnitSystem.IMPERIAL)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                values.unitSystem === UnitSystem.IMPERIAL
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              US Units
            </button>
            <button
              type="button"
              onClick={() => handleUnitSystemChange(UnitSystem.METRIC)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                values.unitSystem === UnitSystem.METRIC
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
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
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={values.age}
            onChange={handleChange}
            min="2"
            max="120"
            step="1"
            placeholder="Enter age"
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={Gender.MALE}
                checked={values.gender === Gender.MALE}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Male</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={Gender.FEMALE}
                checked={values.gender === Gender.FEMALE}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
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
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="number"
                  id="heightFeet"
                  name="heightFeet"
                  className="block w-full pl-2 pr-16 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={values.heightFeet}
                  onChange={handleChange}
                  min="3"
                  max="8"
                  step="1"
                  placeholder="5"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">feet</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="heightInches"
                  name="heightInches"
                  className="block w-full pl-2 pr-16 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={values.heightInches}
                  onChange={handleChange}
                  min="0"
                  max="11"
                  step="0.1"
                  placeholder="10"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">inches</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <input
                type="number"
                id="heightCm"
                name="heightCm"
                className="block w-full pl-2 pr-16 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={values.heightCm}
                onChange={handleChange}
                min="50"
                max="250"
                step="0.1"
                placeholder="180"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">cm</span>
              </div>
            </div>
          )}
        </div>

        {/* Weight */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight
          </label>
          {values.unitSystem === UnitSystem.IMPERIAL ? (
            <div className="relative">
              <input
                type="number"
                id="weightLbs"
                name="weightLbs"
                className="block w-full pr-16 pl-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={values.weightLbs}
                onChange={handleChange}
                min="50"
                max="1000"
                step="0.1"
                placeholder="160"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">pounds</span>
              </div>
            </div>
          ) : (
            <div className="relative">
              <input
                type="number"
                id="weightKg"
                name="weightKg"
                className="block w-full pl-2 pr-16 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={values.weightKg}
                onChange={handleChange}
                min="20"
                max="500"
                step="0.1"
                placeholder="65"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">kg</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

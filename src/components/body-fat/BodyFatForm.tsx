"use client";

import { BodyFatFormValues, UnitSystem, Gender } from "@/types/bodyFat";
import { useState } from "react";

interface BodyFatFormProps {
  values: BodyFatFormValues;
  onChange: (name: string, value: number | string) => void;
}

export default function BodyFatForm({ values, onChange }: BodyFatFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "gender" || name === "unitSystem") {
      onChange(name, value);
    } else {
      onChange(name, parseFloat(value) || 0);
    }
  };

  const handleUnitSystemChange = (unitSystem: UnitSystem) => {
    onChange("unitSystem", unitSystem);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Body Fat Calculator
      </h2>

      {/* Unit System Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => handleUnitSystemChange(UnitSystem.US)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              values.unitSystem === UnitSystem.US
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            US Units
          </button>
          <button
            type="button"
            onClick={() => handleUnitSystemChange(UnitSystem.METRIC)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
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
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={values.age}
            onChange={handleChange}
            min="10"
            max="100"
            step="1"
          />
        </div>

        {values.unitSystem === UnitSystem.US ? (
          <>
            {/* Weight (US) */}
            <div className="form-group">
              <label
                htmlFor="weightLbs"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Weight
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="weightLbs"
                  name="weightLbs"
                  className="block w-full pr-16 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={values.weightLbs}
                  onChange={handleChange}
                  min="50"
                  max="500"
                  step="0.1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">pounds</span>
                </div>
              </div>
            </div>

            {/* Height (US) */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="heightFeet"
                    className="block w-full pr-12 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.heightFeet}
                    onChange={handleChange}
                    min="3"
                    max="8"
                    step="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">feet</span>
                  </div>
                </div>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="heightInches"
                    className="block w-full pr-16 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.heightInches}
                    onChange={handleChange}
                    min="0"
                    max="11.9"
                    step="0.1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">inches</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Neck (US) */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Neck
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="neckFeet"
                    className="block w-full pr-12 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.neckFeet}
                    onChange={handleChange}
                    min="0"
                    max="2"
                    step="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">feet</span>
                  </div>
                </div>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="neckInches"
                    className="block w-full pr-16 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.neckInches}
                    onChange={handleChange}
                    min="0"
                    max="11.9"
                    step="0.1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">inches</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Waist (US) */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waist
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="waistFeet"
                    className="block w-full pr-12 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.waistFeet}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    step="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">feet</span>
                  </div>
                </div>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="waistInches"
                    className="block w-full pr-16 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.waistInches}
                    onChange={handleChange}
                    min="0"
                    max="11.9"
                    step="0.1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">inches</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hip (US) - Only for females */}
            {values.gender === Gender.FEMALE && (
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hip
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="hipFeet"
                      className="block w-full pr-12 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={values.hipFeet}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      step="1"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">feet</span>
                    </div>
                  </div>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="hipInches"
                      className="block w-full pr-16 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={values.hipInches}
                      onChange={handleChange}
                      min="0"
                      max="11.9"
                      step="0.1"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">inches</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Weight (Metric) */}
            <div className="form-group">
              <label
                htmlFor="weightKg"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Weight
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="weightKg"
                  name="weightKg"
                  className="block w-full pr-8 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={values.weightKg}
                  onChange={handleChange}
                  min="20"
                  max="250"
                  step="0.1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">kg</span>
                </div>
              </div>
            </div>

            {/* Height (Metric) */}
            <div className="form-group">
              <label
                htmlFor="heightCm"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Height
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="heightCm"
                  name="heightCm"
                  className="block w-full pr-8 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={values.heightCm}
                  onChange={handleChange}
                  min="100"
                  max="250"
                  step="0.1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">cm</span>
                </div>
              </div>
            </div>

            {/* Neck (Metric) */}
            <div className="form-group">
              <label
                htmlFor="neckCm"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Neck
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="neckCm"
                  name="neckCm"
                  className="block w-full pr-8 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={values.neckCm}
                  onChange={handleChange}
                  min="20"
                  max="60"
                  step="0.1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">cm</span>
                </div>
              </div>
            </div>

            {/* Waist (Metric) */}
            <div className="form-group">
              <label
                htmlFor="waistCm"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Waist
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="waistCm"
                  name="waistCm"
                  className="block w-full pr-8 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={values.waistCm}
                  onChange={handleChange}
                  min="50"
                  max="200"
                  step="0.1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">cm</span>
                </div>
              </div>
            </div>

            {/* Hip (Metric) - Only for females */}
            {values.gender === Gender.FEMALE && (
              <div className="form-group">
                <label
                  htmlFor="hipCm"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Hip
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="hipCm"
                    name="hipCm"
                    className="block w-full pr-8 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.hipCm}
                    onChange={handleChange}
                    min="60"
                    max="200"
                    step="0.1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">cm</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

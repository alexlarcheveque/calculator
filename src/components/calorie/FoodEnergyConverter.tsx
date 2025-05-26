"use client";

import { useState } from "react";
import { formatNumber } from "@/utils/calorieCalculations";

interface ConversionUnit {
  value: string;
  label: string;
  toCalories: number; // multiplier to convert to calories
}

const units: ConversionUnit[] = [
  { value: "kcal", label: "Calorie [Nutritional, kcal]", toCalories: 1 },
  { value: "cal", label: "calorie [cal]", toCalories: 0.001 },
  { value: "kJ", label: "Kilojoules [kJ]", toCalories: 0.239006 },
  { value: "J", label: "joules [J]", toCalories: 0.000239006 },
];

export default function FoodEnergyConverter() {
  const [inputValue, setInputValue] = useState<number>(1);
  const [inputUnit, setInputUnit] = useState<string>("kcal");
  const [outputUnit, setOutputUnit] = useState<string>("kJ");

  const convertValue = () => {
    const inputUnitData = units.find((u) => u.value === inputUnit);
    const outputUnitData = units.find((u) => u.value === outputUnit);

    if (!inputUnitData || !outputUnitData) return 0;

    // Convert input to calories first, then to output unit
    const calories = inputValue * inputUnitData.toCalories;
    const result = calories / outputUnitData.toCalories;

    return result;
  };

  const result = convertValue();

  const handleClear = () => {
    setInputValue(1);
    setInputUnit("kcal");
    setOutputUnit("kJ");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Food Energy Converter
      </h2>
      <p className="text-gray-600 mb-6">
        The following converter can be used to convert between Calories and
        other common food energy units.
      </p>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* Input Value */}
          <div>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
              step="0.001"
              min="0"
            />
          </div>

          {/* Input Unit */}
          <div>
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          {/* Equals */}
          <div className="text-center">
            <span className="text-xl font-bold">=</span>
          </div>

          {/* Output Value */}
          <div>
            <div className="px-3 py-2 bg-white border border-gray-300 rounded-md text-right font-bold text-green-600">
              {formatNumber(result)}
            </div>
          </div>

          {/* Output Unit */}
          <div>
            <select
              value={outputUnit}
              onChange={(e) => setOutputUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => {
              // Trigger recalculation by updating state
              setInputValue((prev) => prev);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Calculate
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Common Conversions */}
      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-medium mb-2">Common Conversions:</h3>
        <ul className="space-y-1">
          <li>1 Calorie (kcal) = 4.184 Kilojoules (kJ)</li>
          <li>1 Calorie (kcal) = 1,000 calories (cal)</li>
          <li>1 Kilojoule (kJ) = 1,000 joules (J)</li>
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { RoundConcreteValues, LengthUnit } from "@/types/concrete";
import { calculateRoundVolume } from "@/utils/concreteCalculations";
import ConcreteResults from "./ConcreteResults";

export default function RoundCalculator() {
  const [formValues, setFormValues] = useState<RoundConcreteValues>({
    diameter: 2.5,
    depth: 6,
    quantity: 1,
    diameterUnit: LengthUnit.FEET,
    depthUnit: LengthUnit.FEET,
  });

  const [result, setResult] = useState<any>(null);

  const handleInputChange = (
    field: keyof RoundConcreteValues,
    value: string | number | LengthUnit
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
    const calculationResult = calculateRoundVolume(formValues);
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      diameter: 0,
      depth: 0,
      quantity: 1,
      diameterUnit: LengthUnit.FEET,
      depthUnit: LengthUnit.FEET,
    });
    setResult(null);
  };

  const unitOptions = [
    { value: LengthUnit.FEET, label: "feet" },
    { value: LengthUnit.INCHES, label: "inches" },
    { value: LengthUnit.YARDS, label: "yards" },
    { value: LengthUnit.METERS, label: "meters" },
    { value: LengthUnit.CENTIMETERS, label: "centimeters" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Hole, Column, or Round Footings
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diameter (d)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.diameter}
                  onChange={(e) =>
                    handleInputChange(
                      "diameter",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.diameterUnit}
                  onChange={(e) =>
                    handleInputChange(
                      "diameterUnit",
                      e.target.value as LengthUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {unitOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Depth or Height (h)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.depth}
                  onChange={(e) =>
                    handleInputChange("depth", parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.depthUnit}
                  onChange={(e) =>
                    handleInputChange("depthUnit", e.target.value as LengthUnit)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {unitOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={formValues.quantity}
                onChange={(e) =>
                  handleInputChange("quantity", parseInt(e.target.value) || 1)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={calculate}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Calculate
              </button>
              <button
                onClick={clear}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-24 bg-green-100 border-2 border-green-300 rounded-full mb-4 relative">
              <div className="absolute inset-2 bg-green-200 rounded-full"></div>
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-green-600">
                d
              </div>
              <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 text-xs text-green-600">
                h
              </div>
            </div>
            <p className="text-sm text-gray-600">Cylindrical Column</p>
          </div>
        </div>
      </div>

      {result && <ConcreteResults result={result} />}
    </div>
  );
}

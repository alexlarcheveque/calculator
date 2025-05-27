"use client";

import { useState } from "react";
import { TubeConcreteValues, LengthUnit } from "@/types/concrete";
import { calculateTubeVolume } from "@/utils/concreteCalculations";
import ConcreteResults from "./ConcreteResults";

export default function TubeCalculator() {
  const [formValues, setFormValues] = useState<TubeConcreteValues>({
    outerDiameter: 5,
    innerDiameter: 4,
    height: 6,
    quantity: 1,
    outerDiameterUnit: LengthUnit.FEET,
    innerDiameterUnit: LengthUnit.FEET,
    heightUnit: LengthUnit.INCHES,
  });

  const [result, setResult] = useState<any>(null);

  const handleInputChange = (
    field: keyof TubeConcreteValues,
    value: string | number | LengthUnit
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
    const calculationResult = calculateTubeVolume(formValues);
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      outerDiameter: 0,
      innerDiameter: 0,
      height: 0,
      quantity: 1,
      outerDiameterUnit: LengthUnit.FEET,
      innerDiameterUnit: LengthUnit.FEET,
      heightUnit: LengthUnit.INCHES,
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
      <h2 className="text-2xl font-bold text-purple-600 mb-4">
        Circular Slab or Tube
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Outer Diameter (d₁)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.outerDiameter}
                  onChange={(e) =>
                    handleInputChange(
                      "outerDiameter",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.outerDiameterUnit}
                  onChange={(e) =>
                    handleInputChange(
                      "outerDiameterUnit",
                      e.target.value as LengthUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  Inner Diameter (d₂)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.innerDiameter}
                  onChange={(e) =>
                    handleInputChange(
                      "innerDiameter",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.innerDiameterUnit}
                  onChange={(e) =>
                    handleInputChange(
                      "innerDiameterUnit",
                      e.target.value as LengthUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  Length or Height (h)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.height}
                  onChange={(e) =>
                    handleInputChange("height", parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.heightUnit}
                  onChange={(e) =>
                    handleInputChange(
                      "heightUnit",
                      e.target.value as LengthUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={calculate}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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
            <div className="w-24 h-24 bg-purple-100 border-2 border-purple-300 rounded-full mb-4 relative">
              <div className="absolute inset-3 bg-white border-2 border-purple-200 rounded-full"></div>
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-purple-600">
                d₁
              </div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-purple-600">
                d₂
              </div>
              <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 text-xs text-purple-600">
                h
              </div>
            </div>
            <p className="text-sm text-gray-600">Hollow Tube</p>
          </div>
        </div>
      </div>

      {result && <ConcreteResults result={result} />}
    </div>
  );
}

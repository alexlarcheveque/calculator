"use client";

import { useState } from "react";
import { ConcreteCalculationValues, LengthUnit } from "@/types/concrete";
import { calculateSlabVolume } from "@/utils/concreteCalculations";
import ConcreteResults from "./ConcreteResults";

export default function SlabCalculator() {
  const [formValues, setFormValues] = useState<ConcreteCalculationValues>({
    shape: "slab" as any,
    length: 5,
    width: 2.5,
    thickness: 5,
    quantity: 1,
    lengthUnit: LengthUnit.FEET,
    widthUnit: LengthUnit.FEET,
    thicknessUnit: LengthUnit.INCHES,
  });

  const [result, setResult] = useState<any>(null);

  const handleInputChange = (
    field: keyof ConcreteCalculationValues,
    value: string | number | LengthUnit
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
    const calculationResult = calculateSlabVolume(formValues);
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      shape: "slab" as any,
      length: 0,
      width: 0,
      thickness: 0,
      quantity: 1,
      lengthUnit: LengthUnit.FEET,
      widthUnit: LengthUnit.FEET,
      thicknessUnit: LengthUnit.INCHES,
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
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Slabs, Square Footings, or Walls
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length (l)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.length}
                  onChange={(e) =>
                    handleInputChange("length", parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.lengthUnit}
                  onChange={(e) =>
                    handleInputChange(
                      "lengthUnit",
                      e.target.value as LengthUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  Width (w)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.width}
                  onChange={(e) =>
                    handleInputChange("width", parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.widthUnit}
                  onChange={(e) =>
                    handleInputChange("widthUnit", e.target.value as LengthUnit)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  Thickness or Height (h)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.thickness}
                  onChange={(e) =>
                    handleInputChange(
                      "thickness",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.thicknessUnit}
                  onChange={(e) =>
                    handleInputChange(
                      "thicknessUnit",
                      e.target.value as LengthUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={calculate}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
            <div className="w-32 h-20 bg-blue-100 border-2 border-blue-300 rounded-lg mb-4 relative">
              <div className="absolute inset-2 bg-blue-200 rounded"></div>
              <div className="absolute top-1 left-1 text-xs text-blue-600">
                l
              </div>
              <div className="absolute bottom-1 right-1 text-xs text-blue-600">
                w
              </div>
              <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 text-xs text-blue-600">
                h
              </div>
            </div>
            <p className="text-sm text-gray-600">Rectangular Slab</p>
          </div>
        </div>
      </div>

      {result && <ConcreteResults result={result} />}
    </div>
  );
}

"use client";

import { useState } from "react";
import { CurbConcreteValues, LengthUnit } from "@/types/concrete";
import { calculateCurbVolume } from "@/utils/concreteCalculations";
import ConcreteResults from "./ConcreteResults";

export default function CurbCalculator() {
  const [formValues, setFormValues] = useState<CurbConcreteValues>({
    curbDepth: 4,
    gutterWidth: 10,
    curbHeight: 4,
    flagThickness: 5,
    length: 10,
    quantity: 1,
    curbDepthUnit: LengthUnit.INCHES,
    gutterWidthUnit: LengthUnit.INCHES,
    curbHeightUnit: LengthUnit.INCHES,
    flagThicknessUnit: LengthUnit.INCHES,
    lengthUnit: LengthUnit.FEET,
  });

  const [result, setResult] = useState<any>(null);

  const handleInputChange = (
    field: keyof CurbConcreteValues,
    value: string | number | LengthUnit
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
    const calculationResult = calculateCurbVolume(formValues);
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      curbDepth: 0,
      gutterWidth: 0,
      curbHeight: 0,
      flagThickness: 0,
      length: 0,
      quantity: 1,
      curbDepthUnit: LengthUnit.INCHES,
      gutterWidthUnit: LengthUnit.INCHES,
      curbHeightUnit: LengthUnit.INCHES,
      flagThicknessUnit: LengthUnit.INCHES,
      lengthUnit: LengthUnit.FEET,
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
      <h2 className="text-2xl font-bold text-orange-600 mb-4">
        Curb and Gutter Barrier
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Curb Depth
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.curbDepth}
                  onChange={(e) =>
                    handleInputChange(
                      "curbDepth",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.curbDepthUnit}
                  onChange={(e) =>
                    handleInputChange(
                      "curbDepthUnit",
                      e.target.value as LengthUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  Gutter Width
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.gutterWidth}
                  onChange={(e) =>
                    handleInputChange(
                      "gutterWidth",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.gutterWidthUnit}
                  onChange={(e) =>
                    handleInputChange(
                      "gutterWidthUnit",
                      e.target.value as LengthUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  Curb Height
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.curbHeight}
                  onChange={(e) =>
                    handleInputChange(
                      "curbHeight",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.curbHeightUnit}
                  onChange={(e) =>
                    handleInputChange(
                      "curbHeightUnit",
                      e.target.value as LengthUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  Flag Thickness
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.flagThickness}
                  onChange={(e) =>
                    handleInputChange(
                      "flagThickness",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.flagThicknessUnit}
                  onChange={(e) =>
                    handleInputChange(
                      "flagThicknessUnit",
                      e.target.value as LengthUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  Length
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.length}
                  onChange={(e) =>
                    handleInputChange("length", parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={calculate}
                className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
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
            <div className="w-40 h-24 bg-orange-100 border-2 border-orange-300 rounded-lg mb-4 relative">
              <div className="absolute left-0 top-0 w-8 h-full bg-orange-200 rounded-l-lg"></div>
              <div className="absolute bottom-0 left-8 right-0 h-4 bg-orange-200 rounded-br-lg"></div>
              <div className="absolute top-2 left-2 text-xs text-orange-600">
                curb
              </div>
              <div className="absolute bottom-1 right-2 text-xs text-orange-600">
                gutter
              </div>
            </div>
            <p className="text-sm text-gray-600">Curb and Gutter</p>
          </div>
        </div>
      </div>

      {result && <ConcreteResults result={result} />}
    </div>
  );
}

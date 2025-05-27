"use client";

import { useState } from "react";
import { StairsConcreteValues, LengthUnit } from "@/types/concrete";
import { calculateStairsVolume } from "@/utils/concreteCalculations";
import ConcreteResults from "./ConcreteResults";

export default function StairsCalculator() {
  const [formValues, setFormValues] = useState<StairsConcreteValues>({
    run: 12,
    rise: 6,
    width: 50,
    platformDepth: 5,
    numberOfSteps: 5,
    runUnit: LengthUnit.INCHES,
    riseUnit: LengthUnit.INCHES,
    widthUnit: LengthUnit.INCHES,
    platformDepthUnit: LengthUnit.INCHES,
  });

  const [result, setResult] = useState<any>(null);

  const handleInputChange = (
    field: keyof StairsConcreteValues,
    value: string | number | LengthUnit
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
    const calculationResult = calculateStairsVolume(formValues);
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      run: 0,
      rise: 0,
      width: 0,
      platformDepth: 0,
      numberOfSteps: 1,
      runUnit: LengthUnit.INCHES,
      riseUnit: LengthUnit.INCHES,
      widthUnit: LengthUnit.INCHES,
      platformDepthUnit: LengthUnit.INCHES,
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
      <h2 className="text-2xl font-bold text-red-600 mb-4">Stairs</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Run
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.run}
                  onChange={(e) =>
                    handleInputChange("run", parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.runUnit}
                  onChange={(e) =>
                    handleInputChange("runUnit", e.target.value as LengthUnit)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  Rise
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.rise}
                  onChange={(e) =>
                    handleInputChange("rise", parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.riseUnit}
                  onChange={(e) =>
                    handleInputChange("riseUnit", e.target.value as LengthUnit)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  Width
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.width}
                  onChange={(e) =>
                    handleInputChange("width", parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  Platform Depth
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formValues.platformDepth}
                  onChange={(e) =>
                    handleInputChange(
                      "platformDepth",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formValues.platformDepthUnit}
                  onChange={(e) =>
                    handleInputChange(
                      "platformDepthUnit",
                      e.target.value as LengthUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                Number of Steps
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={formValues.numberOfSteps}
                onChange={(e) =>
                  handleInputChange(
                    "numberOfSteps",
                    parseInt(e.target.value) || 1
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={calculate}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
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
            <div className="w-32 h-28 bg-red-100 border-2 border-red-300 rounded-lg mb-4 relative">
              <div className="absolute bottom-0 left-0 w-8 h-6 bg-red-200 border-t border-red-300"></div>
              <div className="absolute bottom-6 left-8 w-8 h-6 bg-red-200 border-t border-red-300"></div>
              <div className="absolute bottom-12 left-16 w-8 h-6 bg-red-200 border-t border-red-300"></div>
              <div className="absolute bottom-18 left-24 w-8 h-6 bg-red-200 border-t border-red-300"></div>
              <div className="absolute top-2 left-2 text-xs text-red-600">
                run
              </div>
              <div className="absolute right-2 bottom-2 text-xs text-red-600">
                rise
              </div>
            </div>
            <p className="text-sm text-gray-600">Concrete Stairs</p>
          </div>
        </div>
      </div>

      {result && <ConcreteResults result={result} />}
    </div>
  );
}

"use client";

import {
  InflationFormValues,
  InflationCalculatorType,
} from "@/types/inflation";
import { formatNumberWithCommas } from "@/utils/inflationCalculations";
import { useState, useEffect } from "react";

interface InflationFormProps {
  values: InflationFormValues;
  onChange: (name: string, value: number) => void;
  onCalculatorTypeChange: (type: InflationCalculatorType) => void;
}

export default function InflationForm({
  values,
  onChange,
  onCalculatorTypeChange,
}: InflationFormProps) {
  const [displayValues, setDisplayValues] = useState({
    startingAmount: formatNumberWithCommas(values.startingAmount),
  });

  useEffect(() => {
    setDisplayValues({
      startingAmount: formatNumberWithCommas(values.startingAmount),
    });
  }, [values.startingAmount]);

  const parseNumberFromCommas = (value: string): number => {
    return parseFloat(value.replace(/,/g, "")) || 0;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value === "") {
      setDisplayValues({ startingAmount: "" });
      onChange("startingAmount", 0);
    } else {
      const numericValue = parseNumberFromCommas(value);
      const formattedValue =
        numericValue > 0 ? formatNumberWithCommas(numericValue) : value;

      setDisplayValues({ startingAmount: formattedValue });
      onChange("startingAmount", numericValue);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange(name, parseFloat(value));
  };

  const handleCalculatorTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onCalculatorTypeChange(e.target.value as InflationCalculatorType);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Inflation Calculator
      </h2>

      <div className="space-y-6">
        {/* Calculator Type Section */}
        <div className="border-b pb-6">
          <div className="form-group">
            <label
              htmlFor="calculatorType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Calculator Type
            </label>
            <select
              id="calculatorType"
              name="calculatorType"
              value={values.calculatorType}
              onChange={handleCalculatorTypeChange}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={InflationCalculatorType.FORWARD_RATE}>
                Forward Inflation Calculator
              </option>
              <option value={InflationCalculatorType.BACKWARD_RATE}>
                Backward Inflation Calculator
              </option>
            </select>
          </div>
        </div>

        {/* Input Values Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Input Values
          </h3>

          {/* Starting Amount */}
          <div className="form-group">
            <label
              htmlFor="startingAmount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {values.calculatorType === InflationCalculatorType.BACKWARD_RATE
                ? "Current Amount"
                : "Starting Amount"}
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="startingAmount"
                name="startingAmount"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={displayValues.startingAmount}
                onChange={handleAmountChange}
                placeholder="100"
              />
            </div>
          </div>

          {/* Inflation Rate */}
          <div className="form-group">
            <label
              htmlFor="inflationRate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Inflation Rate
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="inflationRate"
                name="inflationRate"
                className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.inflationRate}
                onChange={handleChange}
                min="0"
                max="50"
                step="0.1"
                placeholder="3.0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>
          </div>

          {/* Years */}
          <div className="form-group">
            <label
              htmlFor="years"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {values.calculatorType === InflationCalculatorType.BACKWARD_RATE
                ? "Years Ago"
                : "Years in Future"}
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="years"
                name="years"
                className="block w-full pl-3 pr-16 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.years}
                onChange={handleChange}
                min="1"
                max="100"
                step="1"
                placeholder="10"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

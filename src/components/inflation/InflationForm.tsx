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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = parseFloat(value.replace(/,/g, "")) || 0;
    onChange("startingAmount", numericValue);
    setDisplayValues({
      startingAmount: formatNumberWithCommas(numericValue),
    });
  };

  const handleAmountBlur = () => {
    setDisplayValues({
      startingAmount: formatNumberWithCommas(values.startingAmount),
    });
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

  const generateYearOptions = (startYear: number, endYear: number) => {
    const options = [];
    for (let year = endYear; year >= startYear; year--) {
      options.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return options;
  };

  const generateMonthOptions = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.map((month, index) => (
      <option key={index + 1} value={index + 1}>
        {month}
      </option>
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Inflation Calculator
      </h2>

      {/* Calculator Type Selector */}
      <div className="form-group mb-6">
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
          <option value={InflationCalculatorType.CPI_DATA}>
            U.S. CPI Data Calculator
          </option>
          <option value={InflationCalculatorType.FORWARD_RATE}>
            Forward Flat Rate Calculator
          </option>
          <option value={InflationCalculatorType.BACKWARD_RATE}>
            Backward Flat Rate Calculator
          </option>
        </select>
      </div>

      <div className="space-y-4">
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
              onBlur={handleAmountBlur}
              placeholder="100"
            />
          </div>
        </div>

        {/* CPI Data Calculator Fields */}
        {values.calculatorType === InflationCalculatorType.CPI_DATA && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label
                  htmlFor="startMonth"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  From Month
                </label>
                <select
                  id="startMonth"
                  name="startMonth"
                  value={values.startMonth}
                  onChange={handleChange}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {generateMonthOptions()}
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="startYear"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  From Year
                </label>
                <select
                  id="startYear"
                  name="startYear"
                  value={values.startYear}
                  onChange={handleChange}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {generateYearOptions(1925, 2025)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label
                  htmlFor="endMonth"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  To Month
                </label>
                <select
                  id="endMonth"
                  name="endMonth"
                  value={values.endMonth}
                  onChange={handleChange}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {generateMonthOptions()}
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="endYear"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  To Year
                </label>
                <select
                  id="endYear"
                  name="endYear"
                  value={values.endYear}
                  onChange={handleChange}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {generateYearOptions(1925, 2025)}
                </select>
              </div>
            </div>
          </>
        )}

        {/* Forward/Backward Rate Calculator Fields */}
        {(values.calculatorType === InflationCalculatorType.FORWARD_RATE ||
          values.calculatorType === InflationCalculatorType.BACKWARD_RATE) && (
          <>
            <div className="form-group">
              <label
                htmlFor="inflationRate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Inflation Rate (%)
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
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="years"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {values.calculatorType === InflationCalculatorType.BACKWARD_RATE
                  ? "Years Ago"
                  : "Years"}
              </label>
              <input
                type="number"
                id="years"
                name="years"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.years}
                onChange={handleChange}
                min="1"
                max="100"
                step="1"
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Calculator Information
        </h3>
        <p className="text-xs text-blue-700">
          {values.calculatorType === InflationCalculatorType.CPI_DATA &&
            "Uses historical U.S. Consumer Price Index (CPI) data to calculate inflation-adjusted values."}
          {values.calculatorType === InflationCalculatorType.FORWARD_RATE &&
            "Calculates future value based on a constant inflation rate."}
          {values.calculatorType === InflationCalculatorType.BACKWARD_RATE &&
            "Calculates past purchasing power based on a constant inflation rate."}
        </p>
      </div>
    </div>
  );
}

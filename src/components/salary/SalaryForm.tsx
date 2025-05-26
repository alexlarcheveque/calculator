"use client";

import { SalaryFormValues, PayFrequency } from "@/types/salary";
import { formatNumberWithCommas } from "@/utils/salaryCalculations";
import { useState, useEffect } from "react";

interface SalaryFormProps {
  values: SalaryFormValues;
  onChange: (name: string, value: number | PayFrequency) => void;
}

export default function SalaryForm({ values, onChange }: SalaryFormProps) {
  const [salaryAmountDisplay, setSalaryAmountDisplay] = useState<string>(
    formatNumberWithCommas(values.salaryAmount)
  );

  useEffect(() => {
    setSalaryAmountDisplay(formatNumberWithCommas(values.salaryAmount));
  }, [values.salaryAmount]);

  const handleSalaryAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numericValue = parseFloat(rawValue);

    if (!isNaN(numericValue) && numericValue >= 0) {
      onChange("salaryAmount", numericValue);
      setSalaryAmountDisplay(formatNumberWithCommas(numericValue));
    } else if (rawValue === "") {
      onChange("salaryAmount", 0);
      setSalaryAmountDisplay("");
    }
  };

  const handleSalaryAmountBlur = () => {
    if (values.salaryAmount > 0) {
      setSalaryAmountDisplay(formatNumberWithCommas(values.salaryAmount));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "payFrequency") {
      onChange(name, value as PayFrequency);
    } else {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        onChange(name, numericValue);
      }
    }
  };

  const handleClear = () => {
    onChange("salaryAmount", 50);
    onChange("payFrequency", PayFrequency.HOURLY);
    onChange("hoursPerWeek", 40);
    onChange("daysPerWeek", 5);
    onChange("holidaysPerYear", 10);
    onChange("vacationDaysPerYear", 15);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Salary Details
      </h2>

      <div className="space-y-4">
        {/* Salary Amount */}
        <div className="form-group">
          <label
            htmlFor="salaryAmount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Salary amount
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative rounded-md shadow-sm flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="salaryAmount"
                name="salaryAmount"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={salaryAmountDisplay}
                onChange={handleSalaryAmountChange}
                onBlur={handleSalaryAmountBlur}
                placeholder="50"
              />
            </div>
            <span className="text-sm text-gray-700">per</span>
            <select
              name="payFrequency"
              value={values.payFrequency}
              onChange={handleChange}
              className="block py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={PayFrequency.HOURLY}>Hour</option>
              <option value={PayFrequency.DAILY}>Day</option>
              <option value={PayFrequency.WEEKLY}>Week</option>
              <option value={PayFrequency.BI_WEEKLY}>Bi-week</option>
              <option value={PayFrequency.SEMI_MONTHLY}>Semi-month</option>
              <option value={PayFrequency.MONTHLY}>Month</option>
              <option value={PayFrequency.QUARTERLY}>Quarter</option>
              <option value={PayFrequency.ANNUAL}>Year</option>
            </select>
          </div>
        </div>

        {/* Hours per week */}
        <div className="form-group">
          <label
            htmlFor="hoursPerWeek"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Hours per week
          </label>
          <input
            type="number"
            id="hoursPerWeek"
            name="hoursPerWeek"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={values.hoursPerWeek}
            onChange={handleChange}
            min="1"
            max="168"
            step="1"
          />
        </div>

        {/* Days per week */}
        <div className="form-group">
          <label
            htmlFor="daysPerWeek"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Days per week
          </label>
          <input
            type="number"
            id="daysPerWeek"
            name="daysPerWeek"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={values.daysPerWeek}
            onChange={handleChange}
            min="1"
            max="7"
            step="1"
          />
        </div>

        {/* Holidays per year */}
        <div className="form-group">
          <label
            htmlFor="holidaysPerYear"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Holidays per year
          </label>
          <input
            type="number"
            id="holidaysPerYear"
            name="holidaysPerYear"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={values.holidaysPerYear}
            onChange={handleChange}
            min="0"
            max="365"
            step="1"
          />
        </div>

        {/* Vacation days per year */}
        <div className="form-group">
          <label
            htmlFor="vacationDaysPerYear"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Vacation days per year
          </label>
          <input
            type="number"
            id="vacationDaysPerYear"
            name="vacationDaysPerYear"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={values.vacationDaysPerYear}
            onChange={handleChange}
            min="0"
            max="365"
            step="1"
          />
        </div>

        {/* Action buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            onClick={() => {
              // Trigger recalculation by updating a value
              onChange("salaryAmount", values.salaryAmount);
            }}
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

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
    values.salaryAmount > 0 ? formatNumberWithCommas(values.salaryAmount) : ""
  );

  const [numberDisplays, setNumberDisplays] = useState({
    hoursPerWeek: values.hoursPerWeek.toString(),
    daysPerWeek: values.daysPerWeek.toString(),
    holidaysPerYear: values.holidaysPerYear.toString(),
    vacationDaysPerYear: values.vacationDaysPerYear.toString(),
  });

  useEffect(() => {
    setSalaryAmountDisplay(
      values.salaryAmount > 0 ? formatNumberWithCommas(values.salaryAmount) : ""
    );
  }, [values.salaryAmount]);

  const handleSalaryAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");

    // Handle completely empty input
    if (rawValue === "") {
      onChange("salaryAmount", 0);
      setSalaryAmountDisplay("");
      return;
    }

    const numericValue = parseFloat(rawValue);

    if (!isNaN(numericValue) && numericValue >= 0) {
      onChange("salaryAmount", numericValue);
      // Only format with commas if value is greater than 0
      const formattedValue =
        numericValue > 0 ? formatNumberWithCommas(numericValue) : "";
      setSalaryAmountDisplay(formattedValue);
    }
  };

  const handleSalaryAmountBlur = () => {
    if (values.salaryAmount > 0) {
      setSalaryAmountDisplay(formatNumberWithCommas(values.salaryAmount));
    } else {
      setSalaryAmountDisplay("");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "payFrequency") {
      onChange(name, value as PayFrequency);
    } else {
      // Handle empty string case for number inputs
      if (value === "") {
        setNumberDisplays((prev) => ({
          ...prev,
          [name]: "",
        }));
        onChange(name, 0);
        return;
      }

      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        setNumberDisplays((prev) => ({
          ...prev,
          [name]: numericValue.toString(),
        }));
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

    // Reset display states
    setSalaryAmountDisplay(formatNumberWithCommas(50));
    setNumberDisplays({
      hoursPerWeek: "40",
      daysPerWeek: "5",
      holidaysPerYear: "10",
      vacationDaysPerYear: "15",
    });
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
            value={numberDisplays.hoursPerWeek}
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
            value={numberDisplays.daysPerWeek}
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
            value={numberDisplays.holidaysPerYear}
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
            Vacation per year (unpaid)
          </label>
          <input
            type="number"
            id="vacationDaysPerYear"
            name="vacationDaysPerYear"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={numberDisplays.vacationDaysPerYear}
            onChange={handleChange}
            min="0"
            max="365"
            step="1"
          />
        </div>
      </div>
    </div>
  );
}

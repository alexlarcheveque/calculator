"use client";

import {
  PregnancyFormValues,
  CalculationMethod,
  EmbryoAge,
} from "@/types/pregnancy";
import { useState } from "react";

interface PregnancyFormProps {
  values: PregnancyFormValues;
  onChange: (name: string, value: string | number) => void;
}

export default function PregnancyForm({
  values,
  onChange,
}: PregnancyFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (
      name === "cycleLength" ||
      name === "ultrasoundWeeks" ||
      name === "ultrasoundDays" ||
      name === "embryoAge"
    ) {
      onChange(name, parseInt(value));
    } else {
      onChange(name, value);
    }
  };

  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const renderDateInput = (
    name: string,
    label: string,
    value: string,
    required: boolean = false
  ) => (
    <div className="form-group">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={formatDateForInput(value)}
        onChange={handleChange}
        required={required}
      />
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Pregnancy Calculator
      </h2>

      <div className="space-y-4">
        {/* Calculation Method */}
        <div className="form-group">
          <label
            htmlFor="calculationMethod"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Calculate Based On
          </label>
          <select
            id="calculationMethod"
            name="calculationMethod"
            value={values.calculationMethod}
            onChange={handleChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={CalculationMethod.DUE_DATE}>Due Date</option>
            <option value={CalculationMethod.LAST_PERIOD}>Last Period</option>
            <option value={CalculationMethod.ULTRASOUND}>Ultrasound</option>
            <option value={CalculationMethod.CONCEPTION_DATE}>
              Conception Date
            </option>
            <option value={CalculationMethod.IVF_TRANSFER}>
              IVF Transfer Date
            </option>
          </select>
        </div>

        {/* Conditional inputs based on calculation method */}
        {values.calculationMethod === CalculationMethod.DUE_DATE &&
          renderDateInput("dueDate", "Your Due Date", values.dueDate, true)}

        {values.calculationMethod === CalculationMethod.LAST_PERIOD && (
          <>
            {renderDateInput(
              "lastPeriodDate",
              "First Day of Your Last Period",
              values.lastPeriodDate,
              true
            )}
            <div className="form-group">
              <label
                htmlFor="cycleLength"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Average Length of Your Cycles
              </label>
              <select
                id="cycleLength"
                name="cycleLength"
                value={values.cycleLength}
                onChange={handleChange}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {Array.from({ length: 23 }, (_, i) => i + 22).map((days) => (
                  <option key={days} value={days}>
                    {days} days
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {values.calculationMethod === CalculationMethod.CONCEPTION_DATE &&
          renderDateInput(
            "conceptionDate",
            "Conception Date",
            values.conceptionDate,
            true
          )}

        {values.calculationMethod === CalculationMethod.ULTRASOUND && (
          <>
            {renderDateInput(
              "ultrasoundDate",
              "Ultrasound Date",
              values.ultrasoundDate,
              true
            )}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length of Pregnancy at the Time
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="ultrasoundWeeks"
                    className="block text-xs text-gray-600 mb-1"
                  >
                    Weeks
                  </label>
                  <input
                    type="number"
                    id="ultrasoundWeeks"
                    name="ultrasoundWeeks"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.ultrasoundWeeks}
                    onChange={handleChange}
                    min="0"
                    max="42"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ultrasoundDays"
                    className="block text-xs text-gray-600 mb-1"
                  >
                    Days
                  </label>
                  <input
                    type="number"
                    id="ultrasoundDays"
                    name="ultrasoundDays"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.ultrasoundDays}
                    onChange={handleChange}
                    min="0"
                    max="6"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {values.calculationMethod === CalculationMethod.IVF_TRANSFER && (
          <>
            {renderDateInput(
              "ivfTransferDate",
              "Transfer Date",
              values.ivfTransferDate,
              true
            )}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Embryo Age
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="embryoAge"
                    value={EmbryoAge.DAY_3}
                    checked={values.embryoAge === EmbryoAge.DAY_3}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Day 3</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="embryoAge"
                    value={EmbryoAge.DAY_5}
                    checked={values.embryoAge === EmbryoAge.DAY_5}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Day 5</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="embryoAge"
                    value={EmbryoAge.DAY_6}
                    checked={values.embryoAge === EmbryoAge.DAY_6}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Day 6</span>
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

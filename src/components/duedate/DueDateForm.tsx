import {
  DueDateFormValues,
  EstimationMethod,
  EmbryoAge,
} from "@/types/dueDate";
import { useState } from "react";

interface DueDateFormProps {
  values: DueDateFormValues;
  onChange: (
    name: string,
    value: Date | number | EstimationMethod | EmbryoAge
  ) => void;
}

export default function DueDateForm({ values, onChange }: DueDateFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "estimationMethod") {
      onChange(name, value as EstimationMethod);
    } else if (name === "embryoAge") {
      onChange(name, parseInt(value) as EmbryoAge);
    } else if (name.includes("Date")) {
      onChange(name, new Date(value));
    } else {
      onChange(name, parseInt(value));
    }
  };

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const renderLastPeriodInputs = () => (
    <div className="space-y-4">
      <div className="form-group">
        <label
          htmlFor="lastPeriodDate"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          First Day of Your Last Period
        </label>
        <input
          type="date"
          id="lastPeriodDate"
          name="lastPeriodDate"
          className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={formatDateForInput(values.lastPeriodDate)}
          onChange={handleChange}
        />
      </div>

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
    </div>
  );

  const renderConceptionInputs = () => (
    <div className="form-group">
      <label
        htmlFor="conceptionDate"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Conception Date
      </label>
      <input
        type="date"
        id="conceptionDate"
        name="conceptionDate"
        className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={formatDateForInput(values.conceptionDate)}
        onChange={handleChange}
      />
    </div>
  );

  const renderUltrasoundInputs = () => (
    <div className="space-y-4">
      <div className="form-group">
        <label
          htmlFor="ultrasoundDate"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Ultrasound Date
        </label>
        <input
          type="date"
          id="ultrasoundDate"
          name="ultrasoundDate"
          className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={formatDateForInput(values.ultrasoundDate)}
          onChange={handleChange}
        />
      </div>

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
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.ultrasoundWeeks}
              onChange={handleChange}
              min="4"
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
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.ultrasoundDays}
              onChange={handleChange}
              min="0"
              max="6"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderIVFInputs = () => (
    <div className="space-y-4">
      <div className="form-group">
        <label
          htmlFor="ivfTransferDate"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Transfer Date
        </label>
        <input
          type="date"
          id="ivfTransferDate"
          name="ivfTransferDate"
          className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={formatDateForInput(values.ivfTransferDate)}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Embryo Age
        </label>
        <div className="space-y-2">
          {[
            { value: EmbryoAge.DAY_3, label: "Day 3" },
            { value: EmbryoAge.DAY_5, label: "Day 5" },
            { value: EmbryoAge.DAY_6, label: "Day 6" },
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="embryoAge"
                value={option.value}
                checked={values.embryoAge === option.value}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMethodSpecificInputs = () => {
    switch (values.estimationMethod) {
      case EstimationMethod.LAST_PERIOD:
        return renderLastPeriodInputs();
      case EstimationMethod.CONCEPTION_DATE:
        return renderConceptionInputs();
      case EstimationMethod.ULTRASOUND:
        return renderUltrasoundInputs();
      case EstimationMethod.IVF_TRANSFER:
        return renderIVFInputs();
      default:
        return renderLastPeriodInputs();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Due Date Calculator
      </h2>

      <div className="space-y-6">
        {/* Estimation Method */}
        <div className="form-group">
          <label
            htmlFor="estimationMethod"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Estimate Based On
          </label>
          <select
            id="estimationMethod"
            name="estimationMethod"
            value={values.estimationMethod}
            onChange={handleChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.values(EstimationMethod).map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        {/* Method-specific inputs */}
        <div className="border-t pt-4">{renderMethodSpecificInputs()}</div>
      </div>
    </div>
  );
}

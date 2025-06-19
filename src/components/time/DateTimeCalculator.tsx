"use client";

import { useState } from "react";
import { DateTimeValues, DateTimeResult } from "@/types/time";
import {
  calculateDateTimeArithmetic,
  getCurrentDateTime,
  createEmptyTime,
} from "@/utils/timeCalculations";
import DateTimeResults from "./DateTimeResults";

export default function DateTimeCalculator() {
  const currentDateTime = getCurrentDateTime();

  const [formValues, setFormValues] = useState<DateTimeValues>({
    startDate: currentDateTime.date,
    startTime: currentDateTime.time,
    timeFormat: "12",
    ampm: currentDateTime.ampm,
    operation: "add",
    timeToAdd: createEmptyTime(),
  });

  const [result, setResult] = useState<DateTimeResult | null>(null);

  const handleInputChange = (field: keyof DateTimeValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimeChange = (
    timeField: "startTime" | "timeToAdd",
    unit: keyof typeof formValues.startTime,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    setFormValues((prev) => ({
      ...prev,
      [timeField]: {
        ...prev[timeField],
        [unit]: numValue,
      },
    }));
  };

  const calculate = () => {
    const calculationResult = calculateDateTimeArithmetic(
      formValues.startDate,
      formValues.startTime,
      formValues.timeFormat,
      formValues.ampm,
      formValues.operation,
      formValues.timeToAdd
    );
    setResult(calculationResult);
  };

  const clear = () => {
    const currentDateTime = getCurrentDateTime();
    setFormValues({
      startDate: currentDateTime.date,
      startTime: currentDateTime.time,
      timeFormat: "12",
      ampm: currentDateTime.ampm,
      operation: "add",
      timeToAdd: createEmptyTime(),
    });
    setResult(null);
  };

  const setNow = () => {
    const currentDateTime = getCurrentDateTime();
    setFormValues((prev) => ({
      ...prev,
      startDate: currentDateTime.date,
      startTime: currentDateTime.time,
      ampm: currentDateTime.ampm,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Calculator Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Instructions Section */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">
            Date & Time Calculator
          </h3>
          <p className="text-blue-700 text-sm">
            Use this calculator to add or subtract time (days, hours, minutes,
            seconds) from a starting time and date. The result will be the new
            time and date based on the subtracted or added period of time.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          {/* Start Date */}
          <div className="mb-6">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={formValues.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Start Time */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Start Time
              </label>
              <button
                onClick={setNow}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                Set Now
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Hour
                </label>
                <input
                  type="number"
                  min="1"
                  max={formValues.timeFormat === "12" ? "12" : "23"}
                  value={formValues.startTime.hours || ""}
                  onChange={(e) =>
                    handleTimeChange("startTime", "hours", e.target.value)
                  }
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Min
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={formValues.startTime.minutes || ""}
                  onChange={(e) =>
                    handleTimeChange("startTime", "minutes", e.target.value)
                  }
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Sec
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={formValues.startTime.seconds || ""}
                  onChange={(e) =>
                    handleTimeChange("startTime", "seconds", e.target.value)
                  }
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Format
                </label>
                <select
                  value={
                    formValues.timeFormat === "12" ? formValues.ampm : "24"
                  }
                  onChange={(e) => {
                    if (e.target.value === "24") {
                      handleInputChange("timeFormat", "24");
                    } else {
                      handleInputChange("timeFormat", "12");
                      handleInputChange("ampm", e.target.value as "AM" | "PM");
                    }
                  }}
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-center"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                  <option value="24">24h</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 my-6">
            <label className="flex items-center">
              <input
                type="radio"
                checked={formValues.operation === "add"}
                onChange={() => handleInputChange("operation", "add")}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-lg font-medium text-gray-700">Add +</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={formValues.operation === "subtract"}
                onChange={() => handleInputChange("operation", "subtract")}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-lg font-medium text-gray-700">
                Subtract −
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time to {formValues.operation === "add" ? "Add" : "Subtract"}
            </label>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Day
                </label>
                <input
                  type="number"
                  min="0"
                  value={formValues.timeToAdd.days || ""}
                  onChange={(e) =>
                    handleTimeChange("timeToAdd", "days", e.target.value)
                  }
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-center"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Hour
                </label>
                <input
                  type="number"
                  min="0"
                  value={formValues.timeToAdd.hours || ""}
                  onChange={(e) =>
                    handleTimeChange("timeToAdd", "hours", e.target.value)
                  }
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-center"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Minute
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={formValues.timeToAdd.minutes || ""}
                  onChange={(e) =>
                    handleTimeChange("timeToAdd", "minutes", e.target.value)
                  }
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-center"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Second
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={formValues.timeToAdd.seconds || ""}
                  onChange={(e) =>
                    handleTimeChange("timeToAdd", "seconds", e.target.value)
                  }
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-center"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={calculate}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate
            </button>
            <button
              onClick={clear}
              className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {result && <DateTimeResults result={result} />}
    </div>
  );
}

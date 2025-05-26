"use client";

import { useState } from "react";
import {
  DateHoursCalculationValues,
  DateHoursCalculationResult,
} from "@/types/hours";
import {
  calculateHoursBetweenDates,
  createEmptyTimeInput,
  getCurrentTime,
  getCurrentDate,
} from "@/utils/hoursCalculations";
import DateHoursResults from "./DateHoursResults";

export default function DateHoursCalculator() {
  const [formValues, setFormValues] = useState<DateHoursCalculationValues>({
    startDate: getCurrentDate(),
    startTime: createEmptyTimeInput(),
    endDate: getCurrentDate(),
    endTime: { hours: 5, minutes: 30, ampm: "PM" },
  });

  const [result, setResult] = useState<DateHoursCalculationResult | null>(null);

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimeChange = (
    timeField: "startTime" | "endTime",
    field: "hours" | "minutes" | "ampm",
    value: string | number
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [timeField]: {
        ...prev[timeField],
        [field]: value,
      },
    }));
  };

  const calculate = () => {
    const calculationResult = calculateHoursBetweenDates(
      formValues.startDate,
      formValues.startTime,
      formValues.endDate,
      formValues.endTime
    );
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      startDate: getCurrentDate(),
      startTime: createEmptyTimeInput(),
      endDate: getCurrentDate(),
      endTime: { hours: 5, minutes: 30, ampm: "PM" },
    });
    setResult(null);
  };

  const setNow = (timeField: "startTime" | "endTime") => {
    const currentTime = getCurrentTime();
    const currentDate = getCurrentDate();

    if (timeField === "startTime") {
      setFormValues((prev) => ({
        ...prev,
        startDate: currentDate,
        startTime: currentTime,
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        endDate: currentDate,
        endTime: currentTime,
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Hours Between Two Dates
      </h2>
      <p className="text-gray-600 mb-6">
        Calculate the number of hours and minutes between two specific dates and
        times. This calculator handles different dates and provides detailed
        breakdown including days, hours, and minutes.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Start Date & Time
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date:
                </label>
                <input
                  type="date"
                  value={formValues.startDate}
                  onChange={(e) =>
                    handleDateChange("startDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={`${
                      formValues.startTime.hours
                    }:${formValues.startTime.minutes
                      .toString()
                      .padStart(2, "0")}`}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      if (hours)
                        handleTimeChange(
                          "startTime",
                          "hours",
                          parseInt(hours) || 1
                        );
                      if (minutes)
                        handleTimeChange(
                          "startTime",
                          "minutes",
                          parseInt(minutes) || 0
                        );
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="8:30"
                  />
                  <select
                    value={formValues.startTime.ampm}
                    onChange={(e) =>
                      handleTimeChange(
                        "startTime",
                        "ampm",
                        e.target.value as "AM" | "PM"
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
                <button
                  onClick={() => setNow("startTime")}
                  className="mt-1 text-sm text-green-600 hover:text-green-800 underline"
                >
                  Now
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              End Date & Time
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date:
                </label>
                <input
                  type="date"
                  value={formValues.endDate}
                  onChange={(e) => handleDateChange("endDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={`${
                      formValues.endTime.hours
                    }:${formValues.endTime.minutes
                      .toString()
                      .padStart(2, "0")}`}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      if (hours)
                        handleTimeChange(
                          "endTime",
                          "hours",
                          parseInt(hours) || 1
                        );
                      if (minutes)
                        handleTimeChange(
                          "endTime",
                          "minutes",
                          parseInt(minutes) || 0
                        );
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="5:30"
                  />
                  <select
                    value={formValues.endTime.ampm}
                    onChange={(e) =>
                      handleTimeChange(
                        "endTime",
                        "ampm",
                        e.target.value as "AM" | "PM"
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
                <button
                  onClick={() => setNow("endTime")}
                  className="mt-1 text-sm text-green-600 hover:text-green-800 underline"
                >
                  Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={calculate}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
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

      {result && <DateHoursResults result={result} />}
    </div>
  );
}

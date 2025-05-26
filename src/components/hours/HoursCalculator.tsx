"use client";

import { useState } from "react";
import { HoursCalculationValues, HoursCalculationResult } from "@/types/hours";
import {
  calculateHoursBetweenTimes,
  createEmptyTimeInput,
  getCurrentTime,
  swapTimes,
} from "@/utils/hoursCalculations";
import HoursResults from "./HoursResults";

export default function HoursCalculator() {
  const [formValues, setFormValues] = useState<HoursCalculationValues>({
    startTime: createEmptyTimeInput(),
    endTime: { hours: 5, minutes: 30, ampm: "PM" },
  });

  const [result, setResult] = useState<HoursCalculationResult | null>(null);

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
    const calculationResult = calculateHoursBetweenTimes(
      formValues.startTime,
      formValues.endTime
    );
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      startTime: createEmptyTimeInput(),
      endTime: { hours: 5, minutes: 30, ampm: "PM" },
    });
    setResult(null);
  };

  const setNow = (timeField: "startTime" | "endTime") => {
    const currentTime = getCurrentTime();
    setFormValues((prev) => ({
      ...prev,
      [timeField]: currentTime,
    }));
  };

  const swapStartEnd = () => {
    const { newStartTime, newEndTime } = swapTimes(
      formValues.startTime,
      formValues.endTime
    );
    setFormValues({
      startTime: newStartTime,
      endTime: newEndTime,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Hours Calculator
      </h2>
      <p className="text-gray-600 mb-6">
        Use the calculators below to find the number of hours and minutes
        between two times. For a full time card, please use the Time Card
        Calculator.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={`${
                  formValues.startTime.hours
                }:${formValues.startTime.minutes.toString().padStart(2, "0")}`}
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
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <button
              onClick={() => setNow("startTime")}
              className="mt-1 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Now
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={swapStartEnd}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Swap start and end times"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3L4 7l4 4" />
                <path d="M4 7h16" />
                <path d="M16 21l4-4-4-4" />
                <path d="M20 17H4" />
              </svg>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={`${formValues.endTime.hours}:${formValues.endTime.minutes
                  .toString()
                  .padStart(2, "0")}`}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(":");
                  if (hours)
                    handleTimeChange("endTime", "hours", parseInt(hours) || 1);
                  if (minutes)
                    handleTimeChange(
                      "endTime",
                      "minutes",
                      parseInt(minutes) || 0
                    );
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <button
              onClick={() => setNow("endTime")}
              className="mt-1 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Now
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={calculate}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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

      {result && <HoursResults result={result} />}
    </div>
  );
}

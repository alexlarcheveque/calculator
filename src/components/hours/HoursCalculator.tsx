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
    <div className="space-y-6">
      {/* Main Calculator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Instructions */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">
            How to Calculate Hours Between Times
          </h3>
          <p className="text-blue-700 text-sm">
            Enter your start and end times below to calculate the exact hours
            and minutes between them. The calculator automatically handles time
            periods that cross midnight.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
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
                  className="flex-1 px-3 py-2 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
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
                  className="px-3 py-2 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <button
                onClick={() => setNow("startTime")}
                className="mt-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Now
              </button>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapStartEnd}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-300 flex items-center gap-2"
                title="Swap start and end times"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                Swap Times
              </button>
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={`${
                    formValues.endTime.hours
                  }:${formValues.endTime.minutes.toString().padStart(2, "0")}`}
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
                  className="flex-1 px-3 py-2 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
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
                  className="px-3 py-2 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <button
                onClick={() => setNow("endTime")}
                className="mt-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Now
              </button>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={calculate}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 focus:outline-none mr-3"
            >
              Calculate
            </button>
            <button
              onClick={clear}
              className="px-8 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors focus:ring-4 focus:ring-gray-200 focus:outline-none"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && <HoursResults result={result} />}
    </div>
  );
}

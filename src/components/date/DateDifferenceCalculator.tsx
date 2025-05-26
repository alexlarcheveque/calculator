"use client";

import { useState } from "react";
import {
  DateFormValues,
  DateDifferenceResult,
  CustomHoliday,
} from "@/types/date";
import {
  calculateDateDifference,
  US_FEDERAL_HOLIDAYS,
  ADDITIONAL_HOLIDAYS,
} from "@/utils/dateCalculations";
import DateDifferenceResults from "./DateDifferenceResults";
import HolidaySettings from "./HolidaySettings";

export default function DateDifferenceCalculator() {
  const [formValues, setFormValues] = useState<DateFormValues>({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    includeEndDay: false,
    excludeWeekends: false,
    excludeHolidays: true,
    selectedHolidays: [
      "new-years",
      "mlk-day",
      "presidents-day",
      "memorial-day",
      "juneteenth",
      "independence-day",
      "labor-day",
      "columbus-day",
      "veterans-day",
      "thanksgiving",
      "christmas",
    ],
    customHolidays: [],
  });

  const [result, setResult] = useState<DateDifferenceResult | null>(null);
  const [showHolidaySettings, setShowHolidaySettings] = useState(false);

  const handleInputChange = (field: keyof DateFormValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
    const calculationResult = calculateDateDifference(
      formValues.startDate,
      formValues.endDate,
      formValues.includeEndDay,
      formValues.excludeWeekends,
      formValues.excludeHolidays,
      formValues.selectedHolidays,
      formValues.customHolidays
    );
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      includeEndDay: false,
      excludeWeekends: false,
      excludeHolidays: true,
      selectedHolidays: [
        "new-years",
        "mlk-day",
        "presidents-day",
        "memorial-day",
        "juneteenth",
        "independence-day",
        "labor-day",
        "columbus-day",
        "veterans-day",
        "thanksgiving",
        "christmas",
      ],
      customHolidays: [],
    });
    setResult(null);
  };

  const setToday = (field: "startDate" | "endDate") => {
    const today = new Date().toISOString().split("T")[0];
    handleInputChange(field, today);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Days Between Two Dates
      </h2>
      <p className="text-gray-600 mb-6">
        Find the number of years, months, weeks, and days between dates. Click
        "Settings" to define holidays.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Start Date
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              id="startDate"
              value={formValues.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setToday("startDate")}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            End Date
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              id="endDate"
              value={formValues.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setToday("endDate")}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formValues.includeEndDay}
            onChange={(e) =>
              handleInputChange("includeEndDay", e.target.checked)
            }
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">
            Include end day (add 1 day)
          </span>
        </label>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={calculate}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Calculate
        </button>
        <button
          onClick={() => setShowHolidaySettings(!showHolidaySettings)}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Settings
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
        >
          Clear
        </button>
      </div>

      {showHolidaySettings && (
        <HolidaySettings
          excludeHolidays={formValues.excludeHolidays}
          selectedHolidays={formValues.selectedHolidays}
          customHolidays={formValues.customHolidays}
          onExcludeHolidaysChange={(value) =>
            handleInputChange("excludeHolidays", value)
          }
          onSelectedHolidaysChange={(value) =>
            handleInputChange("selectedHolidays", value)
          }
          onCustomHolidaysChange={(value) =>
            handleInputChange("customHolidays", value)
          }
          onClose={() => setShowHolidaySettings(false)}
        />
      )}

      {result && <DateDifferenceResults result={result} />}
    </div>
  );
}

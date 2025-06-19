"use client";

import { useState } from "react";
import {
  DateFormValues,
  DateDifferenceResult,
  CustomHoliday,
} from "@/types/date";
import {
  calculateDateDifference,
  getLocalDateString,
  US_FEDERAL_HOLIDAYS,
  ADDITIONAL_HOLIDAYS,
} from "@/utils/dateCalculations";
import DateDifferenceResults from "./DateDifferenceResults";
import HolidaySettings from "./HolidaySettings";

export default function DateDifferenceCalculator() {
  const [formValues, setFormValues] = useState<DateFormValues>({
    startDate: getLocalDateString(),
    endDate: getLocalDateString(),
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
      startDate: getLocalDateString(),
      endDate: getLocalDateString(),
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
    const today = getLocalDateString();
    handleInputChange(field, today);
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Instructions */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">
            How to Calculate Date Difference
          </h3>
          <p className="text-blue-700 text-sm">
            Select two dates below to calculate the exact time difference
            between them. The calculator will show years, months, weeks, days,
            and more. Use "Settings" to exclude weekends and holidays from
            business day calculations.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => setToday("startDate")}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
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
                  className="flex-1 px-3 py-2 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => setToday("endDate")}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Today
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
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

          <div className="flex justify-center mb-6">
            <button
              onClick={calculate}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 focus:outline-none mr-3"
            >
              Calculate
            </button>
            <button
              onClick={() => setShowHolidaySettings(!showHolidaySettings)}
              className="px-8 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors focus:ring-4 focus:ring-gray-200 focus:outline-none mr-3"
            >
              Settings
            </button>
            <button
              onClick={clear}
              className="px-8 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors focus:ring-4 focus:ring-gray-200 focus:outline-none"
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
        </div>
      </div>

      {/* Results Section */}
      {result && <DateDifferenceResults result={result} />}
    </div>
  );
}

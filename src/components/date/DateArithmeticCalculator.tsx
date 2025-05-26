"use client";

import { useState } from "react";
import { DateArithmeticValues, DateArithmeticResult } from "@/types/date";
import { calculateDateArithmetic } from "@/utils/dateCalculations";
import DateArithmeticResults from "./DateArithmeticResults";
import BusinessDaySettings from "./BusinessDaySettings";

export default function DateArithmeticCalculator() {
  const [formValues, setFormValues] = useState<DateArithmeticValues>({
    startDate: new Date().toISOString().split("T")[0],
    operation: "add",
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    businessDaysOnly: false,
    excludeWeekends: true,
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

  const [result, setResult] = useState<DateArithmeticResult | null>(null);
  const [showBusinessDaySettings, setShowBusinessDaySettings] = useState(false);

  const handleInputChange = (field: keyof DateArithmeticValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
    const calculationResult = calculateDateArithmetic(
      formValues.startDate,
      formValues.operation,
      formValues.years,
      formValues.months,
      formValues.weeks,
      formValues.days,
      formValues.businessDaysOnly,
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
      operation: "add",
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      businessDaysOnly: false,
      excludeWeekends: true,
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

  const setToday = () => {
    const today = new Date().toISOString().split("T")[0];
    handleInputChange("startDate", today);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Add to or Subtract from a Date
      </h2>
      <p className="text-gray-600 mb-6">
        Add or subtract years, months, weeks, and days from a date. Optionally
        calculate in business days only.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="arithmeticStartDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Start Date
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              id="arithmeticStartDate"
              value={formValues.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={setToday}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operation
          </label>
          <div className="flex gap-4">
            <select
              value={formValues.operation}
              onChange={(e) =>
                handleInputChange(
                  "operation",
                  e.target.value as "add" | "subtract"
                )
              }
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="add">+ Add</option>
              <option value="subtract">− Subtract</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={formValues.businessDaysOnly ? "opacity-50" : ""}>
          <label
            htmlFor="years"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Years
          </label>
          <input
            type="number"
            id="years"
            min="0"
            value={formValues.years}
            onChange={(e) =>
              handleInputChange("years", parseInt(e.target.value) || 0)
            }
            disabled={formValues.businessDaysOnly}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div className={formValues.businessDaysOnly ? "opacity-50" : ""}>
          <label
            htmlFor="months"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Months
          </label>
          <input
            type="number"
            id="months"
            min="0"
            value={formValues.months}
            onChange={(e) =>
              handleInputChange("months", parseInt(e.target.value) || 0)
            }
            disabled={formValues.businessDaysOnly}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div className={formValues.businessDaysOnly ? "opacity-50" : ""}>
          <label
            htmlFor="weeks"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Weeks
          </label>
          <input
            type="number"
            id="weeks"
            min="0"
            value={formValues.weeks}
            onChange={(e) =>
              handleInputChange("weeks", parseInt(e.target.value) || 0)
            }
            disabled={formValues.businessDaysOnly}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="days"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {formValues.businessDaysOnly ? "Business Days" : "Days"}
          </label>
          <input
            type="number"
            id="days"
            min="0"
            value={formValues.days}
            onChange={(e) =>
              handleInputChange("days", parseInt(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formValues.businessDaysOnly}
            onChange={(e) =>
              handleInputChange("businessDaysOnly", e.target.checked)
            }
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">
            Calculate in business days
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
        {formValues.businessDaysOnly && (
          <button
            onClick={() => setShowBusinessDaySettings(!showBusinessDaySettings)}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Business Day Settings
          </button>
        )}
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
        >
          Clear
        </button>
      </div>

      {showBusinessDaySettings && formValues.businessDaysOnly && (
        <BusinessDaySettings
          excludeWeekends={formValues.excludeWeekends}
          excludeHolidays={formValues.excludeHolidays}
          selectedHolidays={formValues.selectedHolidays}
          customHolidays={formValues.customHolidays}
          onExcludeWeekendsChange={(value) =>
            handleInputChange("excludeWeekends", value)
          }
          onExcludeHolidaysChange={(value) =>
            handleInputChange("excludeHolidays", value)
          }
          onSelectedHolidaysChange={(value) =>
            handleInputChange("selectedHolidays", value)
          }
          onCustomHolidaysChange={(value) =>
            handleInputChange("customHolidays", value)
          }
          onClose={() => setShowBusinessDaySettings(false)}
        />
      )}

      {result && <DateArithmeticResults result={result} />}
    </div>
  );
}

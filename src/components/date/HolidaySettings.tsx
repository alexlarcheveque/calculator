import { useState } from "react";
import { CustomHoliday } from "@/types/date";
import {
  US_FEDERAL_HOLIDAYS,
  ADDITIONAL_HOLIDAYS,
} from "@/utils/dateCalculations";

interface HolidaySettingsProps {
  excludeHolidays: boolean;
  selectedHolidays: string[];
  customHolidays: CustomHoliday[];
  onExcludeHolidaysChange: (value: boolean) => void;
  onSelectedHolidaysChange: (value: string[]) => void;
  onCustomHolidaysChange: (value: CustomHoliday[]) => void;
  onClose: () => void;
}

export default function HolidaySettings({
  excludeHolidays,
  selectedHolidays,
  customHolidays,
  onExcludeHolidaysChange,
  onSelectedHolidaysChange,
  onCustomHolidaysChange,
  onClose,
}: HolidaySettingsProps) {
  const [newHoliday, setNewHoliday] = useState<CustomHoliday>({
    name: "",
    month: 1,
    day: 1,
  });

  const allHolidays = [...US_FEDERAL_HOLIDAYS, ...ADDITIONAL_HOLIDAYS];

  const handleHolidayToggle = (holidayId: string) => {
    if (selectedHolidays.includes(holidayId)) {
      onSelectedHolidaysChange(
        selectedHolidays.filter((id) => id !== holidayId)
      );
    } else {
      onSelectedHolidaysChange([...selectedHolidays, holidayId]);
    }
  };

  const addCustomHoliday = () => {
    if (newHoliday.name.trim()) {
      onCustomHolidaysChange([...customHolidays, newHoliday]);
      setNewHoliday({ name: "", month: 1, day: 1 });
    }
  };

  const removeCustomHoliday = (index: number) => {
    onCustomHolidaysChange(customHolidays.filter((_, i) => i !== index));
  };

  const clearAllCustomHolidays = () => {
    onCustomHolidaysChange([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Holiday Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">
              Holiday Exclusion
            </h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!excludeHolidays}
                  onChange={() => onExcludeHolidaysChange(false)}
                  className="mr-2"
                />
                <span>Do not count holidays</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={excludeHolidays}
                  onChange={() => onExcludeHolidaysChange(true)}
                  className="mr-2"
                />
                <span>Count holidays</span>
              </label>
            </div>
          </div>

          {excludeHolidays && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">
                Select Holidays to Exclude
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {allHolidays.map((holiday) => (
                  <label key={holiday.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedHolidays.includes(holiday.id)}
                      onChange={() => handleHolidayToggle(holiday.id)}
                      className="mr-2"
                    />
                    <span className="text-sm">{holiday.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {excludeHolidays && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">
                Custom Holidays
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Holiday name"
                  value={newHoliday.name}
                  onChange={(e) =>
                    setNewHoliday({ ...newHoliday, name: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newHoliday.month}
                  onChange={(e) =>
                    setNewHoliday({
                      ...newHoliday,
                      month: parseInt(e.target.value),
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(2000, i, 1).toLocaleDateString("en-US", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
                <select
                  value={newHoliday.day}
                  onChange={(e) =>
                    setNewHoliday({
                      ...newHoliday,
                      day: parseInt(e.target.value),
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addCustomHoliday}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>

              {customHolidays.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Custom Holidays:
                    </span>
                    <button
                      onClick={clearAllCustomHolidays}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {customHolidays.map((holiday, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-gray-50 p-2 rounded"
                      >
                        <span className="text-sm">
                          {holiday.name} -{" "}
                          {new Date(
                            2000,
                            holiday.month - 1,
                            holiday.day
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <button
                          onClick={() => removeCustomHoliday(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

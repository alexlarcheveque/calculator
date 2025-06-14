import { ConceptionFormValues } from "@/types/conception";
import { useState } from "react";

interface ConceptionFormProps {
  values: ConceptionFormValues;
  onChange: (name: string, value: Date | number) => void;
}

export default function ConceptionForm({
  values,
  onChange,
}: ConceptionFormProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, new Date(value));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(name, parseInt(value));
  };

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Conception Details
      </h2>

      <div className="space-y-6">
        {/* Last Period Date */}
        <div className="form-group">
          <label
            htmlFor="lastPeriodDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <strong>First Day</strong> of Your Last Period
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="date"
              id="lastPeriodDate"
              name="lastPeriodDate"
              className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
              value={formatDateForInput(values.lastPeriodDate)}
              onChange={handleDateChange}
              max={formatDateForInput(new Date())}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Select the first day of your most recent menstrual period
          </p>
        </div>

        {/* Cycle Length */}
        <div className="form-group">
          <label
            htmlFor="cycleLength"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Average Length of Cycles
          </label>
          <select
            id="cycleLength"
            name="cycleLength"
            value={values.cycleLength}
            onChange={handleNumberChange}
            className="block w-full py-3 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
            aria-label="Cycle length selector"
          >
            <option value="22">22 days</option>
            <option value="23">23 days</option>
            <option value="24">24 days</option>
            <option value="25">25 days</option>
            <option value="26">26 days</option>
            <option value="27">27 days</option>
            <option value="28">28 days</option>
            <option value="29">29 days</option>
            <option value="30">30 days</option>
            <option value="31">31 days</option>
            <option value="32">32 days</option>
            <option value="33">33 days</option>
            <option value="34">34 days</option>
            <option value="35">35 days</option>
            <option value="36">36 days</option>
            <option value="37">37 days</option>
            <option value="38">38 days</option>
            <option value="39">39 days</option>
            <option value="40">40 days</option>
            <option value="41">41 days</option>
            <option value="42">42 days</option>
            <option value="43">43 days</option>
            <option value="44">44 days</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            The average number of days in your menstrual cycle
          </p>
        </div>
      </div>
    </div>
  );
}

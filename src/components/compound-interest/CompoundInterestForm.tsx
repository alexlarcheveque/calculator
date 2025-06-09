"use client";

import {
  CompoundInterestFormValues,
  CompoundingFrequency,
} from "@/types/compoundInterest";
import { getCompoundingFrequencyDisplayName } from "@/utils/compoundInterestCalculations";

interface CompoundInterestFormProps {
  values: CompoundInterestFormValues;
  onChange: (name: string, value: number | CompoundingFrequency) => void;
}

export default function CompoundInterestForm({
  values,
  onChange,
}: CompoundInterestFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "inputInterestRate") {
      onChange(name, parseFloat(value) || 0);
    } else {
      onChange(name, value as CompoundingFrequency);
    }
  };

  const compoundingOptions = Object.values(CompoundingFrequency);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Interest Rate Conversion
      </h2>

      <div className="space-y-6">
        {/* Input Interest Rate */}
        <div className="form-group">
          <label
            htmlFor="inputInterestRate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Input Interest Rate (%)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="inputInterestRate"
              name="inputInterestRate"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.inputInterestRate}
              onChange={handleChange}
              min="0"
              max="50"
              step="0.01"
              placeholder="6.00"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Input Compounding Frequency */}
        <div className="form-group">
          <label
            htmlFor="inputCompoundingFrequency"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Input Compounding Frequency
          </label>
          <select
            id="inputCompoundingFrequency"
            name="inputCompoundingFrequency"
            value={values.inputCompoundingFrequency}
            onChange={handleChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {compoundingOptions.map((frequency) => (
              <option key={frequency} value={frequency}>
                {getCompoundingFrequencyDisplayName(frequency)}
              </option>
            ))}
          </select>
        </div>

        {/* Output Compounding Frequency */}
        <div className="form-group">
          <label
            htmlFor="outputCompoundingFrequency"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Output Compounding Frequency
          </label>
          <select
            id="outputCompoundingFrequency"
            name="outputCompoundingFrequency"
            value={values.outputCompoundingFrequency}
            onChange={handleChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {compoundingOptions.map((frequency) => (
              <option key={frequency} value={frequency}>
                {getCompoundingFrequencyDisplayName(frequency)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

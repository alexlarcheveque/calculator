"use client";

import { SalesTaxFormValues, CalculationMode } from "@/types/salesTax";
import {
  formatInputWithCommas,
  parseCurrencyInput,
} from "@/utils/salesTaxCalculations";
import { useState } from "react";

interface SalesTaxFormProps {
  values: SalesTaxFormValues;
  onChange: (name: string, value: number | CalculationMode) => void;
}

export default function SalesTaxForm({ values, onChange }: SalesTaxFormProps) {
  const [displayValues, setDisplayValues] = useState({
    beforeTaxPrice: values.beforeTaxPrice.toString(),
    afterTaxPrice: values.afterTaxPrice.toString(),
  });

  const handleCurrencyInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // Format the display value with commas
    const formattedValue = formatInputWithCommas(value);

    // Update display state
    setDisplayValues((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Parse and send the numeric value to parent
    const numericValue = parseCurrencyInput(formattedValue);
    onChange(name, numericValue);
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;
    onChange(name, numericValue);
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value as CalculationMode;
    onChange("calculationMode", mode);
  };

  const handleClear = () => {
    setDisplayValues({
      beforeTaxPrice: "0",
      afterTaxPrice: "0",
    });
    onChange("beforeTaxPrice", 0);
    onChange("afterTaxPrice", 0);
    onChange("salesTaxRate", 6.5);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Sales Tax Details
      </h2>

      <div className="space-y-4">
        {/* Calculation Mode Selector */}
        <div className="form-group">
          <label
            htmlFor="calculationMode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            What would you like to calculate?
          </label>
          <select
            id="calculationMode"
            name="calculationMode"
            value={values.calculationMode}
            onChange={handleModeChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={CalculationMode.CALCULATE_AFTER_TAX}>
              Calculate Total Price (with tax)
            </option>
            <option value={CalculationMode.CALCULATE_BEFORE_TAX}>
              Calculate Original Price (before tax)
            </option>
            <option value={CalculationMode.CALCULATE_TAX_RATE}>
              Calculate Tax Rate
            </option>
          </select>
        </div>

        {/* Price Before Tax - Only show when calculating total price OR tax rate */}
        {(values.calculationMode === CalculationMode.CALCULATE_AFTER_TAX ||
          values.calculationMode === CalculationMode.CALCULATE_TAX_RATE) && (
          <div className="form-group">
            <label
              htmlFor="beforeTaxPrice"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price Before Tax
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="beforeTaxPrice"
                name="beforeTaxPrice"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={displayValues.beforeTaxPrice}
                onChange={handleCurrencyInputChange}
                placeholder="0"
              />
            </div>
          </div>
        )}

        {/* Price After Tax - Only show when calculating original price OR tax rate */}
        {(values.calculationMode === CalculationMode.CALCULATE_BEFORE_TAX ||
          values.calculationMode === CalculationMode.CALCULATE_TAX_RATE) && (
          <div className="form-group">
            <label
              htmlFor="afterTaxPrice"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price After Tax
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="afterTaxPrice"
                name="afterTaxPrice"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={displayValues.afterTaxPrice}
                onChange={handleCurrencyInputChange}
                placeholder="0"
              />
            </div>
          </div>
        )}

        {/* Sales Tax Rate - Show except when calculating tax rate */}
        {values.calculationMode !== CalculationMode.CALCULATE_TAX_RATE && (
          <div className="form-group">
            <label
              htmlFor="salesTaxRate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Sales Tax Rate (%)
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="salesTaxRate"
                name="salesTaxRate"
                className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.salesTaxRate}
                onChange={handlePercentageChange}
                min="0"
                max="50"
                step="0.001"
                placeholder="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>

            {/* Quick Tax Rate Presets */}
            <div className="mt-2">
              <p className="text-xs text-gray-600 mb-2">Common rates:</p>
              <div className="flex flex-wrap gap-2">
                {[0, 5, 6.25, 7, 8.25, 10].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => onChange("salesTaxRate", rate)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      values.salesTaxRate === rate
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

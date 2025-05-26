"use client";

import { SalesTaxFormValues, CalculationMode } from "@/types/salesTax";
import { formatInputWithCommas, parseCurrencyInput } from "@/utils/salesTaxCalculations";
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
    setDisplayValues(prev => ({
      ...prev,
      [name]: formattedValue
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
        Sales Tax Calculator
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
              Calculate After Tax Price
            </option>
            <option value={CalculationMode.CALCULATE_BEFORE_TAX}>
              Calculate Before Tax Price
            </option>
            <option value={CalculationMode.CALCULATE_TAX_RATE}>
              Calculate Sales Tax Rate
            </option>
          </select>
        </div>

        {/* Before Tax Price */}
        <div className="form-group">
          <label
            htmlFor="beforeTaxPrice"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Before Tax Price
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="beforeTaxPrice"
              name="beforeTaxPrice"
              className={`block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                values.calculationMode === CalculationMode.CALCULATE_BEFORE_TAX
                  ? "bg-blue-50 border-blue-300"
                  : ""
              }`}
              value={displayValues.beforeTaxPrice}
              onChange={handleCurrencyInputChange}
              placeholder="100.00"
              disabled={values.calculationMode === CalculationMode.CALCULATE_BEFORE_TAX}
            />
          </div>
          {values.calculationMode === CalculationMode.CALCULATE_BEFORE_TAX && (
            <p className="mt-1 text-xs text-blue-600">
              This value will be calculated
            </p>
          )}
        </div>

        {/* Sales Tax Rate */}
        <div className="form-group">
          <label
            htmlFor="salesTaxRate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sales Tax Rate
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="salesTaxRate"
              name="salesTaxRate"
              className={`block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                values.calculationMode === CalculationMode.CALCULATE_TAX_RATE
                  ? "bg-blue-50 border-blue-300"
                  : ""
              }`}
              value={values.salesTaxRate}
              onChange={handlePercentageChange}
              min="0"
              max="50"
              step="0.001"
              placeholder="6.5"
              disabled={values.calculationMode === CalculationMode.CALCULATE_TAX_RATE}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
          {values.calculationMode === CalculationMode.CALCULATE_TAX_RATE && (
            <p className="mt-1 text-xs text-blue-600">
              This value will be calculated
            </p>
          )}
        </div>

        {/* After Tax Price */}
        <div className="form-group">
          <label
            htmlFor="afterTaxPrice"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            After Tax Price
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="afterTaxPrice"
              name="afterTaxPrice"
              className={`block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                values.calculationMode === CalculationMode.CALCULATE_AFTER_TAX
                  ? "bg-blue-50 border-blue-300"
                  : ""
              }`}
              value={displayValues.afterTaxPrice}
              onChange={handleCurrencyInputChange}
              placeholder="106.50"
              disabled={values.calculationMode === CalculationMode.CALCULATE_AFTER_TAX}
            />
          </div>
          {values.calculationMode === CalculationMode.CALCULATE_AFTER_TAX && (
            <p className="mt-1 text-xs text-blue-600">
              This value will be calculated
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            onClick={() => {
              // Trigger recalculation by updating a value
              onChange("beforeTaxPrice", values.beforeTaxPrice);
            }}
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Quick Tax Rate Presets */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Common Tax Rates:
          </p>
          <div className="flex flex-wrap gap-2">
            {[0, 5, 6.25, 7, 8.25, 10].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => onChange("salesTaxRate", rate)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                disabled={values.calculationMode === CalculationMode.CALCULATE_TAX_RATE}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
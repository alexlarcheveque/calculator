import { RefinanceFormValues, CurrentLoanInputMode } from "@/types/refinance";
import { formatCurrency } from "@/utils/refinanceCalculations";
import { useState } from "react";

interface RefinanceFormProps {
  values: RefinanceFormValues;
  onChange: (name: string, value: number | CurrentLoanInputMode) => void;
}

// Helper function to format number with commas
const formatNumberWithCommas = (value: number): string => {
  if (isNaN(value) || value === 0) return "";
  return value.toLocaleString("en-US");
};

// Helper function to parse comma-formatted string to number
const parseFormattedNumber = (value: string): number => {
  const cleaned = value.replace(/[^\d.-]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

// Helper function to format interest rate
const formatInterestRate = (value: number): string => {
  if (isNaN(value) || value === 0) return "";
  return value.toFixed(2);
};

// Helper function to get display value for currency fields
const getCurrencyDisplayValue = (value: number): string => {
  return value === 0 ? "" : formatNumberWithCommas(value);
};

// Helper function to get display value for interest rate fields
const getInterestRateDisplayValue = (value: number): string => {
  return value === 0 ? "" : formatInterestRate(value);
};

export default function RefinanceForm({
  values,
  onChange,
}: RefinanceFormProps) {
  // Local state to track input values during editing
  const [editingStates, setEditingStates] = useState<Record<string, string>>(
    {}
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "currentLoanInputMode") {
      onChange(name, value as CurrentLoanInputMode);
    } else {
      onChange(name, parseFloat(value) || 0);
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle cash out amount separately since it can be negative
    if (name === "cashOutAmount") {
      const isNegative = value.startsWith("-") || value.startsWith("($");
      const cleanedValue = value.replace(/[^\d.]/g, "");
      const numericValue = parseFloat(cleanedValue) || 0;
      const finalValue = isNegative ? -Math.abs(numericValue) : numericValue;
      onChange(name, finalValue);
    } else {
      const numericValue = parseFormattedNumber(value);
      onChange(name, numericValue);
    }
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Store the raw input value for display while editing
    setEditingStates((prev) => ({ ...prev, [name]: value }));

    // Allow empty string, numbers, and decimal points
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      const numericValue = parseFloat(value) || 0;
      onChange(name, numericValue);
    }
  };

  const handleInterestRateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    // Clear the editing state when input loses focus
    setEditingStates((prev) => {
      const newState = { ...prev };
      delete newState[name];
      return newState;
    });
  };

  // Get the display value for interest rate inputs
  const getInterestRateInputValue = (
    fieldName: string,
    numericValue: number
  ): string => {
    // If we're currently editing this field, use the raw input value
    if (editingStates[fieldName] !== undefined) {
      return editingStates[fieldName];
    }
    // Otherwise, use the formatted display value
    return getInterestRateDisplayValue(numericValue);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Refinance Details
      </h2>

      <div className="space-y-6">
        {/* Current Loan Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4 text-gray-700">
            Current Loan
          </h3>

          {/* Input Mode Selection */}
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose input method
            </label>
            <select
              name="currentLoanInputMode"
              value={values.currentLoanInputMode}
              onChange={handleChange}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={CurrentLoanInputMode.REMAINING_BALANCE}>
                I know my remaining balance
              </option>
              <option value={CurrentLoanInputMode.ORIGINAL_LOAN}>
                I know the original loan amount
              </option>
            </select>
          </div>

          {/* Remaining Balance Mode */}
          {values.currentLoanInputMode ===
            CurrentLoanInputMode.REMAINING_BALANCE && (
            <div className="space-y-4">
              <div className="form-group">
                <label
                  htmlFor="remainingBalance"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Remaining Balance
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    id="remainingBalance"
                    name="remainingBalance"
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={getCurrencyDisplayValue(values.remainingBalance)}
                    onChange={handleCurrencyChange}
                    placeholder="250,000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="currentMonthlyPayment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Monthly Payment
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    id="currentMonthlyPayment"
                    name="currentMonthlyPayment"
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={getCurrencyDisplayValue(
                      values.currentMonthlyPayment
                    )}
                    onChange={handleCurrencyChange}
                    placeholder="1,800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Original Loan Mode */}
          {values.currentLoanInputMode ===
            CurrentLoanInputMode.ORIGINAL_LOAN && (
            <div className="space-y-4">
              <div className="form-group">
                <label
                  htmlFor="originalLoanAmount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Original Loan Amount
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    id="originalLoanAmount"
                    name="originalLoanAmount"
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={getCurrencyDisplayValue(values.originalLoanAmount)}
                    onChange={handleCurrencyChange}
                    placeholder="300,000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="originalLoanTerm"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Loan Term (years)
                </label>
                <select
                  id="originalLoanTerm"
                  name="originalLoanTerm"
                  value={values.originalLoanTerm}
                  onChange={handleChange}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="10">10 years</option>
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="25">25 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Remaining
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        id="timeRemainingYears"
                        name="timeRemainingYears"
                        className="block w-full pl-3 pr-16 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={values.timeRemainingYears}
                        onChange={handleChange}
                        min="0"
                        max={values.originalLoanTerm}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-sm">years</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        id="timeRemainingMonths"
                        name="timeRemainingMonths"
                        className="block w-full pl-3 pr-16 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={values.timeRemainingMonths}
                        onChange={handleChange}
                        min="0"
                        max="11"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-sm">months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Current Interest Rate */}
          <div className="form-group mt-4">
            <label
              htmlFor="currentInterestRate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Interest Rate
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                id="currentInterestRate"
                name="currentInterestRate"
                className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={getInterestRateInputValue(
                  "currentInterestRate",
                  values.currentInterestRate
                )}
                onChange={handleInterestRateChange}
                onBlur={handleInterestRateBlur}
                placeholder="7.000"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* New Loan Section */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-700">New Loan</h3>

          <div className="space-y-4">
            <div className="form-group">
              <label
                htmlFor="newLoanTerm"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Loan Term (years)
              </label>
              <select
                id="newLoanTerm"
                name="newLoanTerm"
                value={values.newLoanTerm}
                onChange={handleChange}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="10">10 years</option>
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="25">25 years</option>
                <option value="30">30 years</option>
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="newInterestRate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Interest Rate
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="newInterestRate"
                  name="newInterestRate"
                  className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={getInterestRateInputValue(
                    "newInterestRate",
                    values.newInterestRate
                  )}
                  onChange={handleInterestRateChange}
                  onBlur={handleInterestRateBlur}
                  placeholder="6.000"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="points"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Points
                <span className="text-xs text-gray-500 ml-1">
                  (mortgage points paid upfront to reduce interest rate)
                </span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="points"
                  name="points"
                  className="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={getInterestRateInputValue("points", values.points)}
                  onChange={handleInterestRateChange}
                  onBlur={handleInterestRateBlur}
                  placeholder="2.0"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">points</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="costsAndFees"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Costs and Fees
                <span className="text-xs text-gray-500 ml-1">
                  (application, appraisal, closing costs, etc.)
                </span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  id="costsAndFees"
                  name="costsAndFees"
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={getCurrencyDisplayValue(values.costsAndFees)}
                  onChange={handleCurrencyChange}
                  placeholder="1,500"
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="cashOutAmount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cash Out Amount
                <span className="text-xs text-gray-500 ml-1">
                  (cash to withdraw from equity; use negative for cash-in)
                </span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">
                    {values.cashOutAmount < 0 ? "($" : "$"}
                  </span>
                </div>
                <input
                  type="text"
                  id="cashOutAmount"
                  name="cashOutAmount"
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={getCurrencyDisplayValue(
                    Math.abs(values.cashOutAmount)
                  )}
                  onChange={handleCurrencyChange}
                  placeholder="0"
                />
                {values.cashOutAmount < 0 && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">)</span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Current value: {values.cashOutAmount < 0 ? "-" : ""}
                {formatCurrency(Math.abs(values.cashOutAmount))}
                {values.cashOutAmount < 0
                  ? " (cash-in)"
                  : values.cashOutAmount > 0
                  ? " (cash-out)"
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

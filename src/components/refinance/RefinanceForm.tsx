"use client";

import { RefinanceFormValues, CurrentLoanInputMode } from "@/types/refinance";
import { formatCurrency } from "@/utils/refinanceCalculations";
import { useState } from "react";

interface RefinanceFormProps {
  values: RefinanceFormValues;
  onChange: (name: string, value: number | CurrentLoanInputMode) => void;
}

// Helper to format number to string for display (empty for 0, else locale string for currency)
const formatForDisplay = (
  num: number,
  type: "currency" | "interest" | "points" | "integer"
): string => {
  if (isNaN(num)) return ""; // Return empty if NaN to prevent displaying "NaN"
  if (num === 0) return ""; // Return empty for zero, so input field can be empty
  if (type === "currency") return num.toLocaleString("en-US");
  if (type === "interest") return num.toFixed(2);
  if (type === "points") return num.toFixed(2);
  if (type === "integer") return num.toString(); // For years/months
  return num.toString(); // Default
};

// Helper to parse string input to number
const parseInputToNumber = (
  input: string,
  isCurrency: boolean,
  allowNegative: boolean = false
): number => {
  let cleaned = input.replace(/[^\d.-]/g, "");
  if (isCurrency) {
    cleaned = cleaned.replace(/[$,]/g, "");
  }

  if (!allowNegative && cleaned.includes("-")) {
    cleaned = cleaned.replace(/-/g, "");
  } else if (allowNegative) {
    const minusCount = (cleaned.match(/-/g) || []).length;
    if (minusCount > 0 && cleaned.indexOf("-") !== 0) {
      // If minus is present but not at the start, it's invalid or needs cleaning
      // This logic keeps only the first char if it's '-' and removes others
      cleaned =
        (cleaned.startsWith("-") ? "-" : "") + cleaned.replace(/-/g, "");
    } else if (minusCount > 1 && cleaned.indexOf("-") === 0) {
      // If multiple minus signs e.g. "--5"
      cleaned = "-" + cleaned.substring(1).replace(/-/g, "");
    }
  }

  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

export default function RefinanceForm({
  values,
  onChange,
}: RefinanceFormProps) {
  const [editingValues, setEditingValues] = useState<Record<string, string>>(
    {}
  );

  const getDisplayValue = (
    fieldName: keyof RefinanceFormValues,
    type: "currency" | "interest" | "points" | "integer"
  ): string => {
    if (editingValues[fieldName] !== undefined) {
      return editingValues[fieldName];
    }
    const numericValue = values[fieldName] as number;
    if (fieldName === "cashOutAmount") {
      // For cashOutAmount, format its absolute value, sign is handled outside
      return formatForDisplay(Math.abs(numericValue), type);
    }
    return formatForDisplay(numericValue, type);
  };

  const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: rawInputValue } = e.target as {
      name: keyof RefinanceFormValues;
      value: string;
    };

    const standardCurrencyField = [
      "remainingBalance",
      "currentMonthlyPayment",
      "originalLoanAmount",
      "costsAndFees",
    ].includes(name);
    const isCashOutField = name === "cashOutAmount";
    // Non-currency, non-cashout fields will just store raw input in editingValues

    // Parse the raw input to get the actual numeric value for the parent state
    const numericValue = parseInputToNumber(
      rawInputValue,
      standardCurrencyField || isCashOutField,
      isCashOutField
    );
    onChange(name, numericValue); // Update parent with the actual number

    if (standardCurrencyField) {
      if (rawInputValue === "") {
        setEditingValues((prev) => ({ ...prev, [name]: "" }));
        return;
      }
      // Try to format for live comma display
      const numberPart = rawInputValue.replace(/[$,]/g, ""); // Remove existing dollar/commas for re-formatting

      if (/^\d*\.?\d*$/.test(numberPart) || numberPart === ".") {
        // Valid number structure or just a decimal point
        const parts = numberPart.split(".");
        const integerString = parts[0];
        const decimalString = parts[1];

        let formattedInteger = "";
        if (integerString) {
          if (integerString === "0" || /^0+$/.test(integerString)) {
            formattedInteger = integerString; // Keep leading zeros as user types them before other digits
          } else {
            const parsedInt = parseInt(integerString, 10);
            formattedInteger = isNaN(parsedInt)
              ? ""
              : parsedInt.toLocaleString("en-US");
          }
        } else if (numberPart === ".") {
          formattedInteger = ".";
        }

        // If original integer part was just "0" and parsing/formatting made it empty (e.g. parseInt("0").toLocaleString might give issues if not handled)
        // Ensure "0" is preserved if that's what user typed and it's the only integer part.
        if (integerString === "0" && formattedInteger === "") {
          formattedInteger = "0";
        }

        let result = formattedInteger;
        if (decimalString !== undefined) {
          // If there's a decimal part (even if empty after ".")
          result += "." + decimalString;
        }

        // If the raw input was only "0" and the result is empty, ensure "0" is displayed.
        if (rawInputValue === "0" && result === "") {
          result = "0";
        }

        setEditingValues((prev) => ({ ...prev, [name]: result }));
      } else {
        // Not a simple number pattern (e.g. contains letters), keep raw input in editing state
        setEditingValues((prev) => ({ ...prev, [name]: rawInputValue }));
      }
    } else {
      // For cashOutAmount, interest, points, years, months: just store the raw input value.
      // Their specific formatting or parsing is handled by getDisplayValue or onBlur.
      setEditingValues((prev) => ({ ...prev, [name]: rawInputValue }));
    }
  };

  const handleNumericInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof RefinanceFormValues;
      value: string;
    };

    const isCurrencyField = [
      "remainingBalance",
      "currentMonthlyPayment",
      "originalLoanAmount",
      "costsAndFees",
      "cashOutAmount",
    ].includes(name);
    const allowNegative = name === "cashOutAmount";

    const finalNumericValue = parseInputToNumber(
      value,
      isCurrencyField,
      allowNegative
    );
    onChange(name, finalNumericValue);

    setEditingValues((prev) => {
      const newState = { ...prev };
      delete newState[name];
      return newState;
    });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "currentLoanInputMode") {
      onChange(name, value as CurrentLoanInputMode);
    } else {
      // For numeric select/inputs like terms, years, months
      onChange(name, parseFloat(value) || 0);
    }
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
              onChange={handleSelectChange}
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
                    value={getDisplayValue("remainingBalance", "currency")}
                    onChange={handleNumericInputChange}
                    onBlur={handleNumericInputBlur}
                    placeholder="e.g., 250,000"
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
                    value={getDisplayValue("currentMonthlyPayment", "currency")}
                    onChange={handleNumericInputChange}
                    onBlur={handleNumericInputBlur}
                    placeholder="e.g., 1,800"
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
                    value={getDisplayValue("originalLoanAmount", "currency")}
                    onChange={handleNumericInputChange}
                    onBlur={handleNumericInputBlur}
                    placeholder="e.g., 300,000"
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
                  onChange={handleSelectChange}
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
                        type="text"
                        id="timeRemainingYears"
                        name="timeRemainingYears"
                        className="block w-full pl-3 pr-16 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={getDisplayValue("timeRemainingYears", "integer")}
                        onChange={handleNumericInputChange}
                        onBlur={handleNumericInputBlur}
                        min="0"
                        max={values.originalLoanTerm.toString()}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-sm">years</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="timeRemainingMonths"
                        name="timeRemainingMonths"
                        className="block w-full pl-3 pr-16 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={getDisplayValue(
                          "timeRemainingMonths",
                          "integer"
                        )}
                        onChange={handleNumericInputChange}
                        onBlur={handleNumericInputBlur}
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
                value={getDisplayValue("currentInterestRate", "interest")}
                onChange={handleNumericInputChange}
                onBlur={handleNumericInputBlur}
                placeholder="e.g., 7.00"
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
                onChange={handleSelectChange}
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
                  value={getDisplayValue("newInterestRate", "interest")}
                  onChange={handleNumericInputChange}
                  onBlur={handleNumericInputBlur}
                  placeholder="e.g., 6.00"
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
                  value={getDisplayValue("points", "points")}
                  onChange={handleNumericInputChange}
                  onBlur={handleNumericInputBlur}
                  placeholder="e.g., 2.0"
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
                  value={getDisplayValue("costsAndFees", "currency")}
                  onChange={handleNumericInputChange}
                  onBlur={handleNumericInputBlur}
                  placeholder="e.g., 1,500"
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
                    {editingValues.cashOutAmount?.startsWith("-") ||
                    (editingValues.cashOutAmount === undefined &&
                      values.cashOutAmount < 0)
                      ? "-"
                      : ""}
                    $
                  </span>
                </div>
                <input
                  type="text"
                  id="cashOutAmount"
                  name="cashOutAmount"
                  className={`block w-full pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    editingValues.cashOutAmount?.startsWith("-") ||
                    (editingValues.cashOutAmount === undefined &&
                      values.cashOutAmount < 0)
                      ? "pl-7"
                      : "pl-6"
                  }`}
                  value={
                    editingValues.cashOutAmount !== undefined
                      ? editingValues.cashOutAmount.replace(/^-/, "")
                      : getDisplayValue("cashOutAmount", "currency")
                  }
                  onChange={handleNumericInputChange}
                  onBlur={handleNumericInputBlur}
                  placeholder="e.g., 0"
                />
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

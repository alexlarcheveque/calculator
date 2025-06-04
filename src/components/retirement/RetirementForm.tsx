import { useState } from "react";
import {
  RetirementFormValues,
  IncomeAfterRetirementUnit,
  FutureSavingsUnit,
} from "@/types/retirement";

interface RetirementFormProps {
  values: RetirementFormValues;
  onChange: (
    name: string,
    value: number | IncomeAfterRetirementUnit | FutureSavingsUnit
  ) => void;
}

// Format number with commas for display
const formatCurrency = (value: number): string => {
  if (value === 0) return "";
  // Convert to parts to handle commas and decimals separately
  const [whole, decimal] = value.toString().split(".");

  // Add commas to the whole number part
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // If there are decimals, add them back, otherwise return just the whole number
  return decimal ? `${withCommas}.${decimal}` : withCommas;
};

// Format percentage for display - maintain up to 3 decimal places
const formatPercent = (value: number): string => {
  if (value === 0) return "";
  // Convert to string to preserve exact decimal places up to 3
  const strValue = value.toString();

  // If it's a whole number, return as is
  if (Number.isInteger(value)) {
    return strValue;
  }

  // If it has decimals, preserve up to 3 places without trailing zeros
  const [whole, decimal] = strValue.split(".");
  if (decimal) {
    const trimmedDecimal = decimal.slice(0, 3).replace(/0+$/, "");
    return trimmedDecimal ? `${whole}.${trimmedDecimal}` : whole;
  }

  return strValue;
};

// Format input value while typing
const formatWhileTyping = (value: string): string => {
  // Remove any non-numeric characters except decimal point
  const cleaned = value.replace(/[^\d.]/g, "");

  // Handle multiple decimal points - keep only the first one
  const parts = cleaned.split(".");
  const whole = parts[0];
  const decimal = parts.length > 1 ? "." + parts[1] : "";

  // Add commas to the whole number part
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return withCommas + decimal;
};

export default function RetirementForm({
  values,
  onChange,
}: RetirementFormProps) {
  // Track which field is being edited
  const [editingField, setEditingField] = useState<string | null>(null);
  // Store the raw input value while editing
  const [editValue, setEditValue] = useState<string>("");

  const handleFocus = (name: string, value: number) => {
    setEditingField(name);
    setEditValue(formatCurrency(value));
  };

  const handleBlur = (name: string, value: string) => {
    setEditingField(null);
    const parsedValue = parseFloat(value.replace(/,/g, ""));
    if (!isNaN(parsedValue)) {
      onChange(name, parsedValue);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "incomeAfterRetirementUnit") {
      onChange(name, value as IncomeAfterRetirementUnit);
    } else if (name === "futureSavingsUnit") {
      onChange(name, value as FutureSavingsUnit);
    } else if (editingField === name) {
      // Format the input value while typing
      const formattedValue = formatWhileTyping(value);
      setEditValue(formattedValue);
    }
  };

  const getInputValue = (
    name: string,
    value: number,
    isPercentage: boolean = false
  ): string => {
    if (editingField === name) {
      return editValue;
    }
    return isPercentage ? formatPercent(value) : formatCurrency(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Retirement Planning Details
      </h2>

      <div className="space-y-4">
        {/* Current Age */}
        <div className="form-group">
          <label
            htmlFor="currentAge"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your current age
          </label>
          <input
            type="text"
            id="currentAge"
            name="currentAge"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={getInputValue("currentAge", values.currentAge)}
            onChange={handleChange}
            onFocus={() => handleFocus("currentAge", values.currentAge)}
            onBlur={(e) => handleBlur("currentAge", e.target.value)}
          />
        </div>

        {/* Retirement Age */}
        <div className="form-group">
          <label
            htmlFor="retirementAge"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your planned retirement age
          </label>
          <input
            type="text"
            id="retirementAge"
            name="retirementAge"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={getInputValue("retirementAge", values.retirementAge)}
            onChange={handleChange}
            onFocus={() => handleFocus("retirementAge", values.retirementAge)}
            onBlur={(e) => handleBlur("retirementAge", e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-500">
            The average retirement age in the U.S. is 64 for men and 62 for
            women.
          </p>
        </div>

        {/* Life Expectancy */}
        <div className="form-group">
          <label
            htmlFor="lifeExpectancy"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your life expectancy age
          </label>
          <input
            type="text"
            id="lifeExpectancy"
            name="lifeExpectancy"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={getInputValue("lifeExpectancy", values.lifeExpectancy)}
            onChange={handleChange}
            onFocus={() => handleFocus("lifeExpectancy", values.lifeExpectancy)}
            onBlur={(e) => handleBlur("lifeExpectancy", e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-500">
            The average life expectancy in the U.S. is between 76 and 80 years.
          </p>
        </div>

        {/* Current Income */}
        <div className="form-group">
          <label
            htmlFor="currentIncome"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your current pre-tax income (yearly)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="currentIncome"
              name="currentIncome"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={getInputValue("currentIncome", values.currentIncome)}
              onChange={handleChange}
              onFocus={() => handleFocus("currentIncome", values.currentIncome)}
              onBlur={(e) => handleBlur("currentIncome", e.target.value)}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Include your total annual income before taxes and deductions.
          </p>
        </div>

        {/* Section Title */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">
            Assumptions
          </h3>
        </div>

        {/* Income Increase */}
        <div className="form-group">
          <label
            htmlFor="incomeIncrease"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Expected income increase (yearly)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              id="incomeIncrease"
              name="incomeIncrease"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={getInputValue(
                "incomeIncrease",
                values.incomeIncrease,
                true
              )}
              onChange={handleChange}
              onFocus={() =>
                handleFocus("incomeIncrease", values.incomeIncrease)
              }
              onBlur={(e) => handleBlur("incomeIncrease", e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            The average annual wage growth has been 2.5% over the past 50 years.
          </p>
        </div>

        {/* Income After Retirement */}
        <div className="form-group">
          <label
            htmlFor="incomeAfterRetirement"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Income needed after retirement (yearly)
          </label>
          <div className="flex space-x-2">
            <div className="flex-1 relative rounded-md shadow-sm">
              {values.incomeAfterRetirementUnit ===
                IncomeAfterRetirementUnit.DOLLAR && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
              )}
              <input
                type="text"
                id="incomeAfterRetirement"
                name="incomeAfterRetirement"
                className={`block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  values.incomeAfterRetirementUnit ===
                  IncomeAfterRetirementUnit.DOLLAR
                    ? "pl-6"
                    : ""
                }`}
                value={getInputValue(
                  "incomeAfterRetirement",
                  values.incomeAfterRetirement,
                  values.incomeAfterRetirementUnit ===
                    IncomeAfterRetirementUnit.PERCENTAGE
                )}
                onChange={handleChange}
                onFocus={() =>
                  handleFocus(
                    "incomeAfterRetirement",
                    values.incomeAfterRetirement
                  )
                }
                onBlur={(e) =>
                  handleBlur("incomeAfterRetirement", e.target.value)
                }
              />
              {values.incomeAfterRetirementUnit ===
                IncomeAfterRetirementUnit.PERCENTAGE && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              )}
            </div>
            <select
              name="incomeAfterRetirementUnit"
              value={values.incomeAfterRetirementUnit}
              onChange={handleChange}
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={IncomeAfterRetirementUnit.PERCENTAGE}>%</option>
              <option value={IncomeAfterRetirementUnit.DOLLAR}>$</option>
            </select>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {values.incomeAfterRetirementUnit ===
            IncomeAfterRetirementUnit.PERCENTAGE
              ? `Percentage of current income ($${formatCurrency(
                  (values.currentIncome * values.incomeAfterRetirement) / 100
                )}/year)`
              : `Based on current dollar value (${formatPercent(
                  (values.incomeAfterRetirement / values.currentIncome) * 100
                )}% of current income)`}
          </p>
        </div>

        {/* Investment Return */}
        <div className="form-group">
          <label
            htmlFor="averageInvestmentReturn"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Expected investment return (yearly)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              id="averageInvestmentReturn"
              name="averageInvestmentReturn"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={getInputValue(
                "averageInvestmentReturn",
                values.averageInvestmentReturn,
                true
              )}
              onChange={handleChange}
              onFocus={() =>
                handleFocus(
                  "averageInvestmentReturn",
                  values.averageInvestmentReturn
                )
              }
              onBlur={(e) =>
                handleBlur("averageInvestmentReturn", e.target.value)
              }
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            A diversified portfolio historically returns 6-8% annually before
            inflation.
          </p>
        </div>

        {/* Inflation Rate */}
        <div className="form-group">
          <label
            htmlFor="inflationRate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Expected inflation rate (yearly)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              id="inflationRate"
              name="inflationRate"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={getInputValue("inflationRate", values.inflationRate, true)}
              onChange={handleChange}
              onFocus={() => handleFocus("inflationRate", values.inflationRate)}
              onBlur={(e) => handleBlur("inflationRate", e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            The average inflation rate has been 3.9% over the past 50 years.
          </p>
        </div>

        {/* Section Title */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">Optional</h3>
        </div>

        {/* Future Savings */}
        <div className="form-group">
          <label
            htmlFor="futureSavings"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {values.futureSavingsUnit === FutureSavingsUnit.PERCENTAGE
              ? "Future retirement savings (% of yearly income)"
              : "Future retirement savings (yearly)"}
          </label>
          <div className="flex space-x-2">
            <div className="flex-1 relative rounded-md shadow-sm">
              {values.futureSavingsUnit === FutureSavingsUnit.DOLLAR && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
              )}
              <input
                type="text"
                id="futureSavings"
                name="futureSavings"
                className={`block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  values.futureSavingsUnit === FutureSavingsUnit.DOLLAR
                    ? "pl-6"
                    : ""
                }`}
                value={getInputValue(
                  "futureSavings",
                  values.futureSavings,
                  values.futureSavingsUnit === FutureSavingsUnit.PERCENTAGE
                )}
                onChange={handleChange}
                onFocus={() =>
                  handleFocus("futureSavings", values.futureSavings)
                }
                onBlur={(e) => handleBlur("futureSavings", e.target.value)}
              />
              {values.futureSavingsUnit === FutureSavingsUnit.PERCENTAGE && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              )}
            </div>
            <select
              name="futureSavingsUnit"
              value={values.futureSavingsUnit}
              onChange={handleChange}
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={FutureSavingsUnit.PERCENTAGE}>%</option>
              <option value={FutureSavingsUnit.DOLLAR}>$</option>
            </select>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Financial advisors typically recommend saving 15-20% of your income
            for retirement.
          </p>
        </div>

        {/* Current Retirement Savings */}
        <div className="form-group">
          <label
            htmlFor="currentRetirementSavings"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your current retirement savings
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="currentRetirementSavings"
              name="currentRetirementSavings"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={getInputValue(
                "currentRetirementSavings",
                values.currentRetirementSavings
              )}
              onChange={handleChange}
              onFocus={() =>
                handleFocus(
                  "currentRetirementSavings",
                  values.currentRetirementSavings
                )
              }
              onBlur={(e) =>
                handleBlur("currentRetirementSavings", e.target.value)
              }
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Include all retirement accounts (401(k), IRA, pension values, etc.).
          </p>
        </div>

        {/* Other Income After Retirement */}
        <div className="form-group">
          <label
            htmlFor="otherIncomeAfterRetirement"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Other retirement income (monthly)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="otherIncomeAfterRetirement"
              name="otherIncomeAfterRetirement"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={getInputValue(
                "otherIncomeAfterRetirement",
                values.otherIncomeAfterRetirement
              )}
              onChange={handleChange}
              onFocus={() =>
                handleFocus(
                  "otherIncomeAfterRetirement",
                  values.otherIncomeAfterRetirement
                )
              }
              onBlur={(e) =>
                handleBlur("otherIncomeAfterRetirement", e.target.value)
              }
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Social security, pension, etc.
          </p>
        </div>
      </div>
    </div>
  );
}

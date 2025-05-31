import { MortgageFormValues } from "@/types/mortgage";
import { formatCurrency } from "@/utils/mortgageCalculations";
import { useState, useEffect } from "react";

interface MortgageFormProps {
  values: MortgageFormValues;
  onChange: (name: string, value: number) => void;
}

// Utility functions for currency formatting
const formatNumberWithCommas = (value: number): string => {
  if (isNaN(value) || value === 0) return "";
  return value.toLocaleString("en-US");
};

const parseFormattedNumber = (value: string): number => {
  // Remove commas and parse as float
  const cleanValue = value.replace(/,/g, "");
  const parsed = parseFloat(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
};

export default function MortgageForm({ values, onChange }: MortgageFormProps) {
  const [downPaymentInputMode, setDownPaymentInputMode] = useState<
    "absolute" | "percentage"
  >("absolute");

  // State to track formatted display values for currency inputs
  const [formattedValues, setFormattedValues] = useState({
    homeValue: formatNumberWithCommas(values.homeValue),
    downPayment: formatNumberWithCommas(values.downPayment),
    propertyTax: formatNumberWithCommas(values.propertyTax),
    homeInsurance: formatNumberWithCommas(values.homeInsurance),
    hoa: formatNumberWithCommas(values.hoa),
  });

  // State to track the percentage input separately to handle empty states
  const [percentageInputValue, setPercentageInputValue] = useState<string>(
    () => {
      return values.homeValue > 0 && values.downPayment > 0
        ? ((values.downPayment / values.homeValue) * 100).toFixed(2)
        : "";
    }
  );

  // Sync formatted values when props change (e.g., when switching calculators or resetting)
  useEffect(() => {
    setFormattedValues({
      homeValue: formatNumberWithCommas(values.homeValue),
      downPayment: formatNumberWithCommas(values.downPayment),
      propertyTax: formatNumberWithCommas(values.propertyTax),
      homeInsurance: formatNumberWithCommas(values.homeInsurance),
      hoa: formatNumberWithCommas(values.hoa),
    });

    // Update percentage input value
    setPercentageInputValue(
      values.homeValue > 0 && values.downPayment > 0
        ? ((values.downPayment / values.homeValue) * 100).toFixed(2)
        : ""
    );
  }, [
    values.homeValue,
    values.downPayment,
    values.propertyTax,
    values.homeInsurance,
    values.hoa,
  ]);

  const handleCurrencyInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // Only allow numbers, commas, and periods
    const sanitizedValue = value.replace(/[^0-9,.]/g, "");

    // Update the formatted display value
    setFormattedValues((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    // Parse and update the actual numeric value
    const numericValue = parseFormattedNumber(sanitizedValue);
    onChange(name, numericValue);
  };

  const handleCurrencyInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFormattedNumber(value);

    // Format the value with commas when the input loses focus
    setFormattedValues((prev) => ({
      ...prev,
      [name]: formatNumberWithCommas(numericValue),
    }));
  };

  const handleDownPaymentInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "downPaymentPercentageInput") {
      // Update the percentage input state
      setPercentageInputValue(value);

      const numericValue = parseFloat(value);
      if (values.homeValue > 0 && !isNaN(numericValue) && value !== "") {
        // Cap percentage at 100%
        const cappedPercentage = Math.min(numericValue, 100);
        const absoluteDownPayment = (cappedPercentage / 100) * values.homeValue;
        onChange("downPayment", absoluteDownPayment);
        setFormattedValues((prev) => ({
          ...prev,
          downPayment: formatNumberWithCommas(absoluteDownPayment),
        }));
      } else if (value === "" || isNaN(numericValue) || numericValue === 0) {
        onChange("downPayment", 0);
        setFormattedValues((prev) => ({
          ...prev,
          downPayment: "",
        }));
      }
    } else if (name === "downPayment") {
      // Only allow numbers, commas, and periods
      const sanitizedValue = value.replace(/[^0-9,.]/g, "");

      // Update the formatted display value
      setFormattedValues((prev) => ({
        ...prev,
        downPayment: sanitizedValue,
      }));

      // Parse and update the actual numeric value
      const numericValue = parseFormattedNumber(sanitizedValue);
      // Cap down payment at home value
      const cappedDownPayment =
        values.homeValue > 0
          ? Math.min(numericValue, values.homeValue)
          : numericValue;
      onChange(name, cappedDownPayment);

      // Update percentage input when absolute value changes
      if (values.homeValue > 0 && cappedDownPayment > 0) {
        setPercentageInputValue(
          ((cappedDownPayment / values.homeValue) * 100).toFixed(2)
        );
      } else {
        setPercentageInputValue("");
      }
    }
  };

  const handleDownPaymentInputBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "downPayment") {
      const numericValue = parseFormattedNumber(value);
      // Cap down payment at home value
      const cappedDownPayment =
        values.homeValue > 0
          ? Math.min(numericValue, values.homeValue)
          : numericValue;

      // Update the actual value if it was capped
      if (cappedDownPayment !== numericValue) {
        onChange("downPayment", cappedDownPayment);
      }

      setFormattedValues((prev) => ({
        ...prev,
        downPayment: formatNumberWithCommas(cappedDownPayment),
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange(name, parseFloat(value));
  };

  const downPaymentPercentage =
    values.homeValue > 0 && values.downPayment > 0
      ? ((values.downPayment / values.homeValue) * 100).toFixed(2)
      : "0.00";

  // Check if down payment exceeds home value for validation styling
  const isDownPaymentExcessive =
    values.homeValue > 0 && values.downPayment > values.homeValue;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Mortgage Details
      </h2>

      <div className="space-y-4">
        {/* Home Value */}
        <div className="form-group">
          <label
            htmlFor="homeValue"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Home Value
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="homeValue"
              name="homeValue"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formattedValues.homeValue}
              onChange={handleCurrencyInputChange}
              onBlur={handleCurrencyInputBlur}
              placeholder="0"
            />
          </div>
        </div>

        {/* Down Payment */}
        <div className="form-group">
          <label
            htmlFor="downPayment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Down Payment
          </label>
          <div className="flex items-center space-x-2 mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="downPaymentMode"
                value="absolute"
                checked={downPaymentInputMode === "absolute"}
                onChange={() => setDownPaymentInputMode("absolute")}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Amount</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="downPaymentMode"
                value="percentage"
                checked={downPaymentInputMode === "percentage"}
                onChange={() => {
                  setDownPaymentInputMode("percentage");
                }}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Percentage</span>
            </label>
          </div>

          {downPaymentInputMode === "absolute" ? (
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="downPayment"
                name="downPayment"
                className={`block w-full pl-6 pr-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  isDownPaymentExcessive
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                value={formattedValues.downPayment}
                onChange={handleDownPaymentInputChange}
                onBlur={handleDownPaymentInputBlur}
                placeholder="0"
              />
            </div>
          ) : (
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="downPaymentPercentageInput"
                name="downPaymentPercentageInput"
                className={`block w-full pl-3 pr-6 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  isDownPaymentExcessive
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                value={percentageInputValue}
                onChange={handleDownPaymentInputChange}
                min="0"
                max="100"
                step="0.01"
                placeholder="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>
          )}
          {isDownPaymentExcessive && (
            <p className="mt-1 text-xs text-red-600">
              Down payment cannot exceed home value
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {downPaymentInputMode === "absolute"
              ? `Percentage: ${downPaymentPercentage}%`
              : `Cash: ${formatCurrency(values.downPayment)}`}
          </p>
        </div>

        {/* Loan Term */}
        <div className="form-group">
          <label
            htmlFor="loanTerm"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Loan Term (years)
          </label>
          <select
            id="loanTerm"
            name="loanTerm"
            value={values.loanTerm}
            onChange={handleChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            aria-label="Loan term selector"
          >
            <option value="10">10 years</option>
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="25">25 years</option>
            <option value="30">30 years</option>
          </select>
        </div>

        {/* Interest Rate */}
        <div className="form-group">
          <label
            htmlFor="interestRate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Interest Rate (%)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.interestRate}
              onChange={handleChange}
              min="0"
              max="15"
              step="0.125"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Property Tax */}
        <div className="form-group">
          <label
            htmlFor="propertyTax"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Property Tax (yearly)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="propertyTax"
              name="propertyTax"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formattedValues.propertyTax}
              onChange={handleCurrencyInputChange}
              onBlur={handleCurrencyInputBlur}
              placeholder="0"
            />
          </div>
        </div>

        {/* Home Insurance */}
        <div className="form-group">
          <label
            htmlFor="homeInsurance"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Home Insurance (yearly)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="homeInsurance"
              name="homeInsurance"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formattedValues.homeInsurance}
              onChange={handleCurrencyInputChange}
              onBlur={handleCurrencyInputBlur}
              placeholder="0"
            />
          </div>
        </div>

        {/* HOA */}
        <div className="form-group">
          <label
            htmlFor="hoa"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            HOA (monthly)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="hoa"
              name="hoa"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formattedValues.hoa}
              onChange={handleCurrencyInputChange}
              onBlur={handleCurrencyInputBlur}
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

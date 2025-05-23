import { MortgageFormValues } from "@/types/mortgage";
import { formatCurrency } from "@/utils/mortgageCalculations";
import { useState } from "react";

interface MortgageFormProps {
  values: MortgageFormValues;
  onChange: (name: string, value: number) => void;
}

export default function MortgageForm({ values, onChange }: MortgageFormProps) {
  const [downPaymentInputMode, setDownPaymentInputMode] = useState<
    "absolute" | "percentage"
  >("absolute");

  const handleDownPaymentInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    if (name === "downPaymentPercentageInput") {
      if (values.homeValue > 0 && !isNaN(numericValue)) {
        const absoluteDownPayment = (numericValue / 100) * values.homeValue;
        onChange("downPayment", absoluteDownPayment);
      } else if (isNaN(numericValue) || numericValue === 0) {
        // if percentage is cleared or 0, set downPayment to 0
        onChange("downPayment", 0);
      }
    } else if (name === "downPayment") {
      onChange(name, numericValue);
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
      ? ((values.downPayment / values.homeValue) * 100).toFixed(1)
      : "0.0";

  const displayedDownPaymentPercentageInput =
    values.homeValue > 0 && values.downPayment > 0
      ? (values.downPayment / values.homeValue) * 100
      : 0;

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
              type="number"
              id="homeValue"
              name="homeValue"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.homeValue}
              onChange={handleChange}
              min="50000"
              max="2000000"
              step="1000"
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
                  // Optionally, if switching to percentage and home value exists,
                  // you might want to pre-fill percentage based on current absolute downpayment
                  // For now, it will just switch mode and user has to input percentage.
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
                type="number"
                id="downPayment"
                name="downPayment"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.downPayment}
                onChange={handleDownPaymentInputChange}
                min="0"
                max={values.homeValue}
                step="1000"
              />
            </div>
          ) : (
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="downPaymentPercentageInput"
                name="downPaymentPercentageInput"
                className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={displayedDownPaymentPercentageInput}
                onChange={handleDownPaymentInputChange}
                min="0"
                max="100"
                step="0.1"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>
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
              type="number"
              id="propertyTax"
              name="propertyTax"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.propertyTax}
              onChange={handleChange}
              min="0"
              max="25000"
              step="100"
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
              type="number"
              id="homeInsurance"
              name="homeInsurance"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.homeInsurance}
              onChange={handleChange}
              min="0"
              max="10000"
              step="100"
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
              type="number"
              id="hoa"
              name="hoa"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.hoa}
              onChange={handleChange}
              min="0"
              max="1000"
              step="10"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Total Loan Amount
        </h3>
        <p className="text-2xl font-bold text-gray-900">
          {formatCurrency(values.homeValue - values.downPayment)}
        </p>
      </div>
    </div>
  );
}

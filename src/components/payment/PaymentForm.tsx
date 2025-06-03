import { PaymentFormValues, PaymentCalculatorMode } from "@/types/payment";
import { useState } from "react";

interface PaymentFormProps {
  values: PaymentFormValues;
  onChange: (name: string, value: number | PaymentCalculatorMode) => void;
}

export default function PaymentForm({ values, onChange }: PaymentFormProps) {
  // Comma formatting functions
  const formatWithCommas = (value: number): string => {
    if (value === 0) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseCommaValue = (value: string): number => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleCommaInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const inputValue = e.target.value;
    const numericValue = parseCommaValue(inputValue);
    onChange(fieldName, numericValue);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange(name, parseFloat(value));
  };

  const handleModeChange = (mode: PaymentCalculatorMode) => {
    onChange("calculatorMode", mode);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Payment Calculator
      </h2>

      {/* Mode Tabs */}
      <div className="mb-6">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <button
            type="button"
            onClick={() => handleModeChange(PaymentCalculatorMode.FIXED_TERM)}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              values.calculatorMode === PaymentCalculatorMode.FIXED_TERM
                ? "bg-blue-500 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Fixed Term
          </button>
          <button
            type="button"
            onClick={() =>
              handleModeChange(PaymentCalculatorMode.FIXED_PAYMENT)
            }
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              values.calculatorMode === PaymentCalculatorMode.FIXED_PAYMENT
                ? "bg-blue-500 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Fixed Payment
          </button>
        </div>
      </div>

      {/* Information Box */}
      <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          {values.calculatorMode === PaymentCalculatorMode.FIXED_TERM
            ? "Calculate the monthly payment amount for a fixed loan term."
            : "Calculate the time required to pay off a loan with a fixed monthly payment."}
        </p>
      </div>

      <div className="space-y-4">
        {/* Loan Amount */}
        <div className="form-group">
          <label
            htmlFor="loanAmount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Loan Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="loanAmount"
              name="loanAmount"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formatWithCommas(values.loanAmount)}
              onChange={(e) => handleCommaInputChange(e, "loanAmount")}
              placeholder="200,000"
            />
          </div>
        </div>

        {/* Conditional Fields Based on Mode */}
        {values.calculatorMode === PaymentCalculatorMode.FIXED_TERM ? (
          <div className="form-group">
            <label
              htmlFor="loanTermYears"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Loan Term (years)
            </label>
            <input
              type="number"
              id="loanTermYears"
              name="loanTermYears"
              min="1"
              max="50"
              step="0.5"
              value={values.loanTermYears}
              onChange={handleChange}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="30"
            />
          </div>
        ) : (
          <div className="form-group">
            <label
              htmlFor="monthlyPayment"
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
                id="monthlyPayment"
                name="monthlyPayment"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formatWithCommas(values.monthlyPayment)}
                onChange={(e) => handleCommaInputChange(e, "monthlyPayment")}
                placeholder="2,000"
              />
            </div>
          </div>
        )}

        {/* Interest Rate */}
        <div className="form-group">
          <label
            htmlFor="interestRate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Interest Rate
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={values.interestRate}
              onChange={handleChange}
              min="0"
              max="30"
              step="0.25"
              placeholder="5.75"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

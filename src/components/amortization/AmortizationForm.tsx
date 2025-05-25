"use client";

import { AmortizationFormValues, OneTimePayment } from "@/types/amortization";
import { formatCurrency } from "@/utils/amortizationCalculations";
import { useState } from "react";

interface AmortizationFormProps {
  values: AmortizationFormValues;
  onChange: (name: string, value: any) => void;
}

export default function AmortizationForm({
  values,
  onChange,
}: AmortizationFormProps) {
  const [showExtraPayments, setShowExtraPayments] = useState(false);
  const [showAdditionalOneTime, setShowAdditionalOneTime] = useState(false);

  // Format number with commas for display
  const formatNumberWithCommas = (value: number): string => {
    if (value === 0) return "";
    return value.toLocaleString("en-US");
  };

  // Parse number from comma-formatted string
  const parseNumberFromCommas = (value: string): number => {
    const cleaned = value.replace(/,/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "loanAmount") {
      const numericValue = parseNumberFromCommas(value);
      onChange(name, numericValue);
    } else if (name === "interestRate") {
      onChange(name, parseFloat(value) || 0);
    } else if (name === "loanTermYears" || name === "loanTermMonths") {
      onChange(name, parseInt(value) || 0);
    } else if (name === "startDate") {
      onChange(name, new Date(value));
    }
  };

  const handleExtraPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes("Date")) {
      onChange("extraPayments", {
        ...values.extraPayments,
        [name]: new Date(value),
      });
    } else {
      const numericValue = parseNumberFromCommas(value);
      onChange("extraPayments", {
        ...values.extraPayments,
        [name]: numericValue,
      });
    }
  };

  const handleOneTimePaymentChange = (
    index: number,
    field: "amount" | "date",
    value: string
  ) => {
    const newOneTimePayments = [...values.extraPayments.oneTimePayments];

    if (field === "amount") {
      newOneTimePayments[index] = {
        ...newOneTimePayments[index],
        amount: parseNumberFromCommas(value),
      };
    } else {
      newOneTimePayments[index] = {
        ...newOneTimePayments[index],
        date: new Date(value),
      };
    }

    onChange("extraPayments", {
      ...values.extraPayments,
      oneTimePayments: newOneTimePayments,
    });
  };

  const addOneTimePayment = () => {
    const newPayment: OneTimePayment = {
      amount: 0,
      date: new Date(),
    };

    onChange("extraPayments", {
      ...values.extraPayments,
      oneTimePayments: [...values.extraPayments.oneTimePayments, newPayment],
    });
  };

  const removeOneTimePayment = (index: number) => {
    const newOneTimePayments = values.extraPayments.oneTimePayments.filter(
      (_, i) => i !== index
    );

    onChange("extraPayments", {
      ...values.extraPayments,
      oneTimePayments: newOneTimePayments,
    });
  };

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Loan Details</h2>

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
              value={formatNumberWithCommas(values.loanAmount)}
              onChange={handleChange}
              placeholder="200,000"
            />
          </div>
        </div>

        {/* Loan Term */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Term
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                id="loanTermYears"
                name="loanTermYears"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.loanTermYears || ""}
                onChange={handleChange}
                min="0"
                max="50"
                placeholder="Years"
              />
              <span className="text-xs text-gray-500 mt-1">years</span>
            </div>
            <div>
              <input
                type="number"
                id="loanTermMonths"
                name="loanTermMonths"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.loanTermMonths || ""}
                onChange={handleChange}
                min="0"
                max="11"
                placeholder="Months"
              />
              <span className="text-xs text-gray-500 mt-1">months</span>
            </div>
          </div>
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
              value={values.interestRate || ""}
              onChange={handleChange}
              min="0"
              max="30"
              step="0.01"
              placeholder="6.00"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Start Date */}
        <div className="form-group">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Loan Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formatDateForInput(values.startDate)}
            onChange={handleChange}
          />
        </div>

        {/* Extra Payments Toggle */}
        <div className="form-group">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showExtraPayments}
              onChange={(e) => setShowExtraPayments(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Optional: make extra payments
            </span>
          </label>
        </div>

        {/* Extra Payments Section */}
        {showExtraPayments && (
          <div className="bg-gray-50 p-4 rounded-md space-y-4">
            {/* Monthly Extra Payment */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extra Monthly Payment
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="monthlyExtra"
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={formatNumberWithCommas(
                      values.extraPayments.monthlyExtra
                    )}
                    onChange={handleExtraPaymentChange}
                    placeholder="100"
                  />
                </div>
                <input
                  type="date"
                  name="monthlyExtraStartDate"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formatDateForInput(
                    values.extraPayments.monthlyExtraStartDate
                  )}
                  onChange={handleExtraPaymentChange}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Start date for monthly extra payments
              </p>
            </div>

            {/* Yearly Extra Payment */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extra Yearly Payment
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="yearlyExtra"
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={formatNumberWithCommas(
                      values.extraPayments.yearlyExtra
                    )}
                    onChange={handleExtraPaymentChange}
                    placeholder="1,000"
                  />
                </div>
                <input
                  type="date"
                  name="yearlyExtraStartDate"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formatDateForInput(
                    values.extraPayments.yearlyExtraStartDate
                  )}
                  onChange={handleExtraPaymentChange}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Payment will be made annually on this date
              </p>
            </div>

            {/* One-time Payments */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                One-time Extra Payments
              </label>

              {values.extraPayments.oneTimePayments.map((payment, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formatNumberWithCommas(payment.amount)}
                      onChange={(e) =>
                        handleOneTimePaymentChange(
                          index,
                          "amount",
                          e.target.value
                        )
                      }
                      placeholder="5,000"
                    />
                  </div>
                  <input
                    type="date"
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={formatDateForInput(payment.date)}
                    onChange={(e) =>
                      handleOneTimePaymentChange(index, "date", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeOneTimePayment(index)}
                    className="px-3 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addOneTimePayment}
                className="mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-md hover:bg-blue-50"
              >
                + Add One-time Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

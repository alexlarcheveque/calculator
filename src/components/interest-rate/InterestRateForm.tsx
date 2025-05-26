import { InterestRateFormValues } from "@/types/interestRate";
import { useState } from "react";

interface InterestRateFormProps {
  values: InterestRateFormValues;
  onChange: (name: string, value: number) => void;
}

const formatNumberWithCommas = (value: number): string => {
  return value.toLocaleString("en-US");
};

const parseNumberFromString = (value: string): number => {
  const cleanedValue = value.replace(/,/g, "");
  const parsed = parseFloat(cleanedValue);
  return isNaN(parsed) ? 0 : parsed;
};

export default function InterestRateForm({
  values,
  onChange,
}: InterestRateFormProps) {
  const [displayValues, setDisplayValues] = useState({
    loanAmount: formatNumberWithCommas(values.loanAmount),
    monthlyPayment: formatNumberWithCommas(values.monthlyPayment),
  });

  const handleCurrencyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { value } = e.target;
    const numericValue = parseNumberFromString(value);

    // Update display value with commas
    setDisplayValues((prev) => ({
      ...prev,
      [fieldName]: formatNumberWithCommas(numericValue),
    }));

    // Update actual value
    onChange(fieldName, numericValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, parseFloat(value) || 0);
  };

  const handleClear = () => {
    const defaultValues = {
      loanAmount: 32000,
      loanTermYears: 3,
      loanTermMonths: 0,
      monthlyPayment: 960,
    };

    setDisplayValues({
      loanAmount: formatNumberWithCommas(defaultValues.loanAmount),
      monthlyPayment: formatNumberWithCommas(defaultValues.monthlyPayment),
    });

    Object.entries(defaultValues).forEach(([key, value]) => {
      onChange(key, value);
    });
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
              value={displayValues.loanAmount}
              onChange={(e) => handleCurrencyChange(e, "loanAmount")}
              placeholder="32,000"
            />
          </div>
        </div>

        {/* Loan Term */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Term
          </label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="loanTermYears"
                  name="loanTermYears"
                  className="block w-full pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={values.loanTermYears}
                  onChange={handleChange}
                  min="0"
                  max="50"
                  step="1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">years</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="loanTermMonths"
                  name="loanTermMonths"
                  className="block w-full pr-16 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={values.loanTermMonths}
                  onChange={handleChange}
                  min="0"
                  max="11"
                  step="1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">months</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Payment */}
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
              value={displayValues.monthlyPayment}
              onChange={(e) => handleCurrencyChange(e, "monthlyPayment")}
              placeholder="960"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            onClick={() => {
              // Trigger recalculation by updating a value
              onChange("loanAmount", values.loanAmount);
            }}
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Helpful Information */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">How it works</h3>
        <p className="text-sm text-blue-700">
          Enter your loan amount, term, and monthly payment to calculate the
          interest rate. This is useful when you know the payment amount but
          need to find the actual interest rate.
        </p>
      </div>
    </div>
  );
}

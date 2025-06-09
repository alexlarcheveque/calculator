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
  // Handle empty string case to allow clearing inputs
  if (value.trim() === "") {
    return 0;
  }
  const cleanedValue = value.replace(/,/g, "");
  const parsed = parseFloat(cleanedValue);
  return isNaN(parsed) ? 0 : parsed;
};

export default function InterestRateForm({
  values,
  onChange,
}: InterestRateFormProps) {
  const [displayValues, setDisplayValues] = useState({
    loanAmount:
      values.loanAmount > 0 ? formatNumberWithCommas(values.loanAmount) : "",
    monthlyPayment:
      values.monthlyPayment > 0
        ? formatNumberWithCommas(values.monthlyPayment)
        : "",
    loanTermYears: values.loanTermYears.toString(),
    loanTermMonths: values.loanTermMonths.toString(),
  });

  const handleCurrencyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { value } = e.target;

    // Handle empty string case
    if (value.trim() === "") {
      setDisplayValues((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
      onChange(fieldName, 0);
      return;
    }

    const numericValue = parseNumberFromString(value);

    // Only format with commas if value is greater than 0
    const formattedValue =
      numericValue > 0 ? formatNumberWithCommas(numericValue) : "";

    // Update display value
    setDisplayValues((prev) => ({
      ...prev,
      [fieldName]: formattedValue,
    }));

    // Update actual value
    onChange(fieldName, numericValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle empty string case for number inputs
    if (value === "") {
      setDisplayValues((prev) => ({
        ...prev,
        [name]: "",
      }));
      onChange(name, 0);
      return;
    }

    const numericValue = parseFloat(value);
    const finalValue = isNaN(numericValue) ? 0 : numericValue;

    setDisplayValues((prev) => ({
      ...prev,
      [name]: finalValue.toString(),
    }));

    onChange(name, finalValue);
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
      loanTermYears: defaultValues.loanTermYears.toString(),
      loanTermMonths: defaultValues.loanTermMonths.toString(),
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
                  className="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={displayValues.loanTermYears}
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
                  className="block w-full pl-3 pr-16 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={displayValues.loanTermMonths}
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
      </div>
    </div>
  );
}

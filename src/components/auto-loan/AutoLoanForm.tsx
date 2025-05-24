import { AutoLoanFormValues } from "@/types/autoLoan";
import { ChangeEvent } from "react";

interface AutoLoanFormProps {
  values: AutoLoanFormValues;
  onChange: (name: string, value: string | number | boolean) => void;
}

// List of US States for the dropdown. Could be moved to a constants file.
const usStates = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District of Columbia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export default function AutoLoanForm({ values, onChange }: AutoLoanFormProps) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      onChange(name, (e.target as HTMLInputElement).checked);
    } else {
      onChange(name, parseFloat(value) || value); // Keep string for state if not a number
    }
  };

  const handleInputChange = (name: string, value: string | number) => {
    onChange(name, value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Auto Loan Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Auto Price */}
        <div className="form-group">
          <label
            htmlFor="autoPrice"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Auto Price
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="autoPrice"
              name="autoPrice"
              className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.autoPrice || ""}
              onChange={handleChange}
              min="0"
              step="100"
            />
          </div>
        </div>

        {/* Loan Term */}
        <div className="form-group">
          <label
            htmlFor="loanTermMonths"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Loan Term (months)
          </label>
          <input
            type="number"
            id="loanTermMonths"
            name="loanTermMonths"
            className="block w-full pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={values.loanTermMonths || ""}
            onChange={handleChange}
            min="1"
            step="1"
          />
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
              className="block w-full pl-3 pr-7 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.interestRate || ""}
              onChange={handleChange}
              min="0"
              max="30"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Cash Incentives */}
        <div className="form-group">
          <label
            htmlFor="cashIncentives"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Cash Incentives
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="cashIncentives"
              name="cashIncentives"
              className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.cashIncentives || ""}
              onChange={handleChange}
              min="0"
              step="100"
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
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="downPayment"
              name="downPayment"
              className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.downPayment || ""}
              onChange={handleChange}
              min="0"
              step="100"
            />
          </div>
        </div>

        {/* Trade-in Value */}
        <div className="form-group">
          <label
            htmlFor="tradeInValue"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Trade-in Value
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="tradeInValue"
              name="tradeInValue"
              className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.tradeInValue || ""}
              onChange={handleChange}
              min="0"
              step="100"
            />
          </div>
        </div>

        {/* Amount Owed on Trade-in */}
        <div className="form-group">
          <label
            htmlFor="amountOwedOnTradeIn"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Amount Owed on Trade-in
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="amountOwedOnTradeIn"
              name="amountOwedOnTradeIn"
              className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.amountOwedOnTradeIn || ""}
              onChange={handleChange}
              min="0"
              step="100"
            />
          </div>
        </div>

        {/* State */}
        <div className="form-group">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your State
          </label>
          <select
            id="state"
            name="state"
            value={values.state || ""}
            onChange={handleChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select State --</option>
            {usStates.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sales Tax Rate */}
        <div className="form-group">
          <label
            htmlFor="salesTaxRate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sales Tax Rate (%)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="salesTaxRate"
              name="salesTaxRate"
              className="block w-full pl-3 pr-7 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.salesTaxRate || ""}
              onChange={handleChange}
              min="0"
              max="20"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Title, Registration and Other Fees */}
        <div className="form-group">
          <label
            htmlFor="titleRegFees"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title, Registration & Other Fees
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="titleRegFees"
              name="titleRegFees"
              className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.titleRegFees || ""}
              onChange={handleChange}
              min="0"
              step="10"
            />
          </div>
        </div>

        {/* Include Taxes and Fees in Loan - Checkbox (spans two columns) */}
        <div className="form-group md:col-span-2">
          <div className="flex items-center mt-2">
            <input
              id="includeTaxesAndFeesInLoan"
              name="includeTaxesAndFeesInLoan"
              type="checkbox"
              checked={values.includeTaxesAndFeesInLoan || false}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="includeTaxesAndFeesInLoan"
              className="ml-2 block text-sm text-gray-900"
            >
              Include taxes and fees in loan
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  InterestCalculatorInput,
  CompoundFrequency,
  // ContributionTiming, // Removed
  ContributionPaymentFrequency,
} from "./InterestPage"; // Assuming types are exported from InterestPage.tsx

interface InterestFormProps {
  inputs: Partial<InterestCalculatorInput>;
  onInputChange: (field: keyof InterestCalculatorInput, value: any) => void;
}

// Helper to format number with commas for display
const formatNumberWithCommas = (value: number | string | undefined): string => {
  if (value === undefined || value === null || value === "") return "";
  const num = Number(String(value).replace(/[^\d.-]/g, ""));
  if (isNaN(num)) return "";
  return num.toLocaleString("en-US");
};

// Helper to parse formatted number string back to number
const parseFormattedNumber = (value: string): number | "" => {
  const cleaned = value.replace(/[^\d.,-]/g, ""); // Allow comma for parsing if user types it
  if (cleaned === "") return "";
  const num = parseFloat(cleaned.replace(/,/g, "")); // Remove commas entirely for parseFloat
  return isNaN(num) ? "" : num;
};

const compoundOptions: { value: CompoundFrequency; label: string }[] = [
  { value: "annually", label: "Annually (APY)" },
  { value: "monthly", label: "Monthly (APR)" },
  { value: "daily", label: "Daily" },
];

// const contributionTimingOptions: { // Removed
//   value: ContributionTiming;
//   label: string;
// }[] = [
//   { value: "beginning", label: "Beginning of Period" },
//   { value: "end", label: "End of Period" },
// ];

const contributionPaymentFrequencyOptions: {
  value: ContributionPaymentFrequency;
  label: string;
}[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annually", label: "Annually" },
];

export default function InterestForm({
  inputs,
  onInputChange,
}: InterestFormProps) {
  const handleGenericChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let processedValue: string | number | ContributionPaymentFrequency = value;

    console.log("inputs", inputs);

    if (name === "initialInvestment" || name === "regularContributionAmount") {
      processedValue = parseFormattedNumber(value);
    } else if (
      type === "number" ||
      name === "interestRate" ||
      name === "investmentLengthYears" ||
      name === "investmentLengthMonths"
    ) {
      processedValue = parseFloat(value);
      if (isNaN(processedValue)) processedValue = ""; // Keep as empty string if not a valid number
    }
    onInputChange(name as keyof InterestCalculatorInput, processedValue);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Investment Details
      </h2>

      <div className="space-y-4">
        {/* Initial Investment */}
        <div className="form-group">
          <label
            htmlFor="initialInvestment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Initial Investment
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="initialInvestment"
              name="initialInvestment"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formatNumberWithCommas(inputs.initialInvestment)}
              onChange={handleGenericChange}
              placeholder="e.g., 20,000"
            />
          </div>
        </div>

        {/* Regular Contribution Amount */}
        <div className="form-group">
          <label
            htmlFor="regularContributionAmount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Regular Contribution
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="regularContributionAmount"
              name="regularContributionAmount"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formatNumberWithCommas(inputs.regularContributionAmount)}
              onChange={handleGenericChange}
              placeholder="e.g., 500"
            />
          </div>
        </div>

        {/* Contribution Payment Frequency */}
        <div className="form-group">
          <label
            htmlFor="contributionPaymentFrequency"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Contribution Frequency
          </label>
          <select
            id="contributionPaymentFrequency"
            name="contributionPaymentFrequency"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={inputs.contributionPaymentFrequency ?? "monthly"}
            onChange={handleGenericChange}
          >
            {contributionPaymentFrequencyOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Investment Length */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Length
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="investmentLengthYears"
                className="block text-xs font-medium text-gray-500 mb-1"
              >
                Years
              </label>
              <input
                type="number"
                id="investmentLengthYears"
                name="investmentLengthYears"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={inputs.investmentLengthYears ?? ""}
                onChange={handleGenericChange}
                min="0"
                max="100"
                step="1"
                placeholder="e.g., 5"
              />
            </div>
            <div>
              <label
                htmlFor="investmentLengthMonths"
                className="block text-xs font-medium text-gray-500 mb-1"
              >
                Months
              </label>
              <input
                type="number"
                id="investmentLengthMonths"
                name="investmentLengthMonths"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={inputs.investmentLengthMonths ?? ""}
                onChange={handleGenericChange}
                min="0"
                max="11"
                step="1"
                placeholder="e.g., 0"
              />
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="form-group">
          <label
            htmlFor="interestRate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Estimated Rate of Return
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={inputs.interestRate ?? ""}
              onChange={handleGenericChange}
              min="0"
              step="0.01"
              placeholder="e.g., 5"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Compound Frequency */}
        <div className="form-group">
          <label
            htmlFor="compoundFrequency"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Compound Frequency
          </label>
          <select
            id="compoundFrequency"
            name="compoundFrequency"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={inputs.compoundFrequency ?? "annually"}
            onChange={handleGenericChange}
          >
            {compoundOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

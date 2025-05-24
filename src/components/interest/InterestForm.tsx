import {
  InterestCalculatorInput,
  CompoundFrequency,
  ContributionTiming,
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
  { value: "semiannually", label: "Semi-annually" },
  { value: "quarterly", label: "Quarterly" },
  { value: "monthly", label: "Monthly (APR)" },
  { value: "semimonthly", label: "Semi-monthly" },
  { value: "biweekly", label: "Biweekly" },
  { value: "weekly", label: "Weekly" },
  { value: "daily", label: "Daily" },
  { value: "continuously", label: "Continuously" },
];

const contributionTimingOptions: {
  value: ContributionTiming;
  label: string;
}[] = [
  { value: "beginning", label: "Beginning of Period" },
  { value: "end", label: "End of Period" },
];

export default function InterestForm({
  inputs,
  onInputChange,
}: InterestFormProps) {
  const handleGenericChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let processedValue: string | number = value;

    console.log("inputs", inputs);

    if (
      name === "initialInvestment" ||
      name === "annualContribution" ||
      name === "monthlyContribution"
    ) {
      processedValue = parseFormattedNumber(value);
    } else if (
      type === "number" ||
      name === "interestRate" ||
      name === "taxRate" ||
      name === "inflationRate" ||
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

        {/* Annual Contribution */}
        <div className="form-group">
          <label
            htmlFor="annualContribution"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Annual Contribution
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="annualContribution"
              name="annualContribution"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formatNumberWithCommas(inputs.annualContribution)}
              onChange={handleGenericChange}
              placeholder="e.g., 5,000"
            />
          </div>
        </div>

        {/* Monthly Contribution */}
        <div className="form-group">
          <label
            htmlFor="monthlyContribution"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Monthly Contribution
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="monthlyContribution"
              name="monthlyContribution"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formatNumberWithCommas(inputs.monthlyContribution)}
              onChange={handleGenericChange}
              placeholder="e.g., 0"
            />
          </div>
        </div>

        {/* Contribution Timing */}
        <div className="form-group">
          <label
            htmlFor="contributionTiming"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Contribute At The
          </label>
          <select
            id="contributionTiming"
            name="contributionTiming"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={inputs.contributionTiming ?? "beginning"}
            onChange={handleGenericChange}
          >
            {contributionTimingOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

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

        {/* Tax Rate */}
        <div className="form-group">
          <label
            htmlFor="taxRate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tax Rate (on interest)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="taxRate"
              name="taxRate"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={inputs.taxRate ?? ""}
              onChange={handleGenericChange}
              min="0"
              max="100"
              step="0.01"
              placeholder="e.g., 0 (if not taxable)"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Inflation Rate */}
        <div className="form-group">
          <label
            htmlFor="inflationRate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Inflation Rate (for buying power adjustment)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="inflationRate"
              name="inflationRate"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={inputs.inflationRate ?? ""}
              onChange={handleGenericChange}
              min="0"
              max="100"
              step="0.01"
              placeholder="e.g., 3"
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

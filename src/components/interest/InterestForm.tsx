import {
  InterestCalculatorInput,
  CompoundFrequency,
  ContributionTiming,
} from "./InterestPage"; // Assuming types are exported from InterestPage.tsx

interface InterestFormProps {
  inputs: Partial<InterestCalculatorInput>;
  onInputChange: (field: keyof InterestCalculatorInput, value: any) => void;
  onSubmit: () => void;
}

const commonInputClass =
  "block w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-primary focus:border-primary text-sm text-foreground placeholder-muted-foreground";
const commonLabelClass = "block text-sm font-medium text-foreground mb-1";

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
  const num = parseFloat(cleaned.replace(/,/g, ".")); // Replace comma with dot for parseFloat
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
  onSubmit,
}: InterestFormProps) {
  const handleGenericChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let processedValue: string | number = value;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-6 text-primary">
        Investment Details
      </h2>

      <div>
        <label htmlFor="initialInvestment" className={commonLabelClass}>
          Initial Investment
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground">$</span>
          </div>
          <input
            type="text"
            id="initialInvestment"
            name="initialInvestment"
            className={`${commonInputClass} pl-7`}
            value={formatNumberWithCommas(inputs.initialInvestment)}
            onChange={handleGenericChange}
            placeholder="e.g., 20,000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="annualContribution" className={commonLabelClass}>
          Annual Contribution
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground">$</span>
          </div>
          <input
            type="text"
            id="annualContribution"
            name="annualContribution"
            className={`${commonInputClass} pl-7`}
            value={formatNumberWithCommas(inputs.annualContribution)}
            onChange={handleGenericChange}
            placeholder="e.g., 5,000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="monthlyContribution" className={commonLabelClass}>
          Monthly Contribution
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground">$</span>
          </div>
          <input
            type="text"
            id="monthlyContribution"
            name="monthlyContribution"
            className={`${commonInputClass} pl-7`}
            value={formatNumberWithCommas(inputs.monthlyContribution)}
            onChange={handleGenericChange}
            placeholder="e.g., 0"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contributionTiming" className={commonLabelClass}>
          Contribute At The
        </label>
        <select
          id="contributionTiming"
          name="contributionTiming"
          className={commonInputClass}
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

      <div>
        <label htmlFor="interestRate" className={commonLabelClass}>
          Interest Rate
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            className={`${commonInputClass} pr-7`}
            value={inputs.interestRate ?? ""}
            onChange={handleGenericChange}
            min="0"
            step="0.01"
            placeholder="e.g., 5"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground">%</span>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="compoundFrequency" className={commonLabelClass}>
          Compound Frequency
        </label>
        <select
          id="compoundFrequency"
          name="compoundFrequency"
          className={commonInputClass}
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

      <div>
        <label className={commonLabelClass}>Investment Length</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="investmentLengthYears"
              className="text-xs text-muted-foreground"
            >
              Years
            </label>
            <input
              type="number"
              id="investmentLengthYears"
              name="investmentLengthYears"
              className={commonInputClass}
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
              className="text-xs text-muted-foreground"
            >
              Months
            </label>
            <input
              type="number"
              id="investmentLengthMonths"
              name="investmentLengthMonths"
              className={commonInputClass}
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

      <div>
        <label htmlFor="taxRate" className={commonLabelClass}>
          Tax Rate (on interest)
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="number"
            id="taxRate"
            name="taxRate"
            className={`${commonInputClass} pr-7`}
            value={inputs.taxRate ?? ""}
            onChange={handleGenericChange}
            min="0"
            max="100"
            step="0.01"
            placeholder="e.g., 0 (if not taxable)"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground">%</span>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="inflationRate" className={commonLabelClass}>
          Inflation Rate (for buying power adjustment)
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="number"
            id="inflationRate"
            name="inflationRate"
            className={`${commonInputClass} pr-7`}
            value={inputs.inflationRate ?? ""}
            onChange={handleGenericChange}
            min="0"
            max="100"
            step="0.01"
            placeholder="e.g., 3"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground">%</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
      >
        Calculate
      </button>
    </form>
  );
}

import {
  LoanInput,
  LoanType,
  AmortizedLoanInput,
  DeferredLoanInput,
  BondLoanInput,
  ExtendedCompoundFrequency,
  AmortizedPaybackFrequency,
} from "./LoanPage"; // Assuming types are exported from LoanPage.tsx

interface LoanFormProps {
  loanType: LoanType;
  inputs: Partial<LoanInput>; // Use Partial because not all fields apply to all loan types initially
  onInputChange: (field: keyof LoanInput, value: any) => void;
}

const commonInputClass =
  "block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500";
const commonLabelClass = "block text-sm font-medium text-gray-700 mb-1";

// Helper to format number with commas for display
const formatNumberWithCommas = (value: number | string | undefined): string => {
  if (value === undefined || value === null || value === "") return "";
  const num = Number(String(value).replace(/[^\d.-]/g, ""));
  if (isNaN(num)) return "";
  return num.toLocaleString("en-US");
};

// Helper to parse formatted number string back to number
const parseFormattedNumber = (value: string): number | "" => {
  const cleaned = value.replace(/[^\d.-]/g, "");
  if (cleaned === "") return "";
  const num = parseFloat(cleaned);
  return isNaN(num) ? "" : num;
};

// Define the full list of compound frequency options for reusability
const extendedCompoundOptions: {
  value: ExtendedCompoundFrequency;
  label: string;
}[] = [
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

// Define the payback frequency options for Amortized loans
const amortizedPaybackOptions: {
  value: AmortizedPaybackFrequency;
  label: string;
}[] = [
  { value: "daily", label: "Every Day" },
  { value: "weekly", label: "Every Week" },
  { value: "biweekly", label: "Every 2 Weeks" },
  { value: "halfmonth", label: "Every Half Month" },
  { value: "month", label: "Every Month" },
  { value: "quarter", label: "Every Quarter" },
  { value: "halfyear", label: "Every 6 Months" },
  { value: "year", label: "Every Year" },
];

export default function LoanForm({
  loanType,
  inputs,
  onInputChange,
}: LoanFormProps) {
  const handleGenericChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let processedValue: string | number = value;

    if (name === "loanAmount" || name === "predeterminedDueAmount") {
      processedValue = parseFormattedNumber(value);
    } else if (e.target.type === "number") {
      processedValue = parseFloat(value);
      if (isNaN(processedValue)) processedValue = "";
    }

    onInputChange(name as keyof LoanInput, processedValue);
  };

  const currentAmortizedInputs = inputs as Partial<AmortizedLoanInput>;
  const currentDeferredInputs = inputs as Partial<DeferredLoanInput>;
  const currentBondInputs = inputs as Partial<BondLoanInput>;

  // Determine default compound frequency based on loan type for the dropdown
  let defaultCompoundFreq: ExtendedCompoundFrequency = "monthly";
  if (loanType === "deferred" || loanType === "bond") {
    defaultCompoundFreq = "annually";
  }
  if (loanType === "amortized" && inputs.compoundFrequency) {
    defaultCompoundFreq = inputs.compoundFrequency as ExtendedCompoundFrequency;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        {loanType === "amortized" && "Amortized Loan Details"}
        {loanType === "deferred" && "Deferred Payment Loan Details"}
        {loanType === "bond" && "Bond Details"}
      </h2>

      <div className="space-y-4">
        {/* Loan Amount - Common for Amortized and Deferred */}
        {(loanType === "amortized" || loanType === "deferred") && (
          <div>
            <label htmlFor="loanAmount" className={commonLabelClass}>
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
                className={`${commonInputClass} pl-7`}
                value={formatNumberWithCommas(
                  currentAmortizedInputs.loanAmount ??
                    currentDeferredInputs.loanAmount
                )}
                onChange={handleGenericChange}
                placeholder="e.g., 100,000"
              />
            </div>
          </div>
        )}

        {/* Predetermined Due Amount - Specific to Bond */}
        {loanType === "bond" && (
          <div>
            <label
              htmlFor="predeterminedDueAmount"
              className={commonLabelClass}
            >
              Predetermined Due Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="predeterminedDueAmount"
                name="predeterminedDueAmount"
                className={`${commonInputClass} pl-7`}
                value={formatNumberWithCommas(
                  currentBondInputs.predeterminedDueAmount
                )}
                onChange={handleGenericChange}
                placeholder="e.g., 100,000"
              />
            </div>
          </div>
        )}

        {/* Loan Term - Common to all */}
        <div>
          <label className={commonLabelClass}>Loan Term</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="loanTermYears" className="text-xs text-gray-600">
                Years
              </label>
              <input
                type="number"
                id="loanTermYears"
                name="loanTermYears"
                className={commonInputClass}
                value={inputs.loanTermYears ?? ""}
                onChange={handleGenericChange}
                min="0"
                max="50"
                step="1"
                placeholder="e.g., 10"
              />
            </div>
            <div>
              <label htmlFor="loanTermMonths" className="text-xs text-gray-600">
                Months
              </label>
              <input
                type="number"
                id="loanTermMonths"
                name="loanTermMonths"
                className={commonInputClass}
                value={inputs.loanTermMonths ?? ""}
                onChange={handleGenericChange}
                min="0"
                max="11"
                step="1"
                placeholder="e.g., 0"
              />
            </div>
          </div>
        </div>

        {/* Interest Rate - Common to all */}
        <div>
          <label htmlFor="interestRate" className={commonLabelClass}>
            Interest Rate
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              className={`${commonInputClass} pr-6`}
              value={inputs.interestRate ?? ""}
              onChange={handleGenericChange}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Compound Frequency - Now common for all */}
        <div>
          <label htmlFor="compoundFrequency" className={commonLabelClass}>
            Compound
          </label>
          <select
            id="compoundFrequency"
            name="compoundFrequency"
            className={commonInputClass}
            value={inputs.compoundFrequency ?? defaultCompoundFreq}
            onChange={handleGenericChange}
          >
            {extendedCompoundOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Pay Back Frequency - Specific to Amortized */}
        {loanType === "amortized" && (
          <div>
            <label htmlFor="payBackFrequency" className={commonLabelClass}>
              Pay Back
            </label>
            <select
              id="payBackFrequency"
              name="payBackFrequency"
              className={commonInputClass}
              value={currentAmortizedInputs.payBackFrequency ?? "month"}
              onChange={handleGenericChange}
            >
              {amortizedPaybackOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

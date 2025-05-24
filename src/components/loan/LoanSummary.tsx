import {
  LoanType,
  LoanResult,
  AmortizedLoanResult,
  DeferredLoanResult,
  BondLoanResult,
  formatCurrency, // Import from LoanPage or a shared utils file
} from "./LoanPage";

interface LoanSummaryProps {
  loanType: LoanType;
  results: LoanResult;
}

const SummaryCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  isHighlighted?: boolean;
}> = ({ title, value, subtitle, isHighlighted }) => (
  <div
    className={`p-4 rounded-lg shadow ${
      isHighlighted
        ? "bg-blue-50 border border-blue-200"
        : "bg-gray-50 border border-gray-200"
    }`}
  >
    <div className="text-sm text-gray-600">{title}</div>
    <div
      className={`text-2xl font-bold ${
        isHighlighted ? "text-blue-700" : "text-gray-800"
      }`}
    >
      {value}
    </div>
    {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
  </div>
);

export default function LoanSummary({ loanType, results }: LoanSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Results
      </h2>

      {loanType === "amortized" && results && (
        <div className="space-y-4">
          {(results as AmortizedLoanResult).paymentPerPeriod !== undefined && (
            <SummaryCard
              title="Payment Every Period" // Assuming 'payBackFrequency' from input determines period
              value={formatCurrency(
                (results as AmortizedLoanResult).paymentPerPeriod
              )}
              subtitle={`Based on selected pay back frequency`}
              isHighlighted
            />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(results as AmortizedLoanResult).totalPaymentsValue !==
              undefined && (
              <SummaryCard
                title="Total of Payments"
                value={formatCurrency(
                  (results as AmortizedLoanResult).totalPaymentsValue
                )}
                subtitle={`${
                  (results as AmortizedLoanResult).numberOfPayments || "N/A"
                } payments`}
              />
            )}
            {(results as AmortizedLoanResult).totalInterest !== undefined && (
              <SummaryCard
                title="Total Interest"
                value={formatCurrency(
                  (results as AmortizedLoanResult).totalInterest
                )}
              />
            )}
          </div>
        </div>
      )}

      {loanType === "deferred" && results && (
        <div className="space-y-4">
          {(results as DeferredLoanResult).amountDueAtMaturity !==
            undefined && (
            <SummaryCard
              title="Amount Due at Loan Maturity"
              value={formatCurrency(
                (results as DeferredLoanResult).amountDueAtMaturity
              )}
              isHighlighted
            />
          )}
          {(results as DeferredLoanResult).totalInterest !== undefined && (
            <SummaryCard
              title="Total Interest"
              value={formatCurrency(
                (results as DeferredLoanResult).totalInterest
              )}
            />
          )}
        </div>
      )}

      {loanType === "bond" && results && (
        <div className="space-y-4">
          {(results as BondLoanResult).amountReceivedAtStart !== undefined && (
            <SummaryCard
              title="Amount Received When Loan Starts"
              value={formatCurrency(
                (results as BondLoanResult).amountReceivedAtStart
              )}
              isHighlighted
            />
          )}
          {(results as BondLoanResult).totalInterest !== undefined && (
            <SummaryCard
              title="Total Interest"
              value={formatCurrency((results as BondLoanResult).totalInterest)}
            />
          )}
        </div>
      )}
      {!results && (
        <p className="text-gray-500">
          No results to display. Please calculate first.
        </p>
      )}
    </div>
  );
}

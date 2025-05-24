import {
  InterestCalculatorResult,
  formatCurrency, // Assuming this will be in InterestPage.tsx or a shared utils file
} from "./InterestPage";

interface InterestSummaryProps {
  results: InterestCalculatorResult;
}

const SummaryItem: React.FC<{
  label: string;
  value: string | number;
  isHighlighted?: boolean;
  className?: string;
}> = ({ label, value, isHighlighted, className }) => (
  <div
    className={`flex justify-between items-center py-3 px-4 rounded-md ${
      isHighlighted
        ? "bg-primary/10 border border-primary/30"
        : "bg-muted/50 border border-border"
    } ${className}`}
  >
    <span
      className={`text-sm font-medium ${
        isHighlighted ? "text-primary" : "text-foreground"
      }`}
    >
      {label}
    </span>
    <span
      className={`text-lg font-semibold ${
        isHighlighted ? "text-primary" : "text-foreground"
      }`}
    >
      {value}
    </span>
  </div>
);

export default function InterestSummary({ results }: InterestSummaryProps) {
  if (!results) {
    return (
      <div className="p-6 rounded-lg shadow-lg bg-card text-center">
        <p className="text-muted-foreground">
          Enter your investment details and click "Calculate" to see the
          results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center text-primary mb-6">
        Calculation Results
      </h2>
      <SummaryItem
        label="Ending Balance"
        value={formatCurrency(results.endingBalance)}
        isHighlighted
        className="text-lg md:text-xl"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryItem
          label="Total Principal Invested"
          value={formatCurrency(results.totalPrincipal)}
        />
        <SummaryItem
          label="Total Contributions"
          value={formatCurrency(results.totalContributions)}
        />
      </div>
      <SummaryItem
        label="Total Interest Earned"
        value={formatCurrency(results.totalInterest)}
        isHighlighted
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <SummaryItem
          label="Interest from Initial Investment"
          value={formatCurrency(results.interestOfInitialInvestment)}
        />
        <SummaryItem
          label="Interest from Contributions"
          value={formatCurrency(results.interestOfContributions)}
        />
      </div>
      <SummaryItem
        label="Buying Power (After Inflation)"
        value={formatCurrency(results.buyingPowerAfterInflation)}
        className="mt-2 border-t border-border pt-4"
      />
    </div>
  );
}

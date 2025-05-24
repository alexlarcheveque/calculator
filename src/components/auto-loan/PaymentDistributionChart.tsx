import { AutoLoanResults } from "@/types/autoLoan";
import { formatPercentage, formatCurrency } from "@/utils/autoLoanCalculations";

interface AutoLoanPaymentDistributionChartProps {
  results: AutoLoanResults | null;
}

export default function AutoLoanPaymentDistributionChart({
  results,
}: AutoLoanPaymentDistributionChartProps) {
  if (!results || results.totalLoanAmount <= 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loan breakdown chart will appear here.</p>
      </div>
    );
  }

  const principalPercent = results.loanPrincipalPercentage;
  const interestPercent = results.loanInterestPercentage;

  // Define colors based on the example HTML (or your project's theme)
  const principalColor = "#2b7ddb"; // blue
  const interestColor = "#8bbc21"; // green

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div
        className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full shadow-md mb-4"
        style={{
          background: `conic-gradient(
            ${principalColor} 0% ${principalPercent}%,
            ${interestColor} ${principalPercent}% 100%
          )`,
        }}
      >
        {/* Optional: Center text or hole for doughnut chart */}
        {/* <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-semibold">{formatCurrency(results.totalLoanAmount)}</span></div> */}
      </div>
      <div className="flex flex-col sm:flex-row justify-center text-sm text-gray-700">
        <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
          <span
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: principalColor }}
          ></span>
          <div>
            <div>Principal ({formatPercentage(principalPercent)})</div>
            <div className="text-xs text-gray-500">
              {formatCurrency(
                results.totalLoanAmount * (principalPercent / 100)
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: interestColor }}
          ></span>
          <div>
            <div>Interest ({formatPercentage(interestPercent)})</div>
            <div className="text-xs text-gray-500">
              {formatCurrency(results.totalLoanInterest)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { AutoLoanResults } from "@/types/autoLoan";
import { formatCurrency } from "@/utils/autoLoanCalculations";
import PaymentDistributionChart, {
  ChartDataPoint,
} from "@/components/ui/PaymentDistributionChart";

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

  const chartData: ChartDataPoint[] = [
    {
      label: "Principal",
      value: results.totalLoanAmount * (principalPercent / 100),
      color: "#2b7ddb", // blue
    },
    {
      label: "Interest",
      value: results.totalLoanInterest,
      color: "#8bbc21", // green
    },
  ];

  return (
    <PaymentDistributionChart
      data={chartData}
      formatCurrency={formatCurrency}
      totalForPercentage={results.totalLoanAmount}
    />
  );
}

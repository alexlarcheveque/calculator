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

  const chartData: ChartDataPoint[] = [
    {
      label: "Principal",
      value: results.totalLoanAmount,
      color: "#0ea5e9", // primary-500 blue
    },
    {
      label: "Total Interest",
      value: results.totalLoanInterest,
      color: "#f59e0b", // amber-500 orange
    },
  ];

  const totalCost = results.totalLoanAmount + results.totalLoanInterest;

  return (
    <PaymentDistributionChart
      data={chartData}
      centerText={{
        label: "Total Cost",
        value: totalCost,
        formatter: formatCurrency,
      }}
      formatCurrency={formatCurrency}
      totalForPercentage={totalCost}
    />
  );
}

"use client";

import { InterestRateResults } from "@/types/interestRate";
import { formatCurrency } from "@/utils/interestRateCalculations";
import PaymentDistributionChart, {
  ChartDataPoint,
} from "@/components/ui/PaymentDistributionChart";

interface PaymentDistributionChartProps {
  results: InterestRateResults;
}

export default function InterestRatePaymentDistributionChart({
  results,
}: PaymentDistributionChartProps) {
  const principalAmount = results.loanAmount;
  const interestAmount = results.totalInterestPaid;
  const totalAmount = principalAmount + interestAmount;

  const chartData: ChartDataPoint[] = [
    {
      label: "Principal",
      value: principalAmount,
      color: "#2b7ddb",
    },
    {
      label: "Interest",
      value: interestAmount,
      color: "#8bbc21",
    },
  ];

  return (
    <PaymentDistributionChart
      data={chartData}
      formatCurrency={formatCurrency}
      totalForPercentage={totalAmount}
    />
  );
}

"use client";

import { PaymentResults } from "@/types/payment";
import { formatCurrency } from "@/utils/formatters";
import PaymentDistributionChart, {
  ChartDataPoint,
} from "@/components/ui/PaymentDistributionChart";

interface PaymentDistributionChartProps {
  results: PaymentResults;
}

export default function PaymentPaymentDistributionChart({
  results,
}: PaymentDistributionChartProps) {
  const chartData: ChartDataPoint[] = [
    {
      label: "Principal",
      value: results.loanAmount,
      color: "#3b82f6", // blue-500
    },
    {
      label: "Interest",
      value: results.totalInterest,
      color: "#10b981", // emerald-500
    },
  ];

  return (
    <PaymentDistributionChart
      data={chartData}
      centerText={{
        label: "Total Payments",
        value: results.totalPayments,
      }}
      formatCurrency={formatCurrency}
      totalForPercentage={results.totalPayments}
    />
  );
}

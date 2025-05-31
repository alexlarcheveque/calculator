"use client";

import { MortgageResults } from "@/types/mortgage";
import { formatCurrencyDetailed } from "@/utils/mortgageCalculations";
import PaymentDistributionChart, {
  ChartDataPoint,
} from "@/components/ui/PaymentDistributionChart";

interface PaymentDistributionChartProps {
  results: MortgageResults;
}

export default function MortgagePaymentDistributionChart({
  results,
}: PaymentDistributionChartProps) {
  const chartData: ChartDataPoint[] = [
    {
      label: "Principal & Interest",
      value: results.monthlyPrincipalAndInterest,
      color: "#0ea5e9", // primary-500
    },
    {
      label: "Property Tax",
      value: results.monthlyPropertyTax,
      color: "#f59e0b", // amber-500
    },
    {
      label: "Home Insurance",
      value: results.monthlyHomeInsurance,
      color: "#10b981", // emerald-500
    },
    {
      label: "HOA",
      value: results.monthlyHOA,
      color: "#8b5cf6", // violet-500
    },
  ];

  return (
    <PaymentDistributionChart
      data={chartData}
      centerText={{
        label: "Monthly Payment",
        value: results.totalMonthlyPayment,
        formatter: formatCurrencyDetailed,
      }}
      formatCurrency={formatCurrencyDetailed}
      totalForPercentage={results.totalMonthlyPayment}
    />
  );
}

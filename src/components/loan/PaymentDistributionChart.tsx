"use client";

import {
  LoanResult,
  LoanType,
  AmortizedLoanResult,
  DeferredLoanResult,
  BondLoanResult,
  formatCurrency,
} from "./LoanPage";
import PaymentDistributionChart, {
  ChartDataPoint,
} from "@/components/ui/PaymentDistributionChart";

interface PaymentDistributionChartProps {
  loanType: LoanType;
  results: LoanResult;
}

export default function LoanPaymentDistributionChart({
  loanType,
  results,
}: PaymentDistributionChartProps) {
  let chartData: ChartDataPoint[] = [];
  let totalValueForPercentage: number = 0;
  let centerTextValue: number | undefined;
  let centerTextLabel: string = "";

  if (loanType === "amortized" && results) {
    const amortizedResults = results as AmortizedLoanResult;
    chartData = [
      {
        label: "Principal",
        value: amortizedResults.principal,
        color: "#3b82f6", // blue-500
      },
      {
        label: "Interest",
        value: amortizedResults.totalInterest,
        color: "#ef4444", // red-500
      },
    ];
    totalValueForPercentage =
      amortizedResults.principal + amortizedResults.totalInterest; // This is total cost of loan
    centerTextValue = amortizedResults.paymentPerPeriod;
    centerTextLabel = "Payment / Period";
  } else if (loanType === "deferred" && results) {
    const deferredResults = results as DeferredLoanResult;
    chartData = [
      {
        label: "Principal",
        value: deferredResults.principal,
        color: "#3b82f6", // blue-500
      },
      {
        label: "Interest",
        value: deferredResults.totalInterest,
        color: "#ef4444", // red-500
      },
    ];
    totalValueForPercentage = deferredResults.amountDueAtMaturity;
    centerTextValue = deferredResults.amountDueAtMaturity;
    centerTextLabel = "Amount Due";
  } else if (loanType === "bond" && results) {
    const bondResults = results as BondLoanResult;
    // For bond, the interest is the difference between face value and amount received.
    // The "parts" are the amount received (principal-like) and the total interest.
    chartData = [
      {
        label: "Amount Received",
        value: bondResults.amountReceivedAtStart,
        color: "#3b82f6", // blue-500
      },
      {
        label: "Total Interest",
        value: bondResults.totalInterest,
        color: "#ef4444", // red-500
      },
    ];
    totalValueForPercentage = bondResults.faceValue; // Total repaid is the face value
    centerTextValue = bondResults.faceValue;
    centerTextLabel = "Face Value";
  }

  return (
    <PaymentDistributionChart
      data={chartData}
      centerText={
        centerTextValue
          ? {
              label: centerTextLabel,
              value: centerTextValue,
            }
          : undefined
      }
      formatCurrency={formatCurrency}
      totalForPercentage={totalValueForPercentage}
      emptyStateMessage="Chart data not available."
    />
  );
}

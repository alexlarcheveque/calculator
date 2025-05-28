"use client";

import { formatCurrency } from "./LoanPage";
import AmortizationTable, {
  AmortizationDataPoint,
} from "@/components/ui/AmortizationTable";

// This type should align with the AmortizationData used in LoanPage.tsx calculation
export interface AmortizationData {
  paymentNumber: number;
  paymentAmount: number;
  principalPaid: number;
  interestPaid: number;
  totalInterest: number; // Cumulative interest
  remainingBalance: number;
}

interface AmortizationTableProps {
  data: AmortizationData[];
}

export default function LoanAmortizationTable({
  data,
}: AmortizationTableProps) {
  // Transform loan data to match the shared component interface
  const transformedData: AmortizationDataPoint[] = data.map((item) => ({
    paymentNumber: item.paymentNumber,
    paymentAmount: item.paymentAmount,
    principalPaid: item.principalPaid,
    interestPaid: item.interestPaid,
    totalInterest: item.totalInterest,
    remainingBalance: item.remainingBalance,
  }));

  return (
    <AmortizationTable
      data={transformedData}
      formatCurrency={formatCurrency}
      title="Amortization Schedule"
      showAnnualToggle={true}
      emptyStateMessage="Amortization data is not available."
    />
  );
}

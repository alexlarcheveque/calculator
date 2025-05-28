"use client";

import { AmortizationDataPoint as MortgageAmortizationDataPoint } from "@/types/mortgage";
import { formatCurrency } from "@/utils/formatters";
import AmortizationTable, {
  AmortizationDataPoint,
} from "@/components/ui/AmortizationTable";

interface AmortizationTableProps {
  data: MortgageAmortizationDataPoint[];
}

export default function MortgageAmortizationTable({
  data,
}: AmortizationTableProps) {
  // Transform mortgage data to match the shared component interface
  const transformedData: AmortizationDataPoint[] = data.map((item) => ({
    paymentNumber: item.paymentNumber,
    payment: item.payment,
    principalPayment: item.principalPayment,
    interestPayment: item.interestPayment,
    remainingBalance: item.remainingBalance,
    totalPrincipalPaid: item.totalPrincipalPaid,
    totalInterestPaid: item.totalInterestPaid,
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

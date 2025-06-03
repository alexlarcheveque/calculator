"use client";

import { PaymentAmortizationDataPoint } from "@/types/payment";
import { formatCurrency } from "@/utils/paymentCalculations";
import AmortizationTable, {
  AmortizationDataPoint,
} from "@/components/ui/AmortizationTable";

interface AmortizationTableProps {
  data: PaymentAmortizationDataPoint[];
}

export default function PaymentAmortizationTable({
  data,
}: AmortizationTableProps) {
  // Transform payment data to match the shared component interface
  const transformedData: AmortizationDataPoint[] = data.map((item) => ({
    paymentNumber: item.paymentNumber,
    payment: item.payment,
    principalPayment: item.principalPayment,
    interestPayment: item.interestPayment,
    remainingBalance: item.remainingBalance,
    totalPrincipalPaid: item.totalPrincipalPaid,
    totalInterestPaid: item.totalInterestPaid,
    year: item.year,
    month: item.month,
    isYearEnd: item.isYearEnd,
  }));

  return (
    <AmortizationTable
      data={transformedData}
      formatCurrency={formatCurrency}
      title="Amortization Schedule"
      showAnnualToggle={true}
      emptyStateMessage="Amortization data is not available."
      paymentsPerYear={12}
    />
  );
}

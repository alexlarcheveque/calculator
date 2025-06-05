"use client";

import { AmortizationScheduleItem } from "@/types/amortization";
import AmortizationTable from "@/components/ui/AmortizationTable";
import { formatCurrencyDetailed } from "@/utils/amortizationCalculations";

interface AmortizationTableWrapperProps {
  data: AmortizationScheduleItem[];
}

export default function AmortizationTableWrapper({
  data,
}: AmortizationTableWrapperProps) {
  // Map the amortization data to the generic table format
  const mappedData = data.map((item) => ({
    paymentNumber: item.paymentNumber,
    payment: item.payment,
    principal: item.principalPayment,
    interest: item.interestPayment,
    remainingBalance: item.remainingBalance,
    totalInterestPaid: item.totalInterestPaid,
    totalPrincipalPaid: item.totalPrincipalPaid,
    extraPayment: item.extraPayment,
    totalPayment: item.totalPayment,
    date: item.date,
  }));

  return (
    <AmortizationTable
      data={mappedData}
      formatCurrency={formatCurrencyDetailed}
      title="Amortization Schedule"
      showAnnualToggle={true}
      emptyStateMessage="Enter loan details to generate an amortization schedule."
      paymentsPerYear={12}
    />
  );
}

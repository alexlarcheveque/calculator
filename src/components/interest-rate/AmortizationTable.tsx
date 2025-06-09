"use client";

import { AmortizationDataPoint as InterestRateAmortizationDataPoint } from "@/types/interestRate";
import { formatCurrency } from "@/utils/interestRateCalculations";
import AmortizationTable, {
  AmortizationDataPoint,
} from "@/components/ui/AmortizationTable";

interface AmortizationTableProps {
  data: InterestRateAmortizationDataPoint[];
}

export default function InterestRateAmortizationTable({
  data,
}: AmortizationTableProps) {
  // Transform interest rate data to match the shared component interface
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
      paymentsPerYear={12}
    />
  );
}

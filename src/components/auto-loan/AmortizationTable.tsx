import {
  AutoLoanMonthlyAmortizationDataPoint,
  AutoLoanYearlyAmortizationDataPoint,
} from "@/types/autoLoan";
import { formatCurrency } from "@/utils/autoLoanCalculations";
import AmortizationTable, {
  AmortizationDataPoint,
} from "@/components/ui/AmortizationTable";

interface AmortizationTableProps {
  monthlyData: AutoLoanMonthlyAmortizationDataPoint[];
  yearlyData: AutoLoanYearlyAmortizationDataPoint[];
  loanTermMonths: number;
}

export default function AutoLoanAmortizationTable({
  monthlyData,
  yearlyData,
  loanTermMonths,
}: AmortizationTableProps) {
  // Transform monthly data to match the shared component interface
  const transformedMonthlyData: AmortizationDataPoint[] = monthlyData.map(
    (item) => ({
      paymentNumber: item.month,
      month: item.month,
      principal: item.principal,
      interest: item.interest,
      endingBalance: item.endingBalance,
    })
  );

  // Transform yearly data and mark as year-end
  const transformedYearlyData: AmortizationDataPoint[] = yearlyData.map(
    (item) => ({
      year: item.year,
      paymentNumber: item.year * 12, // Approximate payment number for year
      principal: item.principal,
      interest: item.interest,
      endingBalance: item.endingBalance,
      isYearEnd: true,
    })
  );

  // Combine the data, with yearly data taking precedence for annual view
  const combinedData = [...transformedMonthlyData, ...transformedYearlyData];

  return (
    <AmortizationTable
      data={combinedData}
      formatCurrency={formatCurrency}
      title="Amortization Schedule"
      showAnnualToggle={true}
      emptyStateMessage="Amortization schedule will appear here once calculations are complete."
    />
  );
}

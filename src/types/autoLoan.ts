// Version 1.0
export interface AutoLoanFormValues {
  autoPrice: number;
  loanTermMonths: number;
  interestRate: number;
  cashIncentives: number;
  downPayment: number;
  tradeInValue: number;
  amountOwedOnTradeIn: number;
  state: string; // Could be an enum of US states later
  salesTaxRate: number;
  titleRegFees: number;
  includeTaxesAndFeesInLoan: boolean;
}

export interface AutoLoanMonthlyAmortizationDataPoint {
  month: number;
  interest: number;
  principal: number;
  endingBalance: number;
}

export interface AutoLoanYearlyAmortizationDataPoint {
  year: number;
  interest: number;
  principal: number;
  endingBalance: number;
}

export interface AutoLoanResults {
  monthlyPayment: number;
  totalLoanAmount: number;
  salesTaxAmount: number;
  upfrontPayment: number;
  totalLoanPayments: number;
  totalLoanInterest: number;
  totalCost: number; // price, interest, tax, fees
  loanPrincipalPercentage: number;
  loanInterestPercentage: number;
  monthlyAmortization: AutoLoanMonthlyAmortizationDataPoint[];
  yearlyAmortization: AutoLoanYearlyAmortizationDataPoint[];
  // payoffDate: Date; // Similar to mortgage, might be useful
}

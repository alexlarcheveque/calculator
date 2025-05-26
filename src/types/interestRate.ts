export interface InterestRateFormValues {
  loanAmount: number;
  loanTermYears: number;
  loanTermMonths: number;
  monthlyPayment: number;
}

export interface InterestRateResults {
  interestRate: number;
  totalPayments: number;
  totalInterestPaid: number;
  totalOfPayments: number;
  loanAmount: number;
  monthlyPayment: number;
  loanTermYears: number;
  loanTermMonths: number;
}

export interface AmortizationDataPoint {
  paymentNumber: number;
  payment: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
  totalPrincipalPaid: number;
  totalInterestPaid: number;
}

export interface InterestRateCalculationParams {
  loanAmount: number;
  loanTermYears: number;
  loanTermMonths: number;
  monthlyPayment: number;
}

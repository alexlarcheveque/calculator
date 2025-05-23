export enum CalculatorType {
  FIXED_30 = "30 Year Fixed",
  FIXED_20 = "20 Year Fixed",
  FIXED_15 = "15 Year Fixed",
  FIXED_10 = "10 Year Fixed",
}

export interface MortgageFormValues {
  calculatorType: CalculatorType;
  homeValue: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  propertyTax: number;
  homeInsurance: number;
  hoa: number;
}

export interface MortgageResults {
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  downPaymentPercentage: number;
  totalInterestPaid: number;
  totalPaymentAmount: number;
  payoffDate: Date;
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

export interface MortgageCalculationParams {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  propertyTax?: number;
  homeInsurance?: number;
  hoa?: number;
}

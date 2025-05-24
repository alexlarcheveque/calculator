export enum PaymentCalculatorMode {
  FIXED_TERM = "Fixed Term",
  FIXED_PAYMENT = "Fixed Payment",
}

export interface PaymentFormValues {
  calculatorMode: PaymentCalculatorMode;
  loanAmount: number;
  loanTermYears: number;
  monthlyPayment: number;
  interestRate: number;
}

export interface PaymentResults {
  loanAmount: number;
  monthlyPayment?: number; // For fixed term mode
  totalPayments: number;
  totalInterest: number;
  payoffTimeYears?: number; // For fixed payment mode
  payoffTimeMonths?: number; // For fixed payment mode
  principalPercentage: number;
  interestPercentage: number;
}

export interface PaymentAmortizationDataPoint {
  paymentNumber: number;
  payment: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
  totalPrincipalPaid: number;
  totalInterestPaid: number;
  year?: number;
  month?: number;
  isYearEnd?: boolean;
}

export interface PaymentCalculationParams {
  loanAmount: number;
  interestRate: number;
  loanTermYears?: number; // For fixed term mode
  monthlyPayment?: number; // For fixed payment mode
  calculatorMode: PaymentCalculatorMode;
}

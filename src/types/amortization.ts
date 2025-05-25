export interface AmortizationFormValues {
  loanAmount: number;
  loanTermYears: number;
  loanTermMonths: number;
  interestRate: number;
  startDate: Date;
  extraPayments: {
    monthlyExtra: number;
    monthlyExtraStartDate: Date;
    yearlyExtra: number;
    yearlyExtraStartDate: Date;
    oneTimePayments: OneTimePayment[];
  };
}

export interface OneTimePayment {
  amount: number;
  date: Date;
}

export interface AmortizationResults {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalAmount: number;
  payoffDate: Date;
  principalPercentage: number;
  interestPercentage: number;
}

export interface AmortizationScheduleItem {
  paymentNumber: number;
  date: Date;
  payment: number;
  principalPayment: number;
  interestPayment: number;
  extraPayment: number;
  totalPayment: number;
  remainingBalance: number;
  totalPrincipalPaid: number;
  totalInterestPaid: number;
}

export interface AmortizationCalculationParams {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  loanTermMonths: number;
  startDate: Date;
  extraPayments?: {
    monthlyExtra: number;
    monthlyExtraStartDate: Date;
    yearlyExtra: number;
    yearlyExtraStartDate: Date;
    oneTimePayments: OneTimePayment[];
  };
}

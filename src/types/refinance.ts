export enum CurrentLoanInputMode {
  REMAINING_BALANCE = "REMAINING_BALANCE",
  ORIGINAL_LOAN = "ORIGINAL_LOAN",
}

export interface RefinanceFormValues {
  // Current loan data
  currentLoanInputMode: CurrentLoanInputMode;

  // For remaining balance mode
  remainingBalance: number;
  currentMonthlyPayment: number;

  // For original loan mode
  originalLoanAmount: number;
  originalLoanTerm: number;
  timeRemainingYears: number;
  timeRemainingMonths: number;

  // Common current loan fields
  currentInterestRate: number;

  // New loan data
  newLoanTerm: number;
  newInterestRate: number;
  points: number;
  costsAndFees: number;
  cashOutAmount: number;
}

export interface RefinanceResults {
  // Current loan details
  currentLoanRemainingBalance: number;
  currentMonthlyPayment: number;
  currentRemainingPayments: number;
  currentTotalRemainingInterest: number;
  currentTotalRemainingPayments: number;

  // New loan details
  newLoanAmount: number;
  newMonthlyPayment: number;
  newTotalPayments: number;
  newTotalInterest: number;
  newLoanAPR: number;

  // Costs
  pointsCost: number;
  totalClosingCosts: number;
  netCashOut: number;

  // Comparison
  monthlyPaymentDifference: number;
  totalInterestSavings: number;
  totalCostSavings: number;
  breakEvenMonths: number;

  // Time analysis
  timeToPayOffCurrent: {
    years: number;
    months: number;
  };
  timeToPayOffNew: {
    years: number;
    months: number;
  };
  timeSavings: {
    years: number;
    months: number;
  };
}

export interface RefinanceCalculationParams {
  currentLoanRemainingBalance: number;
  currentInterestRate: number;
  currentRemainingPayments: number;
  currentMonthlyPayment: number;

  newLoanTerm: number;
  newInterestRate: number;
  points: number;
  costsAndFees: number;
  cashOutAmount: number;
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

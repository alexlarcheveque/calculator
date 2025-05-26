export enum CalculationType {
  FV = "FV", // Future Value
  PV = "PV", // Present Value
  PMT = "PMT", // Periodic Payment
  N = "N", // Number of periods
  IY = "I/Y", // Interest per year
}

export enum PaymentTiming {
  END = "end",
  BEGINNING = "beginning",
}

export interface FinanceFormValues {
  calculationType: CalculationType;
  numberOfPeriods: number;
  interestPerYear: number;
  presentValue: number;
  periodicPayment: number;
  futureValue: number;
  periodsPerYear: number;
  compoundingPerYear: number;
  paymentTiming: PaymentTiming;
}

export interface FinanceResults {
  calculatedValue: number;
  sumOfPayments: number;
  totalInterest: number;
  presentValue: number;
  futureValue: number;
  periodicPayment: number;
  numberOfPeriods: number;
  interestPerYear: number;
}

export interface FinanceScheduleDataPoint {
  period: number;
  presentValue: number;
  payment: number;
  interest: number;
  futureValue: number;
  accumulatedInterest: number;
  sumOfPayments: number;
}

export interface FinanceCalculationParams {
  numberOfPeriods?: number;
  interestPerYear?: number;
  presentValue?: number;
  periodicPayment?: number;
  futureValue?: number;
  periodsPerYear: number;
  compoundingPerYear: number;
  paymentTiming: PaymentTiming;
  calculationType: CalculationType;
}

import {
  InterestRateCalculationParams,
  InterestRateResults,
  AmortizationDataPoint,
} from "@/types/interestRate";

export function calculateInterestRate({
  loanAmount,
  loanTermYears,
  loanTermMonths,
  monthlyPayment,
}: InterestRateCalculationParams): InterestRateResults {
  // Calculate total number of payments
  const totalPayments = loanTermYears * 12 + loanTermMonths;

  // Calculate total of all payments
  const totalOfPayments = monthlyPayment * totalPayments;

  // Calculate total interest paid
  const totalInterestPaid = totalOfPayments - loanAmount;

  // Use Newton-Raphson method to find the interest rate
  let interestRate = 0.05; // Start with 5% as initial guess
  const tolerance = 0.000001;
  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    const monthlyRate = interestRate / 12;

    // Calculate the present value of payments using current interest rate
    let presentValue = 0;
    if (monthlyRate === 0) {
      presentValue = monthlyPayment * totalPayments;
    } else {
      presentValue =
        (monthlyPayment * (1 - Math.pow(1 + monthlyRate, -totalPayments))) /
        monthlyRate;
    }

    // Calculate the derivative for Newton-Raphson
    let derivative = 0;
    if (monthlyRate === 0) {
      derivative = (monthlyPayment * totalPayments * totalPayments) / 2;
    } else {
      const factor1 =
        (1 - Math.pow(1 + monthlyRate, -totalPayments)) / monthlyRate;
      const factor2 =
        (totalPayments * Math.pow(1 + monthlyRate, -totalPayments - 1)) /
        monthlyRate;
      const factor3 =
        (1 - Math.pow(1 + monthlyRate, -totalPayments)) /
        (monthlyRate * monthlyRate);
      derivative = (monthlyPayment * (factor2 + factor3)) / 12;
    }

    // Newton-Raphson update
    const newInterestRate =
      interestRate - (presentValue - loanAmount) / derivative;

    // Check for convergence
    if (Math.abs(newInterestRate - interestRate) < tolerance) {
      interestRate = newInterestRate;
      break;
    }

    interestRate = newInterestRate;

    // Ensure interest rate stays positive
    if (interestRate < 0) {
      interestRate = 0.001;
    }
  }

  // Convert to percentage
  const interestRatePercentage = interestRate * 100;

  return {
    interestRate: interestRatePercentage,
    totalPayments,
    totalInterestPaid,
    totalOfPayments,
    loanAmount,
    monthlyPayment,
    loanTermYears,
    loanTermMonths,
  };
}

export function calculateAmortizationSchedule({
  loanAmount,
  loanTermYears,
  loanTermMonths,
  monthlyPayment,
}: InterestRateCalculationParams): AmortizationDataPoint[] {
  // First calculate the interest rate
  const results = calculateInterestRate({
    loanAmount,
    loanTermYears,
    loanTermMonths,
    monthlyPayment,
  });

  const monthlyInterestRate = results.interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12 + loanTermMonths;

  const schedule: AmortizationDataPoint[] = [];
  let remainingBalance = loanAmount;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;

  // Calculate the amortization schedule for each month
  for (let paymentNumber = 1; paymentNumber <= totalPayments; paymentNumber++) {
    // Calculate interest for this payment
    const interestPayment = remainingBalance * monthlyInterestRate;

    // Calculate principal for this payment
    const principalPayment = monthlyPayment - interestPayment;

    // Update running totals
    totalInterestPaid += interestPayment;
    totalPrincipalPaid += principalPayment;

    // Update remaining balance
    remainingBalance -= principalPayment;

    // Ensure we don't go below zero due to rounding
    if (remainingBalance < 0) remainingBalance = 0;

    // Add data point for this month
    schedule.push({
      paymentNumber,
      payment: monthlyPayment,
      principalPayment,
      interestPayment,
      remainingBalance,
      totalPrincipalPaid,
      totalInterestPaid,
    });
  }

  return schedule;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatCurrencyDetailed(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercentage(value: number, decimals: number = 3): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

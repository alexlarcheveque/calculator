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

  // If the monthly payment exactly equals the loan amount divided by total payments,
  // then it's a 0% interest rate (no interest)
  const minimumPayment = loanAmount / totalPayments;
  if (Math.abs(monthlyPayment - minimumPayment) < 0.01) {
    return {
      interestRate: 0,
      totalPayments,
      totalInterestPaid: 0,
      totalOfPayments: loanAmount,
      loanAmount,
      monthlyPayment: minimumPayment,
      loanTermYears,
      loanTermMonths,
    };
  }

  // Use binary search to find the interest rate
  let lowRate = 0.0;
  let highRate = 1.0; // 100% annual rate
  let interestRate = 0.05; // Start with 5%
  const tolerance = 0.000001;
  const maxIterations = 100;

  // Function to calculate what the monthly payment would be at a given interest rate
  function calculatePaymentAtRate(annualRate: number): number {
    if (annualRate === 0) {
      return loanAmount / totalPayments;
    }

    const monthlyRate = annualRate / 12;
    const factor = Math.pow(1 + monthlyRate, totalPayments);
    return (loanAmount * monthlyRate * factor) / (factor - 1);
  }

  // Binary search for the correct interest rate
  for (let i = 0; i < maxIterations; i++) {
    const calculatedPayment = calculatePaymentAtRate(interestRate);
    const difference = calculatedPayment - monthlyPayment;

    // Check for convergence
    if (Math.abs(difference) < tolerance) {
      break;
    }

    // Adjust search range based on whether calculated payment is too high or low
    if (calculatedPayment > monthlyPayment) {
      highRate = interestRate;
    } else {
      lowRate = interestRate;
    }

    // New midpoint
    interestRate = (lowRate + highRate) / 2;
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

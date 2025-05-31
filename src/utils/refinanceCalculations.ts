import {
  RefinanceCalculationParams,
  RefinanceResults,
  AmortizationDataPoint,
} from "@/types/refinance";

// Calculate APR including points and fees
export function calculateAPR(
  loanAmount: number,
  monthlyPayment: number,
  loanTermYears: number,
  pointsCost: number,
  fees: number
): number {
  const totalUpfrontCosts = pointsCost + fees;
  const adjustedLoanAmount = loanAmount - totalUpfrontCosts;
  const totalPayments = loanTermYears * 12;

  if (adjustedLoanAmount <= 0 || monthlyPayment <= 0 || totalPayments <= 0) {
    return 0;
  }

  // Use Newton-Raphson method to solve for APR
  let apr = 0.05; // Initial guess of 5%
  const tolerance = 0.000001;
  let iteration = 0;
  const maxIterations = 100;

  while (iteration < maxIterations) {
    const monthlyAPR = apr / 12;
    const presentValue =
      monthlyPayment *
      ((1 - Math.pow(1 + monthlyAPR, -totalPayments)) / monthlyAPR);

    const difference = presentValue - adjustedLoanAmount;

    if (Math.abs(difference) < tolerance) {
      break;
    }

    // Calculate derivative for Newton-Raphson
    const derivative =
      monthlyPayment *
      ((-totalPayments * Math.pow(1 + monthlyAPR, -totalPayments - 1)) /
        monthlyAPR -
        (1 - Math.pow(1 + monthlyAPR, -totalPayments)) /
          (monthlyAPR * monthlyAPR));

    apr = apr - difference / (derivative / 12);
    iteration++;
  }

  return Math.max(0, apr * 100); // Convert to percentage
}

export function calculateRefinance(
  params: RefinanceCalculationParams
): RefinanceResults {
  const {
    currentLoanRemainingBalance,
    currentInterestRate,
    currentRemainingPayments,
    currentMonthlyPayment,
    newLoanTerm,
    newInterestRate,
    points,
    costsAndFees,
    cashOutAmount,
  } = params;

  // Calculate current loan remaining costs
  const currentTotalRemainingPayments =
    currentMonthlyPayment * currentRemainingPayments;
  const currentTotalRemainingInterest =
    currentTotalRemainingPayments - currentLoanRemainingBalance;

  // Calculate new loan amount (remaining balance + cash out)
  // Points are calculated on the base loan amount, but closing costs are paid separately
  const baseLoanAmount = currentLoanRemainingBalance + cashOutAmount;
  const pointsCost = (points / 100) * baseLoanAmount;
  const totalClosingCosts = pointsCost + costsAndFees;
  const newLoanAmount = baseLoanAmount; // Closing costs paid separately, not rolled into loan
  const netCashOut = cashOutAmount - totalClosingCosts;

  // Calculate new loan monthly payment
  // Payment is calculated on the loan amount (base amount, since closing costs are paid separately)
  const newMonthlyInterestRate = newInterestRate / 100 / 12;
  const newTotalPayments = newLoanTerm * 12;

  let newMonthlyPayment = 0;
  if (newMonthlyInterestRate > 0) {
    newMonthlyPayment =
      (newLoanAmount *
        (newMonthlyInterestRate *
          Math.pow(1 + newMonthlyInterestRate, newTotalPayments))) /
      (Math.pow(1 + newMonthlyInterestRate, newTotalPayments) - 1);
  } else {
    // 0% interest case
    newMonthlyPayment = newLoanAmount / newTotalPayments;
  }

  // Calculate APR for new loan (considers upfront costs but loan amount doesn't include them)
  const newLoanAPR = calculateAPR(
    newLoanAmount,
    newMonthlyPayment,
    newLoanTerm,
    pointsCost,
    costsAndFees
  );

  // Calculate new loan totals
  const newTotalPaymentsAmount = newMonthlyPayment * newTotalPayments;
  const newTotalInterest = newTotalPaymentsAmount - newLoanAmount;

  // Calculate comparisons
  const monthlyPaymentDifference = newMonthlyPayment - currentMonthlyPayment;
  const totalInterestSavings = currentTotalRemainingInterest - newTotalInterest;
  const totalCostSavings =
    currentTotalRemainingPayments - newTotalPaymentsAmount;

  // Calculate break-even point (when savings offset closing costs)
  let breakEvenMonths = 0;
  if (monthlyPaymentDifference < 0) {
    // Only calculate break-even if new payment is lower
    breakEvenMonths = totalClosingCosts / Math.abs(monthlyPaymentDifference);
  }

  // Calculate time analysis
  const timeToPayOffCurrent = {
    years: Math.floor(currentRemainingPayments / 12),
    months: currentRemainingPayments % 12,
  };

  const timeToPayOffNew = {
    years: Math.floor(newTotalPayments / 12),
    months: newTotalPayments % 12,
  };

  const totalCurrentMonths = currentRemainingPayments;
  const totalNewMonths = newTotalPayments;
  const timeDifferenceMonths = totalCurrentMonths - totalNewMonths;

  const timeSavings = {
    years: Math.floor(Math.abs(timeDifferenceMonths) / 12),
    months: Math.abs(timeDifferenceMonths) % 12,
  };

  return {
    currentLoanRemainingBalance,
    currentMonthlyPayment,
    currentRemainingPayments,
    currentTotalRemainingInterest,
    currentTotalRemainingPayments,

    newLoanAmount,
    newMonthlyPayment,
    newTotalPayments: newTotalPaymentsAmount,
    newTotalInterest,
    newLoanAPR,

    pointsCost,
    totalClosingCosts,
    netCashOut,
    cashOutAmount,

    monthlyPaymentDifference,
    totalInterestSavings,
    totalCostSavings,
    breakEvenMonths,
    breakEvenMonthsFormatted: `${breakEvenMonths.toFixed(1)} months`,

    timeToPayOffCurrent,
    timeToPayOffNew,
    timeSavings,
  };
}

export function calculateCurrentLoanFromOriginal(
  originalLoanAmount: number,
  originalLoanTerm: number,
  interestRate: number,
  timeRemainingYears: number,
  timeRemainingMonths: number
): {
  remainingBalance: number;
  monthlyPayment: number;
  remainingPayments: number;
} {
  const monthlyInterestRate = interestRate / 100 / 12;
  const originalTotalPayments = originalLoanTerm * 12;
  const remainingPayments = timeRemainingYears * 12 + timeRemainingMonths;
  const paymentsMade = originalTotalPayments - remainingPayments;

  // Calculate original monthly payment
  let monthlyPayment = 0;
  if (monthlyInterestRate > 0) {
    monthlyPayment =
      (originalLoanAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, originalTotalPayments))) /
      (Math.pow(1 + monthlyInterestRate, originalTotalPayments) - 1);
  } else {
    monthlyPayment = originalLoanAmount / originalTotalPayments;
  }

  // Calculate remaining balance
  let remainingBalance = originalLoanAmount;

  for (let i = 0; i < paymentsMade; i++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
  }

  // Ensure balance doesn't go negative due to rounding
  remainingBalance = Math.max(0, remainingBalance);

  return {
    remainingBalance,
    monthlyPayment,
    remainingPayments,
  };
}

export function calculateAmortizationSchedule(
  loanAmount: number,
  interestRate: number,
  loanTermYears: number
): AmortizationDataPoint[] {
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  let monthlyPayment = 0;
  if (monthlyInterestRate > 0) {
    monthlyPayment =
      (loanAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalPayments))) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  } else {
    monthlyPayment = loanAmount / totalPayments;
  }

  const schedule: AmortizationDataPoint[] = [];
  let remainingBalance = loanAmount;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;

  for (let paymentNumber = 1; paymentNumber <= totalPayments; paymentNumber++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;

    totalInterestPaid += interestPayment;
    totalPrincipalPaid += principalPayment;
    remainingBalance -= principalPayment;

    // Ensure we don't go below zero due to rounding
    if (remainingBalance < 0) remainingBalance = 0;

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

export function formatPercentage(value: number): string {
  return value.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

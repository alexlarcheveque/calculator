import {
  AmortizationCalculationParams,
  AmortizationResults,
  AmortizationScheduleItem,
  OneTimePayment,
} from "@/types/amortization";

export function calculateAmortization({
  loanAmount,
  interestRate,
  loanTermYears,
  loanTermMonths,
  startDate,
  extraPayments,
}: AmortizationCalculationParams): AmortizationResults {
  // Convert annual interest rate to monthly
  const monthlyInterestRate = interestRate / 100 / 12;

  // Calculate total number of payments
  const totalPayments = loanTermYears * 12 + loanTermMonths;

  // Calculate monthly payment using the standard amortization formula
  let monthlyPayment = 0;

  if (monthlyInterestRate > 0) {
    monthlyPayment =
      (loanAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalPayments))) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  } else {
    // Simple division for 0% interest
    monthlyPayment = loanAmount / totalPayments;
  }

  // Calculate schedule to get accurate totals with extra payments
  const schedule = calculateAmortizationSchedule({
    loanAmount,
    interestRate,
    loanTermYears,
    loanTermMonths,
    startDate,
    extraPayments,
  });

  const lastPayment = schedule[schedule.length - 1];
  const totalInterest = lastPayment.totalInterestPaid;
  const totalAmount = loanAmount + totalInterest;
  const payoffDate = lastPayment.date;

  const principalPercentage = (loanAmount / totalAmount) * 100;
  const interestPercentage = (totalInterest / totalAmount) * 100;

  return {
    monthlyPayment,
    totalPayments: schedule.length,
    totalInterest,
    totalAmount,
    payoffDate,
    principalPercentage,
    interestPercentage,
  };
}

export function calculateAmortizationSchedule({
  loanAmount,
  interestRate,
  loanTermYears,
  loanTermMonths,
  startDate,
  extraPayments,
}: AmortizationCalculationParams): AmortizationScheduleItem[] {
  // Convert annual interest rate to monthly
  const monthlyInterestRate = interestRate / 100 / 12;

  // Calculate total number of payments
  const totalPayments = loanTermYears * 12 + loanTermMonths;

  // Calculate monthly payment
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

  const schedule: AmortizationScheduleItem[] = [];
  let remainingBalance = loanAmount;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;
  let paymentNumber = 1;

  const currentDate = new Date(startDate);

  while (remainingBalance > 0.01 && paymentNumber <= totalPayments * 2) {
    // Calculate interest for this payment
    const interestPayment = remainingBalance * monthlyInterestRate;

    // Calculate principal for this payment
    let principalPayment = monthlyPayment - interestPayment;

    // Calculate extra payments for this month
    let extraPayment = 0;

    if (extraPayments) {
      // Monthly extra payment
      if (
        extraPayments.monthlyExtra > 0 &&
        currentDate >= extraPayments.monthlyExtraStartDate
      ) {
        extraPayment += extraPayments.monthlyExtra;
      }

      // Yearly extra payment (check if it's the same month as start date)
      if (
        extraPayments.yearlyExtra > 0 &&
        currentDate >= extraPayments.yearlyExtraStartDate &&
        currentDate.getMonth() === extraPayments.yearlyExtraStartDate.getMonth()
      ) {
        extraPayment += extraPayments.yearlyExtra;
      }

      // One-time payments
      extraPayments.oneTimePayments.forEach((payment) => {
        if (
          currentDate.getFullYear() === payment.date.getFullYear() &&
          currentDate.getMonth() === payment.date.getMonth()
        ) {
          extraPayment += payment.amount;
        }
      });
    }

    // Ensure we don't pay more than the remaining balance
    const totalPaymentAmount = principalPayment + extraPayment;
    if (totalPaymentAmount > remainingBalance) {
      principalPayment = remainingBalance;
      extraPayment = 0;
    }

    // Update running totals
    totalInterestPaid += interestPayment;
    totalPrincipalPaid += principalPayment + extraPayment;

    // Update remaining balance
    remainingBalance -= principalPayment + extraPayment;

    // Ensure we don't go below zero due to rounding
    if (remainingBalance < 0) remainingBalance = 0;

    // Add data point for this month
    schedule.push({
      paymentNumber,
      date: new Date(currentDate),
      payment: monthlyPayment,
      principalPayment,
      interestPayment,
      extraPayment,
      totalPayment: monthlyPayment + extraPayment,
      remainingBalance,
      totalPrincipalPaid,
      totalInterestPaid,
    });

    // Move to next month
    currentDate.setMonth(currentDate.getMonth() + 1);
    paymentNumber++;

    // Break if balance is paid off
    if (remainingBalance <= 0.01) break;
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
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

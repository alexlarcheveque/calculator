import {
  PaymentCalculationParams,
  PaymentResults,
  PaymentAmortizationDataPoint,
  PaymentCalculatorMode,
} from "@/types/payment";

export function calculatePayment(
  params: PaymentCalculationParams
): PaymentResults {
  const {
    loanAmount,
    interestRate,
    calculatorMode,
    loanTermYears,
    monthlyPayment,
  } = params;

  const monthlyRate = interestRate / 100 / 12;

  if (calculatorMode === PaymentCalculatorMode.FIXED_TERM) {
    // Calculate monthly payment for fixed term
    const totalPayments = loanTermYears! * 12;

    let calculatedMonthlyPayment: number;
    if (monthlyRate === 0) {
      calculatedMonthlyPayment = loanAmount / totalPayments;
    } else {
      calculatedMonthlyPayment =
        (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    const totalAmount = calculatedMonthlyPayment * totalPayments;
    const totalInterest = totalAmount - loanAmount;
    const principalPercentage = (loanAmount / totalAmount) * 100;
    const interestPercentage = (totalInterest / totalAmount) * 100;

    return {
      loanAmount,
      monthlyPayment: calculatedMonthlyPayment,
      totalPayments: totalAmount,
      totalInterest,
      principalPercentage,
      interestPercentage,
    };
  } else {
    // Calculate time to pay off for fixed payment
    if (monthlyPayment! <= loanAmount * monthlyRate) {
      throw new Error("Monthly payment is too low to pay off the loan");
    }

    let months: number;
    if (monthlyRate === 0) {
      months = loanAmount / monthlyPayment!;
    } else {
      // Correct formula: n = -log(1 - (P * r) / PMT) / log(1 + r)
      months =
        -Math.log(1 - (loanAmount * monthlyRate) / monthlyPayment!) /
        Math.log(1 + monthlyRate);
    }

    const totalPayments = monthlyPayment! * months;
    const totalInterest = totalPayments - loanAmount;
    const principalPercentage = (loanAmount / totalPayments) * 100;
    const interestPercentage = (totalInterest / totalPayments) * 100;

    return {
      loanAmount,
      totalPayments,
      totalInterest,
      payoffTimeYears: Math.floor(months / 12),
      payoffTimeMonths: Math.round(months % 12),
      principalPercentage,
      interestPercentage,
    };
  }
}

export function calculatePaymentAmortizationSchedule(
  params: PaymentCalculationParams
): PaymentAmortizationDataPoint[] {
  const {
    loanAmount,
    interestRate,
    calculatorMode,
    loanTermYears,
    monthlyPayment,
  } = params;

  const monthlyRate = interestRate / 100 / 12;
  let payment: number;
  let totalPayments: number;

  if (calculatorMode === PaymentCalculatorMode.FIXED_TERM) {
    totalPayments = loanTermYears! * 12;
    if (monthlyRate === 0) {
      payment = loanAmount / totalPayments;
    } else {
      payment =
        (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }
  } else {
    payment = monthlyPayment!;
    if (monthlyRate === 0) {
      totalPayments = loanAmount / payment;
    } else {
      // Correct formula: n = -log(1 - (P * r) / PMT) / log(1 + r)
      totalPayments =
        -Math.log(1 - (loanAmount * monthlyRate) / payment) /
        Math.log(1 + monthlyRate);
    }
  }

  const schedule: PaymentAmortizationDataPoint[] = [];
  let remainingBalance = loanAmount;
  let totalPrincipalPaid = 0;
  let totalInterestPaid = 0;

  for (let i = 1; i <= Math.ceil(totalPayments); i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = Math.min(
      payment - interestPayment,
      remainingBalance
    );

    remainingBalance -= principalPayment;
    totalPrincipalPaid += principalPayment;
    totalInterestPaid += interestPayment;

    const actualPayment = principalPayment + interestPayment;

    schedule.push({
      paymentNumber: i,
      payment: actualPayment,
      principalPayment,
      interestPayment,
      remainingBalance: Math.max(0, remainingBalance),
      totalPrincipalPaid,
      totalInterestPaid,
      year: Math.ceil(i / 12),
      month: ((i - 1) % 12) + 1,
      isYearEnd: i % 12 === 0,
    });

    if (remainingBalance <= 0.01) break;
  }

  return schedule;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatPercentage(value: number): string {
  return value.toFixed(2) + "%";
}

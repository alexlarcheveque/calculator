import {
  MortgageCalculationParams,
  MortgageResults,
  AmortizationDataPoint,
  CalculatorType,
} from "@/types/mortgage";

export function calculateMortgage({
  loanAmount,
  interestRate,
  loanTerm,
  propertyTax = 0,
  homeInsurance = 0,
  hoa = 0,
}: MortgageCalculationParams): MortgageResults {
  // Convert annual interest rate to monthly
  const monthlyInterestRate = interestRate / 100 / 12;

  // Calculate total number of payments
  const totalPayments = loanTerm * 12;

  // Calculate monthly principal and interest payment
  // Using the formula: P = L[r(1+r)^n]/[(1+r)^n-1]
  // Where:
  // P = Monthly payment
  // L = Loan amount
  // r = Monthly interest rate (annual rate / 12)
  // n = Total number of payments (years * 12)

  let monthlyPrincipalAndInterest = 0;

  if (monthlyInterestRate > 0) {
    monthlyPrincipalAndInterest =
      (loanAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalPayments))) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  } else {
    // Simple division for 0% interest
    monthlyPrincipalAndInterest = loanAmount / totalPayments;
  }

  // Calculate monthly property tax and insurance
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyHomeInsurance = homeInsurance / 12;

  // Calculate total monthly payment
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest +
    monthlyPropertyTax +
    monthlyHomeInsurance +
    hoa;

  // Calculate total payment amount
  const totalPaymentAmount = monthlyPrincipalAndInterest * totalPayments;

  // Calculate total interest paid
  const totalInterestPaid =
    monthlyPrincipalAndInterest * totalPayments - loanAmount;

  // Calculate down payment percentage based on loan amount
  const totalHomeValue = loanAmount / (1 - 0.2); // Assuming 20% down payment as a reference
  const downPaymentPercentage = (1 - loanAmount / totalHomeValue) * 100;

  // Calculate payoff date
  const payoffDate = new Date();
  payoffDate.setFullYear(payoffDate.getFullYear() + loanTerm);

  return {
    loanAmount,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHOA: hoa,
    totalMonthlyPayment,
    downPaymentPercentage,
    totalInterestPaid,
    totalPaymentAmount,
    payoffDate,
  };
}

export function calculateAmortizationSchedule({
  loanAmount,
  interestRate,
  loanTerm,
}: MortgageCalculationParams): AmortizationDataPoint[] {
  // Convert annual interest rate to monthly
  const monthlyInterestRate = interestRate / 100 / 12;

  // Calculate total number of payments
  const totalPayments = loanTerm * 12;

  // Calculate monthly principal and interest payment
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

export function formatPercentage(value: number): string {
  return value.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function calculateComparisonResults(
  {
    loanAmount,
    interestRate,
    propertyTax = 0,
    homeInsurance = 0,
    hoa = 0,
  }: MortgageCalculationParams,
  interestRate15Year: number
): {
  results30Year: MortgageResults;
  results15Year: MortgageResults;
  monthlySavings: number;
  totalInterestSavings: number;
} {
  const results30Year = calculateMortgage({
    loanAmount,
    interestRate,
    loanTerm: 30,
    propertyTax,
    homeInsurance,
    hoa,
  });

  const results15Year = calculateMortgage({
    loanAmount,
    interestRate: interestRate15Year,
    loanTerm: 15,
    propertyTax,
    homeInsurance,
    hoa,
  });

  const monthlySavings =
    results15Year.totalMonthlyPayment - results30Year.totalMonthlyPayment;
  const totalInterestSavings =
    results30Year.totalInterestPaid - results15Year.totalInterestPaid;

  return {
    results30Year,
    results15Year,
    monthlySavings,
    totalInterestSavings,
  };
}

export function calculateSecondMortgageResults(
  firstMortgageBalance: number,
  firstMortgageRate: number,
  firstMortgageTerm: number,
  secondMortgageAmount: number,
  secondMortgageRate: number,
  secondMortgageTerm: number,
  propertyTax: number = 0,
  homeInsurance: number = 0,
  hoa: number = 0
): {
  firstMortgageResults: MortgageResults;
  secondMortgageResults: MortgageResults;
  combinedMonthlyPayment: number;
  combinedTotalInterest: number;
} {
  const firstMortgageResults = calculateMortgage({
    loanAmount: firstMortgageBalance,
    interestRate: firstMortgageRate,
    loanTerm: firstMortgageTerm,
    propertyTax,
    homeInsurance,
    hoa,
  });

  const secondMortgageResults = calculateMortgage({
    loanAmount: secondMortgageAmount,
    interestRate: secondMortgageRate,
    loanTerm: secondMortgageTerm,
    propertyTax: 0, // Don't include these twice
    homeInsurance: 0,
    hoa: 0,
  });

  const combinedMonthlyPayment =
    firstMortgageResults.monthlyPrincipalAndInterest +
    secondMortgageResults.monthlyPrincipalAndInterest +
    firstMortgageResults.monthlyPropertyTax +
    firstMortgageResults.monthlyHomeInsurance +
    firstMortgageResults.monthlyHOA;

  const combinedTotalInterest =
    firstMortgageResults.totalInterestPaid +
    secondMortgageResults.totalInterestPaid;

  return {
    firstMortgageResults,
    secondMortgageResults,
    combinedMonthlyPayment,
    combinedTotalInterest,
  };
}

export function calculateHelocPayment(
  helocAmount: number,
  helocRate: number,
  helocDrawPeriod: number,
  helocRepaymentPeriod: number
): {
  interestOnlyPayment: number;
  repaymentMonthlyPayment: number;
  totalInterestPaid: number;
} {
  // During draw period, HELOC typically has interest-only payments
  const monthlyRate = helocRate / 100 / 12;
  const interestOnlyPayment = helocAmount * monthlyRate;

  // Calculate repayment period
  const totalPayments = helocRepaymentPeriod * 12;
  const repaymentMonthlyPayment =
    (helocAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);

  // Calculate total interest paid
  const interestOnlyTotalInterest =
    interestOnlyPayment * (helocDrawPeriod * 12);
  const repaymentTotalInterest =
    repaymentMonthlyPayment * totalPayments - helocAmount;
  const totalInterestPaid = interestOnlyTotalInterest + repaymentTotalInterest;

  return {
    interestOnlyPayment,
    repaymentMonthlyPayment,
    totalInterestPaid,
  };
}

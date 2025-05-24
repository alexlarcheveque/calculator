import {
  AutoLoanFormValues,
  AutoLoanResults,
  AutoLoanMonthlyAmortizationDataPoint,
  AutoLoanYearlyAmortizationDataPoint,
} from "@/types/autoLoan";

export function formatCurrency(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "$0.00";
  }
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function formatCurrencyDetailed(
  value: number | undefined | null
): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "$0.00";
  }
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercentage(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "0.0%";
  }
  return `${value.toFixed(1)}%`;
}

// Placeholder for states where trade-in does not reduce taxable amount
// Source: HTML provided by user
const STATES_NO_TRADE_IN_REDUCTION = [
  "CA",
  "DC",
  "HI",
  "KY",
  "MD",
  "MI",
  "MT",
  "VA",
];

export function calculateAutoLoan(values: AutoLoanFormValues): AutoLoanResults {
  const {
    autoPrice,
    loanTermMonths,
    interestRate,
    cashIncentives,
    downPayment,
    tradeInValue,
    amountOwedOnTradeIn,
    state,
    salesTaxRate,
    titleRegFees,
    includeTaxesAndFeesInLoan,
  } = values;

  // Nett Trade-in Value
  const netTradeInValue = tradeInValue - amountOwedOnTradeIn;

  // Taxable Amount Calculation
  let taxableAmount = autoPrice - cashIncentives; // Cash incentives usually reduce taxable amount
  if (!STATES_NO_TRADE_IN_REDUCTION.includes(state.toUpperCase())) {
    taxableAmount -= netTradeInValue > 0 ? netTradeInValue : 0; // Only apply if net trade-in is positive
  }
  taxableAmount = Math.max(0, taxableAmount); // Ensure taxable amount is not negative

  const salesTaxAmount = (taxableAmount * salesTaxRate) / 100;

  // Amount to Finance
  let loanPrincipal =
    autoPrice - cashIncentives - downPayment - netTradeInValue;

  let upfrontPayment = downPayment;
  if (netTradeInValue < 0) {
    // If amount owed on trade-in is more than trade-in value
    loanPrincipal -= netTradeInValue; // This adds to the loan principal (double negative)
  } else {
    // If netTradeInValue is positive, it's already accounted for in loanPrincipal or increases upfront payment
  }

  if (includeTaxesAndFeesInLoan) {
    loanPrincipal += salesTaxAmount + titleRegFees;
  } else {
    upfrontPayment += salesTaxAmount + titleRegFees;
  }

  loanPrincipal = Math.max(0, loanPrincipal); // Ensure loan principal is not negative

  // Monthly Payment Calculation
  const monthlyInterestRate = interestRate / 100 / 12;
  let monthlyPayment = 0;
  if (loanTermMonths > 0 && monthlyInterestRate > 0) {
    monthlyPayment =
      (loanPrincipal *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
  } else if (loanTermMonths > 0 && interestRate === 0) {
    // 0% interest loan
    monthlyPayment = loanPrincipal / loanTermMonths;
  } else if (loanPrincipal === 0) {
    monthlyPayment = 0;
  }
  monthlyPayment = Math.max(0, monthlyPayment); // Ensure non-negative payment

  // Amortization Schedule, Totals
  const monthlyAmortization: AutoLoanMonthlyAmortizationDataPoint[] = [];
  const yearlyAmortization: AutoLoanYearlyAmortizationDataPoint[] = [];
  let remainingBalance = loanPrincipal;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;

  let yearlyInterest = 0;
  let yearlyPrincipal = 0;

  if (loanPrincipal > 0 && loanTermMonths > 0) {
    for (let month = 1; month <= loanTermMonths; month++) {
      const interestForMonth = remainingBalance * monthlyInterestRate;
      let principalForMonth = monthlyPayment - interestForMonth;

      // Ensure principal payment doesn't exceed remaining balance (especially for the last payment)
      if (remainingBalance - principalForMonth < 0) {
        principalForMonth = remainingBalance;
        monthlyPayment = principalForMonth + interestForMonth; // Adjust last month's payment
      }

      remainingBalance -= principalForMonth;
      if (remainingBalance < 0.005) {
        // Handle floating point inaccuracies for the last payment
        principalForMonth += remainingBalance; // Add the remainder to principal
        remainingBalance = 0;
      }

      totalInterestPaid += interestForMonth;
      totalPrincipalPaid += principalForMonth;
      yearlyInterest += interestForMonth;
      yearlyPrincipal += principalForMonth;

      monthlyAmortization.push({
        month,
        interest: interestForMonth,
        principal: principalForMonth,
        endingBalance: remainingBalance,
      });

      if (month % 12 === 0 || month === loanTermMonths) {
        yearlyAmortization.push({
          year: Math.ceil(month / 12),
          interest: yearlyInterest,
          principal: yearlyPrincipal,
          endingBalance: remainingBalance,
        });
        yearlyInterest = 0;
        yearlyPrincipal = 0;
      }
    }
  }
  const totalLoanPayments = totalPrincipalPaid + totalInterestPaid; // Or monthlyPayment * loanTermMonths for non-adjusted last payment
  const totalCost =
    autoPrice +
    totalInterestPaid +
    salesTaxAmount +
    titleRegFees -
    cashIncentives; // This is the total out-of-pocket

  const loanPrincipalPercentage =
    loanPrincipal > 0 ? (totalPrincipalPaid / totalLoanPayments) * 100 : 100;
  const loanInterestPercentage =
    loanPrincipal > 0 ? (totalInterestPaid / totalLoanPayments) * 100 : 0;

  return {
    monthlyPayment,
    totalLoanAmount: loanPrincipal,
    salesTaxAmount,
    upfrontPayment,
    totalLoanPayments,
    totalLoanInterest: totalInterestPaid,
    totalCost,
    loanPrincipalPercentage,
    loanInterestPercentage,
    monthlyAmortization,
    yearlyAmortization,
  };
}

import {
  CompoundingFrequency,
  CompoundInterestCalculationParams,
  CompoundInterestResults,
  CompoundInterestGrowthDataPoint,
  CompoundInterestExampleParams,
} from "@/types/compoundInterest";

// Get the number of compounding periods per year for each frequency
export function getCompoundingPeriodsPerYear(
  frequency: CompoundingFrequency
): number {
  switch (frequency) {
    case CompoundingFrequency.ANNUALLY:
      return 1;
    case CompoundingFrequency.SEMIANNUALLY:
      return 2;
    case CompoundingFrequency.QUARTERLY:
      return 4;
    case CompoundingFrequency.MONTHLY:
      return 12;
    case CompoundingFrequency.SEMIMONTHLY:
      return 24;
    case CompoundingFrequency.BIWEEKLY:
      return 26;
    case CompoundingFrequency.WEEKLY:
      return 52;
    case CompoundingFrequency.DAILY:
      return 365;
    case CompoundingFrequency.CONTINUOUSLY:
      return Infinity;
    default:
      return 1;
  }
}

// Get display name for compounding frequency
export function getCompoundingFrequencyDisplayName(
  frequency: CompoundingFrequency
): string {
  switch (frequency) {
    case CompoundingFrequency.ANNUALLY:
      return "Annually (APY)";
    case CompoundingFrequency.SEMIANNUALLY:
      return "Semiannually";
    case CompoundingFrequency.QUARTERLY:
      return "Quarterly";
    case CompoundingFrequency.MONTHLY:
      return "Monthly (APR)";
    case CompoundingFrequency.SEMIMONTHLY:
      return "Semimonthly";
    case CompoundingFrequency.BIWEEKLY:
      return "Biweekly";
    case CompoundingFrequency.WEEKLY:
      return "Weekly";
    case CompoundingFrequency.DAILY:
      return "Daily";
    case CompoundingFrequency.CONTINUOUSLY:
      return "Continuously";
    default:
      return "Unknown";
  }
}

// Convert interest rate from one compounding frequency to another
export function calculateCompoundInterestConversion({
  interestRate,
  inputFrequency,
  outputFrequency,
}: CompoundInterestCalculationParams): CompoundInterestResults {
  const inputRate = interestRate / 100; // Convert percentage to decimal

  // First convert input rate to effective annual rate (APY)
  let effectiveAnnualRate: number;

  if (inputFrequency === CompoundingFrequency.CONTINUOUSLY) {
    // For continuous compounding: APY = e^r - 1
    effectiveAnnualRate = Math.exp(inputRate) - 1;
  } else if (inputFrequency === CompoundingFrequency.ANNUALLY) {
    // Already annual rate
    effectiveAnnualRate = inputRate;
  } else {
    // For discrete compounding: APY = (1 + r/n)^n - 1
    const n = getCompoundingPeriodsPerYear(inputFrequency);
    effectiveAnnualRate = Math.pow(1 + inputRate / n, n) - 1;
  }

  // Now convert effective annual rate to output frequency
  let outputRate: number;

  if (outputFrequency === CompoundingFrequency.CONTINUOUSLY) {
    // For continuous compounding: r = ln(1 + APY)
    outputRate = Math.log(1 + effectiveAnnualRate);
  } else if (outputFrequency === CompoundingFrequency.ANNUALLY) {
    // Already annual rate
    outputRate = effectiveAnnualRate;
  } else {
    // For discrete compounding: r = n * ((1 + APY)^(1/n) - 1)
    const n = getCompoundingPeriodsPerYear(outputFrequency);
    outputRate = n * (Math.pow(1 + effectiveAnnualRate, 1 / n) - 1);
  }

  return {
    inputRate: interestRate,
    inputFrequency,
    outputRate: outputRate * 100, // Convert back to percentage
    outputFrequency,
    effectiveAnnualRate: effectiveAnnualRate * 100, // Convert back to percentage
  };
}

// Calculate compound interest growth over time for examples
export function calculateCompoundInterestGrowth({
  principal,
  interestRate,
  compoundingFrequency,
  timeYears,
}: CompoundInterestExampleParams): CompoundInterestGrowthDataPoint[] {
  const rate = interestRate / 100; // Convert percentage to decimal
  const data: CompoundInterestGrowthDataPoint[] = [];

  for (let year = 0; year <= timeYears; year++) {
    let totalValue: number;

    if (compoundingFrequency === CompoundingFrequency.CONTINUOUSLY) {
      // Continuous compounding: A = P * e^(rt)
      totalValue = principal * Math.exp(rate * year);
    } else {
      // Discrete compounding: A = P * (1 + r/n)^(nt)
      const n = getCompoundingPeriodsPerYear(compoundingFrequency);
      totalValue = principal * Math.pow(1 + rate / n, n * year);
    }

    const interest = totalValue - principal;

    data.push({
      year,
      principal,
      interest,
      totalValue,
    });
  }

  return data;
}

// Calculate simple interest for comparison
export function calculateSimpleInterest(
  principal: number,
  interestRate: number,
  timeYears: number
): number {
  return principal * (interestRate / 100) * timeYears;
}

// Calculate the Rule of 72 (approximate years to double)
export function calculateRuleOf72(interestRate: number): number {
  return 72 / interestRate;
}

// Format currency with commas
export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// Format currency with detailed decimals
export function formatCurrencyDetailed(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Format percentage
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

// Format number with commas
export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

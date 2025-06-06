import {
  InvestmentCalculationParams,
  InvestmentResults,
  AccumulationDataPoint,
  MonthlyAccumulationDataPoint,
  CompoundFrequency,
  ContributionTiming,
  ContributionFrequency,
  CalculatorType,
} from "@/types/investment";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumberWithCommas(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function parseNumberFromCommas(value: string): number {
  return parseFloat(value.replace(/,/g, "")) || 0;
}

export function formatPercentage(rate: number): string {
  return `${rate.toFixed(2)}%`;
}

// Get the number of compounding periods per year
function getCompoundingPeriodsPerYear(frequency: CompoundFrequency): number {
  switch (frequency) {
    case CompoundFrequency.ANNUALLY:
      return 1;
    case CompoundFrequency.SEMIANNUALLY:
      return 2;
    case CompoundFrequency.QUARTERLY:
      return 4;
    case CompoundFrequency.MONTHLY:
      return 12;
    case CompoundFrequency.SEMIMONTHLY:
      return 24;
    case CompoundFrequency.BIWEEKLY:
      return 26;
    case CompoundFrequency.WEEKLY:
      return 52;
    case CompoundFrequency.DAILY:
      return 365;
    case CompoundFrequency.CONTINUOUSLY:
      return Infinity;
    default:
      return 12;
  }
}

// Calculate compound interest with regular contributions
function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number,
  compoundingFrequency: number,
  contribution: number,
  contributionFrequency: number,
  contributionTiming: ContributionTiming
): number {
  if (compoundingFrequency === Infinity) {
    // Continuous compounding
    const effectiveRate = Math.exp(rate) - 1;
    return calculateCompoundInterest(
      principal,
      effectiveRate,
      time,
      1,
      contribution,
      contributionFrequency,
      contributionTiming
    );
  }

  const periodicRate = rate / compoundingFrequency;
  const totalPeriods = compoundingFrequency * time;

  // Future value of principal
  const principalFV = principal * Math.pow(1 + periodicRate, totalPeriods);

  if (contribution === 0) {
    return principalFV;
  }

  // Calculate effective periodic rate for contribution frequency
  let effectivePeriodicRate: number;
  let contributionPeriods: number;

  if (contributionFrequency === 12) {
    // Monthly contributions
    contributionPeriods = contributionFrequency * time; // 12 * years
    // Calculate monthly effective rate based on actual compounding frequency
    if (compoundingFrequency === Infinity) {
      effectivePeriodicRate = Math.exp(rate / 12) - 1; // Continuous compounding
    } else {
      const periodicRate = rate / compoundingFrequency;
      const effectiveAnnualRate =
        Math.pow(1 + periodicRate, compoundingFrequency) - 1;
      effectivePeriodicRate = Math.pow(1 + effectiveAnnualRate, 1 / 12) - 1;
    }
  } else {
    // Annual contributions
    contributionPeriods = contributionFrequency * time; // 1 * years
    // Calculate effective annual rate based on compounding frequency
    if (compoundingFrequency === Infinity) {
      effectivePeriodicRate = Math.exp(rate) - 1; // Continuous compounding
    } else {
      const periodicRate = rate / compoundingFrequency;
      effectivePeriodicRate =
        Math.pow(1 + periodicRate, compoundingFrequency) - 1;
    }
  }

  // Future value of annuity based on contribution frequency
  let annuityFV = 0;
  if (effectivePeriodicRate !== 0) {
    annuityFV =
      contribution *
      ((Math.pow(1 + effectivePeriodicRate, contributionPeriods) - 1) /
        effectivePeriodicRate);

    // Adjust for beginning vs end of period contributions
    if (contributionTiming === ContributionTiming.BEGINNING) {
      annuityFV *= 1 + effectivePeriodicRate;
    }
  } else {
    annuityFV = contribution * contributionPeriods;
  }

  return principalFV + annuityFV;
}

export function calculateInvestment(
  params: InvestmentCalculationParams
): InvestmentResults {
  const {
    startingAmount,
    additionalContribution,
    returnRate,
    investmentLength,
    compoundFrequency,
    contributionTiming,
    contributionFrequency,
  } = params;

  // For annual contributions with annual compounding and end timing, use simple logic like calculator.net
  if (
    compoundFrequency === CompoundFrequency.ANNUALLY &&
    contributionFrequency === ContributionFrequency.ANNUALLY &&
    contributionTiming === ContributionTiming.END
  ) {
    const rate = returnRate / 100;
    let balance = startingAmount;

    for (let year = 1; year <= investmentLength; year++) {
      // Apply interest to current balance
      balance = balance * (1 + rate);
      // Add contribution at end of year
      balance = balance + additionalContribution;
    }

    const totalContributions = additionalContribution * investmentLength;
    const totalInterest = balance - startingAmount - totalContributions;

    return {
      endBalance: balance,
      startingAmount,
      totalContributions,
      totalInterest,
    };
  }

  // For all other cases, use the existing complex compound interest logic
  const annualRate = returnRate / 100;
  const compoundingPeriodsPerYear =
    getCompoundingPeriodsPerYear(compoundFrequency);
  const contributionPeriodsPerYear =
    contributionFrequency === ContributionFrequency.MONTHLY ? 12 : 1;

  const endBalance = calculateCompoundInterest(
    startingAmount,
    annualRate,
    investmentLength,
    compoundingPeriodsPerYear,
    additionalContribution,
    contributionPeriodsPerYear,
    contributionTiming
  );

  const totalContributions =
    additionalContribution * contributionPeriodsPerYear * investmentLength;
  const totalInterest = endBalance - startingAmount - totalContributions;

  return {
    endBalance,
    startingAmount,
    totalContributions,
    totalInterest,
  };
}

// Calculate what starting amount is needed to reach a target
export function calculateRequiredStartingAmount(
  params: InvestmentCalculationParams
): number {
  const {
    targetAmount = 0,
    additionalContribution,
    returnRate,
    investmentLength,
    compoundFrequency,
    contributionTiming,
    contributionFrequency,
  } = params;

  const annualRate = returnRate / 100;
  const compoundingPeriodsPerYear =
    getCompoundingPeriodsPerYear(compoundFrequency);
  const contributionPeriodsPerYear =
    contributionFrequency === ContributionFrequency.MONTHLY ? 12 : 1;

  // Calculate future value of contributions
  const contributionFV = calculateCompoundInterest(
    0,
    annualRate,
    investmentLength,
    compoundingPeriodsPerYear,
    additionalContribution,
    contributionPeriodsPerYear,
    contributionTiming
  );

  // Handle continuous compounding separately
  if (compoundingPeriodsPerYear === Infinity) {
    // For continuous compounding: FV = PV * e^(rt)
    // So PV = FV / e^(rt)
    const compoundFactor = Math.exp(annualRate * investmentLength);
    return Math.max(0, (targetAmount - contributionFV) / compoundFactor);
  }

  // For discrete compounding: FV = PV * (1 + r/n)^(nt)
  const periodicRate = annualRate / compoundingPeriodsPerYear;
  const totalPeriods = compoundingPeriodsPerYear * investmentLength;
  const compoundFactor = Math.pow(1 + periodicRate, totalPeriods);

  return Math.max(0, (targetAmount - contributionFV) / compoundFactor);
}

// Calculate required return rate to reach target - EXACT SOLUTIONS ONLY
export function calculateRequiredReturnRate(
  params: InvestmentCalculationParams
): number {
  return calculateReturnRateBisection(params);
}

// EXACT bisection solution for return rate
function calculateReturnRateBisection(
  params: InvestmentCalculationParams
): number {
  const {
    startingAmount,
    targetAmount = 0,
    additionalContribution,
    investmentLength,
  } = params;

  // Check if target is achievable
  if (
    targetAmount <=
    startingAmount + additionalContribution * investmentLength
  ) {
    throw new Error(
      "Target amount is too low - can be achieved with 0% return rate"
    );
  }

  // Use pure bisection with many cuts
  let lowRate = 0.001; // 0.1%
  let highRate = 2.0; // 200%

  const maxIterations = 200; // More cuts!
  const tolerance = 1e-12; // Very tight tolerance

  for (let i = 0; i < maxIterations; i++) {
    const midRate = (lowRate + highRate) / 2;

    const testParams = { ...params, returnRate: midRate * 100 };
    const result = calculateInvestment(testParams);
    const error = result.endBalance - targetAmount;

    // Check for convergence
    if (
      Math.abs(error) < tolerance ||
      Math.abs(highRate - lowRate) < tolerance
    ) {
      return midRate * 100;
    }

    // Update bounds
    if (result.endBalance < targetAmount) {
      lowRate = midRate;
    } else {
      highRate = midRate;
    }
  }

  throw new Error("Cannot find exact solution: maximum iterations reached");
}

// Calculate required investment length - EXACT SOLUTIONS ONLY
export function calculateRequiredInvestmentLength(
  params: InvestmentCalculationParams
): number {
  return calculateLengthBisection(params);
}

// EXACT bisection for investment length
function calculateLengthBisection(params: InvestmentCalculationParams): number {
  const { targetAmount = 0 } = params;

  // Use pure bisection with many cuts
  let lowLength = 0.1; // 0.1 years (about 1 month)
  let highLength = 100; // 100 years

  const maxIterations = 200; // More cuts!
  const tolerance = 1e-10; // Very tight tolerance

  for (let i = 0; i < maxIterations; i++) {
    const midLength = (lowLength + highLength) / 2;

    const testParams = { ...params, investmentLength: midLength };
    const result = calculateInvestment(testParams);
    const error = result.endBalance - targetAmount;

    // Check for convergence
    if (
      Math.abs(error) < tolerance ||
      Math.abs(highLength - lowLength) < tolerance
    ) {
      return midLength;
    }

    // Update bounds
    if (result.endBalance < targetAmount) {
      lowLength = midLength;
    } else {
      highLength = midLength;
    }
  }

  throw new Error("Cannot find exact solution: maximum iterations reached");
}

// Calculate required additional contribution - EXACT SOLUTIONS ONLY
export function calculateRequiredContribution(
  params: InvestmentCalculationParams
): number {
  return calculateContributionBisection(params);
}

// EXACT bisection for required contribution
function calculateContributionBisection(
  params: InvestmentCalculationParams
): number {
  const { targetAmount = 0 } = params;

  // Use pure bisection with many cuts
  let lowContribution = 0; // $0
  let highContribution = 100000; // $100,000 per period

  const maxIterations = 200; // More cuts!
  const tolerance = 1e-8; // Reasonable tolerance for money

  for (let i = 0; i < maxIterations; i++) {
    const midContribution = (lowContribution + highContribution) / 2;

    const testParams = { ...params, additionalContribution: midContribution };
    const result = calculateInvestment(testParams);
    const error = result.endBalance - targetAmount;

    // Check for convergence
    if (
      Math.abs(error) < tolerance ||
      Math.abs(highContribution - lowContribution) < tolerance
    ) {
      return Math.max(0, midContribution);
    }

    // Update bounds
    if (result.endBalance < targetAmount) {
      lowContribution = midContribution;
    } else {
      highContribution = midContribution;
    }
  }

  throw new Error("Cannot find exact solution: maximum iterations reached");
}

export function calculateAccumulationSchedule(
  params: InvestmentCalculationParams
): AccumulationDataPoint[] {
  const {
    startingAmount,
    additionalContribution,
    returnRate,
    investmentLength,
    compoundFrequency,
    contributionTiming,
    contributionFrequency,
  } = params;

  const schedule: AccumulationDataPoint[] = [];
  const annualRate = returnRate / 100;
  const compoundingPeriodsPerYear =
    getCompoundingPeriodsPerYear(compoundFrequency);
  const contributionPeriodsPerYear =
    contributionFrequency === ContributionFrequency.MONTHLY ? 12 : 1;

  let currentBalance = startingAmount;
  let totalContributions = 0;
  let totalInterest = 0;

  for (let year = 1; year <= investmentLength; year++) {
    const yearlyContribution =
      additionalContribution * contributionPeriodsPerYear;

    // Calculate growth for this year
    const yearParams = {
      ...params,
      startingAmount: currentBalance,
      investmentLength: 1,
    };

    const yearResult = calculateInvestment(yearParams);
    const yearInterest =
      yearResult.endBalance - currentBalance - yearlyContribution;

    currentBalance = yearResult.endBalance;
    totalContributions += yearlyContribution;
    totalInterest += yearInterest;

    schedule.push({
      year,
      deposit:
        year === 1 ? startingAmount + yearlyContribution : yearlyContribution,
      interest: yearInterest,
      endingBalance: currentBalance,
      totalContributions,
      totalInterest,
    });
  }

  return schedule;
}

export function calculateMonthlyAccumulationSchedule(
  params: InvestmentCalculationParams
): MonthlyAccumulationDataPoint[] {
  const {
    startingAmount,
    additionalContribution,
    returnRate,
    investmentLength,
    compoundFrequency,
    contributionTiming,
    contributionFrequency,
  } = params;

  const schedule: MonthlyAccumulationDataPoint[] = [];
  const monthlyRate = returnRate / 100 / 12;
  const totalMonths = Math.floor(investmentLength * 12);

  let currentBalance = startingAmount;

  for (let month = 1; month <= totalMonths; month++) {
    const year = Math.ceil(month / 12);
    const monthInYear = ((month - 1) % 12) + 1;

    // Add contribution at beginning or end of month
    let monthlyContribution = 0;
    if (contributionFrequency === ContributionFrequency.MONTHLY) {
      monthlyContribution = additionalContribution;
    } else if (
      contributionFrequency === ContributionFrequency.ANNUALLY &&
      monthInYear === 1
    ) {
      monthlyContribution = additionalContribution;
    }

    let startingMonthBalance = currentBalance;

    if (contributionTiming === ContributionTiming.BEGINNING) {
      startingMonthBalance += monthlyContribution;
    }

    // Calculate interest for the month
    const monthlyInterest = startingMonthBalance * monthlyRate;

    // Update balance
    currentBalance = startingMonthBalance + monthlyInterest;

    if (contributionTiming === ContributionTiming.END) {
      currentBalance += monthlyContribution;
    }

    // For first month, include starting amount in deposit
    const deposit =
      month === 1 ? startingAmount + monthlyContribution : monthlyContribution;

    schedule.push({
      month: monthInYear,
      year,
      deposit,
      interest: monthlyInterest,
      endingBalance: currentBalance,
    });
  }

  return schedule;
}

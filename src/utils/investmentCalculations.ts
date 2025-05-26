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

  // Calculate contribution frequency relative to compounding frequency
  const contributionPeriodsPerYear = contributionFrequency;
  const contributionPerCompoundingPeriod =
    contribution * (compoundingFrequency / contributionPeriodsPerYear);

  // Future value of annuity
  let annuityFV = 0;
  if (periodicRate !== 0) {
    annuityFV =
      contributionPerCompoundingPeriod *
      ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);

    // Adjust for beginning vs end of period contributions
    if (contributionTiming === ContributionTiming.BEGINNING) {
      annuityFV *= 1 + periodicRate;
    }
  } else {
    annuityFV = contributionPerCompoundingPeriod * totalPeriods;
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

  // Required starting amount = (target - contribution FV) / compound factor
  const periodicRate = annualRate / compoundingPeriodsPerYear;
  const totalPeriods = compoundingPeriodsPerYear * investmentLength;
  const compoundFactor = Math.pow(1 + periodicRate, totalPeriods);

  return Math.max(0, (targetAmount - contributionFV) / compoundFactor);
}

// Calculate required return rate to reach target
export function calculateRequiredReturnRate(
  params: InvestmentCalculationParams
): number {
  const {
    startingAmount,
    targetAmount = 0,
    additionalContribution,
    investmentLength,
    compoundFrequency,
    contributionTiming,
    contributionFrequency,
  } = params;

  // Use binary search to find the required rate
  let low = 0;
  let high = 50; // 50% max rate
  let tolerance = 0.0001;

  for (let i = 0; i < 100; i++) {
    const testRate = (low + high) / 2;
    const testParams = { ...params, returnRate: testRate };
    const result = calculateInvestment(testParams);

    if (Math.abs(result.endBalance - targetAmount) < tolerance) {
      return testRate;
    }

    if (result.endBalance < targetAmount) {
      low = testRate;
    } else {
      high = testRate;
    }
  }

  return (low + high) / 2;
}

// Calculate required investment length to reach target
export function calculateRequiredInvestmentLength(
  params: InvestmentCalculationParams
): number {
  const {
    startingAmount,
    targetAmount = 0,
    additionalContribution,
    returnRate,
    compoundFrequency,
    contributionTiming,
    contributionFrequency,
  } = params;

  // Use binary search to find the required time
  let low = 0.1;
  let high = 100; // 100 years max
  let tolerance = 0.01;

  for (let i = 0; i < 100; i++) {
    const testTime = (low + high) / 2;
    const testParams = { ...params, investmentLength: testTime };
    const result = calculateInvestment(testParams);

    if (Math.abs(result.endBalance - targetAmount) < tolerance * targetAmount) {
      return testTime;
    }

    if (result.endBalance < targetAmount) {
      low = testTime;
    } else {
      high = testTime;
    }
  }

  return (low + high) / 2;
}

// Calculate required additional contribution to reach target
export function calculateRequiredContribution(
  params: InvestmentCalculationParams
): number {
  const {
    startingAmount,
    targetAmount = 0,
    returnRate,
    investmentLength,
    compoundFrequency,
    contributionTiming,
    contributionFrequency,
  } = params;

  // Use binary search to find the required contribution
  let low = 0;
  let high = 100000; // $100k max contribution
  let tolerance = 0.01;

  for (let i = 0; i < 100; i++) {
    const testContribution = (low + high) / 2;
    const testParams = { ...params, additionalContribution: testContribution };
    const result = calculateInvestment(testParams);

    if (Math.abs(result.endBalance - targetAmount) < tolerance * targetAmount) {
      return testContribution;
    }

    if (result.endBalance < targetAmount) {
      low = testContribution;
    } else {
      high = testContribution;
    }
  }

  return (low + high) / 2;
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

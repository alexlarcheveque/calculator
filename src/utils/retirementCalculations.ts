import {
  RetirementCalculationParams,
  RetirementResults,
  SavingsFormValues,
  SavingsResults,
  WithdrawalFormValues,
  WithdrawalResults,
  DurationFormValues,
  DurationResults,
  IncomeAfterRetirementUnit,
  FutureSavingsUnit,
} from "@/types/retirement";

// Calculator 1: How much do you need to retire?
export function calculateRetirement(
  params: RetirementCalculationParams
): RetirementResults {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentIncome,
    incomeIncrease,
    incomeAfterRetirement,
    incomeAfterRetirementUnit,
    averageInvestmentReturn,
    inflationRate,
    otherIncomeAfterRetirement,
    currentRetirementSavings,
    futureSavings,
    futureSavingsUnit,
  } = params;

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

  // Calculate income at retirement (inflation adjusted)
  const incomeAtRetirement =
    currentIncome * Math.pow(1 + incomeIncrease / 100, yearsToRetirement);

  // Calculate income needed after retirement
  let incomeNeededAtRetirement: number;
  if (incomeAfterRetirementUnit === IncomeAfterRetirementUnit.PERCENTAGE) {
    incomeNeededAtRetirement =
      (incomeAtRetirement * incomeAfterRetirement) / 100;
  } else {
    // Dollar amount in today's money, adjust for inflation
    incomeNeededAtRetirement =
      incomeAfterRetirement *
      Math.pow(1 + inflationRate / 100, yearsToRetirement);
  }

  // Subtract other income sources
  const netIncomeNeeded =
    (incomeNeededAtRetirement - otherIncomeAfterRetirement * 12) / 12;

  // Calculate total needed at retirement (present value of annuity)
  const monthlyRate = averageInvestmentReturn / 100 / 12;
  const totalPayments = yearsInRetirement * 12;

  let totalNeededAtRetirement: number;
  if (monthlyRate > 0) {
    totalNeededAtRetirement =
      (netIncomeNeeded * (1 - Math.pow(1 + monthlyRate, -totalPayments))) /
      monthlyRate;
  } else {
    totalNeededAtRetirement = netIncomeNeeded * totalPayments;
  }

  // Calculate projected savings at retirement
  const monthlyReturnRate = averageInvestmentReturn / 100 / 12;
  const monthsToRetirement = yearsToRetirement * 12;

  // Future value of current savings
  const futureValueCurrentSavings =
    currentRetirementSavings *
    Math.pow(1 + averageInvestmentReturn / 100, yearsToRetirement);

  // Calculate monthly contribution amount
  let monthlyContribution: number;
  if (futureSavingsUnit === FutureSavingsUnit.PERCENTAGE) {
    monthlyContribution = (currentIncome * futureSavings) / 100 / 12;
  } else {
    monthlyContribution = futureSavings / 12;
  }

  // Future value of monthly contributions
  let futureValueContributions: number;
  if (monthlyReturnRate > 0) {
    futureValueContributions =
      (monthlyContribution *
        (Math.pow(1 + monthlyReturnRate, monthsToRetirement) - 1)) /
      monthlyReturnRate;
  } else {
    futureValueContributions = monthlyContribution * monthsToRetirement;
  }

  const projectedSavingsAtRetirement =
    futureValueCurrentSavings + futureValueContributions;

  const shortfallOrSurplus =
    projectedSavingsAtRetirement - totalNeededAtRetirement;

  // Calculate additional monthly savings needed if there's a shortfall
  let monthlyAdditionalSavingsNeeded = 0;
  if (shortfallOrSurplus < 0) {
    const additionalNeeded = Math.abs(shortfallOrSurplus);
    if (monthlyReturnRate > 0) {
      monthlyAdditionalSavingsNeeded =
        (additionalNeeded * monthlyReturnRate) /
        (Math.pow(1 + monthlyReturnRate, monthsToRetirement) - 1);
    } else {
      monthlyAdditionalSavingsNeeded = additionalNeeded / monthsToRetirement;
    }
  }

  const totalContributionsByRetirement =
    monthlyContribution * monthsToRetirement;

  return {
    yearsToRetirement,
    yearsInRetirement,
    incomeNeededAtRetirement,
    totalNeededAtRetirement,
    projectedSavingsAtRetirement,
    shortfallOrSurplus,
    monthlyAdditionalSavingsNeeded,
    totalContributionsByRetirement,
    finalRetirementSavings: projectedSavingsAtRetirement,
  };
}

// Calculator 2: How can you save for retirement?
export function calculateSavingsNeeded(
  params: SavingsFormValues
): SavingsResults {
  const {
    currentAge,
    retirementAge,
    amountNeededAtRetirement,
    currentRetirementSavings,
    averageInvestmentReturn,
  } = params;

  const yearsToRetirement = retirementAge - currentAge;
  const monthsToRetirement = yearsToRetirement * 12;
  const monthlyRate = averageInvestmentReturn / 100 / 12;

  // Future value of current savings
  const futureValueCurrentSavings =
    currentRetirementSavings *
    Math.pow(1 + averageInvestmentReturn / 100, yearsToRetirement);

  // Additional amount needed
  const additionalNeeded = amountNeededAtRetirement - futureValueCurrentSavings;

  let monthlyContributionNeeded = 0;
  let annualContributionNeeded = 0;

  if (additionalNeeded > 0) {
    if (monthlyRate > 0) {
      monthlyContributionNeeded =
        (additionalNeeded * monthlyRate) /
        (Math.pow(1 + monthlyRate, monthsToRetirement) - 1);
    } else {
      monthlyContributionNeeded = additionalNeeded / monthsToRetirement;
    }
    annualContributionNeeded = monthlyContributionNeeded * 12;
  }

  const totalContributions = monthlyContributionNeeded * monthsToRetirement;
  const totalGrowth = additionalNeeded - totalContributions;

  return {
    yearsToRetirement,
    monthlyContributionNeeded,
    annualContributionNeeded,
    totalContributions,
    totalGrowth,
  };
}

// Calculator 3: How much can you withdraw after retirement?
export function calculateWithdrawalAmount(
  params: WithdrawalFormValues
): WithdrawalResults {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentRetirementSavings,
    annualContribution,
    monthlyContribution,
    averageInvestmentReturn,
    inflationRate,
  } = params;

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;
  const monthsToRetirement = yearsToRetirement * 12;
  const monthsInRetirement = yearsInRetirement * 12;
  const monthlyRate = averageInvestmentReturn / 100 / 12;

  // Calculate savings at retirement
  const futureValueCurrentSavings =
    currentRetirementSavings *
    Math.pow(1 + averageInvestmentReturn / 100, yearsToRetirement);

  // Future value of annual contributions
  let futureValueAnnualContributions = 0;
  if (annualContribution > 0) {
    const annualRate = averageInvestmentReturn / 100;
    if (annualRate > 0) {
      futureValueAnnualContributions =
        (annualContribution *
          (Math.pow(1 + annualRate, yearsToRetirement) - 1)) /
        annualRate;
    } else {
      futureValueAnnualContributions = annualContribution * yearsToRetirement;
    }
  }

  // Future value of monthly contributions
  let futureValueMonthlyContributions = 0;
  if (monthlyContribution > 0) {
    if (monthlyRate > 0) {
      futureValueMonthlyContributions =
        (monthlyContribution *
          (Math.pow(1 + monthlyRate, monthsToRetirement) - 1)) /
        monthlyRate;
    } else {
      futureValueMonthlyContributions =
        monthlyContribution * monthsToRetirement;
    }
  }

  const savingsAtRetirement =
    futureValueCurrentSavings +
    futureValueAnnualContributions +
    futureValueMonthlyContributions;

  // Calculate monthly withdrawal amount (PMT function)
  let monthlyWithdrawalAmount = 0;
  if (monthlyRate > 0) {
    monthlyWithdrawalAmount =
      (savingsAtRetirement * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -monthsInRetirement));
  } else {
    monthlyWithdrawalAmount = savingsAtRetirement / monthsInRetirement;
  }

  // Calculate inflation-adjusted withdrawal amount
  const inflationFactor = Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const monthlyWithdrawalAmountInflationAdjusted =
    monthlyWithdrawalAmount / inflationFactor;

  const totalWithdrawals = monthlyWithdrawalAmount * monthsInRetirement;

  return {
    savingsAtRetirement,
    monthlyWithdrawalAmount,
    monthlyWithdrawalAmountInflationAdjusted,
    totalWithdrawals,
    yearsInRetirement,
  };
}

// Calculator 4: How long can your money last?
export function calculateMoneyDuration(
  params: DurationFormValues
): DurationResults {
  const { currentAmount, monthlyWithdrawal, averageInvestmentReturn } = params;

  const monthlyRate = averageInvestmentReturn / 100 / 12;

  let monthsLastingTotal = 0;

  if (monthlyWithdrawal <= 0) {
    // Money lasts forever if no withdrawals
    monthsLastingTotal = Infinity;
  } else if (monthlyRate <= 0) {
    // No growth, simple division
    monthsLastingTotal = currentAmount / monthlyWithdrawal;
  } else {
    // With growth, use logarithmic formula
    const factor = 1 + (currentAmount * monthlyRate) / monthlyWithdrawal;
    if (factor <= 1) {
      // Withdrawal rate is too high, money won't last
      monthsLastingTotal = 0;
    } else {
      monthsLastingTotal = Math.log(factor) / Math.log(1 + monthlyRate);
    }
  }

  const yearsLasting = Math.floor(monthsLastingTotal / 12);
  const monthsLasting = Math.round(monthsLastingTotal % 12);
  const totalWithdrawn = monthlyWithdrawal * monthsLastingTotal;

  // Calculate depletion date
  const depletionDate = new Date();
  depletionDate.setMonth(depletionDate.getMonth() + monthsLastingTotal);

  return {
    monthsLastingTotal,
    yearsLasting,
    monthsLasting,
    totalWithdrawn,
    depletionDate,
  };
}

// Helper function to calculate present value of annuity
export function presentValueOfAnnuity(
  payment: number,
  rate: number,
  periods: number
): number {
  if (rate === 0) {
    return payment * periods;
  }
  return (payment * (1 - Math.pow(1 + rate, -periods))) / rate;
}

// Helper function to calculate future value of annuity
export function futureValueOfAnnuity(
  payment: number,
  rate: number,
  periods: number
): number {
  if (rate === 0) {
    return payment * periods;
  }
  return (payment * (Math.pow(1 + rate, periods) - 1)) / rate;
}

// Helper function to calculate payment amount for annuity
export function paymentFromPresentValue(
  presentValue: number,
  rate: number,
  periods: number
): number {
  if (rate === 0) {
    return presentValue / periods;
  }
  return (presentValue * rate) / (1 - Math.pow(1 + rate, -periods));
}

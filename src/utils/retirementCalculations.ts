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

  // Calculate income needed after retirement (annual amount, in future dollars, at retirement)
  let incomeNeededAtRetirement: number;
  if (incomeAfterRetirementUnit === IncomeAfterRetirementUnit.PERCENTAGE) {
    // If percentage, it's % of CURRENT income, then that amount is inflated to retirement
    const targetAnnualIncomeInTodayDollars =
      currentIncome * (incomeAfterRetirement / 100);
    incomeNeededAtRetirement =
      targetAnnualIncomeInTodayDollars *
      Math.pow(1 + inflationRate / 100, yearsToRetirement);
  } else {
    // DOLLAR unit
    // Dollar amount is provided in today's money, adjust for inflation to retirement
    incomeNeededAtRetirement =
      incomeAfterRetirement * // This is the annual dollar amount in today's money
      Math.pow(1 + inflationRate / 100, yearsToRetirement);
  }

  // Adjust other income for inflation (params.otherIncomeAfterRetirement is monthly)
  const otherIncomeAtRetirement =
    otherIncomeAfterRetirement *
    12 *
    Math.pow(1 + inflationRate / 100, yearsToRetirement);

  // Calculate net income needed (annually)
  const netIncomeNeeded = incomeNeededAtRetirement - otherIncomeAtRetirement;

  // Calculate total needed at retirement
  const realRate =
    (1 + averageInvestmentReturn / 100) / (1 + inflationRate / 100) - 1;
  const monthlyRealRate = realRate / 12;
  const totalMonths = yearsInRetirement * 12;

  // Calculate the present value of inflation-adjusted withdrawals
  let totalNeededAtRetirement: number;
  if (realRate > 0) {
    // Use real rate of return for present value calculation
    totalNeededAtRetirement =
      ((netIncomeNeeded / 12) *
        (1 - Math.pow(1 + monthlyRealRate, -totalMonths))) /
      monthlyRealRate;
  } else {
    totalNeededAtRetirement = (netIncomeNeeded / 12) * totalMonths;
  }

  // Add safety margins
  const marketVolatilityBuffer = 1.15; // 15% buffer for market volatility
  const unexpectedExpensesBuffer = 1.1; // 10% buffer for unexpected expenses
  totalNeededAtRetirement *= marketVolatilityBuffer * unexpectedExpensesBuffer;

  // Calculate projected savings at retirement
  const monthlyReturnRate = averageInvestmentReturn / 100 / 12;
  const monthsToRetirement = yearsToRetirement * 12;

  // Future value of current savings with compound growth
  const futureValueCurrentSavings =
    currentRetirementSavings *
    Math.pow(1 + averageInvestmentReturn / 100, yearsToRetirement);

  // Calculate future contributions with salary growth
  let futureValueContributions = 0;
  if (futureSavingsUnit === FutureSavingsUnit.PERCENTAGE) {
    // For percentage-based savings, calculate year by year
    let annualSavings = (currentIncome * futureSavings) / 100;

    // Calculate contributions and growth for each year
    for (let year = 0; year < yearsToRetirement; year++) {
      // Calculate this year's contribution with salary growth
      const thisYearContribution =
        annualSavings * Math.pow(1 + incomeIncrease / 100, year);

      // Calculate growth on this year's contribution
      const yearsToGrow = yearsToRetirement - year;
      const futureValueOfThisYear =
        thisYearContribution *
        Math.pow(1 + averageInvestmentReturn / 100, yearsToGrow);

      futureValueContributions += futureValueOfThisYear;
    }
  } else {
    // For fixed dollar amount
    const annualSavings = futureSavings;
    futureValueContributions = futureValueOfAnnuity(
      annualSavings,
      averageInvestmentReturn / 100,
      yearsToRetirement
    );
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

  const totalContributionsByRetirement = futureValueContributions;

  return {
    currentAge,
    currentSavings: currentRetirementSavings,
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

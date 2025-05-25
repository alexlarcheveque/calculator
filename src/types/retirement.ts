export enum RetirementCalculatorType {
  HOW_MUCH_NEEDED = "How much do you need to retire?",
  HOW_TO_SAVE = "How can you save for retirement?",
  HOW_MUCH_WITHDRAW = "How much can you withdraw after retirement?",
  HOW_LONG_LAST = "How long can your money last?",
}

export enum IncomeAfterRetirementUnit {
  PERCENTAGE = "percentage",
  DOLLAR = "dollar",
}

export enum FutureSavingsUnit {
  PERCENTAGE = "percentage",
  DOLLAR = "dollar",
}

// Calculator 1: How much do you need to retire?
export interface RetirementFormValues {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentIncome: number;
  incomeIncrease: number;
  incomeAfterRetirement: number;
  incomeAfterRetirementUnit: IncomeAfterRetirementUnit;
  averageInvestmentReturn: number;
  inflationRate: number;
  otherIncomeAfterRetirement: number;
  currentRetirementSavings: number;
  futureSavings: number;
  futureSavingsUnit: FutureSavingsUnit;
}

export interface RetirementResults {
  yearsToRetirement: number;
  yearsInRetirement: number;
  incomeNeededAtRetirement: number;
  totalNeededAtRetirement: number;
  projectedSavingsAtRetirement: number;
  shortfallOrSurplus: number;
  monthlyAdditionalSavingsNeeded: number;
  totalContributionsByRetirement: number;
  finalRetirementSavings: number;
}

// Calculator 2: How can you save for retirement?
export interface SavingsFormValues {
  currentAge: number;
  retirementAge: number;
  amountNeededAtRetirement: number;
  currentRetirementSavings: number;
  averageInvestmentReturn: number;
}

export interface SavingsResults {
  yearsToRetirement: number;
  monthlyContributionNeeded: number;
  annualContributionNeeded: number;
  totalContributions: number;
  totalGrowth: number;
}

// Calculator 3: How much can you withdraw after retirement?
export interface WithdrawalFormValues {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentRetirementSavings: number;
  annualContribution: number;
  monthlyContribution: number;
  averageInvestmentReturn: number;
  inflationRate: number;
}

export interface WithdrawalResults {
  savingsAtRetirement: number;
  monthlyWithdrawalAmount: number;
  monthlyWithdrawalAmountInflationAdjusted: number;
  totalWithdrawals: number;
  yearsInRetirement: number;
}

// Calculator 4: How long can your money last?
export interface DurationFormValues {
  currentAmount: number;
  monthlyWithdrawal: number;
  averageInvestmentReturn: number;
}

export interface DurationResults {
  monthsLastingTotal: number;
  yearsLasting: number;
  monthsLasting: number;
  totalWithdrawn: number;
  depletionDate: Date;
}

export interface RetirementCalculationParams {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentIncome: number;
  incomeIncrease: number;
  incomeAfterRetirement: number;
  incomeAfterRetirementUnit: IncomeAfterRetirementUnit;
  averageInvestmentReturn: number;
  inflationRate: number;
  otherIncomeAfterRetirement: number;
  currentRetirementSavings: number;
  futureSavings: number;
  futureSavingsUnit: FutureSavingsUnit;
}

export enum CalculatorType {
  END_AMOUNT = "End Amount",
  ADDITIONAL_CONTRIBUTION = "Additional Contribution",
  RETURN_RATE = "Return Rate",
  STARTING_AMOUNT = "Starting Amount",
  INVESTMENT_LENGTH = "Investment Length",
}

export enum CompoundFrequency {
  ANNUALLY = "Annually",
  SEMIANNUALLY = "Semiannually",
  QUARTERLY = "Quarterly",
  MONTHLY = "Monthly",
  SEMIMONTHLY = "Semimonthly",
  BIWEEKLY = "Biweekly",
  WEEKLY = "Weekly",
  DAILY = "Daily",
  CONTINUOUSLY = "Continuously",
}

export enum ContributionTiming {
  BEGINNING = "beginning",
  END = "end",
}

export enum ContributionFrequency {
  MONTHLY = "monthly",
  ANNUALLY = "annually",
}

export interface InvestmentFormValues {
  calculatorType: CalculatorType;
  startingAmount: number;
  targetAmount: number;
  additionalContribution: number;
  returnRate: number;
  investmentLength: number;
  compoundFrequency: CompoundFrequency;
  contributionTiming: ContributionTiming;
  contributionFrequency: ContributionFrequency;
}

export interface InvestmentResults {
  endBalance: number;
  startingAmount: number;
  totalContributions: number;
  totalInterest: number;
  calculatedValue?: number; // The value that was calculated based on calculator type
}

export interface AccumulationDataPoint {
  year: number;
  deposit: number;
  interest: number;
  endingBalance: number;
  totalContributions: number;
  totalInterest: number;
}

export interface MonthlyAccumulationDataPoint {
  month: number;
  year: number;
  deposit: number;
  interest: number;
  endingBalance: number;
}

export interface InvestmentCalculationParams {
  startingAmount: number;
  additionalContribution: number;
  returnRate: number;
  investmentLength: number;
  compoundFrequency: CompoundFrequency;
  contributionTiming: ContributionTiming;
  contributionFrequency: ContributionFrequency;
  targetAmount?: number;
}

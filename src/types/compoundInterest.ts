export enum CompoundingFrequency {
  ANNUALLY = "annually",
  SEMIANNUALLY = "semiannually",
  QUARTERLY = "quarterly",
  MONTHLY = "monthly",
  SEMIMONTHLY = "semimonthly",
  BIWEEKLY = "biweekly",
  WEEKLY = "weekly",
  DAILY = "daily",
  CONTINUOUSLY = "continuously",
}

export interface CompoundInterestFormValues {
  inputInterestRate: number;
  inputCompoundingFrequency: CompoundingFrequency;
  outputCompoundingFrequency: CompoundingFrequency;
}

export interface CompoundInterestResults {
  inputRate: number;
  inputFrequency: CompoundingFrequency;
  outputRate: number;
  outputFrequency: CompoundingFrequency;
  effectiveAnnualRate: number;
}

export interface CompoundInterestCalculationParams {
  interestRate: number;
  inputFrequency: CompoundingFrequency;
  outputFrequency: CompoundingFrequency;
}

export interface CompoundInterestGrowthDataPoint {
  year: number;
  principal: number;
  interest: number;
  totalValue: number;
}

export interface CompoundInterestExampleParams {
  principal: number;
  interestRate: number;
  compoundingFrequency: CompoundingFrequency;
  timeYears: number;
}

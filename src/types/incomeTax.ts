export enum FilingStatus {
  SINGLE = "Single",
  MARRIED_JOINT = "MarriedJoint",
  MARRIED_SEPARATELY = "MarriedSeparately",
  HEAD_OF_HOUSEHOLD = "HeadofHousehold",
  QUALIFIED_WIDOW = "Widow",
}

export enum TaxYear {
  YEAR_2024 = "2024",
  YEAR_2025 = "2025",
}

export interface IncomeTaxFormValues {
  filingStatus: FilingStatus;
  youngDependents: number;
  otherDependents: number;
  taxYear: TaxYear;

  // Person 1 Income
  salaryIncome: number;
  federalTaxWithheld: number;
  stateTaxWithheld: number;
  localTaxWithheld: number;
  hasBusiness: boolean;
  businessIncome: number;
  estimatedTaxPaid: number;
  medicareWages: number;

  // Person 2 Income (for married filing jointly)
  salaryIncome2: number;
  federalTaxWithheld2: number;
  stateTaxWithheld2: number;
  localTaxWithheld2: number;
  hasBusiness2: boolean;
  businessIncome2: number;
  estimatedTaxPaid2: number;
  medicareWages2: number;

  // Other Income
  interestIncome: number;
  ordinaryDividends: number;
  qualifiedDividends: number;
  passiveIncome: number;
  shortTermCapitalGain: number;
  longTermCapitalGain: number;
  otherIncome: number;
  stateLocalTaxRate: number;

  // Deductions & Credits
  iraContributions: number;
  realEstateTax: number;
  mortgageInterest: number;
  charitableDonations: number;
  studentLoanInterest: number;
  childCareExpense: number;
  tuition1: number;
  tuition2: number;
  tuition3: number;
  tuition4: number;
  otherDeductibles: number;
}

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface TaxBrackets {
  single: TaxBracket[];
  marriedJoint: TaxBracket[];
  marriedSeparately: TaxBracket[];
  headOfHousehold: TaxBracket[];
  qualifiedWidow: TaxBracket[];
}

export interface StandardDeductions {
  single: number;
  marriedJoint: number;
  marriedSeparately: number;
  headOfHousehold: number;
  qualifiedWidow: number;
}

export interface IncomeTaxResults {
  grossIncome: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  standardDeduction: number;
  itemizedDeductions: number;
  deductionUsed: number;
  federalTaxOwed: number;
  totalTaxWithheld: number;
  refundOrOwed: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  totalCredits: number;
  childTaxCredit: number;
  childCareCredit: number;
  educationCredit: number;
  earnedIncomeCredit: number;
}

export interface TaxCalculationBreakdown {
  taxByBracket: Array<{
    bracket: TaxBracket;
    taxableAmount: number;
    taxOwed: number;
  }>;
  deductionsBreakdown: {
    standardDeduction: number;
    itemizedDeductions: {
      realEstateTax: number;
      mortgageInterest: number;
      charitableDonations: number;
      stateLocalTax: number;
      otherDeductibles: number;
      total: number;
    };
  };
  creditsBreakdown: {
    childTaxCredit: number;
    childCareCredit: number;
    educationCredit: number;
    earnedIncomeCredit: number;
    total: number;
  };
}

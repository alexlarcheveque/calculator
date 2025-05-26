import {
  IncomeTaxFormValues,
  IncomeTaxResults,
  TaxCalculationBreakdown,
  TaxBrackets,
  StandardDeductions,
  FilingStatus,
  TaxYear,
  TaxBracket,
} from "@/types/incomeTax";

// 2024 Tax Brackets
const TAX_BRACKETS_2024: TaxBrackets = {
  single: [
    { min: 0, max: 11600, rate: 0.1 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  marriedJoint: [
    { min: 0, max: 23200, rate: 0.1 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  marriedSeparately: [
    { min: 0, max: 11600, rate: 0.1 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 365600, rate: 0.35 },
    { min: 365600, max: Infinity, rate: 0.37 },
  ],
  headOfHousehold: [
    { min: 0, max: 16550, rate: 0.1 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  qualifiedWidow: [
    { min: 0, max: 23200, rate: 0.1 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
};

// 2025 Tax Brackets
const TAX_BRACKETS_2025: TaxBrackets = {
  single: [
    { min: 0, max: 11925, rate: 0.1 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
  marriedJoint: [
    { min: 0, max: 23850, rate: 0.1 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 },
  ],
  marriedSeparately: [
    { min: 0, max: 11925, rate: 0.1 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 375800, rate: 0.35 },
    { min: 375800, max: Infinity, rate: 0.37 },
  ],
  headOfHousehold: [
    { min: 0, max: 17000, rate: 0.1 },
    { min: 17000, max: 64850, rate: 0.12 },
    { min: 64850, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250500, rate: 0.32 },
    { min: 250500, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
  qualifiedWidow: [
    { min: 0, max: 23850, rate: 0.1 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 },
  ],
};

// Standard Deductions
const STANDARD_DEDUCTIONS_2024: StandardDeductions = {
  single: 14600,
  marriedJoint: 29200,
  marriedSeparately: 14600,
  headOfHousehold: 21900,
  qualifiedWidow: 29200,
};

const STANDARD_DEDUCTIONS_2025: StandardDeductions = {
  single: 15000,
  marriedJoint: 30000,
  marriedSeparately: 15000,
  headOfHousehold: 22500,
  qualifiedWidow: 30000,
};

export function calculateIncomeTax(
  values: IncomeTaxFormValues
): IncomeTaxResults {
  const taxBrackets =
    values.taxYear === TaxYear.YEAR_2024
      ? TAX_BRACKETS_2024
      : TAX_BRACKETS_2025;
  const standardDeductions =
    values.taxYear === TaxYear.YEAR_2024
      ? STANDARD_DEDUCTIONS_2024
      : STANDARD_DEDUCTIONS_2025;

  // Calculate gross income
  const grossIncome = calculateGrossIncome(values);

  // Calculate adjusted gross income (AGI)
  const adjustedGrossIncome = calculateAGI(grossIncome, values);

  // Calculate deductions
  const standardDeduction = getStandardDeduction(
    values.filingStatus,
    standardDeductions
  );
  const itemizedDeductions = calculateItemizedDeductions(values);
  const deductionUsed = Math.max(standardDeduction, itemizedDeductions);

  // Calculate taxable income
  const taxableIncome = Math.max(0, adjustedGrossIncome - deductionUsed);

  // Calculate federal tax owed
  const federalTaxOwed = calculateFederalTax(
    taxableIncome,
    values.filingStatus,
    taxBrackets
  );

  // Calculate credits
  const credits = calculateTaxCredits(values, adjustedGrossIncome);
  const totalCredits =
    credits.childTaxCredit +
    credits.childCareCredit +
    credits.educationCredit +
    credits.earnedIncomeCredit;

  // Apply credits to tax owed
  const taxAfterCredits = Math.max(0, federalTaxOwed - totalCredits);

  // Calculate total tax withheld
  const totalTaxWithheld =
    values.federalTaxWithheld +
    values.federalTaxWithheld2 +
    values.estimatedTaxPaid +
    values.estimatedTaxPaid2;

  // Calculate refund or amount owed
  const refundOrOwed = totalTaxWithheld - taxAfterCredits;

  // Calculate tax rates
  const effectiveTaxRate =
    grossIncome > 0 ? (taxAfterCredits / grossIncome) * 100 : 0;
  const marginalTaxRate = getMarginalTaxRate(
    taxableIncome,
    values.filingStatus,
    taxBrackets
  );

  return {
    grossIncome,
    adjustedGrossIncome,
    taxableIncome,
    standardDeduction,
    itemizedDeductions,
    deductionUsed,
    federalTaxOwed: taxAfterCredits,
    totalTaxWithheld,
    refundOrOwed,
    effectiveTaxRate,
    marginalTaxRate,
    totalCredits,
    childTaxCredit: credits.childTaxCredit,
    childCareCredit: credits.childCareCredit,
    educationCredit: credits.educationCredit,
    earnedIncomeCredit: credits.earnedIncomeCredit,
  };
}

function calculateGrossIncome(values: IncomeTaxFormValues): number {
  let grossIncome = 0;

  // Person 1 income
  grossIncome += values.salaryIncome;
  if (values.hasBusiness) {
    grossIncome += values.businessIncome;
  }

  // Person 2 income (if married filing jointly)
  if (values.filingStatus === FilingStatus.MARRIED_JOINT) {
    grossIncome += values.salaryIncome2;
    if (values.hasBusiness2) {
      grossIncome += values.businessIncome2;
    }
  }

  // Other income
  grossIncome += values.interestIncome;
  grossIncome += values.ordinaryDividends;
  grossIncome += values.qualifiedDividends;
  grossIncome += values.passiveIncome;
  grossIncome += values.shortTermCapitalGain;
  grossIncome += values.longTermCapitalGain;
  grossIncome += values.otherIncome;

  return grossIncome;
}

function calculateAGI(
  grossIncome: number,
  values: IncomeTaxFormValues
): number {
  let agi = grossIncome;

  // Above-the-line deductions
  agi -= values.iraContributions;
  agi -= Math.min(values.studentLoanInterest, 2500); // Student loan interest cap

  return Math.max(0, agi);
}

function getStandardDeduction(
  filingStatus: FilingStatus,
  standardDeductions: StandardDeductions
): number {
  switch (filingStatus) {
    case FilingStatus.SINGLE:
      return standardDeductions.single;
    case FilingStatus.MARRIED_JOINT:
      return standardDeductions.marriedJoint;
    case FilingStatus.MARRIED_SEPARATELY:
      return standardDeductions.marriedSeparately;
    case FilingStatus.HEAD_OF_HOUSEHOLD:
      return standardDeductions.headOfHousehold;
    case FilingStatus.QUALIFIED_WIDOW:
      return standardDeductions.qualifiedWidow;
    default:
      return standardDeductions.single;
  }
}

function calculateItemizedDeductions(values: IncomeTaxFormValues): number {
  let itemized = 0;

  // SALT deduction (capped at $10,000)
  const saltDeduction = Math.min(
    values.realEstateTax + values.stateTaxWithheld + values.stateTaxWithheld2,
    10000
  );
  itemized += saltDeduction;

  // Mortgage interest
  itemized += values.mortgageInterest;

  // Charitable donations
  itemized += values.charitableDonations;

  // Other deductibles
  itemized += values.otherDeductibles;

  return itemized;
}

function calculateFederalTax(
  taxableIncome: number,
  filingStatus: FilingStatus,
  taxBrackets: TaxBrackets
): number {
  let brackets: TaxBracket[];

  switch (filingStatus) {
    case FilingStatus.SINGLE:
      brackets = taxBrackets.single;
      break;
    case FilingStatus.MARRIED_JOINT:
      brackets = taxBrackets.marriedJoint;
      break;
    case FilingStatus.MARRIED_SEPARATELY:
      brackets = taxBrackets.marriedSeparately;
      break;
    case FilingStatus.HEAD_OF_HOUSEHOLD:
      brackets = taxBrackets.headOfHousehold;
      break;
    case FilingStatus.QUALIFIED_WIDOW:
      brackets = taxBrackets.qualifiedWidow;
      break;
    default:
      brackets = taxBrackets.single;
  }

  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const taxableAtThisBracket = Math.min(
      remainingIncome,
      bracket.max - bracket.min
    );
    tax += taxableAtThisBracket * bracket.rate;
    remainingIncome -= taxableAtThisBracket;
  }

  return tax;
}

function getMarginalTaxRate(
  taxableIncome: number,
  filingStatus: FilingStatus,
  taxBrackets: TaxBrackets
): number {
  let brackets: TaxBracket[];

  switch (filingStatus) {
    case FilingStatus.SINGLE:
      brackets = taxBrackets.single;
      break;
    case FilingStatus.MARRIED_JOINT:
      brackets = taxBrackets.marriedJoint;
      break;
    case FilingStatus.MARRIED_SEPARATELY:
      brackets = taxBrackets.marriedSeparately;
      break;
    case FilingStatus.HEAD_OF_HOUSEHOLD:
      brackets = taxBrackets.headOfHousehold;
      break;
    case FilingStatus.QUALIFIED_WIDOW:
      brackets = taxBrackets.qualifiedWidow;
      break;
    default:
      brackets = taxBrackets.single;
  }

  for (const bracket of brackets) {
    if (taxableIncome >= bracket.min && taxableIncome < bracket.max) {
      return bracket.rate * 100;
    }
  }

  return brackets[brackets.length - 1].rate * 100;
}

function calculateTaxCredits(values: IncomeTaxFormValues, agi: number) {
  // Child Tax Credit
  const totalChildren = values.youngDependents;
  let childTaxCredit = totalChildren * 2000; // $2,000 per child

  // Phase out child tax credit for high earners
  const phaseOutThreshold =
    values.filingStatus === FilingStatus.MARRIED_JOINT ? 400000 : 200000;
  if (agi > phaseOutThreshold) {
    const phaseOutAmount = Math.floor((agi - phaseOutThreshold) / 1000) * 50;
    childTaxCredit = Math.max(0, childTaxCredit - phaseOutAmount);
  }

  // Child and Dependent Care Credit
  let childCareCredit = 0;
  if (values.childCareExpense > 0) {
    const maxExpense = Math.min(
      values.childCareExpense,
      totalChildren > 1 ? 6000 : 3000
    );
    const creditRate =
      agi <= 15000
        ? 0.35
        : Math.max(0.2, 0.35 - Math.floor((agi - 15000) / 2000) * 0.01);
    childCareCredit = maxExpense * creditRate;
  }

  // Education Credit (American Opportunity Credit)
  let educationCredit = 0;
  const totalTuition =
    values.tuition1 + values.tuition2 + values.tuition3 + values.tuition4;
  if (totalTuition > 0) {
    // Simplified calculation - up to $2,500 per student
    const students = [
      values.tuition1,
      values.tuition2,
      values.tuition3,
      values.tuition4,
    ].filter((t) => t > 0).length;
    educationCredit = Math.min(students * 2500, totalTuition * 0.4);
  }

  // Earned Income Tax Credit (simplified)
  let earnedIncomeCredit = 0;
  const earnedIncome = values.salaryIncome + values.salaryIncome2;
  if (earnedIncome > 0 && earnedIncome < 50000 && totalChildren > 0) {
    // Very simplified EITC calculation
    earnedIncomeCredit = Math.min(totalChildren * 1000, earnedIncome * 0.1);
  }

  return {
    childTaxCredit,
    childCareCredit,
    educationCredit,
    earnedIncomeCredit,
  };
}

export function calculateTaxBreakdown(
  values: IncomeTaxFormValues
): TaxCalculationBreakdown {
  const taxBrackets =
    values.taxYear === TaxYear.YEAR_2024
      ? TAX_BRACKETS_2024
      : TAX_BRACKETS_2025;
  const standardDeductions =
    values.taxYear === TaxYear.YEAR_2024
      ? STANDARD_DEDUCTIONS_2024
      : STANDARD_DEDUCTIONS_2025;

  const grossIncome = calculateGrossIncome(values);
  const adjustedGrossIncome = calculateAGI(grossIncome, values);
  const standardDeduction = getStandardDeduction(
    values.filingStatus,
    standardDeductions
  );
  const itemizedDeductions = calculateItemizedDeductions(values);
  const deductionUsed = Math.max(standardDeduction, itemizedDeductions);
  const taxableIncome = Math.max(0, adjustedGrossIncome - deductionUsed);

  // Calculate tax by bracket
  let brackets: TaxBracket[];
  switch (values.filingStatus) {
    case FilingStatus.SINGLE:
      brackets = taxBrackets.single;
      break;
    case FilingStatus.MARRIED_JOINT:
      brackets = taxBrackets.marriedJoint;
      break;
    case FilingStatus.MARRIED_SEPARATELY:
      brackets = taxBrackets.marriedSeparately;
      break;
    case FilingStatus.HEAD_OF_HOUSEHOLD:
      brackets = taxBrackets.headOfHousehold;
      break;
    case FilingStatus.QUALIFIED_WIDOW:
      brackets = taxBrackets.qualifiedWidow;
      break;
    default:
      brackets = taxBrackets.single;
  }

  const taxByBracket = [];
  let remainingIncome = taxableIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const taxableAmount = Math.min(remainingIncome, bracket.max - bracket.min);
    const taxOwed = taxableAmount * bracket.rate;

    if (taxableAmount > 0) {
      taxByBracket.push({
        bracket,
        taxableAmount,
        taxOwed,
      });
    }

    remainingIncome -= taxableAmount;
  }

  // Deductions breakdown
  const saltDeduction = Math.min(
    values.realEstateTax + values.stateTaxWithheld + values.stateTaxWithheld2,
    10000
  );
  const deductionsBreakdown = {
    standardDeduction,
    itemizedDeductions: {
      realEstateTax: values.realEstateTax,
      mortgageInterest: values.mortgageInterest,
      charitableDonations: values.charitableDonations,
      stateLocalTax: saltDeduction,
      otherDeductibles: values.otherDeductibles,
      total: itemizedDeductions,
    },
  };

  // Credits breakdown
  const credits = calculateTaxCredits(values, adjustedGrossIncome);
  const creditsBreakdown = {
    childTaxCredit: credits.childTaxCredit,
    childCareCredit: credits.childCareCredit,
    educationCredit: credits.educationCredit,
    earnedIncomeCredit: credits.earnedIncomeCredit,
    total:
      credits.childTaxCredit +
      credits.childCareCredit +
      credits.educationCredit +
      credits.earnedIncomeCredit,
  };

  return {
    taxByBracket,
    deductionsBreakdown,
    creditsBreakdown,
  };
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatCurrencyDetailed(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

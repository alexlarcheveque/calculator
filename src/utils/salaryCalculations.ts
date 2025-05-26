import {
  SalaryCalculationParams,
  SalaryResults,
  PayFrequency,
} from "@/types/salary";

export function calculateSalary({
  salaryAmount,
  payFrequency,
  hoursPerWeek,
  daysPerWeek,
  holidaysPerYear,
  vacationDaysPerYear,
}: SalaryCalculationParams): SalaryResults {
  // Constants for calculations
  const weeksPerYear = 52;
  const workingDaysPerYear = weeksPerYear * daysPerWeek;
  const adjustedWorkingDaysPerYear = workingDaysPerYear - holidaysPerYear - vacationDaysPerYear;
  const totalHoursPerYear = weeksPerYear * hoursPerWeek;
  const adjustedTotalHoursPerYear = (adjustedWorkingDaysPerYear / workingDaysPerYear) * totalHoursPerYear;

  // Convert input salary to annual amount (unadjusted)
  let annualSalaryUnadjusted = 0;

  switch (payFrequency) {
    case PayFrequency.HOURLY:
      annualSalaryUnadjusted = salaryAmount * totalHoursPerYear;
      break;
    case PayFrequency.DAILY:
      annualSalaryUnadjusted = salaryAmount * workingDaysPerYear;
      break;
    case PayFrequency.WEEKLY:
      annualSalaryUnadjusted = salaryAmount * weeksPerYear;
      break;
    case PayFrequency.BI_WEEKLY:
      annualSalaryUnadjusted = salaryAmount * 26; // 52 weeks / 2
      break;
    case PayFrequency.SEMI_MONTHLY:
      annualSalaryUnadjusted = salaryAmount * 24; // 12 months * 2
      break;
    case PayFrequency.MONTHLY:
      annualSalaryUnadjusted = salaryAmount * 12;
      break;
    case PayFrequency.QUARTERLY:
      annualSalaryUnadjusted = salaryAmount * 4;
      break;
    case PayFrequency.ANNUAL:
      annualSalaryUnadjusted = salaryAmount;
      break;
  }

  // Calculate unadjusted values
  const unadjusted = {
    annual: annualSalaryUnadjusted,
    quarterly: annualSalaryUnadjusted / 4,
    monthly: annualSalaryUnadjusted / 12,
    semiMonthly: annualSalaryUnadjusted / 24,
    biWeekly: annualSalaryUnadjusted / 26,
    weekly: annualSalaryUnadjusted / weeksPerYear,
    daily: annualSalaryUnadjusted / workingDaysPerYear,
    hourly: annualSalaryUnadjusted / totalHoursPerYear,
  };

  // Calculate adjusted values (accounting for holidays and vacation)
  // For hourly and daily inputs, we assume they are unadjusted values
  // For other frequencies, we assume they are already adjusted for holidays/vacation
  let annualSalaryAdjusted = 0;

  if (payFrequency === PayFrequency.HOURLY || payFrequency === PayFrequency.DAILY) {
    // These are assumed to be unadjusted, so we calculate adjusted based on reduced working time
    annualSalaryAdjusted = annualSalaryUnadjusted * (adjustedWorkingDaysPerYear / workingDaysPerYear);
  } else {
    // Other frequencies are assumed to be already adjusted for holidays/vacation
    annualSalaryAdjusted = annualSalaryUnadjusted * (adjustedWorkingDaysPerYear / workingDaysPerYear);
  }

  const adjusted = {
    annual: annualSalaryAdjusted,
    quarterly: annualSalaryAdjusted / 4,
    monthly: annualSalaryAdjusted / 12,
    semiMonthly: annualSalaryAdjusted / 24,
    biWeekly: annualSalaryAdjusted / 26,
    weekly: annualSalaryAdjusted / weeksPerYear,
    daily: annualSalaryAdjusted / adjustedWorkingDaysPerYear,
    hourly: annualSalaryAdjusted / adjustedTotalHoursPerYear,
  };

  return {
    unadjusted,
    adjusted,
    workingDaysPerYear,
    adjustedWorkingDaysPerYear,
    totalHoursPerYear,
    adjustedTotalHoursPerYear,
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

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatNumberWithCommas(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '';
  return numValue.toLocaleString("en-US");
} 
export enum PayFrequency {
  HOURLY = "Hourly",
  DAILY = "Daily",
  WEEKLY = "Weekly",
  BI_WEEKLY = "Bi-Weekly",
  SEMI_MONTHLY = "Semi-Monthly",
  MONTHLY = "Monthly",
  QUARTERLY = "Quarterly",
  ANNUAL = "Annual",
}

export interface SalaryFormValues {
  salaryAmount: number;
  payFrequency: PayFrequency;
  hoursPerWeek: number;
  daysPerWeek: number;
  holidaysPerYear: number;
  vacationDaysPerYear: number;
}

export interface SalaryResults {
  unadjusted: {
    hourly: number;
    daily: number;
    weekly: number;
    biWeekly: number;
    semiMonthly: number;
    monthly: number;
    quarterly: number;
    annual: number;
  };
  adjusted: {
    hourly: number;
    daily: number;
    weekly: number;
    biWeekly: number;
    semiMonthly: number;
    monthly: number;
    quarterly: number;
    annual: number;
  };
  workingDaysPerYear: number;
  adjustedWorkingDaysPerYear: number;
  totalHoursPerYear: number;
  adjustedTotalHoursPerYear: number;
}

export interface SalaryCalculationParams {
  salaryAmount: number;
  payFrequency: PayFrequency;
  hoursPerWeek: number;
  daysPerWeek: number;
  holidaysPerYear: number;
  vacationDaysPerYear: number;
}

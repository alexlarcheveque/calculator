export interface DateFormValues {
  startDate: string;
  endDate: string;
  includeEndDay: boolean;
  excludeWeekends: boolean;
  excludeHolidays: boolean;
  selectedHolidays: string[];
  customHolidays: CustomHoliday[];
}

export interface DateArithmeticValues {
  startDate: string;
  operation: "add" | "subtract";
  years: number;
  months: number;
  weeks: number;
  days: number;
  businessDaysOnly: boolean;
  excludeWeekends: boolean;
  excludeHolidays: boolean;
  selectedHolidays: string[];
  customHolidays: CustomHoliday[];
}

export interface DateDifferenceResult {
  years: number;
  months: number;
  weeks: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalYears: number;
  businessDays: number;
  weekendDays: number;
  holidayDays: number;
  isValid: boolean;
  startDate: Date;
  endDate: Date;
  breakdown: DateBreakdown;
}

export interface DateArithmeticResult {
  resultDate: Date;
  isValid: boolean;
  startDate: Date;
  operation: "add" | "subtract";
  yearsAdded: number;
  monthsAdded: number;
  weeksAdded: number;
  daysAdded: number;
  businessDaysCalculated: boolean;
}

export interface DateBreakdown {
  years: number;
  months: number;
  days: number;
}

export interface CustomHoliday {
  name: string;
  month: number;
  day: number;
}

export interface Holiday {
  id: string;
  name: string;
  isFixed: boolean;
  month?: number;
  day?: number;
  getDate?: (year: number) => Date;
}

export interface DateValidation {
  isValid: boolean;
  errors: string[];
  parsedDate?: Date;
}

export interface BusinessDayOptions {
  excludeWeekends: boolean;
  excludeHolidays: boolean;
  holidays: Holiday[];
  customHolidays: CustomHoliday[];
}

export interface DateCalculationMode {
  mode: "difference" | "arithmetic";
}

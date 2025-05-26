export interface TimeInput {
  hours: number;
  minutes: number;
  ampm: "AM" | "PM";
}

export interface HoursCalculationValues {
  startTime: TimeInput;
  endTime: TimeInput;
}

export interface HoursCalculationResult {
  totalHours: number;
  totalMinutes: number;
  isValid: boolean;
  formatted: string;
  breakdown: HoursBreakdown;
  error?: string;
}

export interface DateHoursCalculationValues {
  startDate: string;
  startTime: TimeInput;
  endDate: string;
  endTime: TimeInput;
}

export interface DateHoursCalculationResult {
  totalHours: number;
  totalMinutes: number;
  totalDays: number;
  isValid: boolean;
  formatted: string;
  breakdown: DateHoursBreakdown;
  error?: string;
}

export interface HoursBreakdown {
  hours: number;
  minutes: number;
  totalMinutes: number;
  decimalHours: number;
}

export interface DateHoursBreakdown {
  days: number;
  hours: number;
  minutes: number;
  totalHours: number;
  totalMinutes: number;
  decimalHours: number;
}

export interface TimeValidation {
  isValid: boolean;
  error?: string;
  normalizedTime?: TimeInput;
}

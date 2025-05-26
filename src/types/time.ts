export interface TimeValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeArithmeticValues {
  time1: TimeValue;
  time2: TimeValue;
  operation: "add" | "subtract";
}

export interface TimeArithmeticResult {
  result: TimeValue;
  isValid: boolean;
  totalSeconds: number;
  formatted: string;
  breakdown: TimeBreakdown;
}

export interface DateTimeValues {
  startDate: string;
  startTime: TimeValue;
  timeFormat: "12" | "24";
  ampm: "AM" | "PM";
  operation: "add" | "subtract";
  timeToAdd: TimeValue;
}

export interface DateTimeResult {
  resultDate: Date;
  resultTime: TimeValue;
  isValid: boolean;
  formatted: string;
  timeFormat: "12" | "24";
}

export interface TimeExpressionValues {
  expression: string;
}

export interface TimeExpressionResult {
  result: TimeValue;
  isValid: boolean;
  totalSeconds: number;
  formatted: string;
  parsedTokens: TimeToken[];
  error?: string;
}

export interface TimeToken {
  value: number;
  unit: "d" | "h" | "m" | "s";
  operator?: "+" | "-";
}

export interface TimeBreakdown {
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
}

export interface TimeValidation {
  isValid: boolean;
  errors: string[];
  normalizedTime?: TimeValue;
}

export interface TimeConversion {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
  years: number;
}

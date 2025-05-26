export interface AgeFormValues {
  birthDate: string;
  targetDate: string;
}

export interface AgeResult {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  isValid: boolean;
  birthDate: Date;
  targetDate: Date;
  nextBirthday?: {
    date: Date;
    daysUntil: number;
    age: number;
  };
}

export interface DateValidation {
  isValid: boolean;
  errors: string[];
  parsedDate?: Date;
}

export interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
}

export interface TimeBreakdown {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface LifeStatistics {
  totalDaysLived: number;
  totalWeeksLived: number;
  totalMonthsLived: number;
  totalHoursLived: number;
  totalMinutesLived: number;
  totalSecondsLived: number;
  heartbeats: number;
  breathsTaken: number;
  sleepHours: number;
}

export interface Milestones {
  name: string;
  age: number;
  date: Date;
  isPassed: boolean;
  daysUntil?: number;
}

export interface ZodiacSign {
  sign: string;
  symbol: string;
  element: string;
  dates: string;
  traits: string[];
}

export interface BirthDayInfo {
  dayOfWeek: string;
  dayOfYear: number;
  weekOfYear: number;
  zodiacSign: ZodiacSign;
  chineseZodiac: string;
  birthstone: string;
  birthFlower: string;
}

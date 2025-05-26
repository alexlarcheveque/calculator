export enum CalculationMethod {
  DUE_DATE = "Due Date",
  LAST_PERIOD = "Last Period",
  ULTRASOUND = "Ultrasound",
  CONCEPTION_DATE = "Conception Date",
  IVF_TRANSFER = "IVF Transfer Date",
}

export enum EmbryoAge {
  DAY_3 = 3,
  DAY_5 = 5,
  DAY_6 = 6,
}

export interface PregnancyFormValues {
  calculationMethod: CalculationMethod;
  dueDate: string;
  lastPeriodDate: string;
  cycleLength: number;
  conceptionDate: string;
  ultrasoundDate: string;
  ultrasoundWeeks: number;
  ultrasoundDays: number;
  ivfTransferDate: string;
  embryoAge: EmbryoAge;
}

export interface PregnancyResults {
  dueDate: Date;
  conceptionDate: Date;
  lastPeriodDate: Date;
  currentWeek: number;
  currentDay: number;
  daysUntilDue: number;
  trimester: number;
  gestationalAge: string;
  fetalAge: string;
  milestones: PregnancyMilestone[];
}

export interface PregnancyMilestone {
  week: number;
  date: Date;
  title: string;
  description: string;
  type: "development" | "appointment" | "test" | "preparation";
}

export interface PregnancyCalculationParams {
  method: CalculationMethod;
  date: Date;
  cycleLength?: number;
  ultrasoundWeeks?: number;
  ultrasoundDays?: number;
  embryoAge?: EmbryoAge;
}

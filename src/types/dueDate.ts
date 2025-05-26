export enum EstimationMethod {
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

export interface DueDateFormValues {
  estimationMethod: EstimationMethod;
  lastPeriodDate: Date;
  cycleLength: number;
  conceptionDate: Date;
  ultrasoundDate: Date;
  ultrasoundWeeks: number;
  ultrasoundDays: number;
  ivfTransferDate: Date;
  embryoAge: EmbryoAge;
}

export interface DueDateResults {
  dueDate: Date;
  gestationalAge: {
    weeks: number;
    days: number;
  };
  currentWeek: number;
  trimester: number;
  conceptionDate: Date;
  implantationDate: Date;
  firstTrimesterEnd: Date;
  secondTrimesterEnd: Date;
  thirdTrimesterEnd: Date;
  viabilityDate: Date;
  fullTermStart: Date;
  fullTermEnd: Date;
  daysUntilDue: number;
  percentageComplete: number;
}

export interface PregnancyMilestone {
  date: Date;
  week: number;
  description: string;
  category: "trimester" | "development" | "medical";
}

export interface DueDateCalculationParams {
  estimationMethod: EstimationMethod;
  lastPeriodDate?: Date;
  cycleLength?: number;
  conceptionDate?: Date;
  ultrasoundDate?: Date;
  ultrasoundWeeks?: number;
  ultrasoundDays?: number;
  ivfTransferDate?: Date;
  embryoAge?: EmbryoAge;
}

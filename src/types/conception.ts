export interface ConceptionFormValues {
  lastPeriodDate: Date;
  cycleLength: number;
}

export interface ConceptionResults {
  ovulationDate: Date;
  fertilityWindowStart: Date;
  fertilityWindowEnd: Date;
  conceptionDateRange: {
    earliest: Date;
    latest: Date;
    mostLikely: Date;
  };
  dueDate: Date;
  currentWeek?: number;
  currentDay?: number;
}

export interface FertilityPeriod {
  cycleNumber: number;
  ovulationDate: Date;
  fertilityWindowStart: Date;
  fertilityWindowEnd: Date;
  conceptionPossible: boolean;
  dueDate: Date;
}

export interface ConceptionCalculationParams {
  lastPeriodDate: Date;
  cycleLength: number;
  numberOfCycles?: number;
}

export enum CalculatorType {
  PACE = "Calculate Pace",
  TIME = "Calculate Time",
  DISTANCE = "Calculate Distance",
}

export enum DistanceUnit {
  MILES = "Miles",
  KILOMETERS = "Kilometers",
  METERS = "Meters",
  YARDS = "Yards",
}

export enum PaceUnit {
  TIME_PER_MILE = "tpm",
  TIME_PER_KILOMETER = "tpk",
  MILES_PER_HOUR = "mph",
  KILOMETERS_PER_HOUR = "kph",
  METERS_PER_MINUTE = "mpm",
  METERS_PER_SECOND = "mps",
  YARDS_PER_MINUTE = "ypm",
  YARDS_PER_SECOND = "yps",
}

export interface PaceFormValues {
  calculatorType: CalculatorType;
  time: string; // Format: "hh:mm:ss"
  distance: number;
  distanceUnit: DistanceUnit;
  pace: string; // Format: "hh:mm:ss" for time-based units
  paceUnit: PaceUnit;
}

export interface PaceResults {
  calculatedValue: string;
  pace: string;
  speed: string;
  timeFormatted: string;
  distanceFormatted: string;
  splits: SplitTime[];
}

export interface SplitTime {
  distance: string;
  time: string;
  unit: string;
}

export interface MultipointSegment {
  distance: number;
  distanceUnit: DistanceUnit;
  time: string; // Format: "hh:mm:ss"
}

export interface MultipointFormValues {
  segments: MultipointSegment[];
  preferredPaceUnit: PaceUnit;
}

export interface MultipointResults {
  segments: MultipointSegmentResult[];
  totalDistance: number;
  totalTime: string;
  averagePace: string;
}

export interface MultipointSegmentResult {
  segmentNumber: number;
  distance: string;
  segmentTime: string;
  pace: string;
  speed: string;
}

export interface PaceConverterFormValues {
  fromPace: string;
  fromPaceUnit: PaceUnit;
  toPaceUnit: PaceUnit;
}

export interface PaceConverterResults {
  convertedPace: string;
  fromFormatted: string;
  toFormatted: string;
}

export interface FinishTimeFormValues {
  currentDistance: number;
  currentDistanceUnit: DistanceUnit;
  elapsedTime: string;
  fullDistance: number;
  fullDistanceUnit: DistanceUnit;
}

export interface FinishTimeResults {
  estimatedFinishTime: string;
  remainingTime: string;
  remainingDistance: string;
  currentPace: string;
  projectedTotalTime: string;
}

export interface WorldRecord {
  category: string;
  mensPace: string;
  womensPace: string;
}

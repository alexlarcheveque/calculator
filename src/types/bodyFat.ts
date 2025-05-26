export enum UnitSystem {
  US = "US Units",
  METRIC = "Metric Units",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export interface BodyFatFormValues {
  unitSystem: UnitSystem;
  gender: Gender;
  age: number;
  // US Units
  weightLbs: number;
  heightFeet: number;
  heightInches: number;
  neckFeet: number;
  neckInches: number;
  waistFeet: number;
  waistInches: number;
  hipFeet: number;
  hipInches: number;
  // Metric Units
  weightKg: number;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm: number;
}

export interface BodyFatResults {
  bodyFatPercentageNavy: number;
  bodyFatPercentageBMI: number;
  bodyFatCategory: string;
  bodyFatMass: number;
  leanBodyMass: number;
  idealBodyFatPercentage: number;
  bodyFatToLose: number;
  bmi: number;
  totalWeight: number;
  unitSystem: UnitSystem;
}

export interface BodyFatCalculationParams {
  gender: Gender;
  age: number;
  weight: number;
  height: number;
  neck: number;
  waist: number;
  hip?: number;
  unitSystem: UnitSystem;
}

export interface BodyFatCategory {
  name: string;
  menRange: string;
  womenRange: string;
  color: string;
}

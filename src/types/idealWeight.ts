export enum UnitSystem {
  IMPERIAL = "imperial",
  METRIC = "metric",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export interface IdealWeightFormValues {
  age: number;
  gender: Gender;
  unitSystem: UnitSystem;
  // Imperial units
  heightFeet: number;
  heightInches: number;
  // Metric units
  heightCm: number;
}

export interface IdealWeightResults {
  heightInCm: number;
  heightInInches: number;
  robinsonWeight: number;
  millerWeight: number;
  devineWeight: number;
  hamwiWeight: number;
  bmiRangeMin: number;
  bmiRangeMax: number;
  unitSystem: UnitSystem;
}

export interface FormulaResult {
  name: string;
  weight: number;
  description: string;
}

export interface IdealWeightCalculationParams {
  heightInCm: number;
  gender: Gender;
  unitSystem: UnitSystem;
}

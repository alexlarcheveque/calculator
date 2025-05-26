export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum ActivityLevel {
  BMR = "1",
  SEDENTARY = "1.2",
  LIGHT = "1.375",
  MODERATE = "1.465",
  ACTIVE = "1.55",
  VERY_ACTIVE = "1.725",
  EXTRA_ACTIVE = "1.9",
}

export enum BMRFormula {
  MIFFLIN = "mifflin",
  HARRIS_BENEDICT = "harris",
  KATCH_MCARDLE = "katch",
}

export enum UnitSystem {
  IMPERIAL = "imperial",
  METRIC = "metric",
}

export enum ResultUnit {
  CALORIES = "calories",
  KILOJOULES = "kilojoules",
}

export interface CalorieFormValues {
  age: number;
  gender: Gender;
  heightFeet: number;
  heightInches: number;
  heightCm: number;
  weightLbs: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  unitSystem: UnitSystem;
  resultUnit: ResultUnit;
  bmrFormula: BMRFormula;
  bodyFatPercentage?: number;
}

export interface CalorieResults {
  bmr: number;
  maintenanceCalories: number;
  weightLossCalories: {
    mild: number; // 0.5 lbs per week
    moderate: number; // 1 lb per week
    aggressive: number; // 2 lbs per week
  };
  weightGainCalories: {
    mild: number; // 0.5 lbs per week
    moderate: number; // 1 lb per week
    aggressive: number; // 2 lbs per week
  };
  macronutrients: {
    protein: { grams: number; calories: number; percentage: number };
    carbs: { grams: number; calories: number; percentage: number };
    fat: { grams: number; calories: number; percentage: number };
  };
}

export interface CalorieCalculationParams {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  bmrFormula: BMRFormula;
  bodyFatPercentage?: number;
}

export interface WeightGoal {
  type: "loss" | "gain" | "maintain";
  rate: "mild" | "moderate" | "aggressive";
  calories: number;
  description: string;
}

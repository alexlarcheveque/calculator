export enum UnitSystem {
  IMPERIAL = "imperial",
  METRIC = "metric",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export interface BMIFormValues {
  unitSystem: UnitSystem;
  age: number;
  gender: Gender;
  heightFeet: number;
  heightInches: number;
  heightCm: number;
  weightLbs: number;
  weightKg: number;
}

export interface BMIResults {
  bmi: number;
  bmiPrime: number;
  ponderalIndex: number;
  category: string;
  categoryColor: string;
  healthyWeightRange: {
    min: number;
    max: number;
    unit: string;
  };
  idealWeight: number;
  weightToLose?: number;
  weightToGain?: number;
  percentile?: number;
}

export interface BMICategory {
  name: string;
  range: string;
  color: string;
  minBMI: number;
  maxBMI: number;
}

export const BMI_CATEGORIES: BMICategory[] = [
  {
    name: "Severe Thinness",
    range: "< 16",
    color: "#8a0101",
    minBMI: 0,
    maxBMI: 16,
  },
  {
    name: "Moderate Thinness",
    range: "16 - 17",
    color: "#bc2020",
    minBMI: 16,
    maxBMI: 17,
  },
  {
    name: "Mild Thinness",
    range: "17 - 18.5",
    color: "#d38888",
    minBMI: 17,
    maxBMI: 18.5,
  },
  {
    name: "Normal",
    range: "18.5 - 25",
    color: "#008137",
    minBMI: 18.5,
    maxBMI: 25,
  },
  {
    name: "Overweight",
    range: "25 - 30",
    color: "#ffe400",
    minBMI: 25,
    maxBMI: 30,
  },
  {
    name: "Obese Class I",
    range: "30 - 35",
    color: "#d38888",
    minBMI: 30,
    maxBMI: 35,
  },
  {
    name: "Obese Class II",
    range: "35 - 40",
    color: "#bc2020",
    minBMI: 35,
    maxBMI: 40,
  },
  {
    name: "Obese Class III",
    range: "> 40",
    color: "#8a0101",
    minBMI: 40,
    maxBMI: 100,
  },
];

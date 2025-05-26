export interface BMRFormValues {
  age: number;
  gender: "male" | "female";
  height: number;
  weight: number;
  heightUnit: "feet" | "cm";
  weightUnit: "lbs" | "kg";
  formula: "mifflin" | "harris" | "katch";
  bodyFatPercentage: number;
  resultUnit: "calories" | "kilojoules";
}

export interface BMRResults {
  bmr: number;
  activityLevels: {
    sedentary: number;
    lightlyActive: number;
    moderatelyActive: number;
    veryActive: number;
    extremelyActive: number;
    superActive: number;
  };
  formula: string;
}

export interface ActivityLevel {
  level: string;
  description: string;
  multiplier: number;
  calories: number;
}

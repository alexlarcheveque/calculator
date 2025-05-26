import { BMRFormValues, BMRResults, ActivityLevel } from "@/types/bmr";

// Convert height from feet/inches to cm
export function convertHeightToCm(height: number, unit: "feet" | "cm"): number {
  if (unit === "cm") return height;
  // Height in feet (e.g., 5.83 for 5'10")
  return height * 30.48;
}

// Convert weight to kg
export function convertWeightToKg(weight: number, unit: "lbs" | "kg"): number {
  if (unit === "kg") return weight;
  return weight * 0.453592;
}

// Mifflin-St Jeor Equation
function calculateMifflinStJeor(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female"
): number {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
}

// Revised Harris-Benedict Equation
function calculateHarrisBenedict(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female"
): number {
  if (gender === "male") {
    return 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
  } else {
    return 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
  }
}

// Katch-McArdle Formula
function calculateKatchMcArdle(
  weight: number,
  bodyFatPercentage: number
): number {
  const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
  return 370 + 21.6 * leanBodyMass;
}

// Activity level multipliers
const ACTIVITY_MULTIPLIERS = {
  sedentary: {
    multiplier: 1.2,
    description: "Sedentary: little or no exercise",
  },
  lightlyActive: { multiplier: 1.375, description: "Exercise 1-3 times/week" },
  moderatelyActive: {
    multiplier: 1.465,
    description: "Exercise 4-5 times/week",
  },
  veryActive: {
    multiplier: 1.55,
    description: "Daily exercise or intense exercise 3-4 times/week",
  },
  extremelyActive: {
    multiplier: 1.725,
    description: "Intense exercise 6-7 times/week",
  },
  superActive: {
    multiplier: 1.9,
    description: "Very intense exercise daily, or physical job",
  },
};

export function calculateBMR(formValues: BMRFormValues): BMRResults {
  const {
    age,
    gender,
    height,
    weight,
    heightUnit,
    weightUnit,
    formula,
    bodyFatPercentage,
    resultUnit,
  } = formValues;

  // Convert to metric units
  const heightCm = convertHeightToCm(height, heightUnit);
  const weightKg = convertWeightToKg(weight, weightUnit);

  let bmr: number;
  let formulaName: string;

  switch (formula) {
    case "mifflin":
      bmr = calculateMifflinStJeor(weightKg, heightCm, age, gender);
      formulaName = "Mifflin-St Jeor";
      break;
    case "harris":
      bmr = calculateHarrisBenedict(weightKg, heightCm, age, gender);
      formulaName = "Revised Harris-Benedict";
      break;
    case "katch":
      bmr = calculateKatchMcArdle(weightKg, bodyFatPercentage);
      formulaName = "Katch-McArdle";
      break;
    default:
      bmr = calculateMifflinStJeor(weightKg, heightCm, age, gender);
      formulaName = "Mifflin-St Jeor";
  }

  // Convert to kilojoules if needed
  if (resultUnit === "kilojoules") {
    bmr = bmr * 4.184;
  }

  // Calculate activity levels
  const activityLevels = {
    sedentary: Math.round(bmr * ACTIVITY_MULTIPLIERS.sedentary.multiplier),
    lightlyActive: Math.round(
      bmr * ACTIVITY_MULTIPLIERS.lightlyActive.multiplier
    ),
    moderatelyActive: Math.round(
      bmr * ACTIVITY_MULTIPLIERS.moderatelyActive.multiplier
    ),
    veryActive: Math.round(bmr * ACTIVITY_MULTIPLIERS.veryActive.multiplier),
    extremelyActive: Math.round(
      bmr * ACTIVITY_MULTIPLIERS.extremelyActive.multiplier
    ),
    superActive: Math.round(bmr * ACTIVITY_MULTIPLIERS.superActive.multiplier),
  };

  return {
    bmr: Math.round(bmr),
    activityLevels,
    formula: formulaName,
  };
}

export function getActivityLevels(
  bmr: number,
  resultUnit: "calories" | "kilojoules"
): ActivityLevel[] {
  const unit = resultUnit === "calories" ? "Calories" : "kJ";

  return [
    {
      level: "Sedentary",
      description: "little or no exercise",
      multiplier: ACTIVITY_MULTIPLIERS.sedentary.multiplier,
      calories: Math.round(bmr * ACTIVITY_MULTIPLIERS.sedentary.multiplier),
    },
    {
      level: "Lightly Active",
      description: "exercise 1-3 times/week",
      multiplier: ACTIVITY_MULTIPLIERS.lightlyActive.multiplier,
      calories: Math.round(bmr * ACTIVITY_MULTIPLIERS.lightlyActive.multiplier),
    },
    {
      level: "Moderately Active",
      description: "exercise 4-5 times/week",
      multiplier: ACTIVITY_MULTIPLIERS.moderatelyActive.multiplier,
      calories: Math.round(
        bmr * ACTIVITY_MULTIPLIERS.moderatelyActive.multiplier
      ),
    },
    {
      level: "Very Active",
      description: "daily exercise or intense exercise 3-4 times/week",
      multiplier: ACTIVITY_MULTIPLIERS.veryActive.multiplier,
      calories: Math.round(bmr * ACTIVITY_MULTIPLIERS.veryActive.multiplier),
    },
    {
      level: "Extremely Active",
      description: "intense exercise 6-7 times/week",
      multiplier: ACTIVITY_MULTIPLIERS.extremelyActive.multiplier,
      calories: Math.round(
        bmr * ACTIVITY_MULTIPLIERS.extremelyActive.multiplier
      ),
    },
    {
      level: "Super Active",
      description: "very intense exercise daily, or physical job",
      multiplier: ACTIVITY_MULTIPLIERS.superActive.multiplier,
      calories: Math.round(bmr * ACTIVITY_MULTIPLIERS.superActive.multiplier),
    },
  ];
}

export function formatNumber(value: number): string {
  return value.toLocaleString();
}

// Height conversion helpers
export function feetToCm(feet: number): number {
  return feet * 30.48;
}

export function cmToFeet(cm: number): number {
  return cm / 30.48;
}

export function feetToFeetInches(totalFeet: number): {
  feet: number;
  inches: number;
} {
  const feet = Math.floor(totalFeet);
  const inches = Math.round((totalFeet - feet) * 12);
  return { feet, inches };
}

export function feetInchesToFeet(feet: number, inches: number): number {
  return feet + inches / 12;
}

import {
  CalorieCalculationParams,
  CalorieResults,
  Gender,
  ActivityLevel,
  BMRFormula,
  ResultUnit,
} from "@/types/calorie";

export function calculateCalories({
  age,
  gender,
  heightCm,
  weightKg,
  activityLevel,
  bmrFormula,
  bodyFatPercentage,
}: CalorieCalculationParams): CalorieResults {
  // Calculate BMR based on selected formula
  let bmr = 0;

  switch (bmrFormula) {
    case BMRFormula.MIFFLIN:
      if (gender === Gender.MALE) {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
      } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
      }
      break;

    case BMRFormula.HARRIS_BENEDICT:
      if (gender === Gender.MALE) {
        bmr = 13.397 * weightKg + 4.799 * heightCm - 5.677 * age + 88.362;
      } else {
        bmr = 9.247 * weightKg + 3.098 * heightCm - 4.33 * age + 447.593;
      }
      break;

    case BMRFormula.KATCH_MCARDLE:
      if (bodyFatPercentage !== undefined) {
        const leanBodyMass = weightKg * (1 - bodyFatPercentage / 100);
        bmr = 370 + 21.6 * leanBodyMass;
      } else {
        // Fallback to Mifflin if no body fat percentage provided
        if (gender === Gender.MALE) {
          bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
        } else {
          bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
        }
      }
      break;
  }

  // Calculate maintenance calories based on activity level
  const activityMultiplier = parseFloat(activityLevel);
  const maintenanceCalories = bmr * activityMultiplier;

  // Calculate weight loss calories (deficit of 250, 500, 1000 calories)
  const weightLossCalories = {
    mild: Math.max(maintenanceCalories - 250, bmr * 1.2), // 0.5 lbs per week, but not below sedentary level
    moderate: Math.max(maintenanceCalories - 500, bmr * 1.2), // 1 lb per week
    aggressive: Math.max(maintenanceCalories - 1000, bmr * 1.2), // 2 lbs per week
  };

  // Calculate weight gain calories (surplus of 250, 500, 1000 calories)
  const weightGainCalories = {
    mild: maintenanceCalories + 250, // 0.5 lbs per week
    moderate: maintenanceCalories + 500, // 1 lb per week
    aggressive: maintenanceCalories + 1000, // 2 lbs per week
  };

  // Calculate macronutrients based on maintenance calories
  // Using standard ratios: 30% protein, 40% carbs, 30% fat
  const proteinCalories = maintenanceCalories * 0.3;
  const carbCalories = maintenanceCalories * 0.4;
  const fatCalories = maintenanceCalories * 0.3;

  const macronutrients = {
    protein: {
      grams: Math.round(proteinCalories / 4), // 4 calories per gram
      calories: Math.round(proteinCalories),
      percentage: 30,
    },
    carbs: {
      grams: Math.round(carbCalories / 4), // 4 calories per gram
      calories: Math.round(carbCalories),
      percentage: 40,
    },
    fat: {
      grams: Math.round(fatCalories / 9), // 9 calories per gram
      calories: Math.round(fatCalories),
      percentage: 30,
    },
  };

  return {
    bmr: Math.round(bmr),
    maintenanceCalories: Math.round(maintenanceCalories),
    weightLossCalories: {
      mild: Math.round(weightLossCalories.mild),
      moderate: Math.round(weightLossCalories.moderate),
      aggressive: Math.round(weightLossCalories.aggressive),
    },
    weightGainCalories: {
      mild: Math.round(weightGainCalories.mild),
      moderate: Math.round(weightGainCalories.moderate),
      aggressive: Math.round(weightGainCalories.aggressive),
    },
    macronutrients,
  };
}

export function convertToKilojoules(calories: number): number {
  return Math.round(calories * 4.184);
}

export function convertCaloriesForDisplay(
  calories: number,
  unit: ResultUnit
): number {
  return unit === ResultUnit.KILOJOULES
    ? convertToKilojoules(calories)
    : calories;
}

export function formatCalories(value: number, unit: ResultUnit): string {
  const displayValue = convertCaloriesForDisplay(value, unit);
  const unitLabel = unit === ResultUnit.KILOJOULES ? "kJ" : "cal";
  return `${displayValue.toLocaleString()} ${unitLabel}`;
}

export function convertHeightToMetric(feet: number, inches: number): number {
  const totalInches = feet * 12 + inches;
  return Math.round(totalInches * 2.54 * 10) / 10; // Convert to cm with 1 decimal place
}

export function convertWeightToMetric(pounds: number): number {
  return Math.round(pounds * 0.453592 * 10) / 10; // Convert to kg with 1 decimal place
}

export function convertHeightToImperial(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

export function convertWeightToImperial(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10; // Convert to lbs with 1 decimal place
}

export function getActivityLevelDescription(level: ActivityLevel): string {
  switch (level) {
    case ActivityLevel.BMR:
      return "Basal Metabolic Rate (BMR)";
    case ActivityLevel.SEDENTARY:
      return "Sedentary: little or no exercise";
    case ActivityLevel.LIGHT:
      return "Light: exercise 1-3 times/week";
    case ActivityLevel.MODERATE:
      return "Moderate: exercise 4-5 times/week";
    case ActivityLevel.ACTIVE:
      return "Active: daily exercise or intense exercise 3-4 times/week";
    case ActivityLevel.VERY_ACTIVE:
      return "Very Active: intense exercise 6-7 times/week";
    case ActivityLevel.EXTRA_ACTIVE:
      return "Extra Active: very intense exercise daily, or physical job";
    default:
      return "";
  }
}

export function getBMRFormulaDescription(formula: BMRFormula): string {
  switch (formula) {
    case BMRFormula.MIFFLIN:
      return "Mifflin St Jeor (Most accurate for general population)";
    case BMRFormula.HARRIS_BENEDICT:
      return "Revised Harris-Benedict";
    case BMRFormula.KATCH_MCARDLE:
      return "Katch-McArdle (Requires body fat percentage)";
    default:
      return "";
  }
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
} 
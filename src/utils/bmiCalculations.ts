import {
  BMIFormValues,
  BMIResults,
  BMI_CATEGORIES,
  UnitSystem,
} from "@/types/bmi";

export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}

export function formatWeight(value: number, unit: string): string {
  return `${formatNumber(value, 1)} ${unit}`;
}

export function convertLbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

export function convertKgToLbs(kg: number): number {
  return kg * 2.20462;
}

export function convertFeetInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

export function convertCmToFeetInches(cm: number): {
  feet: number;
  inches: number;
} {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches };
}

export function convertCmToMeters(cm: number): number {
  return cm / 100;
}

export function calculateBMI(values: BMIFormValues): BMIResults {
  let heightInMeters: number;
  let weightInKg: number;

  // Convert height to meters
  if (values.unitSystem === UnitSystem.IMPERIAL) {
    const heightInCm = convertFeetInchesToCm(
      values.heightFeet,
      values.heightInches
    );
    heightInMeters = convertCmToMeters(heightInCm);
    weightInKg = convertLbsToKg(values.weightLbs);
  } else {
    heightInMeters = convertCmToMeters(values.heightCm);
    weightInKg = values.weightKg;
  }

  // Calculate BMI
  const bmi = weightInKg / (heightInMeters * heightInMeters);

  // Calculate BMI Prime (ratio to upper limit of normal BMI = 25)
  const bmiPrime = bmi / 25;

  // Calculate Ponderal Index
  const ponderalIndex =
    weightInKg / (heightInMeters * heightInMeters * heightInMeters);

  // Determine BMI category
  const category = getBMICategory(bmi);
  const categoryData = BMI_CATEGORIES.find((cat) => cat.name === category);
  const categoryColor = categoryData?.color || "#008137";

  // Calculate healthy weight range (BMI 18.5 - 25)
  const minHealthyWeight = 18.5 * (heightInMeters * heightInMeters);
  const maxHealthyWeight = 25 * (heightInMeters * heightInMeters);

  // Convert to appropriate units for display
  const weightUnit = values.unitSystem === UnitSystem.IMPERIAL ? "lbs" : "kg";
  const healthyWeightRange = {
    min:
      values.unitSystem === UnitSystem.IMPERIAL
        ? convertKgToLbs(minHealthyWeight)
        : minHealthyWeight,
    max:
      values.unitSystem === UnitSystem.IMPERIAL
        ? convertKgToLbs(maxHealthyWeight)
        : maxHealthyWeight,
    unit: weightUnit,
  };

  // Calculate ideal weight (BMI 22 - middle of healthy range)
  const idealWeightKg = 22 * (heightInMeters * heightInMeters);
  const idealWeight =
    values.unitSystem === UnitSystem.IMPERIAL
      ? convertKgToLbs(idealWeightKg)
      : idealWeightKg;

  // Calculate weight to lose or gain to reach healthy range
  const currentWeight =
    values.unitSystem === UnitSystem.IMPERIAL
      ? values.weightLbs
      : values.weightKg;
  let weightToLose: number | undefined;
  let weightToGain: number | undefined;

  if (bmi > 25) {
    weightToLose = currentWeight - healthyWeightRange.max;
  } else if (bmi < 18.5) {
    weightToGain = healthyWeightRange.min - currentWeight;
  }

  return {
    bmi,
    bmiPrime,
    ponderalIndex,
    category,
    categoryColor,
    healthyWeightRange,
    idealWeight,
    weightToLose,
    weightToGain,
  };
}

export function getBMICategory(bmi: number): string {
  for (const category of BMI_CATEGORIES) {
    if (bmi >= category.minBMI && bmi < category.maxBMI) {
      return category.name;
    }
  }
  return "Normal"; // fallback
}

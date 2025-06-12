import {
  BMIFormValues,
  BMIResults,
  BMI_CATEGORIES,
  UnitSystem,
  Gender,
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

// CDC BMI-for-age LMS parameters (Lambda, Mu, Sigma) by age and gender
// Data for ages 2-20 years (24-240 months)
interface LMSData {
  age: number; // in months
  L: number; // Lambda (power transformation)
  M: number; // Mu (median)
  S: number; // Sigma (coefficient of variation)
}

// CDC Boys BMI-for-age data (ages 2-20)
const BOYS_BMI_LMS: LMSData[] = [
  { age: 24, L: -1.883, M: 16.0613, S: 0.08655 },
  { age: 25, L: -1.8627, M: 15.9656, S: 0.087 },
  { age: 26, L: -1.8433, M: 15.8785, S: 0.08747 },
  { age: 27, L: -1.8248, M: 15.7995, S: 0.08796 },
  { age: 28, L: -1.8072, M: 15.728, S: 0.08847 },
  { age: 29, L: -1.7903, M: 15.6636, S: 0.089 },
  { age: 30, L: -1.7743, M: 15.6059, S: 0.08954 },
  { age: 36, L: -1.6736, M: 15.2943, S: 0.09376 },
  { age: 48, L: -1.4801, M: 15.0515, S: 0.10586 },
  { age: 60, L: -1.3188, M: 15.0138, S: 0.11864 },
  { age: 72, L: -1.1907, M: 15.1342, S: 0.13207 },
  { age: 84, L: -1.0958, M: 15.3933, S: 0.14607 },
  { age: 96, L: -1.034, M: 15.7766, S: 0.1605 },
  { age: 108, L: -1.0048, M: 16.273, S: 0.1752 },
  { age: 120, L: -1.0078, M: 16.873, S: 0.19 },
  { age: 132, L: -1.0418, M: 17.5674, S: 0.20472 },
  { age: 144, L: -1.1057, M: 18.3473, S: 0.21916 },
  { age: 156, L: -1.198, M: 19.2039, S: 0.23312 },
  { age: 168, L: -1.3171, M: 20.1289, S: 0.2464 },
  { age: 180, L: -1.4613, M: 21.114, S: 0.25879 },
  { age: 192, L: -1.6288, M: 22.1514, S: 0.2701 },
  { age: 204, L: -1.8176, M: 23.2334, S: 0.28013 },
  { age: 216, L: -2.0257, M: 24.3524, S: 0.28869 },
  { age: 228, L: -2.251, M: 25.5012, S: 0.29558 },
  { age: 240, L: -2.4914, M: 26.6724, S: 0.30062 },
];

// CDC Girls BMI-for-age data (ages 2-20)
const GIRLS_BMI_LMS: LMSData[] = [
  { age: 24, L: -1.684, M: 15.7806, S: 0.08518 },
  { age: 25, L: -1.665, M: 15.7027, S: 0.08574 },
  { age: 26, L: -1.6467, M: 15.632, S: 0.08632 },
  { age: 27, L: -1.6293, M: 15.5681, S: 0.08692 },
  { age: 28, L: -1.6125, M: 15.5107, S: 0.08754 },
  { age: 29, L: -1.5965, M: 15.4594, S: 0.08817 },
  { age: 30, L: -1.5812, M: 15.4139, S: 0.08882 },
  { age: 36, L: -1.496, M: 15.1563, S: 0.09396 },
  { age: 48, L: -1.3117, M: 14.8862, S: 0.10792 },
  { age: 60, L: -1.1684, M: 14.8188, S: 0.12306 },
  { age: 72, L: -1.066, M: 14.9462, S: 0.13922 },
  { age: 84, L: -1.0047, M: 15.2476, S: 0.1562 },
  { age: 96, L: -0.9842, M: 15.7042, S: 0.17374 },
  { age: 108, L: -1.0042, M: 16.3009, S: 0.19151 },
  { age: 120, L: -1.064, M: 17.0227, S: 0.20916 },
  { age: 132, L: -1.1628, M: 17.8547, S: 0.22632 },
  { age: 144, L: -1.2999, M: 18.782, S: 0.24261 },
  { age: 156, L: -1.4746, M: 19.7901, S: 0.25764 },
  { age: 168, L: -1.6862, M: 20.864, S: 0.27104 },
  { age: 180, L: -1.934, M: 21.9889, S: 0.28246 },
  { age: 192, L: -2.2172, M: 23.1502, S: 0.29154 },
  { age: 204, L: -2.5348, M: 24.3332, S: 0.29797 },
  { age: 216, L: -2.8858, M: 25.5234, S: 0.30143 },
  { age: 228, L: -3.2691, M: 26.7062, S: 0.30163 },
  { age: 240, L: -3.6835, M: 27.8674, S: 0.29831 },
];

// Function to get LMS values for a specific age and gender
function getLMSValues(ageInMonths: number, gender: Gender): LMSData {
  const data = gender === Gender.MALE ? BOYS_BMI_LMS : GIRLS_BMI_LMS;

  // Clamp age to available range
  const clampedAge = Math.max(24, Math.min(240, ageInMonths));

  // Find the closest age or interpolate
  const exactMatch = data.find((d) => d.age === clampedAge);
  if (exactMatch) return exactMatch;

  // Linear interpolation between closest ages
  const lowerAge = data.filter((d) => d.age <= clampedAge).pop();
  const upperAge = data.find((d) => d.age > clampedAge);

  if (!lowerAge) return data[0];
  if (!upperAge) return data[data.length - 1];

  const ratio = (clampedAge - lowerAge.age) / (upperAge.age - lowerAge.age);

  return {
    age: clampedAge,
    L: lowerAge.L + ratio * (upperAge.L - lowerAge.L),
    M: lowerAge.M + ratio * (upperAge.M - lowerAge.M),
    S: lowerAge.S + ratio * (upperAge.S - lowerAge.S),
  };
}

// Function to calculate BMI percentile using LMS method
function calculateBMIPercentile(
  bmi: number,
  ageInMonths: number,
  gender: Gender
): number {
  const lms = getLMSValues(ageInMonths, gender);

  // Calculate Z-score using LMS method
  let zScore: number;
  if (Math.abs(lms.L) < 0.00001) {
    // When L is approximately 0, use log transformation
    zScore = Math.log(bmi / lms.M) / lms.S;
  } else {
    // Standard LMS formula
    zScore = (Math.pow(bmi / lms.M, lms.L) - 1) / (lms.L * lms.S);
  }

  // Convert Z-score to percentile using normal distribution
  const percentile = normalCDF(zScore) * 100;

  // Handle extreme BMI values that should definitely be ≥95th percentile
  // If BMI is extremely high (e.g., >40 for children), ensure it's at least 95th percentile
  const ageInYears = ageInMonths / 12;
  const expectedMaxBMI = ageInYears < 10 ? 25 : ageInYears < 15 ? 30 : 35;

  if (bmi > expectedMaxBMI && percentile < 95) {
    // For extreme BMI values, ensure minimum 95th percentile
    return Math.max(
      percentile,
      95 + Math.min((bmi - expectedMaxBMI) / 10, 4.9)
    );
  }

  return percentile;
}

// Normal cumulative distribution function (approximation)
function normalCDF(x: number): number {
  // Abramowitz and Stegun approximation
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);

  const t = 1 / (1 + p * x);
  const y =
    1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1 + sign * y);
}

// Function to get BMI category for children based on percentile
function getChildBMICategory(percentile: number): {
  category: string;
  color: string;
} {
  if (percentile < 5) {
    return { category: "Underweight", color: "#dc2626" };
  } else if (percentile < 85) {
    return { category: "Healthy Weight", color: "#059669" };
  } else if (percentile < 95) {
    return { category: "At Risk of Overweight", color: "#d97706" };
  } else {
    return { category: "Overweight", color: "#dc2626" };
  }
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

  // Age-specific BMI interpretation
  const isChild = values.age >= 2 && values.age < 20;
  const isTooYoung = values.age < 2;
  let category: string;
  let categoryColor: string;
  let percentile: number | undefined;

  if (isTooYoung) {
    // Under 2 years - BMI not applicable
    category = "BMI Not Applicable";
    categoryColor = "#6b7280"; // gray color
  } else if (isChild) {
    // Ages 2-19: Use CDC BMI-for-age percentiles
    const ageInMonths = Math.round(values.age * 12);
    percentile = calculateBMIPercentile(bmi, ageInMonths, values.gender);
    const childCategory = getChildBMICategory(percentile);
    category = `${childCategory.category} (${Math.round(
      percentile
    )}th percentile)`;
    categoryColor = childCategory.color;
  } else {
    // Ages 20+: Use adult BMI categories
    category = getBMICategory(bmi);
    const categoryData = BMI_CATEGORIES.find((cat) => cat.name === category);
    categoryColor = categoryData?.color || "#008137";
  }

  // Calculate healthy weight range (only applicable for adults)
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

  // Calculate ideal weight (BMI 22 - middle of healthy range) - only for adults
  const idealWeightKg = 22 * (heightInMeters * heightInMeters);
  const idealWeight =
    values.unitSystem === UnitSystem.IMPERIAL
      ? convertKgToLbs(idealWeightKg)
      : idealWeightKg;

  // Calculate weight to lose or gain to reach healthy range (only for adults)
  const currentWeight =
    values.unitSystem === UnitSystem.IMPERIAL
      ? values.weightLbs
      : values.weightKg;
  let weightToLose: number | undefined;
  let weightToGain: number | undefined;

  if (!isChild && !isTooYoung) {
    if (bmi > 25) {
      weightToLose = currentWeight - healthyWeightRange.max;
    } else if (bmi < 18.5) {
      weightToGain = healthyWeightRange.min - currentWeight;
    }
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
    percentile,
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

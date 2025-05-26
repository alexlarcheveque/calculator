import {
  BodyFatCalculationParams,
  BodyFatResults,
  Gender,
  UnitSystem,
  BodyFatCategory,
} from "@/types/bodyFat";

export function calculateBodyFat({
  gender,
  age,
  weight,
  height,
  neck,
  waist,
  hip,
  unitSystem,
}: BodyFatCalculationParams): BodyFatResults {
  // Convert measurements to consistent units (inches for US, cm for metric)
  let heightInInches = height;
  let neckInInches = neck;
  let waistInInches = waist;
  let hipInInches = hip || 0;
  let weightInLbs = weight;

  if (unitSystem === UnitSystem.METRIC) {
    // Convert cm to inches and kg to lbs
    heightInInches = height / 2.54;
    neckInInches = neck / 2.54;
    waistInInches = waist / 2.54;
    hipInInches = (hip || 0) / 2.54;
    weightInLbs = weight * 2.20462;
  }

  // Calculate BMI
  const heightInMeters = heightInInches * 0.0254;
  const weightInKg = weightInLbs / 2.20462;
  const bmi = weightInKg / (heightInMeters * heightInMeters);

  // Calculate Body Fat Percentage using U.S. Navy Method
  let bodyFatPercentageNavy = 0;

  if (gender === Gender.MALE) {
    // Male formula: BFP = 86.010×log10(abdomen-neck) - 70.041×log10(height) + 36.76
    bodyFatPercentageNavy =
      86.01 * Math.log10(waistInInches - neckInInches) -
      70.041 * Math.log10(heightInInches) +
      36.76;
  } else {
    // Female formula: BFP = 163.205×log10(waist+hip-neck) - 97.684×(log10(height)) - 78.387
    bodyFatPercentageNavy =
      163.205 * Math.log10(waistInInches + hipInInches - neckInInches) -
      97.684 * Math.log10(heightInInches) -
      78.387;
  }

  // Ensure body fat percentage is within reasonable bounds
  bodyFatPercentageNavy = Math.max(0, Math.min(50, bodyFatPercentageNavy));

  // Calculate Body Fat Percentage using BMI Method
  let bodyFatPercentageBMI = 0;

  if (gender === Gender.MALE) {
    bodyFatPercentageBMI = 1.2 * bmi + 0.23 * age - 16.2;
  } else {
    bodyFatPercentageBMI = 1.2 * bmi + 0.23 * age - 5.4;
  }

  // Ensure BMI body fat percentage is within reasonable bounds
  bodyFatPercentageBMI = Math.max(0, Math.min(50, bodyFatPercentageBMI));

  // Calculate body fat mass and lean body mass
  const bodyFatMass = (bodyFatPercentageNavy / 100) * weightInLbs;
  const leanBodyMass = weightInLbs - bodyFatMass;

  // Get ideal body fat percentage based on age and gender
  const idealBodyFatPercentage = getIdealBodyFatPercentage(age, gender);

  // Calculate body fat to lose to reach ideal
  const idealBodyFatMass = (idealBodyFatPercentage / 100) * weightInLbs;
  const bodyFatToLose = Math.max(0, bodyFatMass - idealBodyFatMass);

  // Get body fat category
  const bodyFatCategory = getBodyFatCategory(bodyFatPercentageNavy, gender);

  return {
    bodyFatPercentageNavy,
    bodyFatPercentageBMI,
    bodyFatCategory,
    bodyFatMass:
      unitSystem === UnitSystem.METRIC ? bodyFatMass / 2.20462 : bodyFatMass,
    leanBodyMass:
      unitSystem === UnitSystem.METRIC ? leanBodyMass / 2.20462 : leanBodyMass,
    idealBodyFatPercentage,
    bodyFatToLose:
      unitSystem === UnitSystem.METRIC
        ? bodyFatToLose / 2.20462
        : bodyFatToLose,
    bmi,
    totalWeight: unitSystem === UnitSystem.METRIC ? weightInKg : weightInLbs,
    unitSystem,
  };
}

export function getIdealBodyFatPercentage(age: number, gender: Gender): number {
  // Jackson & Pollock Ideal Body Fat Percentages
  const ageRanges = [
    { age: 20, male: 8.5, female: 17.7 },
    { age: 25, male: 10.5, female: 18.4 },
    { age: 30, male: 12.7, female: 19.3 },
    { age: 35, male: 13.7, female: 21.5 },
    { age: 40, male: 15.3, female: 22.2 },
    { age: 45, male: 16.4, female: 22.9 },
    { age: 50, male: 18.9, female: 25.2 },
    { age: 55, male: 20.9, female: 26.3 },
  ];

  // Find the appropriate age range
  let idealPercentage = gender === Gender.MALE ? 8.5 : 17.7;

  for (let i = 0; i < ageRanges.length; i++) {
    if (age <= ageRanges[i].age) {
      idealPercentage =
        gender === Gender.MALE ? ageRanges[i].male : ageRanges[i].female;
      break;
    }
    if (i === ageRanges.length - 1) {
      // If age is beyond the last range, use the last value
      idealPercentage =
        gender === Gender.MALE ? ageRanges[i].male : ageRanges[i].female;
    }
  }

  return idealPercentage;
}

export function getBodyFatCategory(
  bodyFatPercentage: number,
  gender: Gender
): string {
  // American Council on Exercise Body Fat Categorization
  if (gender === Gender.MALE) {
    if (bodyFatPercentage <= 5) return "Essential Fat";
    if (bodyFatPercentage <= 13) return "Athletes";
    if (bodyFatPercentage <= 17) return "Fitness";
    if (bodyFatPercentage <= 24) return "Average";
    return "Obese";
  } else {
    if (bodyFatPercentage <= 13) return "Essential Fat";
    if (bodyFatPercentage <= 20) return "Athletes";
    if (bodyFatPercentage <= 24) return "Fitness";
    if (bodyFatPercentage <= 31) return "Average";
    return "Obese";
  }
}

export function getBodyFatCategories(): BodyFatCategory[] {
  return [
    {
      name: "Essential Fat",
      menRange: "2-5%",
      womenRange: "10-13%",
      color: "#3B82F6",
    },
    {
      name: "Athletes",
      menRange: "6-13%",
      womenRange: "14-20%",
      color: "#10B981",
    },
    {
      name: "Fitness",
      menRange: "14-17%",
      womenRange: "21-24%",
      color: "#8B5CF6",
    },
    {
      name: "Average",
      menRange: "18-24%",
      womenRange: "25-31%",
      color: "#F59E0B",
    },
    {
      name: "Obese",
      menRange: "25+%",
      womenRange: "32+%",
      color: "#EF4444",
    },
  ];
}

export function getJacksonPollockData(): Array<{
  age: number;
  male: number;
  female: number;
}> {
  return [
    { age: 20, male: 8.5, female: 17.7 },
    { age: 25, male: 10.5, female: 18.4 },
    { age: 30, male: 12.7, female: 19.3 },
    { age: 35, male: 13.7, female: 21.5 },
    { age: 40, male: 15.3, female: 22.2 },
    { age: 45, male: 16.4, female: 22.9 },
    { age: 50, male: 18.9, female: 25.2 },
    { age: 55, male: 20.9, female: 26.3 },
  ];
}

export function formatWeight(value: number, unitSystem: UnitSystem): string {
  const unit = unitSystem === UnitSystem.METRIC ? "kg" : "lbs";
  return `${value.toFixed(1)} ${unit}`;
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatHeight(feet: number, inches: number): string {
  return `${feet}' ${inches.toFixed(1)}"`;
}

export function formatHeightCm(cm: number): string {
  return `${cm.toFixed(1)} cm`;
}

export function formatMeasurement(feet: number, inches: number): string {
  return `${feet}' ${inches.toFixed(1)}"`;
}

export function formatMeasurementCm(cm: number): string {
  return `${cm.toFixed(1)} cm`;
}

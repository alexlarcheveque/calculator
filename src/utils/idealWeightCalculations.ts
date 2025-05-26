import {
  IdealWeightCalculationParams,
  IdealWeightResults,
  Gender,
  UnitSystem,
  FormulaResult,
} from "@/types/idealWeight";

// Convert feet and inches to centimeters
export function feetInchesToCm(feet: number, inches: number): number {
  const totalInches = feet * 12 + inches;
  return totalInches * 2.54;
}

// Convert centimeters to feet and inches
export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches };
}

// Convert kg to lbs
export function kgToLbs(kg: number): number {
  return kg * 2.20462;
}

// Convert lbs to kg
export function lbsToKg(lbs: number): number {
  return lbs / 2.20462;
}

// Robinson Formula (1983)
export function calculateRobinsonWeight(
  heightInCm: number,
  gender: Gender
): number {
  const heightInInches = heightInCm / 2.54;
  const baseHeight = 60; // 5 feet in inches

  if (heightInInches <= baseHeight) {
    return gender === Gender.MALE ? 52 : 49;
  }

  const extraInches = heightInInches - baseHeight;
  const baseWeight = gender === Gender.MALE ? 52 : 49;
  const weightPerInch = gender === Gender.MALE ? 1.9 : 1.7;

  return baseWeight + extraInches * weightPerInch;
}

// Miller Formula (1983)
export function calculateMillerWeight(
  heightInCm: number,
  gender: Gender
): number {
  const heightInInches = heightInCm / 2.54;
  const baseHeight = 60; // 5 feet in inches

  if (heightInInches <= baseHeight) {
    return gender === Gender.MALE ? 56.2 : 53.1;
  }

  const extraInches = heightInInches - baseHeight;
  const baseWeight = gender === Gender.MALE ? 56.2 : 53.1;
  const weightPerInch = gender === Gender.MALE ? 1.41 : 1.36;

  return baseWeight + extraInches * weightPerInch;
}

// Devine Formula (1974)
export function calculateDevineWeight(
  heightInCm: number,
  gender: Gender
): number {
  const heightInInches = heightInCm / 2.54;
  const baseHeight = 60; // 5 feet in inches

  if (heightInInches <= baseHeight) {
    return gender === Gender.MALE ? 50 : 45.5;
  }

  const extraInches = heightInInches - baseHeight;
  const baseWeight = gender === Gender.MALE ? 50 : 45.5;
  const weightPerInch = 2.3;

  return baseWeight + extraInches * weightPerInch;
}

// Hamwi Formula (1964)
export function calculateHamwiWeight(
  heightInCm: number,
  gender: Gender
): number {
  const heightInInches = heightInCm / 2.54;
  const baseHeight = 60; // 5 feet in inches

  if (heightInInches <= baseHeight) {
    return gender === Gender.MALE ? 48 : 45.5;
  }

  const extraInches = heightInInches - baseHeight;
  const baseWeight = gender === Gender.MALE ? 48 : 45.5;
  const weightPerInch = gender === Gender.MALE ? 2.7 : 2.2;

  return baseWeight + extraInches * weightPerInch;
}

// Calculate healthy BMI range weights
export function calculateBMIRange(heightInCm: number): {
  min: number;
  max: number;
} {
  const heightInMeters = heightInCm / 100;
  const minWeight = 18.5 * heightInMeters * heightInMeters;
  const maxWeight = 25 * heightInMeters * heightInMeters;

  return { min: minWeight, max: maxWeight };
}

// Main calculation function
export function calculateIdealWeight(
  params: IdealWeightCalculationParams
): IdealWeightResults {
  const { heightInCm, gender, unitSystem } = params;

  // Calculate all formulas (results in kg)
  const robinsonWeightKg = calculateRobinsonWeight(heightInCm, gender);
  const millerWeightKg = calculateMillerWeight(heightInCm, gender);
  const devineWeightKg = calculateDevineWeight(heightInCm, gender);
  const hamwiWeightKg = calculateHamwiWeight(heightInCm, gender);

  const bmiRange = calculateBMIRange(heightInCm);

  // Convert to appropriate units
  const robinsonWeight =
    unitSystem === UnitSystem.IMPERIAL
      ? kgToLbs(robinsonWeightKg)
      : robinsonWeightKg;
  const millerWeight =
    unitSystem === UnitSystem.IMPERIAL
      ? kgToLbs(millerWeightKg)
      : millerWeightKg;
  const devineWeight =
    unitSystem === UnitSystem.IMPERIAL
      ? kgToLbs(devineWeightKg)
      : devineWeightKg;
  const hamwiWeight =
    unitSystem === UnitSystem.IMPERIAL ? kgToLbs(hamwiWeightKg) : hamwiWeightKg;
  const bmiRangeMin =
    unitSystem === UnitSystem.IMPERIAL ? kgToLbs(bmiRange.min) : bmiRange.min;
  const bmiRangeMax =
    unitSystem === UnitSystem.IMPERIAL ? kgToLbs(bmiRange.max) : bmiRange.max;

  return {
    heightInCm,
    heightInInches: heightInCm / 2.54,
    robinsonWeight,
    millerWeight,
    devineWeight,
    hamwiWeight,
    bmiRangeMin,
    bmiRangeMax,
    unitSystem,
  };
}

// Format weight for display
export function formatWeight(weight: number, unitSystem: UnitSystem): string {
  const unit = unitSystem === UnitSystem.IMPERIAL ? "lbs" : "kg";
  return `${weight.toFixed(1)} ${unit}`;
}

// Format height for display
export function formatHeight(
  heightInCm: number,
  unitSystem: UnitSystem
): string {
  if (unitSystem === UnitSystem.IMPERIAL) {
    const { feet, inches } = cmToFeetInches(heightInCm);
    return `${feet}' ${inches.toFixed(1)}"`;
  } else {
    return `${heightInCm.toFixed(1)} cm`;
  }
}

// Get all formula results
export function getAllFormulaResults(
  results: IdealWeightResults
): FormulaResult[] {
  return [
    {
      name: "Robinson (1983)",
      weight: results.robinsonWeight,
      description: "Modification of the Devine Formula",
    },
    {
      name: "Miller (1983)",
      weight: results.millerWeight,
      description: "Modification of the Devine Formula",
    },
    {
      name: "Devine (1974)",
      weight: results.devineWeight,
      description: "Originally intended for medicinal dosages",
    },
    {
      name: "Hamwi (1964)",
      weight: results.hamwiWeight,
      description: "Invented for medicinal dosage purposes",
    },
  ];
}

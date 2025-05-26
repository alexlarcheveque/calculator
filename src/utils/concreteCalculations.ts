import {
  ConcreteCalculationValues,
  RoundConcreteValues,
  TubeConcreteValues,
  CurbConcreteValues,
  StairsConcreteValues,
  ConcreteCalculationResult,
  BagCalculation,
  ConcreteValidation,
  LengthUnit,
  VolumeUnit,
  WeightUnit,
} from "@/types/concrete";

// Unit conversion factors to feet
const LENGTH_TO_FEET: Record<LengthUnit, number> = {
  [LengthUnit.FEET]: 1,
  [LengthUnit.INCHES]: 1 / 12,
  [LengthUnit.YARDS]: 3,
  [LengthUnit.METERS]: 3.28084,
  [LengthUnit.CENTIMETERS]: 0.0328084,
};

// Volume conversion factors from cubic feet
const CUBIC_FEET_TO_VOLUME: Record<VolumeUnit, number> = {
  [VolumeUnit.CUBIC_FEET]: 1,
  [VolumeUnit.CUBIC_YARDS]: 1 / 27,
  [VolumeUnit.CUBIC_METERS]: 0.0283168,
};

// Concrete density (approximately 150 lbs per cubic foot)
const CONCRETE_DENSITY_LBS_PER_CUBIC_FOOT = 150;

// Bag coverage (cubic feet per bag)
const BAG_COVERAGE = {
  "60lb": 0.45, // 60lb bag covers approximately 0.45 cubic feet
  "80lb": 0.6, // 80lb bag covers approximately 0.6 cubic feet
  "40kg": 0.53, // 40kg bag covers approximately 0.53 cubic feet
  "20kg": 0.27, // 20kg bag covers approximately 0.27 cubic feet
};

// Convert length to feet
export function convertToFeet(value: number, unit: LengthUnit): number {
  return value * LENGTH_TO_FEET[unit];
}

// Convert cubic feet to other volume units
export function convertVolume(
  cubicFeet: number,
  targetUnit: VolumeUnit
): number {
  return cubicFeet * CUBIC_FEET_TO_VOLUME[targetUnit];
}

// Validate input values
export function validateInput(
  value: number,
  fieldName: string
): ConcreteValidation {
  if (isNaN(value) || value <= 0) {
    return {
      isValid: false,
      error: `${fieldName} must be a positive number`,
    };
  }
  return { isValid: true };
}

// Calculate volume for rectangular slab
export function calculateSlabVolume(
  values: ConcreteCalculationValues
): ConcreteCalculationResult {
  // Validate inputs
  const lengthValidation = validateInput(values.length, "Length");
  if (!lengthValidation.isValid) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: lengthValidation.error,
    };
  }

  const widthValidation = validateInput(values.width, "Width");
  if (!widthValidation.isValid) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: widthValidation.error,
    };
  }

  const thicknessValidation = validateInput(values.thickness, "Thickness");
  if (!thicknessValidation.isValid) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: thicknessValidation.error,
    };
  }

  const quantityValidation = validateInput(values.quantity, "Quantity");
  if (!quantityValidation.isValid) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: quantityValidation.error,
    };
  }

  // Convert all dimensions to feet
  const lengthFeet = convertToFeet(values.length, values.lengthUnit);
  const widthFeet = convertToFeet(values.width, values.widthUnit);
  const thicknessFeet = convertToFeet(values.thickness, values.thicknessUnit);

  // Calculate volume in cubic feet
  const volumeCubicFeet =
    lengthFeet * widthFeet * thicknessFeet * values.quantity;

  // Calculate weight
  const weightPounds = volumeCubicFeet * CONCRETE_DENSITY_LBS_PER_CUBIC_FOOT;

  // Calculate bag requirements
  const bags = calculateBagRequirements(volumeCubicFeet);

  return {
    volume: volumeCubicFeet,
    volumeUnit: VolumeUnit.CUBIC_FEET,
    weight: weightPounds,
    weightUnit: WeightUnit.POUNDS,
    bags,
    isValid: true,
  };
}

// Calculate volume for round/cylindrical concrete
export function calculateRoundVolume(
  values: RoundConcreteValues
): ConcreteCalculationResult {
  // Validate inputs
  const diameterValidation = validateInput(values.diameter, "Diameter");
  if (!diameterValidation.isValid) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: diameterValidation.error,
    };
  }

  const depthValidation = validateInput(values.depth, "Depth");
  if (!depthValidation.isValid) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: depthValidation.error,
    };
  }

  const quantityValidation = validateInput(values.quantity, "Quantity");
  if (!quantityValidation.isValid) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: quantityValidation.error,
    };
  }

  // Convert dimensions to feet
  const diameterFeet = convertToFeet(values.diameter, values.diameterUnit);
  const depthFeet = convertToFeet(values.depth, values.depthUnit);

  // Calculate volume: π × r² × h
  const radius = diameterFeet / 2;
  const volumeCubicFeet =
    Math.PI * radius * radius * depthFeet * values.quantity;

  // Calculate weight
  const weightPounds = volumeCubicFeet * CONCRETE_DENSITY_LBS_PER_CUBIC_FOOT;

  // Calculate bag requirements
  const bags = calculateBagRequirements(volumeCubicFeet);

  return {
    volume: volumeCubicFeet,
    volumeUnit: VolumeUnit.CUBIC_FEET,
    weight: weightPounds,
    weightUnit: WeightUnit.POUNDS,
    bags,
    isValid: true,
  };
}

// Calculate volume for tube/hollow cylinder
export function calculateTubeVolume(
  values: TubeConcreteValues
): ConcreteCalculationResult {
  // Validate inputs
  const outerDiameterValidation = validateInput(
    values.outerDiameter,
    "Outer Diameter"
  );
  if (!outerDiameterValidation.isValid) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: outerDiameterValidation.error,
    };
  }

  const innerDiameterValidation = validateInput(
    values.innerDiameter,
    "Inner Diameter"
  );
  if (!innerDiameterValidation.isValid) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: innerDiameterValidation.error,
    };
  }

  if (values.innerDiameter >= values.outerDiameter) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: "Inner diameter must be less than outer diameter",
    };
  }

  const heightValidation = validateInput(values.height, "Height");
  if (!heightValidation.isValid) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: heightValidation.error,
    };
  }

  const quantityValidation = validateInput(values.quantity, "Quantity");
  if (!quantityValidation.isValid) {
    return {
      volume: 0,
      volumeUnit: VolumeUnit.CUBIC_FEET,
      weight: 0,
      weightUnit: WeightUnit.POUNDS,
      bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
      isValid: false,
      error: quantityValidation.error,
    };
  }

  // Convert dimensions to feet
  const outerDiameterFeet = convertToFeet(
    values.outerDiameter,
    values.outerDiameterUnit
  );
  const innerDiameterFeet = convertToFeet(
    values.innerDiameter,
    values.innerDiameterUnit
  );
  const heightFeet = convertToFeet(values.height, values.heightUnit);

  // Calculate volume: π × (R² - r²) × h
  const outerRadius = outerDiameterFeet / 2;
  const innerRadius = innerDiameterFeet / 2;
  const volumeCubicFeet =
    Math.PI *
    (outerRadius * outerRadius - innerRadius * innerRadius) *
    heightFeet *
    values.quantity;

  // Calculate weight
  const weightPounds = volumeCubicFeet * CONCRETE_DENSITY_LBS_PER_CUBIC_FOOT;

  // Calculate bag requirements
  const bags = calculateBagRequirements(volumeCubicFeet);

  return {
    volume: volumeCubicFeet,
    volumeUnit: VolumeUnit.CUBIC_FEET,
    weight: weightPounds,
    weightUnit: WeightUnit.POUNDS,
    bags,
    isValid: true,
  };
}

// Calculate volume for curb and gutter
export function calculateCurbVolume(
  values: CurbConcreteValues
): ConcreteCalculationResult {
  // Validate inputs
  const validations = [
    validateInput(values.curbDepth, "Curb Depth"),
    validateInput(values.gutterWidth, "Gutter Width"),
    validateInput(values.curbHeight, "Curb Height"),
    validateInput(values.flagThickness, "Flag Thickness"),
    validateInput(values.length, "Length"),
    validateInput(values.quantity, "Quantity"),
  ];

  for (const validation of validations) {
    if (!validation.isValid) {
      return {
        volume: 0,
        volumeUnit: VolumeUnit.CUBIC_FEET,
        weight: 0,
        weightUnit: WeightUnit.POUNDS,
        bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
        isValid: false,
        error: validation.error,
      };
    }
  }

  // Convert dimensions to feet
  const curbDepthFeet = convertToFeet(values.curbDepth, values.curbDepthUnit);
  const gutterWidthFeet = convertToFeet(
    values.gutterWidth,
    values.gutterWidthUnit
  );
  const curbHeightFeet = convertToFeet(
    values.curbHeight,
    values.curbHeightUnit
  );
  const flagThicknessFeet = convertToFeet(
    values.flagThickness,
    values.flagThicknessUnit
  );
  const lengthFeet = convertToFeet(values.length, values.lengthUnit);

  // Calculate volume: (curb volume + gutter volume)
  const curbVolume = curbDepthFeet * curbHeightFeet * lengthFeet;
  const gutterVolume = gutterWidthFeet * flagThicknessFeet * lengthFeet;
  const volumeCubicFeet = (curbVolume + gutterVolume) * values.quantity;

  // Calculate weight
  const weightPounds = volumeCubicFeet * CONCRETE_DENSITY_LBS_PER_CUBIC_FOOT;

  // Calculate bag requirements
  const bags = calculateBagRequirements(volumeCubicFeet);

  return {
    volume: volumeCubicFeet,
    volumeUnit: VolumeUnit.CUBIC_FEET,
    weight: weightPounds,
    weightUnit: WeightUnit.POUNDS,
    bags,
    isValid: true,
  };
}

// Calculate volume for stairs
export function calculateStairsVolume(
  values: StairsConcreteValues
): ConcreteCalculationResult {
  // Validate inputs
  const validations = [
    validateInput(values.run, "Run"),
    validateInput(values.rise, "Rise"),
    validateInput(values.width, "Width"),
    validateInput(values.platformDepth, "Platform Depth"),
    validateInput(values.numberOfSteps, "Number of Steps"),
  ];

  for (const validation of validations) {
    if (!validation.isValid) {
      return {
        volume: 0,
        volumeUnit: VolumeUnit.CUBIC_FEET,
        weight: 0,
        weightUnit: WeightUnit.POUNDS,
        bags: { bags60lb: 0, bags80lb: 0, bags40kg: 0, bags20kg: 0 },
        isValid: false,
        error: validation.error,
      };
    }
  }

  // Convert dimensions to feet
  const runFeet = convertToFeet(values.run, values.runUnit);
  const riseFeet = convertToFeet(values.rise, values.riseUnit);
  const widthFeet = convertToFeet(values.width, values.widthUnit);
  const platformDepthFeet = convertToFeet(
    values.platformDepth,
    values.platformDepthUnit
  );

  // Calculate volume for triangular stairs
  // Volume = (run × rise × width × numberOfSteps) / 2 + (platform volume if any)
  const stepsVolume =
    (runFeet * riseFeet * widthFeet * values.numberOfSteps) / 2;
  const platformVolume = platformDepthFeet * riseFeet * widthFeet;
  const volumeCubicFeet = stepsVolume + platformVolume;

  // Calculate weight
  const weightPounds = volumeCubicFeet * CONCRETE_DENSITY_LBS_PER_CUBIC_FOOT;

  // Calculate bag requirements
  const bags = calculateBagRequirements(volumeCubicFeet);

  return {
    volume: volumeCubicFeet,
    volumeUnit: VolumeUnit.CUBIC_FEET,
    weight: weightPounds,
    weightUnit: WeightUnit.POUNDS,
    bags,
    isValid: true,
  };
}

// Calculate bag requirements
export function calculateBagRequirements(
  volumeCubicFeet: number
): BagCalculation {
  return {
    bags60lb: Math.ceil(volumeCubicFeet / BAG_COVERAGE["60lb"]),
    bags80lb: Math.ceil(volumeCubicFeet / BAG_COVERAGE["80lb"]),
    bags40kg: Math.ceil(volumeCubicFeet / BAG_COVERAGE["40kg"]),
    bags20kg: Math.ceil(volumeCubicFeet / BAG_COVERAGE["20kg"]),
  };
}

// Formatting functions
export function formatVolume(volume: number, unit: VolumeUnit): string {
  const unitLabels = {
    [VolumeUnit.CUBIC_FEET]: "ft³",
    [VolumeUnit.CUBIC_YARDS]: "yd³",
    [VolumeUnit.CUBIC_METERS]: "m³",
  };
  return `${volume.toFixed(2)} ${unitLabels[unit]}`;
}

export function formatWeight(weight: number, unit: WeightUnit): string {
  const unitLabels = {
    [WeightUnit.POUNDS]: "lbs",
    [WeightUnit.KILOGRAMS]: "kg",
    [WeightUnit.TONS]: "tons",
  };
  return `${weight.toFixed(0)} ${unitLabels[unit]}`;
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}

// Convert weight to different units
export function convertWeight(pounds: number, targetUnit: WeightUnit): number {
  switch (targetUnit) {
    case WeightUnit.POUNDS:
      return pounds;
    case WeightUnit.KILOGRAMS:
      return pounds * 0.453592;
    case WeightUnit.TONS:
      return pounds / 2000;
    default:
      return pounds;
  }
}

// Get unit label
export function getUnitLabel(unit: LengthUnit): string {
  const labels = {
    [LengthUnit.FEET]: "ft",
    [LengthUnit.INCHES]: "in",
    [LengthUnit.YARDS]: "yd",
    [LengthUnit.METERS]: "m",
    [LengthUnit.CENTIMETERS]: "cm",
  };
  return labels[unit];
}

// Calculate total project requirements
export function calculateProjectTotals(results: ConcreteCalculationResult[]): {
  totalVolume: number;
  totalWeight: number;
  totalBags: BagCalculation;
} {
  const validResults = results.filter((result) => result.isValid);

  const totalVolume = validResults.reduce(
    (sum, result) => sum + result.volume,
    0
  );
  const totalWeight = validResults.reduce(
    (sum, result) => sum + result.weight,
    0
  );

  const totalBags: BagCalculation = {
    bags60lb: validResults.reduce(
      (sum, result) => sum + result.bags.bags60lb,
      0
    ),
    bags80lb: validResults.reduce(
      (sum, result) => sum + result.bags.bags80lb,
      0
    ),
    bags40kg: validResults.reduce(
      (sum, result) => sum + result.bags.bags40kg,
      0
    ),
    bags20kg: validResults.reduce(
      (sum, result) => sum + result.bags.bags20kg,
      0
    ),
  };

  return { totalVolume, totalWeight, totalBags };
}

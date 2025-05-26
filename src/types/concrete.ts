export interface ConcreteCalculationValues {
  shape: ConcreteShape;
  length: number;
  width: number;
  thickness: number;
  quantity: number;
  lengthUnit: LengthUnit;
  widthUnit: LengthUnit;
  thicknessUnit: LengthUnit;
}

export interface RoundConcreteValues {
  diameter: number;
  depth: number;
  quantity: number;
  diameterUnit: LengthUnit;
  depthUnit: LengthUnit;
}

export interface TubeConcreteValues {
  outerDiameter: number;
  innerDiameter: number;
  height: number;
  quantity: number;
  outerDiameterUnit: LengthUnit;
  innerDiameterUnit: LengthUnit;
  heightUnit: LengthUnit;
}

export interface CurbConcreteValues {
  curbDepth: number;
  gutterWidth: number;
  curbHeight: number;
  flagThickness: number;
  length: number;
  quantity: number;
  curbDepthUnit: LengthUnit;
  gutterWidthUnit: LengthUnit;
  curbHeightUnit: LengthUnit;
  flagThicknessUnit: LengthUnit;
  lengthUnit: LengthUnit;
}

export interface StairsConcreteValues {
  run: number;
  rise: number;
  width: number;
  platformDepth: number;
  numberOfSteps: number;
  runUnit: LengthUnit;
  riseUnit: LengthUnit;
  widthUnit: LengthUnit;
  platformDepthUnit: LengthUnit;
}

export interface ConcreteCalculationResult {
  volume: number;
  volumeUnit: VolumeUnit;
  weight: number;
  weightUnit: WeightUnit;
  bags: BagCalculation;
  isValid: boolean;
  error?: string;
}

export interface BagCalculation {
  bags60lb: number;
  bags80lb: number;
  bags40kg: number;
  bags20kg: number;
}

export interface ConcreteValidation {
  isValid: boolean;
  error?: string;
}

export enum ConcreteShape {
  SLAB = "slab",
  ROUND = "round",
  TUBE = "tube",
  CURB = "curb",
  STAIRS = "stairs",
}

export enum LengthUnit {
  FEET = "feet",
  INCHES = "inches",
  YARDS = "yards",
  METERS = "meters",
  CENTIMETERS = "centimeters",
}

export enum VolumeUnit {
  CUBIC_FEET = "cubic_feet",
  CUBIC_YARDS = "cubic_yards",
  CUBIC_METERS = "cubic_meters",
}

export enum WeightUnit {
  POUNDS = "pounds",
  KILOGRAMS = "kilograms",
  TONS = "tons",
}

export interface ConcreteProject {
  name: string;
  calculations: ConcreteCalculationResult[];
  totalVolume: number;
  totalWeight: number;
  totalBags: BagCalculation;
}

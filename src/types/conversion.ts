export interface ConversionFormValues {
  fromValue: number | "";
  fromUnit: string;
  toUnit: string;
  category: ConversionCategory;
}

export interface ConversionResult {
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  category: ConversionCategory;
  formula: string;
  generatedAt: Date;
}

export enum ConversionCategory {
  LENGTH = "length",
  TEMPERATURE = "temperature",
  AREA = "area",
  VOLUME = "volume",
  WEIGHT = "weight",
}

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  multiplier?: number; // For simple conversions (multiply by this to get base unit)
}

export interface UnitCategory {
  id: ConversionCategory;
  name: string;
  baseUnit: string;
  units: Unit[];
}

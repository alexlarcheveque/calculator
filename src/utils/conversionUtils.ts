import {
  ConversionCategory,
  ConversionFormValues,
  ConversionResult,
  Unit,
  UnitCategory,
} from "@/types/conversion";

// Unit definitions with conversion multipliers (to base unit)
export const unitCategories: UnitCategory[] = [
  {
    id: ConversionCategory.LENGTH,
    name: "Length",
    baseUnit: "meter",
    units: [
      { id: "meter", name: "Meter", symbol: "m", multiplier: 1 },
      { id: "kilometer", name: "Kilometer", symbol: "km", multiplier: 1000 },
      { id: "centimeter", name: "Centimeter", symbol: "cm", multiplier: 0.01 },
      { id: "millimeter", name: "Millimeter", symbol: "mm", multiplier: 0.001 },
      {
        id: "micrometer",
        name: "Micrometer",
        symbol: "μm",
        multiplier: 0.000001,
      },
      {
        id: "nanometer",
        name: "Nanometer",
        symbol: "nm",
        multiplier: 0.000000001,
      },
      { id: "mile", name: "Mile", symbol: "mi", multiplier: 1609.344 },
      { id: "yard", name: "Yard", symbol: "yd", multiplier: 0.9144 },
      { id: "foot", name: "Foot", symbol: "ft", multiplier: 0.3048 },
      { id: "inch", name: "Inch", symbol: "in", multiplier: 0.0254 },
      {
        id: "lightyear",
        name: "Light Year",
        symbol: "ly",
        multiplier: 9.461e15,
      },
    ],
  },
  {
    id: ConversionCategory.TEMPERATURE,
    name: "Temperature",
    baseUnit: "celsius",
    units: [
      { id: "celsius", name: "Celsius", symbol: "°C" },
      { id: "fahrenheit", name: "Fahrenheit", symbol: "°F" },
      { id: "kelvin", name: "Kelvin", symbol: "K" },
      { id: "rankine", name: "Rankine", symbol: "°R" },
    ],
  },
  {
    id: ConversionCategory.AREA,
    name: "Area",
    baseUnit: "square_meter",
    units: [
      { id: "square_meter", name: "Square Meter", symbol: "m²", multiplier: 1 },
      {
        id: "square_kilometer",
        name: "Square Kilometer",
        symbol: "km²",
        multiplier: 1000000,
      },
      {
        id: "square_centimeter",
        name: "Square Centimeter",
        symbol: "cm²",
        multiplier: 0.0001,
      },
      {
        id: "square_millimeter",
        name: "Square Millimeter",
        symbol: "mm²",
        multiplier: 0.000001,
      },
      { id: "hectare", name: "Hectare", symbol: "ha", multiplier: 10000 },
      { id: "acre", name: "Acre", symbol: "ac", multiplier: 4046.8564224 },
      {
        id: "square_mile",
        name: "Square Mile",
        symbol: "mi²",
        multiplier: 2589988.110336,
      },
      {
        id: "square_yard",
        name: "Square Yard",
        symbol: "yd²",
        multiplier: 0.83612736,
      },
      {
        id: "square_foot",
        name: "Square Foot",
        symbol: "ft²",
        multiplier: 0.09290304,
      },
      {
        id: "square_inch",
        name: "Square Inch",
        symbol: "in²",
        multiplier: 0.00064516,
      },
    ],
  },
  {
    id: ConversionCategory.VOLUME,
    name: "Volume",
    baseUnit: "liter",
    units: [
      { id: "liter", name: "Liter", symbol: "L", multiplier: 1 },
      { id: "milliliter", name: "Milliliter", symbol: "mL", multiplier: 0.001 },
      {
        id: "cubic_meter",
        name: "Cubic Meter",
        symbol: "m³",
        multiplier: 1000,
      },
      {
        id: "cubic_centimeter",
        name: "Cubic Centimeter",
        symbol: "cm³",
        multiplier: 0.001,
      },
      {
        id: "gallon_us",
        name: "Gallon (US)",
        symbol: "gal",
        multiplier: 3.785411784,
      },
      {
        id: "gallon_uk",
        name: "Gallon (UK)",
        symbol: "gal",
        multiplier: 4.54609,
      },
      {
        id: "quart_us",
        name: "Quart (US)",
        symbol: "qt",
        multiplier: 0.946352946,
      },
      {
        id: "pint_us",
        name: "Pint (US)",
        symbol: "pt",
        multiplier: 0.473176473,
      },
      {
        id: "cup_us",
        name: "Cup (US)",
        symbol: "cup",
        multiplier: 0.2365882365,
      },
      {
        id: "fluid_ounce_us",
        name: "Fluid Ounce (US)",
        symbol: "fl oz",
        multiplier: 0.0295735296875,
      },
      {
        id: "tablespoon",
        name: "Tablespoon",
        symbol: "tbsp",
        multiplier: 0.01478676478125,
      },
      {
        id: "teaspoon",
        name: "Teaspoon",
        symbol: "tsp",
        multiplier: 0.00492892159375,
      },
    ],
  },
  {
    id: ConversionCategory.WEIGHT,
    name: "Weight",
    baseUnit: "kilogram",
    units: [
      { id: "kilogram", name: "Kilogram", symbol: "kg", multiplier: 1 },
      { id: "gram", name: "Gram", symbol: "g", multiplier: 0.001 },
      {
        id: "milligram",
        name: "Milligram",
        symbol: "mg",
        multiplier: 0.000001,
      },
      { id: "metric_ton", name: "Metric Ton", symbol: "t", multiplier: 1000 },
      { id: "pound", name: "Pound", symbol: "lb", multiplier: 0.45359237 },
      { id: "ounce", name: "Ounce", symbol: "oz", multiplier: 0.028349523125 },
      { id: "stone", name: "Stone", symbol: "st", multiplier: 6.35029318 },
      {
        id: "short_ton",
        name: "Short Ton (US)",
        symbol: "ton",
        multiplier: 907.18474,
      },
      {
        id: "long_ton",
        name: "Long Ton (UK)",
        symbol: "ton",
        multiplier: 1016.0469088,
      },
    ],
  },
];

// Temperature conversion functions (special case)
function convertTemperature(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  if (fromUnit === toUnit) return value;

  // Convert from source to Celsius first
  let celsius: number;
  switch (fromUnit) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = ((value - 32) * 5) / 9;
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
    case "rankine":
      celsius = ((value - 491.67) * 5) / 9;
      break;
    default:
      throw new Error(`Unknown temperature unit: ${fromUnit}`);
  }

  // Convert from Celsius to target
  switch (toUnit) {
    case "celsius":
      return celsius;
    case "fahrenheit":
      return (celsius * 9) / 5 + 32;
    case "kelvin":
      return celsius + 273.15;
    case "rankine":
      return (celsius * 9) / 5 + 491.67;
    default:
      throw new Error(`Unknown temperature unit: ${toUnit}`);
  }
}

// Get temperature conversion formula
function getTemperatureFormula(fromUnit: string, toUnit: string): string {
  if (fromUnit === toUnit) return "Same unit";

  const formulas: Record<string, Record<string, string>> = {
    celsius: {
      fahrenheit: "°F = °C × 9/5 + 32",
      kelvin: "K = °C + 273.15",
      rankine: "°R = °C × 9/5 + 491.67",
    },
    fahrenheit: {
      celsius: "°C = (°F - 32) × 5/9",
      kelvin: "K = (°F - 32) × 5/9 + 273.15",
      rankine: "°R = °F + 459.67",
    },
    kelvin: {
      celsius: "°C = K - 273.15",
      fahrenheit: "°F = (K - 273.15) × 9/5 + 32",
      rankine: "°R = K × 9/5",
    },
    rankine: {
      celsius: "°C = (°R - 491.67) × 5/9",
      fahrenheit: "°F = °R - 459.67",
      kelvin: "K = °R × 5/9",
    },
  };

  return formulas[fromUnit]?.[toUnit] || "Complex conversion";
}

// Main conversion function
export function performConversion(
  formValues: ConversionFormValues
): ConversionResult {
  const { fromValue, fromUnit, toUnit, category } = formValues;

  if (fromValue === "") {
    throw new Error("Please enter a value to convert");
  }

  const value = Number(fromValue);
  if (isNaN(value)) {
    throw new Error("Please enter a valid number");
  }

  if (fromUnit === toUnit) {
    return {
      fromValue: value,
      fromUnit,
      toValue: value,
      toUnit,
      category,
      formula: "Same unit",
      generatedAt: new Date(),
    };
  }

  let toValue: number;
  let formula: string;

  // Special handling for temperature
  if (category === ConversionCategory.TEMPERATURE) {
    toValue = convertTemperature(value, fromUnit, toUnit);
    formula = getTemperatureFormula(fromUnit, toUnit);
  } else {
    // Standard multiplication-based conversion
    const categoryData = unitCategories.find((cat) => cat.id === category);
    if (!categoryData) {
      throw new Error(`Unknown category: ${category}`);
    }

    const fromUnitData = categoryData.units.find(
      (unit) => unit.id === fromUnit
    );
    const toUnitData = categoryData.units.find((unit) => unit.id === toUnit);

    if (!fromUnitData || !toUnitData) {
      throw new Error("Invalid units selected");
    }

    if (!fromUnitData.multiplier || !toUnitData.multiplier) {
      throw new Error("Unit conversion data missing");
    }

    // Convert through base unit
    const baseValue = value * fromUnitData.multiplier;
    toValue = baseValue / toUnitData.multiplier;

    formula = `1 ${fromUnitData.symbol} = ${(
      fromUnitData.multiplier / toUnitData.multiplier
    ).toExponential(6)} ${toUnitData.symbol}`;
  }

  return {
    fromValue: value,
    fromUnit,
    toValue,
    toUnit,
    category,
    formula,
    generatedAt: new Date(),
  };
}

// Helper functions
export function getUnitsForCategory(category: ConversionCategory): Unit[] {
  const categoryData = unitCategories.find((cat) => cat.id === category);
  return categoryData?.units || [];
}

export function getUnitName(
  unitId: string,
  category: ConversionCategory
): string {
  const units = getUnitsForCategory(category);
  const unit = units.find((u) => u.id === unitId);
  return unit?.name || unitId;
}

export function getUnitSymbol(
  unitId: string,
  category: ConversionCategory
): string {
  const units = getUnitsForCategory(category);
  const unit = units.find((u) => u.id === unitId);
  return unit?.symbol || unitId;
}

export function formatConversionValue(value: number): string {
  // Handle very large and very small numbers
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 0.001 && value !== 0)) {
    return value.toExponential(6);
  }

  // For normal numbers, use appropriate decimal places
  if (value % 1 === 0) {
    return value.toString();
  }

  return parseFloat(value.toFixed(8)).toString();
}

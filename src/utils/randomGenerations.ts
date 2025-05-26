import { RandomGeneratorOptions, RandomResult } from "@/types/random";

// Generate a single random integer between min and max (inclusive)
export function generateRandomInteger(min: number, max: number): number {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

// Generate a single random decimal between min and max with specified precision
export function generateRandomDecimal(
  min: number,
  max: number,
  precision: number = 2
): string {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

// Generate multiple random numbers with comprehensive options
export function generateRandomNumbers(
  options: RandomGeneratorOptions
): RandomResult {
  const {
    min,
    max,
    count,
    type,
    precision = 2,
    allowDuplication,
    sort,
  } = options;

  if (min >= max) {
    throw new Error("Lower limit must be less than upper limit");
  }

  if (count <= 0) {
    throw new Error("Count must be greater than 0");
  }

  if (count > 10000) {
    throw new Error("Count cannot exceed 10,000 for performance reasons");
  }

  if (type === "decimal" && (precision < 0 || precision > 999)) {
    throw new Error("Precision must be between 0 and 999");
  }

  const numbers: (number | string)[] = [];
  const usedNumbers = new Set<string>();

  for (let i = 0; i < count; i++) {
    let newNumber: number | string;
    let attempts = 0;
    const maxAttempts = 100000; // Prevent infinite loops

    do {
      if (type === "integer") {
        newNumber = generateRandomInteger(min, max);
      } else {
        newNumber = generateRandomDecimal(min, max, precision);
      }

      attempts++;

      // If we can't find a unique number after many attempts, allow duplicates
      if (attempts > maxAttempts) {
        break;
      }
    } while (!allowDuplication && usedNumbers.has(newNumber.toString()));

    numbers.push(newNumber);
    if (!allowDuplication) {
      usedNumbers.add(newNumber.toString());
    }
  }

  // Sort if requested
  if (sort !== "none") {
    numbers.sort((a, b) => {
      const numA = typeof a === "string" ? parseFloat(a) : a;
      const numB = typeof b === "string" ? parseFloat(b) : b;

      if (sort === "asc") {
        return numA - numB;
      } else {
        return numB - numA;
      }
    });
  }

  return {
    numbers,
    settings: {
      lowerLimit: min,
      upperLimit: max,
      count,
      numberType: type,
      precision: type === "decimal" ? precision : undefined,
      allowDuplication,
      sortOrder: sort,
    },
    generatedAt: new Date(),
  };
}

// Generate a simple random integer (for the basic generator)
export function generateSimpleRandomInteger(
  min: number,
  max: number
): RandomResult {
  if (min >= max) {
    throw new Error("Lower limit must be less than upper limit");
  }

  const number = generateRandomInteger(min, max);

  return {
    numbers: [number],
    settings: {
      lowerLimit: min,
      upperLimit: max,
      count: 1,
      numberType: "integer",
      allowDuplication: true,
      sortOrder: "none",
    },
    generatedAt: new Date(),
  };
}

// Validate number range for different types
export function validateNumberRange(
  min: number,
  max: number,
  type: "integer" | "decimal"
): void {
  if (isNaN(min) || isNaN(max)) {
    throw new Error("Limits must be valid numbers");
  }

  if (min >= max) {
    throw new Error("Lower limit must be less than upper limit");
  }

  if (type === "integer") {
    if (max - min > Number.MAX_SAFE_INTEGER) {
      throw new Error("Range too large for integer generation");
    }
  }
}

// Check if unique generation is possible
export function canGenerateUniqueNumbers(
  min: number,
  max: number,
  count: number,
  type: "integer" | "decimal",
  precision?: number
): boolean {
  if (type === "integer") {
    const range = Math.floor(max) - Math.ceil(min) + 1;
    return count <= range;
  } else {
    // For decimals, we assume there are enough unique values with the given precision
    // This is a simplification - in reality it depends on the precision and range
    const range = max - min;
    const possibleValues = Math.pow(10, precision || 2) * range;
    return count <= possibleValues;
  }
}

// Format number for display
export function formatRandomNumber(
  num: number | string,
  type: "integer" | "decimal"
): string {
  if (type === "integer") {
    return typeof num === "string" ? parseInt(num).toString() : num.toString();
  } else {
    return num.toString();
  }
}

// Generate seed for reproducible random numbers (optional feature)
export function generateSeed(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

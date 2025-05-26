import { Fraction, FractionResult, FractionOperation } from "@/types/fraction";

// Helper function to find Greatest Common Divisor
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Helper function to find Least Common Multiple
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

// Simplify a fraction
export function simplifyFraction(fraction: Fraction): Fraction {
  const { numerator, denominator, wholeNumber = 0 } = fraction;

  if (denominator === 0) {
    throw new Error("Denominator cannot be zero");
  }

  const commonDivisor = gcd(numerator, denominator);
  const simplifiedNumerator = numerator / commonDivisor;
  const simplifiedDenominator = denominator / commonDivisor;

  // Handle negative fractions
  const isNegative = simplifiedNumerator < 0 !== simplifiedDenominator < 0;
  const absNumerator = Math.abs(simplifiedNumerator);
  const absDenominator = Math.abs(simplifiedDenominator);

  return {
    numerator: isNegative ? -absNumerator : absNumerator,
    denominator: absDenominator,
    wholeNumber,
  };
}

// Convert mixed number to improper fraction
export function mixedToImproper(
  wholeNumber: number,
  numerator: number,
  denominator: number
): Fraction {
  const improperNumerator = Math.abs(wholeNumber) * denominator + numerator;
  return {
    numerator: wholeNumber < 0 ? -improperNumerator : improperNumerator,
    denominator,
  };
}

// Convert improper fraction to mixed number
export function improperToMixed(fraction: Fraction): Fraction {
  const { numerator, denominator } = fraction;

  if (Math.abs(numerator) < denominator) {
    return fraction;
  }

  const wholeNumber = Math.floor(Math.abs(numerator) / denominator);
  const remainingNumerator = Math.abs(numerator) % denominator;

  return {
    numerator: remainingNumerator,
    denominator,
    wholeNumber: numerator < 0 ? -wholeNumber : wholeNumber,
  };
}

// Add two fractions
export function addFractions(frac1: Fraction, frac2: Fraction): FractionResult {
  const commonDenominator = lcm(frac1.denominator, frac2.denominator);
  const num1 = frac1.numerator * (commonDenominator / frac1.denominator);
  const num2 = frac2.numerator * (commonDenominator / frac2.denominator);

  const result: Fraction = {
    numerator: num1 + num2,
    denominator: commonDenominator,
  };

  const simplified = simplifyFraction(result);
  const decimal = result.numerator / result.denominator;

  const steps = [
    `${frac1.numerator}/${frac1.denominator} + ${frac2.numerator}/${frac2.denominator}`,
    `= ${num1}/${commonDenominator} + ${num2}/${commonDenominator}`,
    `= ${result.numerator}/${result.denominator}`,
    simplified.numerator !== result.numerator ||
    simplified.denominator !== result.denominator
      ? `= ${simplified.numerator}/${simplified.denominator}`
      : "",
  ].filter(Boolean);

  return { result, simplified, decimal, steps };
}

// Subtract two fractions
export function subtractFractions(
  frac1: Fraction,
  frac2: Fraction
): FractionResult {
  const commonDenominator = lcm(frac1.denominator, frac2.denominator);
  const num1 = frac1.numerator * (commonDenominator / frac1.denominator);
  const num2 = frac2.numerator * (commonDenominator / frac2.denominator);

  const result: Fraction = {
    numerator: num1 - num2,
    denominator: commonDenominator,
  };

  const simplified = simplifyFraction(result);
  const decimal = result.numerator / result.denominator;

  const steps = [
    `${frac1.numerator}/${frac1.denominator} - ${frac2.numerator}/${frac2.denominator}`,
    `= ${num1}/${commonDenominator} - ${num2}/${commonDenominator}`,
    `= ${result.numerator}/${result.denominator}`,
    simplified.numerator !== result.numerator ||
    simplified.denominator !== result.denominator
      ? `= ${simplified.numerator}/${simplified.denominator}`
      : "",
  ].filter(Boolean);

  return { result, simplified, decimal, steps };
}

// Multiply two fractions
export function multiplyFractions(
  frac1: Fraction,
  frac2: Fraction
): FractionResult {
  const result: Fraction = {
    numerator: frac1.numerator * frac2.numerator,
    denominator: frac1.denominator * frac2.denominator,
  };

  const simplified = simplifyFraction(result);
  const decimal = result.numerator / result.denominator;

  const steps = [
    `${frac1.numerator}/${frac1.denominator} × ${frac2.numerator}/${frac2.denominator}`,
    `= ${result.numerator}/${result.denominator}`,
    simplified.numerator !== result.numerator ||
    simplified.denominator !== result.denominator
      ? `= ${simplified.numerator}/${simplified.denominator}`
      : "",
  ].filter(Boolean);

  return { result, simplified, decimal, steps };
}

// Divide two fractions
export function divideFractions(
  frac1: Fraction,
  frac2: Fraction
): FractionResult {
  if (frac2.numerator === 0) {
    throw new Error("Cannot divide by zero");
  }

  const result: Fraction = {
    numerator: frac1.numerator * frac2.denominator,
    denominator: frac1.denominator * frac2.numerator,
  };

  const simplified = simplifyFraction(result);
  const decimal = result.numerator / result.denominator;

  const steps = [
    `${frac1.numerator}/${frac1.denominator} ÷ ${frac2.numerator}/${frac2.denominator}`,
    `= ${frac1.numerator}/${frac1.denominator} × ${frac2.denominator}/${frac2.numerator}`,
    `= ${result.numerator}/${result.denominator}`,
    simplified.numerator !== result.numerator ||
    simplified.denominator !== result.denominator
      ? `= ${simplified.numerator}/${simplified.denominator}`
      : "",
  ].filter(Boolean);

  return { result, simplified, decimal, steps };
}

// Perform fraction operation
export function performFractionOperation(
  frac1: Fraction,
  frac2: Fraction,
  operation: FractionOperation
): FractionResult {
  switch (operation) {
    case FractionOperation.ADD:
      return addFractions(frac1, frac2);
    case FractionOperation.SUBTRACT:
      return subtractFractions(frac1, frac2);
    case FractionOperation.MULTIPLY:
      return multiplyFractions(frac1, frac2);
    case FractionOperation.DIVIDE:
      return divideFractions(frac1, frac2);
    default:
      throw new Error("Invalid operation");
  }
}

// Convert decimal to fraction
export function decimalToFraction(decimal: number): Fraction {
  if (decimal === 0) {
    return { numerator: 0, denominator: 1 };
  }

  const isNegative = decimal < 0;
  const absDecimal = Math.abs(decimal);

  // Handle whole numbers
  if (absDecimal % 1 === 0) {
    return { numerator: isNegative ? -absDecimal : absDecimal, denominator: 1 };
  }

  // Convert decimal to fraction
  const decimalString = absDecimal.toString();
  const decimalPlaces = decimalString.split(".")[1]?.length || 0;
  const denominator = Math.pow(10, decimalPlaces);
  const numerator = Math.round(absDecimal * denominator);

  const simplified = simplifyFraction({
    numerator: isNegative ? -numerator : numerator,
    denominator,
  });

  return simplified;
}

// Parse mixed number string (e.g., "2 3/4" or "-1 1/2")
export function parseMixedNumber(mixedStr: string): Fraction {
  const trimmed = mixedStr.trim();

  // Check if it's just a fraction
  if (trimmed.includes("/") && !trimmed.includes(" ")) {
    const [num, den] = trimmed.split("/").map((s) => parseInt(s.trim()));
    return { numerator: num, denominator: den };
  }

  // Check if it's a mixed number
  const parts = trimmed.split(" ");
  if (parts.length === 2) {
    const wholeNumber = parseInt(parts[0]);
    const [num, den] = parts[1].split("/").map((s) => parseInt(s.trim()));
    return mixedToImproper(wholeNumber, num, den);
  }

  // Check if it's just a whole number
  if (!trimmed.includes("/")) {
    const wholeNumber = parseInt(trimmed);
    return { numerator: wholeNumber, denominator: 1 };
  }

  throw new Error("Invalid mixed number format");
}

// Format fraction for display
export function formatFraction(
  fraction: Fraction,
  showMixed: boolean = false
): string {
  const { numerator, denominator, wholeNumber = 0 } = fraction;

  if (denominator === 1) {
    return (wholeNumber + numerator).toString();
  }

  if (showMixed && Math.abs(numerator) >= denominator) {
    const mixed = improperToMixed(fraction);
    if (mixed.wholeNumber === 0) {
      return `${mixed.numerator}/${mixed.denominator}`;
    }
    return `${mixed.wholeNumber} ${mixed.numerator}/${mixed.denominator}`;
  }

  return `${numerator}/${denominator}`;
}

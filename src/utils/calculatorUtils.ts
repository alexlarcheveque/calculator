import { CalculatorFunction } from "@/types/calculator";

export const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const toDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

export const factorial = (n: number): number => {
  if (n < 0) throw new Error("Factorial is not defined for negative numbers");
  if (n === 0 || n === 1) return 1;
  if (n > 170) throw new Error("Factorial overflow");

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

export const nthRoot = (x: number, n: number): number => {
  if (n === 0) throw new Error("Root degree cannot be zero");
  if (x < 0 && n % 2 === 0) throw new Error("Even root of negative number");

  return Math.pow(x, 1 / n);
};

export const formatNumber = (num: number): string => {
  // Handle special cases
  if (!isFinite(num)) {
    if (isNaN(num)) return "Error";
    return num > 0 ? "Infinity" : "-Infinity";
  }

  // Handle very small numbers
  if (Math.abs(num) < 1e-10 && num !== 0) {
    return num.toExponential(6);
  }

  // Handle very large numbers
  if (Math.abs(num) >= 1e10) {
    return num.toExponential(6);
  }

  // Regular formatting
  const str = num.toString();
  if (str.length > 12) {
    return parseFloat(num.toPrecision(10)).toString();
  }

  return str;
};

export const evaluateFunction = (
  func: CalculatorFunction,
  value: number,
  angleMode: "deg" | "rad" = "deg",
  secondValue?: number
): number => {
  switch (func) {
    // Trigonometric functions
    case CalculatorFunction.SIN:
      return Math.sin(angleMode === "deg" ? toRadians(value) : value);
    case CalculatorFunction.COS:
      return Math.cos(angleMode === "deg" ? toRadians(value) : value);
    case CalculatorFunction.TAN:
      return Math.tan(angleMode === "deg" ? toRadians(value) : value);
    case CalculatorFunction.ASIN:
      const asinResult = Math.asin(value);
      return angleMode === "deg" ? toDegrees(asinResult) : asinResult;
    case CalculatorFunction.ACOS:
      const acosResult = Math.acos(value);
      return angleMode === "deg" ? toDegrees(acosResult) : acosResult;
    case CalculatorFunction.ATAN:
      const atanResult = Math.atan(value);
      return angleMode === "deg" ? toDegrees(atanResult) : atanResult;

    // Power functions
    case CalculatorFunction.SQUARE:
      return Math.pow(value, 2);
    case CalculatorFunction.CUBE:
      return Math.pow(value, 3);
    case CalculatorFunction.SQRT:
      return Math.sqrt(value);
    case CalculatorFunction.CBRT:
      return Math.cbrt(value);
    case CalculatorFunction.POWER:
      if (secondValue === undefined)
        throw new Error("Second value required for power function");
      return Math.pow(value, secondValue);
    case CalculatorFunction.NTHROOT:
      if (secondValue === undefined)
        throw new Error("Second value required for nth root function");
      return nthRoot(value, secondValue);

    // Exponential and logarithmic
    case CalculatorFunction.EXP:
      return Math.exp(value);
    case CalculatorFunction.TEN_POWER:
      return Math.pow(10, value);
    case CalculatorFunction.LN:
      return Math.log(value);
    case CalculatorFunction.LOG:
      return Math.log10(value);

    // Other functions
    case CalculatorFunction.FACTORIAL:
      return factorial(value);
    case CalculatorFunction.RECIPROCAL:
      if (value === 0) throw new Error("Division by zero");
      return 1 / value;
    case CalculatorFunction.PERCENT:
      return value / 100;
    case CalculatorFunction.NEGATE:
      return -value;

    default:
      throw new Error(`Unknown function: ${func}`);
  }
};

export const evaluateBasicOperation = (
  left: number,
  operator: string,
  right: number
): number => {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      if (right === 0) throw new Error("Division by zero");
      return left / right;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
};

export const getRandomNumber = (): number => {
  return Math.random();
};

export const parseExpression = (expression: string): number => {
  // Simple expression parser for basic operations
  // This is a simplified version - in a real calculator you'd want a more robust parser
  try {
    // Replace display symbols with JavaScript operators
    const jsExpression = expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/–/g, "-");

    // Use Function constructor for safe evaluation (better than eval)
    return new Function("return " + jsExpression)();
  } catch (error) {
    throw new Error("Invalid expression");
  }
};

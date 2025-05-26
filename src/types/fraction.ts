export interface Fraction {
  numerator: number;
  denominator: number;
  wholeNumber?: number;
}

export interface FractionResult {
  result: Fraction;
  decimal: number;
  simplified: Fraction;
  steps: string[];
}

export enum FractionOperation {
  ADD = "+",
  SUBTRACT = "-",
  MULTIPLY = "*",
  DIVIDE = "/",
}

export interface BasicFractionFormValues {
  numerator1: number;
  denominator1: number;
  operation: FractionOperation;
  numerator2: number;
  denominator2: number;
}

export interface MixedNumberFormValues {
  mixedNumber1: string;
  operation: FractionOperation;
  mixedNumber2: string;
}

export interface SimplifyFractionFormValues {
  wholeNumber: number;
  numerator: number;
  denominator: number;
}

export interface DecimalToFractionFormValues {
  decimal: number;
}

export interface FractionToDecimalFormValues {
  numerator: number;
  denominator: number;
}

export interface BigNumberFractionFormValues {
  numerator1: string;
  denominator1: string;
  operation: FractionOperation;
  numerator2: string;
  denominator2: string;
}

export enum CalculatorType {
  BASIC = "basic",
  MIXED_NUMBERS = "mixed",
  SIMPLIFY = "simplify",
  DECIMAL_TO_FRACTION = "decimal-to-fraction",
  FRACTION_TO_DECIMAL = "fraction-to-decimal",
  BIG_NUMBER = "big-number",
}

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
  memory: number;
  history: CalculationHistory[];
  angleMode: "deg" | "rad";
}

export interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: Date;
}

export enum CalculatorFunction {
  // Basic operations
  ADD = "+",
  SUBTRACT = "-",
  MULTIPLY = "*",
  DIVIDE = "/",
  EQUALS = "=",

  // Scientific functions
  SIN = "sin",
  COS = "cos",
  TAN = "tan",
  ASIN = "asin",
  ACOS = "acos",
  ATAN = "atan",

  // Power functions
  POWER = "pow",
  SQUARE = "x2",
  CUBE = "x3",
  SQRT = "sqrt",
  CBRT = "3x",
  NTHROOT = "apow",

  // Exponential and logarithmic
  EXP = "ex",
  TEN_POWER = "10x",
  LN = "ln",
  LOG = "log",

  // Constants
  PI = "pi",
  E = "e",

  // Other functions
  FACTORIAL = "n!",
  RECIPROCAL = "1/x",
  PERCENT = "pc",
  NEGATE = "+/-",

  // Memory functions
  MEMORY_ADD = "M+",
  MEMORY_SUBTRACT = "M-",
  MEMORY_RECALL = "MR",
  MEMORY_CLEAR = "MC",

  // Utility
  CLEAR = "C",
  CLEAR_ENTRY = "CE",
  BACKSPACE = "bk",
  RANDOM = "RND",
  EXP_NOTATION = "EXP",
  ANS = "ans",
}

export interface CalculatorButton {
  label: string;
  value: string | number | CalculatorFunction;
  type: "number" | "operator" | "function" | "equals" | "clear" | "memory";
  className?: string;
  isDisabled?: boolean;
}

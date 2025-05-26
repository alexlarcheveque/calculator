export interface PercentageResult {
  percentage?: number;
  value?: number;
  result?: number;
  steps: string[];
}

export interface BasicPercentageFormValues {
  percentage: number | "";
  value: number | "";
  result: number | "";
}

export interface CommonPhraseFormValues {
  phrase1Value: number | "";
  phrase1Percentage: number | "";
  phrase2Value1: number | "";
  phrase2Value2: number | "";
  phrase3Value: number | "";
  phrase3Percentage: number | "";
}

export interface PercentageDifferenceFormValues {
  value1: number | "";
  value2: number | "";
}

export interface PercentageChangeFormValues {
  originalValue: number | "";
  changeType: "increase" | "decrease";
  changePercentage: number | "";
  finalValue: number | "";
}

export interface PercentageDifferenceResult {
  difference: number;
  percentageDifference: number;
  steps: string[];
}

export interface PercentageChangeResult {
  originalValue?: number;
  changePercentage?: number;
  finalValue?: number;
  changeAmount?: number;
  steps: string[];
}

export enum CalculatorType {
  BASIC = "basic",
  COMMON_PHRASES = "common-phrases",
  PERCENTAGE_DIFFERENCE = "percentage-difference",
  PERCENTAGE_CHANGE = "percentage-change",
}

export enum CommonPhraseType {
  WHAT_IS_X_PERCENT_OF_Y = "what-is-x-percent-of-y",
  X_IS_WHAT_PERCENT_OF_Y = "x-is-what-percent-of-y",
  X_IS_Y_PERCENT_OF_WHAT = "x-is-y-percent-of-what",
}

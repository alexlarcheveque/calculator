import {
  PercentageResult,
  PercentageDifferenceResult,
  PercentageChangeResult,
} from "@/types/percentage";

// Basic percentage calculation: P% of V = R
export function calculateBasicPercentage(
  percentage?: number,
  value?: number,
  result?: number
): PercentageResult {
  const steps: string[] = [];

  // Case 1: Calculate result (P% of V = ?)
  if (percentage !== undefined && value !== undefined && result === undefined) {
    const calculatedResult = (percentage / 100) * value;
    steps.push(`${percentage}% of ${value}`);
    steps.push(`= (${percentage} ÷ 100) × ${value}`);
    steps.push(`= ${percentage / 100} × ${value}`);
    steps.push(`= ${calculatedResult}`);

    return {
      percentage,
      value,
      result: calculatedResult,
      steps,
    };
  }

  // Case 2: Calculate percentage (? % of V = R)
  if (percentage === undefined && value !== undefined && result !== undefined) {
    if (value === 0) {
      throw new Error("Cannot divide by zero");
    }
    const calculatedPercentage = (result / value) * 100;
    steps.push(`? % of ${value} = ${result}`);
    steps.push(`Percentage = (${result} ÷ ${value}) × 100`);
    steps.push(`= ${result / value} × 100`);
    steps.push(`= ${calculatedPercentage}%`);

    return {
      percentage: calculatedPercentage,
      value,
      result,
      steps,
    };
  }

  // Case 3: Calculate value (P% of ? = R)
  if (percentage !== undefined && value === undefined && result !== undefined) {
    if (percentage === 0) {
      throw new Error("Cannot divide by zero percentage");
    }
    const calculatedValue = result / (percentage / 100);
    steps.push(`${percentage}% of ? = ${result}`);
    steps.push(`Value = ${result} ÷ (${percentage} ÷ 100)`);
    steps.push(`= ${result} ÷ ${percentage / 100}`);
    steps.push(`= ${calculatedValue}`);

    return {
      percentage,
      value: calculatedValue,
      result,
      steps,
    };
  }

  throw new Error("Please provide exactly two values to calculate the third");
}

// What is X% of Y?
export function calculateWhatIsPercentOf(
  percentage: number,
  value: number
): PercentageResult {
  const result = (percentage / 100) * value;
  const steps = [
    `What is ${percentage}% of ${value}?`,
    `= (${percentage} ÷ 100) × ${value}`,
    `= ${percentage / 100} × ${value}`,
    `= ${result}`,
  ];

  return {
    percentage,
    value,
    result,
    steps,
  };
}

// X is what % of Y?
export function calculateWhatPercentOf(
  value1: number,
  value2: number
): PercentageResult {
  if (value2 === 0) {
    throw new Error("Cannot divide by zero");
  }

  const percentage = (value1 / value2) * 100;
  const steps = [
    `${value1} is what % of ${value2}?`,
    `= (${value1} ÷ ${value2}) × 100`,
    `= ${value1 / value2} × 100`,
    `= ${percentage}%`,
  ];

  return {
    percentage,
    value: value2,
    result: value1,
    steps,
  };
}

// X is Y% of what?
export function calculatePercentOfWhat(
  value: number,
  percentage: number
): PercentageResult {
  if (percentage === 0) {
    throw new Error("Cannot divide by zero percentage");
  }

  const result = value / (percentage / 100);
  const steps = [
    `${value} is ${percentage}% of what?`,
    `= ${value} ÷ (${percentage} ÷ 100)`,
    `= ${value} ÷ ${percentage / 100}`,
    `= ${result}`,
  ];

  return {
    percentage,
    value: result,
    result: value,
    steps,
  };
}

// Percentage difference between two values
export function calculatePercentageDifference(
  value1: number,
  value2: number
): PercentageDifferenceResult {
  const difference = Math.abs(value1 - value2);
  const average = (value1 + value2) / 2;

  if (average === 0) {
    throw new Error(
      "Cannot calculate percentage difference when average is zero"
    );
  }

  const percentageDifference = (difference / average) * 100;

  const steps = [
    `Percentage Difference = |${value1} - ${value2}| ÷ ((${value1} + ${value2}) ÷ 2) × 100`,
    `= ${difference} ÷ ${average} × 100`,
    `= ${difference / average} × 100`,
    `= ${percentageDifference}%`,
  ];

  return {
    difference,
    percentageDifference,
    steps,
  };
}

// Percentage change (increase/decrease)
export function calculatePercentageChange(
  originalValue?: number,
  changePercentage?: number,
  finalValue?: number,
  changeType: "increase" | "decrease" = "increase"
): PercentageChangeResult {
  const steps: string[] = [];

  // Case 1: Calculate final value (original + change% = ?)
  if (
    originalValue !== undefined &&
    changePercentage !== undefined &&
    finalValue === undefined
  ) {
    const multiplier =
      changeType === "increase"
        ? 1 + changePercentage / 100
        : 1 - changePercentage / 100;
    const calculatedFinalValue = originalValue * multiplier;
    const changeAmount = calculatedFinalValue - originalValue;

    steps.push(`${originalValue} ${changeType} ${changePercentage}%`);
    steps.push(
      `= ${originalValue} × (1 ${changeType === "increase" ? "+" : "-"} ${
        changePercentage / 100
      })`
    );
    steps.push(`= ${originalValue} × ${multiplier}`);
    steps.push(`= ${calculatedFinalValue}`);

    return {
      originalValue,
      changePercentage,
      finalValue: calculatedFinalValue,
      changeAmount,
      steps,
    };
  }

  // Case 2: Calculate change percentage (original ? % = final)
  if (
    originalValue !== undefined &&
    changePercentage === undefined &&
    finalValue !== undefined
  ) {
    if (originalValue === 0) {
      throw new Error("Cannot calculate percentage change from zero");
    }

    const changeAmount = finalValue - originalValue;
    const calculatedChangePercentage =
      Math.abs(changeAmount / originalValue) * 100;
    const actualChangeType = changeAmount >= 0 ? "increase" : "decrease";

    steps.push(`Percentage change from ${originalValue} to ${finalValue}`);
    steps.push(`= |${finalValue} - ${originalValue}| ÷ ${originalValue} × 100`);
    steps.push(`= ${Math.abs(changeAmount)} ÷ ${originalValue} × 100`);
    steps.push(`= ${calculatedChangePercentage}% ${actualChangeType}`);

    return {
      originalValue,
      changePercentage: calculatedChangePercentage,
      finalValue,
      changeAmount,
      steps,
    };
  }

  // Case 3: Calculate original value (? change% = final)
  if (
    originalValue === undefined &&
    changePercentage !== undefined &&
    finalValue !== undefined
  ) {
    const multiplier =
      changeType === "increase"
        ? 1 + changePercentage / 100
        : 1 - changePercentage / 100;

    if (multiplier === 0) {
      throw new Error("Cannot calculate original value with 100% decrease");
    }

    const calculatedOriginalValue = finalValue / multiplier;
    const changeAmount = finalValue - calculatedOriginalValue;

    steps.push(`? ${changeType} ${changePercentage}% = ${finalValue}`);
    steps.push(
      `Original value = ${finalValue} ÷ (1 ${
        changeType === "increase" ? "+" : "-"
      } ${changePercentage / 100})`
    );
    steps.push(`= ${finalValue} ÷ ${multiplier}`);
    steps.push(`= ${calculatedOriginalValue}`);

    return {
      originalValue: calculatedOriginalValue,
      changePercentage,
      finalValue,
      changeAmount,
      steps,
    };
  }

  throw new Error("Please provide exactly two values to calculate the third");
}

// Format percentage for display
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

// Format number for display
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

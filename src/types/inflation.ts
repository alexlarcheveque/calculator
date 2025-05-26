export enum InflationCalculatorType {
  CPI_DATA = "CPI Data",
  FORWARD_RATE = "Forward Rate",
  BACKWARD_RATE = "Backward Rate",
}

export interface InflationFormValues {
  calculatorType: InflationCalculatorType;
  // CPI Data Calculator
  startingAmount: number;
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
  // Forward/Backward Rate Calculator
  inflationRate: number;
  years: number;
}

export interface InflationResults {
  originalAmount: number;
  adjustedAmount: number;
  totalInflation: number;
  inflationRate: number;
  yearsDifference: number;
  calculationType: InflationCalculatorType;
}

export interface InflationCalculationParams {
  startingAmount: number;
  inflationRate?: number;
  years?: number;
  startMonth?: number;
  startYear?: number;
  endMonth?: number;
  endYear?: number;
}

export interface InflationDataPoint {
  year: number;
  month: number;
  cpiValue: number;
  inflationRate: number;
}

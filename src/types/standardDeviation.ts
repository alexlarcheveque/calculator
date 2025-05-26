export interface StandardDeviationFormValues {
  dataInput: string;
  calculationType: "population" | "sample";
}

export interface StandardDeviationResult {
  data: number[];
  statistics: {
    count: number;
    sum: number;
    mean: number;
    variance: number;
    standardDeviation: number;
    marginOfError?: number;
    confidenceInterval?: {
      lower: number;
      upper: number;
      level: number;
    };
  };
  calculationType: "population" | "sample";
  steps: string[];
  isValid: boolean;
}

export interface StatisticalData {
  values: number[];
  count: number;
  sum: number;
  mean: number;
}

export interface VarianceCalculation {
  deviations: number[];
  squaredDeviations: number[];
  sumOfSquaredDeviations: number;
  variance: number;
  standardDeviation: number;
}

export interface DataValidation {
  isValid: boolean;
  errors: string[];
  parsedData: number[];
}

export enum CalculationType {
  POPULATION = "population",
  SAMPLE = "sample",
}

export interface ConfidenceInterval {
  level: number;
  zScore: number;
  marginOfError: number;
  lower: number;
  upper: number;
}

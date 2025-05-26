import {
  StandardDeviationResult,
  StatisticalData,
  VarianceCalculation,
  DataValidation,
  CalculationType,
  ConfidenceInterval,
} from "@/types/standardDeviation";

// Parse and validate input data
export function parseAndValidateData(input: string): DataValidation {
  const errors: string[] = [];

  if (!input.trim()) {
    return {
      isValid: false,
      errors: ["Please enter some numbers"],
      parsedData: [],
    };
  }

  // Split by commas and clean up
  const rawValues = input
    .split(",")
    .map((val) => val.trim())
    .filter((val) => val !== "");

  if (rawValues.length === 0) {
    return {
      isValid: false,
      errors: ["Please enter at least one number"],
      parsedData: [],
    };
  }

  const parsedData: number[] = [];

  for (let i = 0; i < rawValues.length; i++) {
    const value = parseFloat(rawValues[i]);

    if (isNaN(value)) {
      errors.push(`"${rawValues[i]}" is not a valid number`);
    } else {
      parsedData.push(value);
    }
  }

  if (parsedData.length < 2) {
    errors.push(
      "At least 2 numbers are required for standard deviation calculation"
    );
  }

  return {
    isValid: errors.length === 0 && parsedData.length >= 2,
    errors,
    parsedData,
  };
}

// Calculate basic statistical measures
export function calculateBasicStatistics(data: number[]): StatisticalData {
  const count = data.length;
  const sum = data.reduce((acc, val) => acc + val, 0);
  const mean = sum / count;

  return {
    values: data,
    count,
    sum,
    mean,
  };
}

// Calculate variance and standard deviation
export function calculateVarianceAndStandardDeviation(
  data: number[],
  mean: number,
  type: CalculationType
): VarianceCalculation {
  const deviations = data.map((value) => value - mean);
  const squaredDeviations = deviations.map(
    (deviation) => deviation * deviation
  );
  const sumOfSquaredDeviations = squaredDeviations.reduce(
    (acc, val) => acc + val,
    0
  );

  // For population: divide by N, for sample: divide by N-1
  const divisor =
    type === CalculationType.POPULATION ? data.length : data.length - 1;
  const variance = sumOfSquaredDeviations / divisor;
  const standardDeviation = Math.sqrt(variance);

  return {
    deviations,
    squaredDeviations,
    sumOfSquaredDeviations,
    variance,
    standardDeviation,
  };
}

// Calculate confidence interval for sample data
export function calculateConfidenceInterval(
  mean: number,
  standardDeviation: number,
  sampleSize: number,
  confidenceLevel: number = 95
): ConfidenceInterval {
  // Z-scores for common confidence levels
  const zScores: { [key: number]: number } = {
    90: 1.645,
    95: 1.96,
    99: 2.576,
  };

  const zScore = zScores[confidenceLevel] || 1.96;
  const standardError = standardDeviation / Math.sqrt(sampleSize);
  const marginOfError = zScore * standardError;

  return {
    level: confidenceLevel,
    zScore,
    marginOfError,
    lower: mean - marginOfError,
    upper: mean + marginOfError,
  };
}

// Main calculation function
export function calculateStandardDeviation(
  input: string,
  type: CalculationType
): StandardDeviationResult {
  const steps: string[] = [];

  // Validate and parse data
  const validation = parseAndValidateData(input);

  if (!validation.isValid) {
    return {
      data: [],
      statistics: {
        count: 0,
        sum: 0,
        mean: 0,
        variance: 0,
        standardDeviation: 0,
      },
      calculationType: type,
      steps: validation.errors,
      isValid: false,
    };
  }

  const data = validation.parsedData;
  steps.push(`Parsed ${data.length} numbers: ${data.join(", ")}`);

  // Calculate basic statistics
  const basicStats = calculateBasicStatistics(data);
  steps.push(`Sum = ${basicStats.sum.toFixed(4)}`);
  steps.push(`Count (N) = ${basicStats.count}`);
  steps.push(
    `Mean (μ) = ${basicStats.sum} ÷ ${
      basicStats.count
    } = ${basicStats.mean.toFixed(4)}`
  );

  // Calculate variance and standard deviation
  const varianceCalc = calculateVarianceAndStandardDeviation(
    data,
    basicStats.mean,
    type
  );

  if (type === CalculationType.POPULATION) {
    steps.push(`Population Standard Deviation Formula: σ = √[Σ(xi - μ)² / N]`);
  } else {
    steps.push(`Sample Standard Deviation Formula: s = √[Σ(xi - x̄)² / (N-1)]`);
  }

  steps.push(
    `Deviations from mean: ${varianceCalc.deviations
      .map((d) => d.toFixed(4))
      .join(", ")}`
  );
  steps.push(
    `Squared deviations: ${varianceCalc.squaredDeviations
      .map((d) => d.toFixed(4))
      .join(", ")}`
  );
  steps.push(
    `Sum of squared deviations = ${varianceCalc.sumOfSquaredDeviations.toFixed(
      4
    )}`
  );

  const divisor =
    type === CalculationType.POPULATION ? data.length : data.length - 1;
  steps.push(
    `Variance = ${varianceCalc.sumOfSquaredDeviations.toFixed(
      4
    )} ÷ ${divisor} = ${varianceCalc.variance.toFixed(4)}`
  );
  steps.push(
    `Standard Deviation = √${varianceCalc.variance.toFixed(
      4
    )} = ${varianceCalc.standardDeviation.toFixed(4)}`
  );

  // Calculate confidence interval for sample data
  let confidenceInterval;
  let marginOfError;

  if (type === CalculationType.SAMPLE && data.length >= 2) {
    const ci = calculateConfidenceInterval(
      basicStats.mean,
      varianceCalc.standardDeviation,
      data.length
    );
    confidenceInterval = {
      lower: ci.lower,
      upper: ci.upper,
      level: ci.level,
    };
    marginOfError = ci.marginOfError;

    steps.push(
      `95% Confidence Interval: [${ci.lower.toFixed(4)}, ${ci.upper.toFixed(
        4
      )}]`
    );
    steps.push(`Margin of Error = ${ci.marginOfError.toFixed(4)}`);
  }

  return {
    data,
    statistics: {
      count: basicStats.count,
      sum: basicStats.sum,
      mean: basicStats.mean,
      variance: varianceCalc.variance,
      standardDeviation: varianceCalc.standardDeviation,
      marginOfError,
      confidenceInterval,
    },
    calculationType: type,
    steps,
    isValid: true,
  };
}

// Format number for display
export function formatNumber(value: number, decimals: number = 4): string {
  return value.toFixed(decimals);
}

// Calculate percentile (for additional statistics)
export function calculatePercentile(
  data: number[],
  percentile: number
): number {
  const sorted = [...data].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);

  if (Number.isInteger(index)) {
    return sorted[index];
  } else {
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  }
}

// Calculate additional descriptive statistics
export function calculateDescriptiveStatistics(data: number[]) {
  const sorted = [...data].sort((a, b) => a - b);
  const n = data.length;

  return {
    min: Math.min(...data),
    max: Math.max(...data),
    range: Math.max(...data) - Math.min(...data),
    median:
      n % 2 === 0
        ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
        : sorted[Math.floor(n / 2)],
    q1: calculatePercentile(data, 25),
    q3: calculatePercentile(data, 75),
    iqr: calculatePercentile(data, 75) - calculatePercentile(data, 25),
  };
}

// Detect outliers using IQR method
export function detectOutliers(data: number[]): {
  outliers: number[];
  indices: number[];
} {
  const stats = calculateDescriptiveStatistics(data);
  const lowerBound = stats.q1 - 1.5 * stats.iqr;
  const upperBound = stats.q3 + 1.5 * stats.iqr;

  const outliers: number[] = [];
  const indices: number[] = [];

  data.forEach((value, index) => {
    if (value < lowerBound || value > upperBound) {
      outliers.push(value);
      indices.push(index);
    }
  });

  return { outliers, indices };
}

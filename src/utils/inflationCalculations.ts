import {
  InflationCalculationParams,
  InflationResults,
  InflationCalculatorType,
  InflationDataPoint,
} from "@/types/inflation";

// Historical CPI data (simplified - in a real app, this would come from an API)
const CPI_DATA: { [key: string]: number } = {
  // 2025 data
  "2025-1": 310.3,
  "2025-2": 311.1,
  "2025-3": 312.2,
  "2025-4": 313.0,

  // 2024 data
  "2024-1": 308.4,
  "2024-2": 309.7,
  "2024-3": 310.8,
  "2024-4": 311.2,
  "2024-5": 311.5,
  "2024-6": 312.1,
  "2024-7": 312.8,
  "2024-8": 313.2,
  "2024-9": 313.5,
  "2024-10": 314.1,
  "2024-11": 314.7,
  "2024-12": 315.2,

  // 2023 data
  "2023-1": 300.5,
  "2023-2": 301.8,
  "2023-3": 302.9,
  "2023-4": 304.1,
  "2023-5": 305.2,
  "2023-6": 306.3,
  "2023-7": 307.1,
  "2023-8": 307.8,
  "2023-9": 308.2,
  "2023-10": 308.6,
  "2023-11": 309.1,
  "2023-12": 309.7,

  // 2022 data
  "2022-1": 283.2,
  "2022-2": 287.5,
  "2022-3": 292.1,
  "2022-4": 296.8,
  "2022-5": 299.2,
  "2022-6": 301.5,
  "2022-7": 302.1,
  "2022-8": 302.9,
  "2022-9": 302.5,
  "2022-10": 301.8,
  "2022-11": 301.1,
  "2022-12": 300.8,

  // 2021 data
  "2021-1": 261.6,
  "2021-2": 263.9,
  "2021-3": 266.8,
  "2021-4": 270.1,
  "2021-5": 273.2,
  "2021-6": 276.1,
  "2021-7": 278.5,
  "2021-8": 280.1,
  "2021-9": 281.1,
  "2021-10": 282.3,
  "2021-11": 283.1,
  "2021-12": 283.8,

  // 2020 data
  "2020-1": 258.7,
  "2020-2": 258.1,
  "2020-3": 258.1,
  "2020-4": 256.4,
  "2020-5": 256.1,
  "2020-6": 257.8,
  "2020-7": 259.1,
  "2020-8": 259.9,
  "2020-9": 260.2,
  "2020-10": 260.4,
  "2020-11": 260.8,
  "2020-12": 261.2,

  // 2019 data
  "2019-1": 251.7,
  "2019-2": 252.8,
  "2019-3": 254.2,
  "2019-4": 255.5,
  "2019-5": 256.1,
  "2019-6": 256.1,
  "2019-7": 256.6,
  "2019-8": 256.6,
  "2019-9": 256.8,
  "2019-10": 257.3,
  "2019-11": 257.2,
  "2019-12": 257.8,

  // 2018 data
  "2018-1": 247.9,
  "2018-2": 248.9,
  "2018-3": 249.6,
  "2018-4": 250.5,
  "2018-5": 251.6,
  "2018-6": 251.9,
  "2018-7": 252.0,
  "2018-8": 252.1,
  "2018-9": 252.4,
  "2018-10": 252.9,
  "2018-11": 252.0,
  "2018-12": 251.2,

  // 2017 data
  "2017-1": 243.6,
  "2017-2": 244.0,
  "2017-3": 243.8,
  "2017-4": 244.5,
  "2017-5": 244.7,
  "2017-6": 244.9,
  "2017-7": 244.8,
  "2017-8": 245.5,
  "2017-9": 246.8,
  "2017-10": 246.7,
  "2017-11": 246.7,
  "2017-12": 246.5,

  // 2016 data
  "2016-1": 237.0,
  "2016-2": 237.1,
  "2016-3": 238.1,
  "2016-4": 239.3,
  "2016-5": 240.2,
  "2016-6": 241.0,
  "2016-7": 240.6,
  "2016-8": 240.8,
  "2016-9": 241.4,
  "2016-10": 241.7,
  "2016-11": 241.4,
  "2016-12": 241.4,

  // 2015 data
  "2015-1": 233.7,
  "2015-2": 234.7,
  "2015-3": 236.1,
  "2015-4": 236.6,
  "2015-5": 237.8,
  "2015-6": 238.6,
  "2015-7": 238.7,
  "2015-8": 238.3,
  "2015-9": 237.9,
  "2015-10": 237.8,
  "2015-11": 237.3,
  "2015-12": 236.5,

  // 2010 data
  "2010-1": 216.7,
  "2010-2": 217.3,
  "2010-3": 218.0,
  "2010-4": 218.8,
  "2010-5": 218.2,
  "2010-6": 217.9,
  "2010-7": 218.0,
  "2010-8": 218.3,
  "2010-9": 218.4,
  "2010-10": 218.7,
  "2010-11": 219.2,
  "2010-12": 219.2,

  // 2005 data
  "2005-1": 190.7,
  "2005-2": 191.8,
  "2005-3": 193.3,
  "2005-4": 194.6,
  "2005-5": 194.4,
  "2005-6": 194.5,
  "2005-7": 195.4,
  "2005-8": 196.4,
  "2005-9": 198.8,
  "2005-10": 199.2,
  "2005-11": 197.6,
  "2005-12": 196.8,

  // 2000 data
  "2000-1": 168.8,
  "2000-2": 169.8,
  "2000-3": 171.2,
  "2000-4": 171.3,
  "2000-5": 171.5,
  "2000-6": 172.4,
  "2000-7": 172.8,
  "2000-8": 172.8,
  "2000-9": 173.7,
  "2000-10": 174.0,
  "2000-11": 174.1,
  "2000-12": 174.0,

  // 1995 data
  "1995-1": 150.3,
  "1995-2": 150.9,
  "1995-3": 151.4,
  "1995-4": 151.9,
  "1995-5": 152.2,
  "1995-6": 152.5,
  "1995-7": 152.5,
  "1995-8": 152.9,
  "1995-9": 153.2,
  "1995-10": 153.7,
  "1995-11": 153.6,
  "1995-12": 153.5,

  // 1990 data
  "1990-1": 127.4,
  "1990-2": 128.0,
  "1990-3": 128.7,
  "1990-4": 128.9,
  "1990-5": 129.2,
  "1990-6": 129.9,
  "1990-7": 130.4,
  "1990-8": 131.6,
  "1990-9": 132.7,
  "1990-10": 133.5,
  "1990-11": 133.8,
  "1990-12": 133.8,

  // 1985 data
  "1985-1": 105.5,
  "1985-2": 106.0,
  "1985-3": 106.4,
  "1985-4": 106.9,
  "1985-5": 107.3,
  "1985-6": 107.6,
  "1985-7": 107.8,
  "1985-8": 108.0,
  "1985-9": 108.3,
  "1985-10": 108.7,
  "1985-11": 109.0,
  "1985-12": 109.3,

  // 1980 data
  "1980-1": 77.8,
  "1980-2": 78.9,
  "1980-3": 80.1,
  "1980-4": 81.0,
  "1980-5": 81.8,
  "1980-6": 82.7,
  "1980-7": 82.7,
  "1980-8": 83.3,
  "1980-9": 84.0,
  "1980-10": 84.8,
  "1980-11": 85.5,
  "1980-12": 86.3,

  // 1975 data
  "1975-1": 52.1,
  "1975-2": 52.5,
  "1975-3": 52.7,
  "1975-4": 53.2,
  "1975-5": 53.2,
  "1975-6": 53.6,
  "1975-7": 54.2,
  "1975-8": 54.3,
  "1975-9": 54.6,
  "1975-10": 55.0,
  "1975-11": 55.3,
  "1975-12": 55.5,

  // 1970 data
  "1970-1": 37.8,
  "1970-2": 38.1,
  "1970-3": 38.5,
  "1970-4": 38.5,
  "1970-5": 38.6,
  "1970-6": 38.8,
  "1970-7": 39.0,
  "1970-8": 39.0,
  "1970-9": 39.2,
  "1970-10": 39.4,
  "1970-11": 39.6,
  "1970-12": 39.8,

  // 1965 data
  "1965-1": 31.2,
  "1965-2": 31.2,
  "1965-3": 31.3,
  "1965-4": 31.4,
  "1965-5": 31.6,
  "1965-6": 31.6,
  "1965-7": 31.6,
  "1965-8": 31.6,
  "1965-9": 31.6,
  "1965-10": 31.7,
  "1965-11": 31.7,
  "1965-12": 31.8,

  // 1960 data
  "1960-1": 29.1,
  "1960-2": 29.2,
  "1960-3": 29.4,
  "1960-4": 29.5,
  "1960-5": 29.6,
  "1960-6": 29.8,
  "1960-7": 29.8,
  "1960-8": 29.8,
  "1960-9": 29.8,
  "1960-10": 29.8,
  "1960-11": 29.8,
  "1960-12": 29.8,

  // 1955 data
  "1955-1": 26.7,
  "1955-2": 26.7,
  "1955-3": 26.7,
  "1955-4": 26.8,
  "1955-5": 26.8,
  "1955-6": 26.7,
  "1955-7": 26.8,
  "1955-8": 26.9,
  "1955-9": 26.9,
  "1955-10": 26.9,
  "1955-11": 26.9,
  "1955-12": 26.8,

  // 1950 data
  "1950-1": 23.5,
  "1950-2": 23.5,
  "1950-3": 23.6,
  "1950-4": 23.6,
  "1950-5": 23.7,
  "1950-6": 23.8,
  "1950-7": 24.1,
  "1950-8": 24.3,
  "1950-9": 24.4,
  "1950-10": 24.4,
  "1950-11": 24.4,
  "1950-12": 24.4,

  // 1945 data
  "1945-1": 18.0,
  "1945-2": 18.1,
  "1945-3": 18.1,
  "1945-4": 18.2,
  "1945-5": 18.2,
  "1945-6": 18.2,
  "1945-7": 18.1,
  "1945-8": 18.1,
  "1945-9": 18.1,
  "1945-10": 18.1,
  "1945-11": 18.1,
  "1945-12": 18.2,

  // 1940 data
  "1940-1": 13.9,
  "1940-2": 14.0,
  "1940-3": 14.0,
  "1940-4": 14.0,
  "1940-5": 14.1,
  "1940-6": 14.1,
  "1940-7": 14.0,
  "1940-8": 14.0,
  "1940-9": 14.0,
  "1940-10": 14.0,
  "1940-11": 14.1,
  "1940-12": 14.1,

  // 1935 data
  "1935-1": 13.7,
  "1935-2": 13.9,
  "1935-3": 13.9,
  "1935-4": 13.8,
  "1935-5": 13.8,
  "1935-6": 13.7,
  "1935-7": 13.7,
  "1935-8": 13.7,
  "1935-9": 13.8,
  "1935-10": 13.8,
  "1935-11": 13.8,
  "1935-12": 13.8,

  // 1930 data
  "1930-1": 17.1,
  "1930-2": 16.9,
  "1930-3": 16.9,
  "1930-4": 16.9,
  "1930-5": 16.6,
  "1930-6": 16.3,
  "1930-7": 16.2,
  "1930-8": 16.0,
  "1930-9": 15.9,
  "1930-10": 15.7,
  "1930-11": 15.6,
  "1930-12": 15.8,

  // 1925 data
  "1925-1": 17.5,
  "1925-2": 17.6,
  "1925-3": 17.8,
  "1925-4": 17.9,
  "1925-5": 17.8,
  "1925-6": 17.9,
  "1925-7": 18.0,
  "1925-8": 17.9,
  "1925-9": 17.9,
  "1925-10": 17.9,
  "1925-11": 17.8,
  "1925-12": 17.8,
};

export function calculateInflationWithCPI({
  startingAmount,
  startMonth = 1,
  startYear = 2015,
  endMonth = 1,
  endYear = 2025,
}: InflationCalculationParams): InflationResults {
  const startKey = `${startYear}-${startMonth}`;
  const endKey = `${endYear}-${endMonth}`;

  const startCPI = CPI_DATA[startKey] || 17.8; // Default to 1925 average
  const endCPI = CPI_DATA[endKey] || 310.3; // Default to 2025 average

  const adjustedAmount = (startingAmount * endCPI) / startCPI;
  const totalInflation = ((endCPI - startCPI) / startCPI) * 100;
  const yearsDifference = endYear - startYear + (endMonth - startMonth) / 12;
  const annualInflationRate =
    yearsDifference > 0
      ? Math.pow(endCPI / startCPI, 1 / yearsDifference) - 1
      : 0;

  return {
    originalAmount: startingAmount,
    adjustedAmount,
    totalInflation,
    inflationRate: annualInflationRate * 100,
    yearsDifference,
    calculationType: InflationCalculatorType.CPI_DATA,
  };
}

export function calculateForwardInflation({
  startingAmount,
  inflationRate = 3,
  years = 10,
}: InflationCalculationParams): InflationResults {
  const adjustedAmount =
    startingAmount * Math.pow(1 + inflationRate / 100, years);
  const totalInflation =
    ((adjustedAmount - startingAmount) / startingAmount) * 100;

  return {
    originalAmount: startingAmount,
    adjustedAmount,
    totalInflation,
    inflationRate,
    yearsDifference: years,
    calculationType: InflationCalculatorType.FORWARD_RATE,
  };
}

export function calculateBackwardInflation({
  startingAmount,
  inflationRate = 3,
  years = 10,
}: InflationCalculationParams): InflationResults {
  const adjustedAmount =
    startingAmount / Math.pow(1 + inflationRate / 100, years);
  const totalInflation =
    ((startingAmount - adjustedAmount) / adjustedAmount) * 100;

  return {
    originalAmount: adjustedAmount,
    adjustedAmount: startingAmount,
    totalInflation,
    inflationRate,
    yearsDifference: years,
    calculationType: InflationCalculatorType.BACKWARD_RATE,
  };
}

export function getHistoricalInflationData(): InflationDataPoint[] {
  const data: InflationDataPoint[] = [];
  const years = [
    1925, 1930, 1935, 1940, 1945, 1950, 1955, 1960, 1965, 1970, 1975, 1980,
    1985, 1990, 1995, 2000, 2005, 2010, 2015, 2016, 2017, 2018, 2019, 2020,
    2021, 2022, 2023, 2024,
  ];

  years.forEach((year) => {
    const yearlyData = Object.entries(CPI_DATA)
      .filter(([key]) => key.startsWith(`${year}-`))
      .map(([key, cpiValue]) => {
        const month = parseInt(key.split("-")[1]);
        const prevYearKey = `${year - 1}-${month}`;
        const prevYearCPI = CPI_DATA[prevYearKey];
        const inflationRate = prevYearCPI
          ? ((cpiValue - prevYearCPI) / prevYearCPI) * 100
          : 0;

        return {
          year,
          month,
          cpiValue,
          inflationRate,
        };
      });

    data.push(...yearlyData);
  });

  return data;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatCurrencyDetailed(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatNumberWithCommas(value: number | string): string {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue)) return "";
  return numValue.toLocaleString("en-US");
}

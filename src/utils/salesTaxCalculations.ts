import {
  SalesTaxCalculationParams,
  SalesTaxResults,
  CalculationMode,
  StateTaxInfo,
} from "@/types/salesTax";

export function calculateSalesTax({
  beforeTaxPrice,
  salesTaxRate,
  afterTaxPrice,
  calculationMode,
}: SalesTaxCalculationParams): SalesTaxResults {
  let calculatedBeforeTaxPrice = beforeTaxPrice || 0;
  let calculatedSalesTaxRate = salesTaxRate || 0;
  let calculatedAfterTaxPrice = afterTaxPrice || 0;
  let salesTaxAmount = 0;

  switch (calculationMode) {
    case CalculationMode.CALCULATE_AFTER_TAX:
      // Calculate after-tax price from before-tax price and tax rate
      if (beforeTaxPrice && salesTaxRate !== undefined) {
        salesTaxAmount = (beforeTaxPrice * salesTaxRate) / 100;
        calculatedAfterTaxPrice = beforeTaxPrice + salesTaxAmount;
        calculatedBeforeTaxPrice = beforeTaxPrice;
        calculatedSalesTaxRate = salesTaxRate;
      }
      break;

    case CalculationMode.CALCULATE_BEFORE_TAX:
      // Calculate before-tax price from after-tax price and tax rate
      if (afterTaxPrice && salesTaxRate !== undefined) {
        calculatedBeforeTaxPrice = afterTaxPrice / (1 + salesTaxRate / 100);
        salesTaxAmount = afterTaxPrice - calculatedBeforeTaxPrice;
        calculatedAfterTaxPrice = afterTaxPrice;
        calculatedSalesTaxRate = salesTaxRate;
      }
      break;

    case CalculationMode.CALCULATE_TAX_RATE:
      // Calculate tax rate from before-tax and after-tax prices
      if (beforeTaxPrice && afterTaxPrice && beforeTaxPrice > 0) {
        salesTaxAmount = afterTaxPrice - beforeTaxPrice;
        calculatedSalesTaxRate = (salesTaxAmount / beforeTaxPrice) * 100;
        calculatedBeforeTaxPrice = beforeTaxPrice;
        calculatedAfterTaxPrice = afterTaxPrice;
      }
      break;
  }

  return {
    beforeTaxPrice: calculatedBeforeTaxPrice,
    salesTaxRate: calculatedSalesTaxRate,
    afterTaxPrice: calculatedAfterTaxPrice,
    salesTaxAmount,
  };
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrencyWithCommas(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercentage(value: number): string {
  return (
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    }) + "%"
  );
}

export function parseCurrencyInput(value: string): number {
  // Remove commas and dollar signs, then parse as float
  const cleanValue = value.replace(/[$,]/g, "");
  const parsed = parseFloat(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
}

export function formatInputWithCommas(value: string): string {
  // Remove non-numeric characters except decimal point
  const cleanValue = value.replace(/[^\d.]/g, "");

  // Split by decimal point
  const parts = cleanValue.split(".");

  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Rejoin with decimal point if there was one
  return parts.join(".");
}

// State tax data based on the HTML reference
export const stateTaxData: StateTaxInfo[] = [
  {
    state: "Alabama",
    generalStateSalesTax: "4%",
    maxTaxRateWithLocal: "13.50%",
  },
  { state: "Alaska", generalStateSalesTax: "0%", maxTaxRateWithLocal: "7%" },
  {
    state: "Arizona",
    generalStateSalesTax: "5.60%",
    maxTaxRateWithLocal: "10.725%",
  },
  {
    state: "Arkansas",
    generalStateSalesTax: "6.50%",
    maxTaxRateWithLocal: "11.625%",
  },
  {
    state: "California",
    generalStateSalesTax: "7.25%",
    maxTaxRateWithLocal: "10.50%",
  },
  {
    state: "Colorado",
    generalStateSalesTax: "2.90%",
    maxTaxRateWithLocal: "10%",
  },
  {
    state: "Connecticut",
    generalStateSalesTax: "6.35%",
    maxTaxRateWithLocal: "6.35%",
  },
  { state: "Delaware", generalStateSalesTax: "0%", maxTaxRateWithLocal: "0%" },
  {
    state: "District of Columbia",
    generalStateSalesTax: "6%",
    maxTaxRateWithLocal: "6%",
  },
  {
    state: "Florida",
    generalStateSalesTax: "6%",
    maxTaxRateWithLocal: "7.50%",
  },
  { state: "Georgia", generalStateSalesTax: "4%", maxTaxRateWithLocal: "8%" },
  { state: "Guam", generalStateSalesTax: "4%", maxTaxRateWithLocal: "4%" },
  {
    state: "Hawaii",
    generalStateSalesTax: "4.166%",
    maxTaxRateWithLocal: "4.712%",
  },
  { state: "Idaho", generalStateSalesTax: "6%", maxTaxRateWithLocal: "8.50%" },
  {
    state: "Illinois",
    generalStateSalesTax: "6.25%",
    maxTaxRateWithLocal: "10.25%",
  },
  { state: "Indiana", generalStateSalesTax: "7%", maxTaxRateWithLocal: "7%" },
  { state: "Iowa", generalStateSalesTax: "6%", maxTaxRateWithLocal: "7%" },
  {
    state: "Kansas",
    generalStateSalesTax: "6.50%",
    maxTaxRateWithLocal: "11.60%",
  },
  { state: "Kentucky", generalStateSalesTax: "6%", maxTaxRateWithLocal: "6%" },
  {
    state: "Louisiana",
    generalStateSalesTax: "4.45%",
    maxTaxRateWithLocal: "11.45%",
  },
  {
    state: "Maine",
    generalStateSalesTax: "5.50%",
    maxTaxRateWithLocal: "5.50%",
  },
  { state: "Maryland", generalStateSalesTax: "6%", maxTaxRateWithLocal: "6%" },
  {
    state: "Massachusetts",
    generalStateSalesTax: "6.25%",
    maxTaxRateWithLocal: "6.25%",
  },
  { state: "Michigan", generalStateSalesTax: "6%", maxTaxRateWithLocal: "6%" },
  {
    state: "Minnesota",
    generalStateSalesTax: "6.875%",
    maxTaxRateWithLocal: "7.875%",
  },
  {
    state: "Mississippi",
    generalStateSalesTax: "7%",
    maxTaxRateWithLocal: "7.25%",
  },
  {
    state: "Missouri",
    generalStateSalesTax: "4.225%",
    maxTaxRateWithLocal: "10.85%",
  },
  { state: "Montana", generalStateSalesTax: "0%", maxTaxRateWithLocal: "0%" },
  {
    state: "Nebraska",
    generalStateSalesTax: "5.50%",
    maxTaxRateWithLocal: "7.50%",
  },
  {
    state: "Nevada",
    generalStateSalesTax: "6.85%",
    maxTaxRateWithLocal: "8.375%",
  },
  {
    state: "New Hampshire",
    generalStateSalesTax: "0%",
    maxTaxRateWithLocal: "0%",
  },
  {
    state: "New Jersey",
    generalStateSalesTax: "6.625%",
    maxTaxRateWithLocal: "12.625%",
  },
  {
    state: "New Mexico",
    generalStateSalesTax: "5.125%",
    maxTaxRateWithLocal: "8.688%",
  },
  {
    state: "New York",
    generalStateSalesTax: "4%",
    maxTaxRateWithLocal: "8.875%",
  },
  {
    state: "North Carolina",
    generalStateSalesTax: "4.75%",
    maxTaxRateWithLocal: "7.50%",
  },
  {
    state: "North Dakota",
    generalStateSalesTax: "5%",
    maxTaxRateWithLocal: "8%",
  },
  { state: "Ohio", generalStateSalesTax: "5.75%", maxTaxRateWithLocal: "8%" },
  {
    state: "Oklahoma",
    generalStateSalesTax: "4.50%",
    maxTaxRateWithLocal: "11%",
  },
  { state: "Oregon", generalStateSalesTax: "0%", maxTaxRateWithLocal: "0%" },
  {
    state: "Pennsylvania",
    generalStateSalesTax: "6%",
    maxTaxRateWithLocal: "8%",
  },
  {
    state: "Puerto Rico",
    generalStateSalesTax: "10.50%",
    maxTaxRateWithLocal: "11.50%",
  },
  {
    state: "Rhode Island",
    generalStateSalesTax: "7%",
    maxTaxRateWithLocal: "7%",
  },
  {
    state: "South Carolina",
    generalStateSalesTax: "6%",
    maxTaxRateWithLocal: "9%",
  },
  {
    state: "South Dakota",
    generalStateSalesTax: "4%",
    maxTaxRateWithLocal: "6%",
  },
  {
    state: "Tennessee",
    generalStateSalesTax: "7%",
    maxTaxRateWithLocal: "9.75%",
  },
  {
    state: "Texas",
    generalStateSalesTax: "6.25%",
    maxTaxRateWithLocal: "8.25%",
  },
  { state: "Utah", generalStateSalesTax: "6.1%", maxTaxRateWithLocal: "8.35%" },
  { state: "Vermont", generalStateSalesTax: "6%", maxTaxRateWithLocal: "7%" },
  {
    state: "Virginia",
    generalStateSalesTax: "5.30%",
    maxTaxRateWithLocal: "7%",
  },
  {
    state: "Washington",
    generalStateSalesTax: "6.50%",
    maxTaxRateWithLocal: "10.60%",
  },
  {
    state: "West Virginia",
    generalStateSalesTax: "6%",
    maxTaxRateWithLocal: "7%",
  },
  {
    state: "Wisconsin",
    generalStateSalesTax: "5%",
    maxTaxRateWithLocal: "6.9%",
  },
  { state: "Wyoming", generalStateSalesTax: "4%", maxTaxRateWithLocal: "6%" },
];

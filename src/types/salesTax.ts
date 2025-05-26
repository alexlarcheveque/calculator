export interface SalesTaxFormValues {
  beforeTaxPrice: number;
  salesTaxRate: number;
  afterTaxPrice: number;
  calculationMode: CalculationMode;
}

export enum CalculationMode {
  CALCULATE_AFTER_TAX = "calculate_after_tax",
  CALCULATE_BEFORE_TAX = "calculate_before_tax",
  CALCULATE_TAX_RATE = "calculate_tax_rate",
}

export interface SalesTaxResults {
  beforeTaxPrice: number;
  salesTaxRate: number;
  afterTaxPrice: number;
  salesTaxAmount: number;
  savings?: number; // For comparison scenarios
}

export interface SalesTaxCalculationParams {
  beforeTaxPrice?: number;
  salesTaxRate?: number;
  afterTaxPrice?: number;
  calculationMode: CalculationMode;
}

export interface StateTaxInfo {
  state: string;
  generalStateSalesTax: string;
  maxTaxRateWithLocal: string;
}

export interface SimpleRandomFormValues {
  lowerLimit: number | "";
  upperLimit: number | "";
}

export interface ComprehensiveRandomFormValues {
  lowerLimit: number | "";
  upperLimit: number | "";
  count: number | "";
  allowDuplication: boolean;
  sortOrder: "asc" | "desc" | "none";
  numberType: "integer" | "decimal";
  precision: number | "";
}

export interface RandomResult {
  numbers: (number | string)[];
  settings: {
    lowerLimit: number;
    upperLimit: number;
    count: number;
    numberType: "integer" | "decimal";
    precision?: number;
    allowDuplication: boolean;
    sortOrder: "asc" | "desc" | "none";
  };
  generatedAt: Date;
}

export interface RandomGeneratorOptions {
  min: number;
  max: number;
  count: number;
  type: "integer" | "decimal";
  precision?: number;
  allowDuplication: boolean;
  sort: "asc" | "desc" | "none";
}

export enum NumberType {
  INTEGER = "integer",
  DECIMAL = "decimal",
}

export enum SortOrder {
  ASCENDING = "asc",
  DESCENDING = "desc",
  NONE = "none",
}

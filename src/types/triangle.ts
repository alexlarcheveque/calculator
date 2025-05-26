export interface TriangleFormValues {
  sideA: number | "";
  sideB: number | "";
  sideC: number | "";
  angleA: number | "";
  angleB: number | "";
  angleC: number | "";
  angleUnit: "degrees" | "radians";
}

export interface TriangleResult {
  sides: {
    a: number;
    b: number;
    c: number;
  };
  angles: {
    A: number;
    B: number;
    C: number;
  };
  properties: {
    area: number;
    perimeter: number;
    semiperimeter: number;
    height: {
      ha: number;
      hb: number;
      hc: number;
    };
    median: {
      ma: number;
      mb: number;
      mc: number;
    };
    inradius: number;
    circumradius: number;
  };
  type: TriangleType;
  isValid: boolean;
  steps: string[];
}

export interface TriangleCalculationInput {
  sideA?: number;
  sideB?: number;
  sideC?: number;
  angleA?: number;
  angleB?: number;
  angleC?: number;
  angleUnit: "degrees" | "radians";
}

export enum TriangleType {
  EQUILATERAL = "equilateral",
  ISOSCELES = "isosceles",
  SCALENE = "scalene",
  RIGHT = "right",
  OBTUSE = "obtuse",
  ACUTE = "acute",
}

export enum AngleUnit {
  DEGREES = "degrees",
  RADIANS = "radians",
}

export interface TriangleValidation {
  isValid: boolean;
  errors: string[];
  hasMinimumInput: boolean;
  hasSide: boolean;
}

export interface TriangleSolution {
  method: string;
  description: string;
  steps: string[];
}

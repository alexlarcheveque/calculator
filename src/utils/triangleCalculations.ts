import {
  TriangleCalculationInput,
  TriangleResult,
  TriangleType,
  TriangleValidation,
} from "@/types/triangle";

// Convert degrees to radians
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Convert radians to degrees
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

// Validate triangle input
export function validateTriangleInput(
  input: TriangleCalculationInput
): TriangleValidation {
  const errors: string[] = [];
  const values = [
    input.sideA,
    input.sideB,
    input.sideC,
    input.angleA,
    input.angleB,
    input.angleC,
  ];
  const definedValues = values.filter((v) => v !== undefined && v !== null);
  const sides = [input.sideA, input.sideB, input.sideC].filter(
    (v) => v !== undefined && v !== null
  );

  // Check minimum input requirement
  if (definedValues.length < 3) {
    errors.push("Please provide at least 3 values");
  }

  // Check if at least one side is provided
  if (sides.length === 0) {
    errors.push("At least one side must be provided");
  }

  // Check for negative values
  values.forEach((value, index) => {
    if (value !== undefined && value !== null && Number(value) <= 0) {
      const labels = [
        "side a",
        "side b",
        "side c",
        "angle A",
        "angle B",
        "angle C",
      ];
      errors.push(`${labels[index]} must be positive`);
    }
  });

  // Check angle constraints
  const angles = [input.angleA, input.angleB, input.angleC].filter(
    (v) => v !== undefined && v !== null
  );
  const maxAngle = input.angleUnit === "degrees" ? 180 : Math.PI;

  angles.forEach((angle, index) => {
    if (angle !== undefined && Number(angle) >= maxAngle) {
      errors.push(
        `Angle ${String.fromCharCode(
          65 + index
        )} must be less than ${maxAngle}${
          input.angleUnit === "degrees" ? "°" : " radians"
        }`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    hasMinimumInput: definedValues.length >= 3,
    hasSide: sides.length > 0,
  };
}

// Check if triangle inequality holds
export function checkTriangleInequality(
  a: number,
  b: number,
  c: number
): boolean {
  return a + b > c && a + c > b && b + c > a;
}

// Solve triangle using various methods
export function solveTriangle(input: TriangleCalculationInput): TriangleResult {
  const steps: string[] = [];
  let { sideA, sideB, sideC, angleA, angleB, angleC } = input;

  // Convert angles to radians for calculations
  const toRadians = (angle: number) =>
    input.angleUnit === "degrees" ? degreesToRadians(angle) : angle;

  const toDegrees = (angle: number) =>
    input.angleUnit === "degrees" ? angle : radiansToDegrees(angle);

  // Convert input angles to radians
  if (angleA !== undefined) angleA = toRadians(Number(angleA));
  if (angleB !== undefined) angleB = toRadians(Number(angleB));
  if (angleC !== undefined) angleC = toRadians(Number(angleC));

  // Count known values
  const knownSides = [sideA, sideB, sideC].filter(
    (s) => s !== undefined
  ).length;
  const knownAngles = [angleA, angleB, angleC].filter(
    (a) => a !== undefined
  ).length;

  steps.push(
    `Starting with ${knownSides} known sides and ${knownAngles} known angles`
  );

  // Solve based on known information
  if (knownSides === 3) {
    // SSS - All sides known
    steps.push("Using SSS (Side-Side-Side) method");
    const result = solveSSSTriangle(
      Number(sideA),
      Number(sideB),
      Number(sideC),
      steps
    );
    return result;
  } else if (knownSides === 2 && knownAngles === 1) {
    // SAS or SSA
    if (sideA !== undefined && sideB !== undefined && angleC !== undefined) {
      // SAS
      steps.push("Using SAS (Side-Angle-Side) method");
      return solveSASTriangle(
        Number(sideA),
        Number(sideB),
        Number(angleC),
        steps
      );
    } else {
      // SSA - ambiguous case
      steps.push("Using SSA (Side-Side-Angle) method");
      return solveSSATriangle(input, steps);
    }
  } else if (knownSides === 1 && knownAngles === 2) {
    // ASA or AAS
    steps.push("Using ASA/AAS (Angle-Side-Angle/Angle-Angle-Side) method");
    return solveASATriangle(input, steps);
  }

  // If we can't solve with current input, return invalid result
  return {
    sides: { a: 0, b: 0, c: 0 },
    angles: { A: 0, B: 0, C: 0 },
    properties: {
      area: 0,
      perimeter: 0,
      semiperimeter: 0,
      height: { ha: 0, hb: 0, hc: 0 },
      median: { ma: 0, mb: 0, mc: 0 },
      inradius: 0,
      circumradius: 0,
    },
    type: TriangleType.SCALENE,
    isValid: false,
    steps: ["Insufficient information to solve triangle"],
  };
}

// Solve SSS triangle
function solveSSSTriangle(
  a: number,
  b: number,
  c: number,
  steps: string[]
): TriangleResult {
  if (!checkTriangleInequality(a, b, c)) {
    return {
      sides: { a, b, c },
      angles: { A: 0, B: 0, C: 0 },
      properties: {
        area: 0,
        perimeter: 0,
        semiperimeter: 0,
        height: { ha: 0, hb: 0, hc: 0 },
        median: { ma: 0, mb: 0, mc: 0 },
        inradius: 0,
        circumradius: 0,
      },
      type: TriangleType.SCALENE,
      isValid: false,
      steps: [...steps, "Triangle inequality violated - invalid triangle"],
    };
  }

  // Use law of cosines to find angles
  const A = Math.acos((b * b + c * c - a * a) / (2 * b * c));
  const B = Math.acos((a * a + c * c - b * b) / (2 * a * c));
  const C = Math.PI - A - B;

  steps.push(`Using law of cosines:`);
  steps.push(
    `A = arccos((b² + c² - a²) / (2bc)) = ${radiansToDegrees(A).toFixed(2)}°`
  );
  steps.push(
    `B = arccos((a² + c² - b²) / (2ac)) = ${radiansToDegrees(B).toFixed(2)}°`
  );
  steps.push(`C = 180° - A - B = ${radiansToDegrees(C).toFixed(2)}°`);

  return calculateTriangleProperties(a, b, c, A, B, C, steps);
}

// Solve SAS triangle
function solveSASTriangle(
  a: number,
  b: number,
  C: number,
  steps: string[]
): TriangleResult {
  // Use law of cosines to find third side
  const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C));

  steps.push(`Using law of cosines to find side c:`);
  steps.push(`c = √(a² + b² - 2ab·cos(C)) = ${c.toFixed(4)}`);

  // Find remaining angles
  const A = Math.acos((b * b + c * c - a * a) / (2 * b * c));
  const B = Math.PI - A - C;

  steps.push(
    `A = arccos((b² + c² - a²) / (2bc)) = ${radiansToDegrees(A).toFixed(2)}°`
  );
  steps.push(`B = 180° - A - C = ${radiansToDegrees(B).toFixed(2)}°`);

  return calculateTriangleProperties(a, b, c, A, B, C, steps);
}

// Solve SSA triangle (ambiguous case)
function solveSSATriangle(
  input: TriangleCalculationInput,
  steps: string[]
): TriangleResult {
  // This is a simplified implementation - in reality, SSA can have 0, 1, or 2 solutions
  // For this calculator, we'll return the first valid solution

  let { sideA, sideB, sideC, angleA, angleB, angleC } = input;

  // Convert to numbers and handle the ambiguous case
  // This is a complex case that would need more sophisticated handling
  // For now, we'll use law of sines where possible

  return {
    sides: { a: 0, b: 0, c: 0 },
    angles: { A: 0, B: 0, C: 0 },
    properties: {
      area: 0,
      perimeter: 0,
      semiperimeter: 0,
      height: { ha: 0, hb: 0, hc: 0 },
      median: { ma: 0, mb: 0, mc: 0 },
      inradius: 0,
      circumradius: 0,
    },
    type: TriangleType.SCALENE,
    isValid: false,
    steps: [
      ...steps,
      "SSA case not fully implemented - please provide different values",
    ],
  };
}

// Solve ASA triangle
function solveASATriangle(
  input: TriangleCalculationInput,
  steps: string[]
): TriangleResult {
  let { sideA, sideB, sideC, angleA, angleB, angleC } = input;

  // Convert angles to radians
  const toRadians = (angle: number) =>
    input.angleUnit === "degrees" ? degreesToRadians(angle) : angle;

  if (angleA !== undefined) angleA = toRadians(Number(angleA));
  if (angleB !== undefined) angleB = toRadians(Number(angleB));
  if (angleC !== undefined) angleC = toRadians(Number(angleC));

  // Find missing angle
  if (angleA !== undefined && angleB !== undefined && angleC === undefined) {
    angleC = Math.PI - Number(angleA) - Number(angleB);
  } else if (
    angleA !== undefined &&
    angleC !== undefined &&
    angleB === undefined
  ) {
    angleB = Math.PI - Number(angleA) - Number(angleC);
  } else if (
    angleB !== undefined &&
    angleC !== undefined &&
    angleA === undefined
  ) {
    angleA = Math.PI - Number(angleB) - Number(angleC);
  }

  // Use law of sines to find missing sides
  let knownSide: number;
  let knownAngle: number;

  if (sideA !== undefined) {
    knownSide = Number(sideA);
    knownAngle = Number(angleA);
  } else if (sideB !== undefined) {
    knownSide = Number(sideB);
    knownAngle = Number(angleB);
  } else if (sideC !== undefined) {
    knownSide = Number(sideC);
    knownAngle = Number(angleC);
  } else {
    return {
      sides: { a: 0, b: 0, c: 0 },
      angles: { A: 0, B: 0, C: 0 },
      properties: {
        area: 0,
        perimeter: 0,
        semiperimeter: 0,
        height: { ha: 0, hb: 0, hc: 0 },
        median: { ma: 0, mb: 0, mc: 0 },
        inradius: 0,
        circumradius: 0,
      },
      type: TriangleType.SCALENE,
      isValid: false,
      steps: [...steps, "Need at least one side for ASA method"],
    };
  }

  // Calculate missing sides using law of sines
  const a = (knownSide * Math.sin(Number(angleA))) / Math.sin(knownAngle);
  const b = (knownSide * Math.sin(Number(angleB))) / Math.sin(knownAngle);
  const c = (knownSide * Math.sin(Number(angleC))) / Math.sin(knownAngle);

  steps.push(`Using law of sines: a/sin(A) = b/sin(B) = c/sin(C)`);
  steps.push(
    `Calculated sides: a = ${a.toFixed(4)}, b = ${b.toFixed(
      4
    )}, c = ${c.toFixed(4)}`
  );

  return calculateTriangleProperties(
    a,
    b,
    c,
    Number(angleA),
    Number(angleB),
    Number(angleC),
    steps
  );
}

// Calculate all triangle properties
function calculateTriangleProperties(
  a: number,
  b: number,
  c: number,
  A: number,
  B: number,
  C: number,
  steps: string[]
): TriangleResult {
  // Area using Heron's formula
  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  // Heights
  const ha = (2 * area) / a;
  const hb = (2 * area) / b;
  const hc = (2 * area) / c;

  // Medians
  const ma = 0.5 * Math.sqrt(2 * b * b + 2 * c * c - a * a);
  const mb = 0.5 * Math.sqrt(2 * a * a + 2 * c * c - b * b);
  const mc = 0.5 * Math.sqrt(2 * a * a + 2 * b * b - c * c);

  // Inradius and circumradius
  const inradius = area / s;
  const circumradius = (a * b * c) / (4 * area);

  // Determine triangle type
  const type = determineTriangleType(a, b, c, A, B, C);

  steps.push(`Calculated properties:`);
  steps.push(`Area = ${area.toFixed(4)} (using Heron's formula)`);
  steps.push(`Perimeter = ${(a + b + c).toFixed(4)}`);
  steps.push(`Triangle type: ${type}`);

  return {
    sides: { a, b, c },
    angles: {
      A: radiansToDegrees(A),
      B: radiansToDegrees(B),
      C: radiansToDegrees(C),
    },
    properties: {
      area,
      perimeter: a + b + c,
      semiperimeter: s,
      height: { ha, hb, hc },
      median: { ma, mb, mc },
      inradius,
      circumradius,
    },
    type,
    isValid: true,
    steps,
  };
}

// Determine triangle type
function determineTriangleType(
  a: number,
  b: number,
  c: number,
  A: number,
  B: number,
  C: number
): TriangleType {
  const tolerance = 1e-10;

  // Check for right triangle
  if (
    Math.abs(A - Math.PI / 2) < tolerance ||
    Math.abs(B - Math.PI / 2) < tolerance ||
    Math.abs(C - Math.PI / 2) < tolerance
  ) {
    return TriangleType.RIGHT;
  }

  // Check for obtuse triangle
  if (A > Math.PI / 2 || B > Math.PI / 2 || C > Math.PI / 2) {
    return TriangleType.OBTUSE;
  }

  // Check for equilateral triangle
  if (Math.abs(a - b) < tolerance && Math.abs(b - c) < tolerance) {
    return TriangleType.EQUILATERAL;
  }

  // Check for isosceles triangle
  if (
    Math.abs(a - b) < tolerance ||
    Math.abs(b - c) < tolerance ||
    Math.abs(a - c) < tolerance
  ) {
    return TriangleType.ISOSCELES;
  }

  // Default to acute scalene
  return TriangleType.ACUTE;
}

// Format number for display
export function formatNumber(value: number, decimals: number = 4): string {
  return value.toFixed(decimals);
}

// Format angle for display
export function formatAngle(
  value: number,
  unit: "degrees" | "radians",
  decimals: number = 2
): string {
  const symbol = unit === "degrees" ? "°" : " rad";
  return `${value.toFixed(decimals)}${symbol}`;
}

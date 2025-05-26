import {
  Assignment,
  GradeCalculationResult,
  FinalGradePlanningResult,
  AssignmentResult,
  GradeScale,
  GradeValidation,
} from "@/types/grade";

// Grade scales
export const LETTER_GRADE_SCALE: GradeScale = {
  "A+": 97.5,
  A: 94.5,
  "A-": 91,
  "B+": 88,
  B: 84.5,
  "B-": 81,
  "C+": 78,
  C: 74.5,
  "C-": 71,
  "D+": 68,
  D: 64.5,
  "D-": 61,
  F: 30,
};

export const LETTER_GRADES = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
];

// Grade validation and conversion
export function validateGrade(
  grade: string,
  gradeFormat: "percentage" | "letter"
): GradeValidation {
  if (!grade || grade.trim() === "") {
    return {
      isValid: false,
      gradePoints: 0,
      error: "Grade cannot be empty",
    };
  }

  const cleanGrade = grade.trim().toUpperCase();

  switch (gradeFormat) {
    case "letter":
      if (LETTER_GRADE_SCALE.hasOwnProperty(cleanGrade)) {
        return {
          isValid: true,
          gradePoints: LETTER_GRADE_SCALE[cleanGrade],
        };
      } else {
        return {
          isValid: false,
          gradePoints: 0,
          error: `Invalid letter grade: ${grade}`,
        };
      }

    case "percentage":
      const percentage = parseFloat(grade);
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        return {
          isValid: false,
          gradePoints: 0,
          error: "Percentage must be between 0 and 100",
        };
      }
      return {
        isValid: true,
        gradePoints: percentage,
      };

    default:
      return {
        isValid: false,
        gradePoints: 0,
        error: "Invalid grade format",
      };
  }
}

// Convert percentage to letter grade
export function percentageToLetter(percentage: number): string {
  if (percentage >= 97) return "A+";
  if (percentage >= 93) return "A";
  if (percentage >= 90) return "A-";
  if (percentage >= 87) return "B+";
  if (percentage >= 83) return "B";
  if (percentage >= 80) return "B-";
  if (percentage >= 77) return "C+";
  if (percentage >= 73) return "C";
  if (percentage >= 70) return "C-";
  if (percentage >= 67) return "D+";
  if (percentage >= 63) return "D";
  if (percentage >= 60) return "D-";
  return "F";
}

// Validate weight
export function validateWeight(
  weight: number,
  weightFormat: "percentage" | "points"
): boolean {
  if (isNaN(weight) || weight < 0) return false;
  if (weightFormat === "percentage" && weight > 100) return false;
  return true;
}

// Calculate weighted grade
export function calculateWeightedGrade(
  assignments: Assignment[],
  gradeFormat: "percentage" | "letter",
  weightFormat: "percentage" | "points"
): GradeCalculationResult {
  // Filter out assignments with valid data
  const validAssignments = assignments.filter(
    (assignment) => assignment.weight > 0 && assignment.grade.trim() !== ""
  );

  if (validAssignments.length === 0) {
    return {
      currentGrade: 0,
      letterGrade: "F",
      totalWeight: 0,
      weightedScore: 0,
      isValid: false,
      assignments: [],
      error: "No valid assignments provided",
    };
  }

  const assignmentResults: AssignmentResult[] = [];
  let totalWeight = 0;
  let weightedScore = 0;
  let hasErrors = false;
  let errorMessage = "";

  // Process each assignment
  for (const assignment of validAssignments) {
    // Validate weight
    if (!validateWeight(assignment.weight, weightFormat)) {
      hasErrors = true;
      errorMessage = `Invalid weight for assignment ${assignment.name}: ${assignment.weight}`;
      continue;
    }

    // Validate grade
    const gradeValidation = validateGrade(assignment.grade, gradeFormat);
    if (!gradeValidation.isValid) {
      hasErrors = true;
      errorMessage =
        gradeValidation.error ||
        `Invalid grade for assignment ${assignment.name}`;
      continue;
    }

    const weightedPoints = gradeValidation.gradePoints * assignment.weight;

    assignmentResults.push({
      name: assignment.name || "Unnamed Assignment",
      grade: assignment.grade,
      weight: assignment.weight,
      gradePoints: gradeValidation.gradePoints,
      weightedPoints,
    });

    totalWeight += assignment.weight;
    weightedScore += weightedPoints;
  }

  if (totalWeight === 0) {
    return {
      currentGrade: 0,
      letterGrade: "F",
      totalWeight: 0,
      weightedScore: 0,
      isValid: false,
      assignments: assignmentResults,
      error: "No valid weighted assignments found",
    };
  }

  let currentGrade: number;

  if (weightFormat === "percentage") {
    // For percentage weights, calculate weighted average
    currentGrade = weightedScore / totalWeight;
  } else {
    // For points, calculate total points earned / total points possible * 100
    currentGrade = (weightedScore / totalWeight) * 100;
  }

  const letterGrade = percentageToLetter(currentGrade);

  return {
    currentGrade,
    letterGrade,
    totalWeight,
    weightedScore,
    isValid: !hasErrors,
    assignments: assignmentResults,
    error: hasErrors ? errorMessage : undefined,
  };
}

// Calculate required final grade
export function calculateRequiredFinalGrade(
  currentGrade: number,
  targetGrade: number,
  finalWeight: number
): FinalGradePlanningResult {
  // Validate inputs
  if (currentGrade < 0 || currentGrade > 100) {
    return {
      requiredGrade: 0,
      isAchievable: false,
      isValid: false,
      currentGrade,
      targetGrade,
      finalWeight,
      error: "Current grade must be between 0 and 100",
    };
  }

  if (targetGrade < 0 || targetGrade > 100) {
    return {
      requiredGrade: 0,
      isAchievable: false,
      isValid: false,
      currentGrade,
      targetGrade,
      finalWeight,
      error: "Target grade must be between 0 and 100",
    };
  }

  if (finalWeight <= 0 || finalWeight > 100) {
    return {
      requiredGrade: 0,
      isAchievable: false,
      isValid: false,
      currentGrade,
      targetGrade,
      finalWeight,
      error: "Final weight must be between 0 and 100",
    };
  }

  const currentWeight = 100 - finalWeight;
  const currentWeightedScore = currentGrade * (currentWeight / 100);
  const targetWeightedScore = targetGrade;
  const requiredFinalWeightedScore = targetWeightedScore - currentWeightedScore;
  const requiredGrade = requiredFinalWeightedScore / (finalWeight / 100);

  const isAchievable = requiredGrade >= 0 && requiredGrade <= 100;

  return {
    requiredGrade: Math.max(0, Math.min(100, requiredGrade)),
    isAchievable,
    isValid: true,
    currentGrade,
    targetGrade,
    finalWeight,
  };
}

// Formatting functions
export function formatGrade(grade: number): string {
  return grade.toFixed(1);
}

export function formatWeight(weight: number): string {
  return weight.toFixed(1);
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Helper functions
export function createEmptyAssignment(): Assignment {
  return {
    id: generateAssignmentId(),
    name: "",
    grade: "",
    weight: 0,
    gradePoints: 0,
  };
}

export function generateAssignmentId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getGradeColor(grade: number): string {
  if (grade >= 90) return "text-green-600";
  if (grade >= 80) return "text-blue-600";
  if (grade >= 70) return "text-yellow-600";
  if (grade >= 60) return "text-orange-600";
  return "text-red-600";
}

export function getGradeDescription(grade: number): string {
  if (grade >= 97) return "Excellent (A+)";
  if (grade >= 93) return "Excellent (A)";
  if (grade >= 90) return "Very Good (A-)";
  if (grade >= 87) return "Good (B+)";
  if (grade >= 83) return "Good (B)";
  if (grade >= 80) return "Above Average (B-)";
  if (grade >= 77) return "Average (C+)";
  if (grade >= 73) return "Average (C)";
  if (grade >= 70) return "Below Average (C-)";
  if (grade >= 67) return "Poor (D+)";
  if (grade >= 63) return "Poor (D)";
  if (grade >= 60) return "Very Poor (D-)";
  return "Failing (F)";
}

export interface Assignment {
  id: string;
  name: string;
  grade: string;
  weight: number;
  gradePoints: number;
}

export interface GradeCalculationValues {
  assignments: Assignment[];
  gradeFormat: "percentage" | "letter";
  weightFormat: "percentage" | "points";
  showPlanning: boolean;
  finalGradeGoal?: string;
  remainingWeight?: number;
}

export interface GradeCalculationResult {
  currentGrade: number;
  letterGrade: string;
  totalWeight: number;
  weightedScore: number;
  isValid: boolean;
  assignments: AssignmentResult[];
  error?: string;
}

export interface AssignmentResult {
  name: string;
  grade: string;
  weight: number;
  gradePoints: number;
  weightedPoints: number;
}

export interface FinalGradePlanningValues {
  currentGrade: number;
  targetGrade: number;
  finalWeight: number;
}

export interface FinalGradePlanningResult {
  requiredGrade: number;
  isAchievable: boolean;
  isValid: boolean;
  currentGrade: number;
  targetGrade: number;
  finalWeight: number;
  error?: string;
}

export interface GradeValidation {
  isValid: boolean;
  gradePoints: number;
  error?: string;
}

export interface GradeScale {
  [key: string]: number;
}

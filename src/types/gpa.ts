export interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  gradePoints: number;
}

export interface GPACalculationValues {
  courses: Course[];
  gradeFormat: "letter" | "percentage" | "point";
  includePriorGPA: boolean;
  priorGPA?: number;
  priorCredits?: number;
}

export interface GPACalculationResult {
  currentGPA: number;
  totalCredits: number;
  totalGradePoints: number;
  cumulativeGPA?: number;
  cumulativeCredits?: number;
  isValid: boolean;
  courses: CourseResult[];
  error?: string;
}

export interface CourseResult {
  name: string;
  credits: number;
  grade: string;
  gradePoints: number;
  qualityPoints: number;
}

export interface GPAPlanningValues {
  currentGPA: number;
  targetGPA: number;
  currentCredits: number;
  additionalCredits: number;
}

export interface GPAPlanningResult {
  requiredGPA: number;
  isAchievable: boolean;
  isValid: boolean;
  currentGPA: number;
  targetGPA: number;
  currentCredits: number;
  additionalCredits: number;
  totalCredits: number;
  error?: string;
}

export interface GradeScale {
  [key: string]: number;
}

export interface GradeValidation {
  isValid: boolean;
  gradePoints: number;
  error?: string;
}

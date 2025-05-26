import {
  Course,
  GPACalculationResult,
  GPAPlanningResult,
  CourseResult,
  GradeScale,
  GradeValidation,
} from "@/types/gpa";

// Grade scales
export const LETTER_GRADE_SCALE: GradeScale = {
  "A+": 4.3,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
  P: 0.0, // Pass - not counted in GPA
  NP: 0.0, // No Pass - not counted in GPA
  I: 0.0, // Incomplete - not counted in GPA
  W: 0.0, // Withdrawal - not counted in GPA
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
  "P",
  "NP",
];

// Grade validation and conversion
export function validateGrade(
  grade: string,
  gradeFormat: "letter" | "percentage" | "point"
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
        gradePoints: percentageToGradePoints(percentage),
      };

    case "point":
      const points = parseFloat(grade);
      if (isNaN(points) || points < 0 || points > 4.3) {
        return {
          isValid: false,
          gradePoints: 0,
          error: "Grade points must be between 0 and 4.3",
        };
      }
      return {
        isValid: true,
        gradePoints: points,
      };

    default:
      return {
        isValid: false,
        gradePoints: 0,
        error: "Invalid grade format",
      };
  }
}

// Convert percentage to grade points
export function percentageToGradePoints(percentage: number): number {
  if (percentage >= 97) return 4.3; // A+
  if (percentage >= 93) return 4.0; // A
  if (percentage >= 90) return 3.7; // A-
  if (percentage >= 87) return 3.3; // B+
  if (percentage >= 83) return 3.0; // B
  if (percentage >= 80) return 2.7; // B-
  if (percentage >= 77) return 2.3; // C+
  if (percentage >= 73) return 2.0; // C
  if (percentage >= 70) return 1.7; // C-
  if (percentage >= 67) return 1.3; // D+
  if (percentage >= 65) return 1.0; // D
  if (percentage >= 60) return 0.7; // D-
  return 0.0; // F
}

// Convert grade points to letter grade
export function gradePointsToLetter(gradePoints: number): string {
  if (gradePoints >= 4.15) return "A+";
  if (gradePoints >= 3.85) return "A";
  if (gradePoints >= 3.5) return "A-";
  if (gradePoints >= 3.15) return "B+";
  if (gradePoints >= 2.85) return "B";
  if (gradePoints >= 2.5) return "B-";
  if (gradePoints >= 2.15) return "C+";
  if (gradePoints >= 1.85) return "C";
  if (gradePoints >= 1.5) return "C-";
  if (gradePoints >= 1.15) return "D+";
  if (gradePoints >= 0.85) return "D";
  if (gradePoints >= 0.35) return "D-";
  return "F";
}

// Validate credits
export function validateCredits(credits: number): boolean {
  return !isNaN(credits) && credits > 0 && credits <= 20;
}

// Calculate GPA
export function calculateGPA(
  courses: Course[],
  gradeFormat: "letter" | "percentage" | "point",
  includePriorGPA: boolean = false,
  priorGPA?: number,
  priorCredits?: number
): GPACalculationResult {
  // Filter out courses with valid data
  const validCourses = courses.filter(
    (course) => course.credits > 0 && course.grade.trim() !== ""
  );

  if (validCourses.length === 0) {
    return {
      currentGPA: 0,
      totalCredits: 0,
      totalGradePoints: 0,
      isValid: false,
      courses: [],
      error: "No valid courses provided",
    };
  }

  const courseResults: CourseResult[] = [];
  let totalCredits = 0;
  let totalQualityPoints = 0;
  let hasErrors = false;
  let errorMessage = "";

  // Process each course
  for (const course of validCourses) {
    // Validate credits
    if (!validateCredits(course.credits)) {
      hasErrors = true;
      errorMessage = `Invalid credits for course ${course.name}: ${course.credits}`;
      continue;
    }

    // Validate grade
    const gradeValidation = validateGrade(course.grade, gradeFormat);
    if (!gradeValidation.isValid) {
      hasErrors = true;
      errorMessage =
        gradeValidation.error || `Invalid grade for course ${course.name}`;
      continue;
    }

    // Skip non-graded courses (P, NP, I, W)
    const upperGrade = course.grade.toUpperCase();
    if (["P", "NP", "I", "W"].includes(upperGrade)) {
      continue;
    }

    const qualityPoints = course.credits * gradeValidation.gradePoints;

    courseResults.push({
      name: course.name || "Unnamed Course",
      credits: course.credits,
      grade: course.grade,
      gradePoints: gradeValidation.gradePoints,
      qualityPoints,
    });

    totalCredits += course.credits;
    totalQualityPoints += qualityPoints;
  }

  if (totalCredits === 0) {
    return {
      currentGPA: 0,
      totalCredits: 0,
      totalGradePoints: 0,
      isValid: false,
      courses: courseResults,
      error: "No valid graded courses found",
    };
  }

  const currentGPA = totalQualityPoints / totalCredits;

  // Calculate cumulative GPA if prior GPA is included
  let cumulativeGPA: number | undefined;
  let cumulativeCredits: number | undefined;

  if (includePriorGPA && priorGPA !== undefined && priorCredits !== undefined) {
    if (priorGPA < 0 || priorGPA > 4.3) {
      return {
        currentGPA,
        totalCredits,
        totalGradePoints: totalQualityPoints,
        isValid: false,
        courses: courseResults,
        error: "Prior GPA must be between 0 and 4.3",
      };
    }

    if (priorCredits < 0) {
      return {
        currentGPA,
        totalCredits,
        totalGradePoints: totalQualityPoints,
        isValid: false,
        courses: courseResults,
        error: "Prior credits cannot be negative",
      };
    }

    const priorQualityPoints = priorGPA * priorCredits;
    cumulativeCredits = totalCredits + priorCredits;
    cumulativeGPA =
      (totalQualityPoints + priorQualityPoints) / cumulativeCredits;
  }

  return {
    currentGPA,
    totalCredits,
    totalGradePoints: totalQualityPoints,
    cumulativeGPA,
    cumulativeCredits,
    isValid: !hasErrors,
    courses: courseResults,
    error: hasErrors ? errorMessage : undefined,
  };
}

// Calculate required GPA for planning
export function calculateRequiredGPA(
  currentGPA: number,
  targetGPA: number,
  currentCredits: number,
  additionalCredits: number
): GPAPlanningResult {
  // Validate inputs
  if (currentGPA < 0 || currentGPA > 4.3) {
    return {
      requiredGPA: 0,
      isAchievable: false,
      isValid: false,
      currentGPA,
      targetGPA,
      currentCredits,
      additionalCredits,
      totalCredits: currentCredits + additionalCredits,
      error: "Current GPA must be between 0 and 4.3",
    };
  }

  if (targetGPA < 0 || targetGPA > 4.3) {
    return {
      requiredGPA: 0,
      isAchievable: false,
      isValid: false,
      currentGPA,
      targetGPA,
      currentCredits,
      additionalCredits,
      totalCredits: currentCredits + additionalCredits,
      error: "Target GPA must be between 0 and 4.3",
    };
  }

  if (currentCredits < 0) {
    return {
      requiredGPA: 0,
      isAchievable: false,
      isValid: false,
      currentGPA,
      targetGPA,
      currentCredits,
      additionalCredits,
      totalCredits: currentCredits + additionalCredits,
      error: "Current credits cannot be negative",
    };
  }

  if (additionalCredits <= 0) {
    return {
      requiredGPA: 0,
      isAchievable: false,
      isValid: false,
      currentGPA,
      targetGPA,
      currentCredits,
      additionalCredits,
      totalCredits: currentCredits + additionalCredits,
      error: "Additional credits must be greater than 0",
    };
  }

  const totalCredits = currentCredits + additionalCredits;
  const currentQualityPoints = currentGPA * currentCredits;
  const targetQualityPoints = targetGPA * totalCredits;
  const requiredQualityPoints = targetQualityPoints - currentQualityPoints;
  const requiredGPA = requiredQualityPoints / additionalCredits;

  const isAchievable = requiredGPA >= 0 && requiredGPA <= 4.3;

  return {
    requiredGPA: Math.max(0, requiredGPA),
    isAchievable,
    isValid: true,
    currentGPA,
    targetGPA,
    currentCredits,
    additionalCredits,
    totalCredits,
  };
}

// Formatting functions
export function formatGPA(gpa: number): string {
  return gpa.toFixed(2);
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Helper functions
export function createEmptyCourse(): Course {
  return {
    id: generateCourseId(),
    name: "",
    credits: 3,
    grade: "",
    gradePoints: 0,
  };
}

export function generateCourseId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getGPAClassification(gpa: number): string {
  if (gpa >= 3.9) return "Summa Cum Laude";
  if (gpa >= 3.7) return "Magna Cum Laude";
  if (gpa >= 3.5) return "Cum Laude";
  if (gpa >= 3.0) return "Good Standing";
  if (gpa >= 2.0) return "Satisfactory";
  return "Below Satisfactory";
}

export function getGPAClassificationColor(gpa: number): string {
  if (gpa >= 3.9) return "text-purple-600";
  if (gpa >= 3.7) return "text-blue-600";
  if (gpa >= 3.5) return "text-green-600";
  if (gpa >= 3.0) return "text-yellow-600";
  if (gpa >= 2.0) return "text-orange-600";
  return "text-red-600";
}

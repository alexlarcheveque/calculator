"use client";

import GradeCalculator from "./GradeCalculator";
import FinalGradeCalculator from "./FinalGradeCalculator";
import GradeEducation from "./GradeEducation";

export default function GradePage() {
  return (
    <div className="space-y-8">
      <GradeCalculator />
      <FinalGradeCalculator />
      <GradeEducation />
    </div>
  );
}

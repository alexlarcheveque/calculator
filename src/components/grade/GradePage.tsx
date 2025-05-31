"use client";

import GradeCalculator from "./GradeCalculator";
import FinalGradeCalculator from "./FinalGradeCalculator";
import FAQSection from "./FAQSection";

export default function GradePage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Grade Calculator (Weighted Grades, Final Grade Needed, GPA Planning)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Comprehensive grade calculator with weighted grade calculations, final
          exam score requirements, and academic planning tools. Calculate
          current course grades using percentage or point-based weighting
          systems. Determine what grade you need on final exams to achieve
          target course grades. Features letter grade conversions, GPA impact
          analysis, and semester planning for students, teachers, and academic
          advisors. Supports multiple assignment types with flexible weighting
          for accurate grade tracking and improvement strategies.
        </p>
      </div>

      <div className="space-y-8">
        <GradeCalculator />
        <FinalGradeCalculator />
        <FAQSection />
      </div>
    </div>
  );
}

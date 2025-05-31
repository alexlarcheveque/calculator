"use client";

import GradeCalculator from "./GradeCalculator";
import FinalGradeCalculator from "./FinalGradeCalculator";
import FAQSection from "./FAQSection";

export default function GradePage() {
  return (
    <div>
      <div className="space-y-8">
        <GradeCalculator />
        <FinalGradeCalculator />
        <FAQSection />
      </div>
    </div>
  );
}

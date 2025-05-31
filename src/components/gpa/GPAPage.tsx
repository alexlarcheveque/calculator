"use client";

import GPACalculator from "./GPACalculator";
import GPAPlanningCalculator from "./GPAPlanningCalculator";
import FAQSection from "./FAQSection";

export default function GPAPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          GPA Calculator (Semester & Cumulative, Academic Planning, Grade Points)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Comprehensive GPA calculator for accurate semester and cumulative grade point average calculations. Track academic performance with credit hour weighting, letter grade conversions, and goal planning tools. Features weighted and unweighted GPA support, international grade scale conversions, and strategic course planning for students, advisors, and institutions. Calculate graduation honors requirements, scholarship eligibility, and graduate school admission targets with detailed academic progress tracking.
        </p>
      </div>

      <div className="space-y-8">
        <GPACalculator />
        <GPAPlanningCalculator />
        <FAQSection />
      </div>
    </div>
  );
}

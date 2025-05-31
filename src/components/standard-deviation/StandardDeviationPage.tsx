"use client";

import StandardDeviationCalculator from "@/components/standard-deviation/StandardDeviationCalculator";
import FAQSection from "./FAQSection";

export default function StandardDeviationPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Standard Deviation Calculator (Population & Sample, Statistics
          Analysis)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Professional standard deviation calculator for statistical analysis
          with both population and sample calculations. Measure data
          variability, dispersion, and spread with comprehensive variance
          analysis. Features step-by-step calculations, empirical rule
          applications, and quality control metrics for researchers, analysts,
          and students. Essential tool for data science, business intelligence,
          and statistical research.
        </p>
      </div>

      <div className="space-y-8">
        {/* Standard Deviation Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <StandardDeviationCalculator />
        </div>

        {/* Educational Content */}
        <FAQSection />
      </div>
    </div>
  );
}

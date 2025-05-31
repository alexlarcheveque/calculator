"use client";

import { useState } from "react";
import BasicPercentageCalculator from "@/components/percentage/BasicPercentageCalculator";
import CommonPhrasesCalculator from "@/components/percentage/CommonPhrasesCalculator";
import PercentageDifferenceCalculator from "@/components/percentage/PercentageDifferenceCalculator";
import PercentageChangeCalculator from "@/components/percentage/PercentageChangeCalculator";
import FAQSection from "./FAQSection";
import { CalculatorType } from "@/types/percentage";

export default function PercentagePage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(
    CalculatorType.BASIC
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Percentage Calculator (Basic, Change, Difference & Business
          Calculations)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Comprehensive percentage calculator with multiple calculation modes
          for basic percentages, percentage change, percentage difference, and
          business applications. Features automatic three-way calculations,
          percentage increase/decrease, discount calculations, and markup
          analysis. Perfect for students, professionals, retailers, and anyone
          working with ratios, proportions, and statistical analysis.
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Percentage Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <BasicPercentageCalculator />
        </div>

        {/* Common Phrases Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Percentage Calculator in Common Phrases
          </h2>
          <CommonPhrasesCalculator />
        </div>

        {/* Percentage Difference Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Percentage Difference Calculator
          </h2>
          <PercentageDifferenceCalculator />
        </div>

        {/* Percentage Change Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Percentage Change Calculator
          </h2>
          <p className="text-gray-600 mb-4">
            Please provide any two values below and click the "Calculate" button
            to get the third value.
          </p>
          <PercentageChangeCalculator />
        </div>

        {/* Educational Content */}
        <FAQSection />
      </div>
    </div>
  );
}

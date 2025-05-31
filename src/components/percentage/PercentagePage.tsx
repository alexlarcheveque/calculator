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
  );
}

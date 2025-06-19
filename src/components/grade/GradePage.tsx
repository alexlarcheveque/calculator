"use client";

import { useState } from "react";
import GradeCalculator from "./GradeCalculator";
import FinalGradeCalculator from "./FinalGradeCalculator";
import FAQSection from "./FAQSection";

type CalculatorType = "GRADE_CALCULATOR" | "FINAL_GRADE";

type CalculatorTab = {
  id: CalculatorType;
  name: string;
  component: React.ReactNode;
};

export default function GradePage() {
  const [activeTab, setActiveTab] =
    useState<CalculatorType>("GRADE_CALCULATOR");

  const calculatorTabs: CalculatorTab[] = [
    {
      id: "GRADE_CALCULATOR",
      name: "Weighted Assignments",
      component: <GradeCalculator />,
    },
    {
      id: "FINAL_GRADE",
      name: "Grade Needed Calculator",
      component: <FinalGradeCalculator />,
    },
  ];

  const activeCalculator = calculatorTabs.find((tab) => tab.id === activeTab);

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6 border-b">
        {calculatorTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-lg font-medium focus:outline-none transition-colors
                        ${
                          activeTab === tab.id
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Active Calculator */}
      <div className="grid grid-cols-1 gap-8">
        <div className="rounded-lg p-6">{activeCalculator?.component}</div>
      </div>

      {/* Educational Content */}
      <FAQSection />
    </div>
  );
}

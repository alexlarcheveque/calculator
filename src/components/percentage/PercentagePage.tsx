"use client";

import { useState } from "react";
import BasicPercentageCalculator from "@/components/percentage/BasicPercentageCalculator";
import CommonPhrasesCalculator from "@/components/percentage/CommonPhrasesCalculator";
import PercentageDifferenceCalculator from "@/components/percentage/PercentageDifferenceCalculator";
import PercentageChangeCalculator from "@/components/percentage/PercentageChangeCalculator";
import FAQSection from "./FAQSection";
import { CalculatorType } from "@/types/percentage";

type CalculatorTab = {
  id: CalculatorType;
  name: string;
  component: React.ReactNode;
};

export default function PercentagePage() {
  const [activeTab, setActiveTab] = useState<CalculatorType>(
    CalculatorType.BASIC
  );

  const calculatorTabs: CalculatorTab[] = [
    {
      id: CalculatorType.BASIC,
      name: "Basic Percentage",
      component: <BasicPercentageCalculator />,
    },
    {
      id: CalculatorType.COMMON_PHRASES,
      name: "Common Phrases",
      component: <CommonPhrasesCalculator />,
    },
    {
      id: CalculatorType.PERCENTAGE_DIFFERENCE,
      name: "Percentage Difference",
      component: <PercentageDifferenceCalculator />,
    },
    {
      id: CalculatorType.PERCENTAGE_CHANGE,
      name: "Percentage Change",
      component: <PercentageChangeCalculator />,
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

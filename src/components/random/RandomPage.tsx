"use client";

import { useState } from "react";
import SimpleRandomGenerator from "@/components/random/SimpleRandomGenerator";
import ComprehensiveRandomGenerator from "@/components/random/ComprehensiveRandomGenerator";
import FAQSection from "./FAQSection";
import { RandomCalculatorType } from "@/types/random";

type RandomCalculatorTab = {
  id: RandomCalculatorType;
  name: string;
  component: React.ReactNode;
};

export default function RandomPage() {
  const [activeTab, setActiveTab] = useState<RandomCalculatorType>(
    RandomCalculatorType.SIMPLE
  );

  const calculatorTabs: RandomCalculatorTab[] = [
    {
      id: RandomCalculatorType.SIMPLE,
      name: "Simple Generator",
      component: <SimpleRandomGenerator />,
    },
    {
      id: RandomCalculatorType.COMPREHENSIVE,
      name: "Comprehensive Generator",
      component: <ComprehensiveRandomGenerator />,
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

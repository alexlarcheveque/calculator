"use client";

import { useState } from "react";
import GPACalculator from "./GPACalculator";
import GPAPlanningCalculator from "./GPAPlanningCalculator";
import FAQSection from "./FAQSection";

type CalculatorType = "GPA_CALCULATOR" | "GPA_PLANNING";

type CalculatorTab = {
  id: CalculatorType;
  name: string;
  component: React.ReactNode;
};

export default function GPAPage() {
  const [activeTab, setActiveTab] = useState<CalculatorType>("GPA_CALCULATOR");

  const calculatorTabs: CalculatorTab[] = [
    {
      id: "GPA_CALCULATOR",
      name: "GPA Calculator",
      component: <GPACalculator />,
    },
    {
      id: "GPA_PLANNING",
      name: "GPA Planning",
      component: <GPAPlanningCalculator />,
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

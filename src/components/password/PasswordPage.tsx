"use client";

import { useState } from "react";
import SimplePasswordGenerator from "@/components/password/SimplePasswordGenerator";
import AdvancedPasswordGenerator from "@/components/password/AdvancedPasswordGenerator";
import FAQSection from "./FAQSection";
import { PasswordCalculatorType } from "@/types/password";

type PasswordCalculatorTab = {
  id: PasswordCalculatorType;
  name: string;
  component: React.ReactNode;
};

export default function PasswordPage() {
  const [activeTab, setActiveTab] = useState<PasswordCalculatorType>(
    PasswordCalculatorType.SIMPLE
  );

  const calculatorTabs: PasswordCalculatorTab[] = [
    {
      id: PasswordCalculatorType.SIMPLE,
      name: "Simple Generator",
      component: <SimplePasswordGenerator />,
    },
    {
      id: PasswordCalculatorType.ADVANCED,
      name: "Advanced Generator",
      component: <AdvancedPasswordGenerator />,
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
        {activeCalculator?.component}
      </div>

      {/* Educational Content */}
      <FAQSection />
    </div>
  );
}

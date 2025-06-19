"use client";

import { useState } from "react";
import BasicFractionCalculator from "@/components/fraction/BasicFractionCalculator";
import MixedNumberCalculator from "@/components/fraction/MixedNumberCalculator";
import SimplifyFractionCalculator from "@/components/fraction/SimplifyFractionCalculator";
import DecimalToFractionCalculator from "@/components/fraction/DecimalToFractionCalculator";
import FractionToDecimalCalculator from "@/components/fraction/FractionToDecimalCalculator";
import FAQSection from "./FAQSection";
import { CalculatorType } from "@/types/fraction";

type CalculatorTab = {
  id: CalculatorType;
  name: string;
  component: React.ReactNode;
};

export default function FractionPage() {
  const [activeTab, setActiveTab] = useState<CalculatorType>(
    CalculatorType.BASIC
  );

  const calculatorTabs: CalculatorTab[] = [
    {
      id: CalculatorType.BASIC,
      name: "Basic Operations",
      component: <BasicFractionCalculator />,
    },
    {
      id: CalculatorType.MIXED_NUMBERS,
      name: "Mixed Numbers",
      component: <MixedNumberCalculator />,
    },
    {
      id: CalculatorType.SIMPLIFY,
      name: "Simplify",
      component: <SimplifyFractionCalculator />,
    },
    {
      id: CalculatorType.DECIMAL_TO_FRACTION,
      name: "Decimal → Fraction",
      component: <DecimalToFractionCalculator />,
    },
    {
      id: CalculatorType.FRACTION_TO_DECIMAL,
      name: "Fraction → Decimal",
      component: <FractionToDecimalCalculator />,
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

"use client";

import { useState } from "react";
import { CalculatorType } from "@/types/time";
import TimeArithmeticCalculator from "./TimeArithmeticCalculator";
import DateTimeCalculator from "./DateTimeCalculator";
import TimeExpressionCalculator from "./TimeExpressionCalculator";
import FAQSection from "./FAQSection";

export default function TimePage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(
    CalculatorType.TIME_ARITHMETIC
  );

  const tabs = [
    {
      id: CalculatorType.TIME_ARITHMETIC,
      label: "Time Arithmetic",
      component: <TimeArithmeticCalculator />,
    },
    {
      id: CalculatorType.DATE_TIME,
      label: "Date & Time",
      component: <DateTimeCalculator />,
    },
    {
      id: CalculatorType.TIME_EXPRESSION,
      label: "Time Expression",
      component: <TimeExpressionCalculator />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCalculator(tab.id)}
            className={`px-4 py-2 text-lg font-medium focus:outline-none transition-colors ${
              activeCalculator === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Calculator */}
      <div>{tabs.find((tab) => tab.id === activeCalculator)?.component}</div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

"use client";

import TimeArithmeticCalculator from "./TimeArithmeticCalculator";
import DateTimeCalculator from "./DateTimeCalculator";
import TimeExpressionCalculator from "./TimeExpressionCalculator";
import FAQSection from "./FAQSection";

export default function TimePage() {
  return (
    <div className="space-y-8">
      <TimeArithmeticCalculator />
      <DateTimeCalculator />
      <TimeExpressionCalculator />
      <FAQSection />
    </div>
  );
}

"use client";

import DateDifferenceCalculator from "./DateDifferenceCalculator";
import DateArithmeticCalculator from "./DateArithmeticCalculator";
import FAQSection from "./FAQSection";

export default function DatePage() {
  return (
    <div className="space-y-8">
      <DateArithmeticCalculator />
      <DateDifferenceCalculator />
      <FAQSection />
    </div>
  );
}

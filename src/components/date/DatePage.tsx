"use client";

import DateDifferenceCalculator from "./DateDifferenceCalculator";
import DateArithmeticCalculator from "./DateArithmeticCalculator";
import FAQSection from "./FAQSection";
import BusinessDaysCalculator from "./BusinessDaysCalculator";

export default function DatePage() {
  return (
    <div className="space-y-8">
      <DateArithmeticCalculator />
      <DateDifferenceCalculator />
      <BusinessDaysCalculator />
      <FAQSection />
    </div>
  );
}

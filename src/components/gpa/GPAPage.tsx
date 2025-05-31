"use client";

import GPACalculator from "./GPACalculator";
import GPAPlanningCalculator from "./GPAPlanningCalculator";
import FAQSection from "./FAQSection";

export default function GPAPage() {
  return (
    <div>
      <div className="space-y-8">
        <GPACalculator />
        <GPAPlanningCalculator />
        <FAQSection />
      </div>
    </div>
  );
}

"use client";

import HoursCalculator from "./HoursCalculator";
import DateHoursCalculator from "./DateHoursCalculator";
import FAQSection from "./FAQSection";

export default function HoursPage() {
  return (
    <div>
      <div className="space-y-8">
        <HoursCalculator />
        <DateHoursCalculator />
        <FAQSection />
      </div>
    </div>
  );
}

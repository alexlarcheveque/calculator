"use client";

import AgeCalculator from "@/components/age/AgeCalculator";
import FAQSection from "@/components/age/FAQSection";

export default function AgePage() {
  return (
    <div>
      <div className="space-y-8">
        {/* Age Calculator */}
        <AgeCalculator />

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
}

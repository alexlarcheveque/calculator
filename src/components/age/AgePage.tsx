"use client";

import AgeCalculator from "@/components/age/AgeCalculator";
import FAQSection from "@/components/age/FAQSection";

export default function AgePage() {
  return (
    <div>
      <div className="space-y-8">
        {/* Age Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <AgeCalculator />
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
}

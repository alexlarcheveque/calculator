"use client";

import SimpleRandomGenerator from "@/components/random/SimpleRandomGenerator";
import ComprehensiveRandomGenerator from "@/components/random/ComprehensiveRandomGenerator";
import FAQSection from "./FAQSection";

export default function RandomPage() {
  return (
    <div>
      <div className="space-y-8">
        <SimpleRandomGenerator />
        <ComprehensiveRandomGenerator />
        <FAQSection />
      </div>
    </div>
  );
}

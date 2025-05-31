"use client";

import TriangleCalculator from "@/components/triangle/TriangleCalculator";
import FAQSection from "./FAQSection";

export default function TrianglePage() {
  return (
    <div className="space-y-8">
      {/* Triangle Calculator */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <TriangleCalculator />
      </div>

      {/* Educational Content */}
      <FAQSection />
    </div>
  );
}

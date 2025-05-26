"use client";

import AgeCalculator from "@/components/age/AgeCalculator";
import AgeEducation from "@/components/age/AgeEducation";

export default function AgePage() {
  return (
    <div className="space-y-8">
      {/* Age Calculator */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <AgeCalculator />
      </div>

      {/* Educational Content */}
      <AgeEducation />
    </div>
  );
}

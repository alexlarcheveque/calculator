"use client";

import StandardDeviationCalculator from "@/components/standard-deviation/StandardDeviationCalculator";
import StandardDeviationEducation from "@/components/standard-deviation/StandardDeviationEducation";

export default function StandardDeviationPage() {
  return (
    <div className="space-y-8">
      {/* Standard Deviation Calculator */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <StandardDeviationCalculator />
      </div>

      {/* Educational Content */}
      <StandardDeviationEducation />
    </div>
  );
}

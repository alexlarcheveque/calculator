"use client";

import AgeCalculator from "@/components/age/AgeCalculator";
import FAQSection from "@/components/age/FAQSection";

export default function AgePage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Age Calculator (Precise Age in Years, Months, Days)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Calculate your exact age down to the second with our comprehensive age
          calculator. Get precise age in years, months, weeks, days, hours,
          minutes, and seconds. Features leap year accuracy, cultural age
          systems comparison, life statistics (heartbeats, breaths, sleep time),
          zodiac signs, and detailed age breakdowns for any date range
          calculation.
        </p>
      </div>

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

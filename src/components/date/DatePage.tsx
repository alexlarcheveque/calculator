"use client";

import DateDifferenceCalculator from "./DateDifferenceCalculator";
import DateArithmeticCalculator from "./DateArithmeticCalculator";
import FAQSection from "./FAQSection";

export default function DatePage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Date Calculator (Add, Subtract, Difference Between Dates)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Calculate date differences, add or subtract days, weeks, months, and
          years from any date with our comprehensive date calculator. Features
          business day calculations excluding weekends and holidays, leap year
          accuracy, time zone handling, and precise date arithmetic. Perfect for
          project planning, legal contracts, financial calculations, and
          scheduling applications.
        </p>
      </div>

      <div className="space-y-8">
        <DateDifferenceCalculator />
        <DateArithmeticCalculator />
        <FAQSection />
      </div>
    </div>
  );
}

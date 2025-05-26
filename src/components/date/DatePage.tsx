"use client";

import DateDifferenceCalculator from "./DateDifferenceCalculator";
import DateArithmeticCalculator from "./DateArithmeticCalculator";
import DateEducation from "./DateEducation";

export default function DatePage() {
  return (
    <div className="space-y-8">
      <DateDifferenceCalculator />
      <DateArithmeticCalculator />
      <DateEducation />
    </div>
  );
}

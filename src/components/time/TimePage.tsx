"use client";

import TimeArithmeticCalculator from "./TimeArithmeticCalculator";
import DateTimeCalculator from "./DateTimeCalculator";
import TimeExpressionCalculator from "./TimeExpressionCalculator";
import FAQSection from "./FAQSection";

export default function TimePage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Time Calculator (Add, Subtract, Convert Time Units)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Perform precise time calculations including addition, subtraction, and
          conversion between different time units (hours, minutes, seconds,
          days, weeks). Features time arithmetic with automatic overflow
          handling, time expression parsing, date-time operations, and
          comprehensive time unit conversions. Perfect for project management,
          scheduling, time tracking, and scientific calculations.
        </p>
      </div>

      <div className="space-y-8">
        <TimeArithmeticCalculator />
        <DateTimeCalculator />
        <TimeExpressionCalculator />
        <FAQSection />
      </div>
    </div>
  );
}

"use client";

import HoursCalculator from "./HoursCalculator";
import DateHoursCalculator from "./DateHoursCalculator";
import FAQSection from "./FAQSection";

export default function HoursPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Hours Calculator (Time Tracking, Work Hours, Payroll & Schedule
          Planning)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Comprehensive hours calculator for accurate time tracking, payroll
          processing, and schedule management. Calculate total work hours,
          overtime, break times, and convert between time formats. Features
          decimal hours conversion, time zone support, and professional time
          tracking for employees, managers, and payroll administrators.
          Essential tool for project management, billing, and work time
          compliance.
        </p>
      </div>

      <div className="space-y-8">
        <HoursCalculator />
        <DateHoursCalculator />
        <FAQSection />
      </div>
    </div>
  );
}

"use client";

import HoursCalculator from "./HoursCalculator";
import DateHoursCalculator from "./DateHoursCalculator";
import HoursEducation from "./HoursEducation";

export default function HoursPage() {
  return (
    <div className="space-y-8">
      <HoursCalculator />
      <DateHoursCalculator />
      <HoursEducation />
    </div>
  );
}

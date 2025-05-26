"use client";

import GPACalculator from "./GPACalculator";
import GPAPlanningCalculator from "./GPAPlanningCalculator";
import GPAEducation from "./GPAEducation";

export default function GPAPage() {
  return (
    <div className="space-y-8">
      <GPACalculator />
      <GPAPlanningCalculator />
      <GPAEducation />
    </div>
  );
}

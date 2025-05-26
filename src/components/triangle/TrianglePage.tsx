"use client";

import TriangleCalculator from "@/components/triangle/TriangleCalculator";
import TriangleEducation from "@/components/triangle/TriangleEducation";

export default function TrianglePage() {
  return (
    <div className="space-y-8">
      {/* Triangle Calculator */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <TriangleCalculator />
      </div>

      {/* Educational Content */}
      <TriangleEducation />
    </div>
  );
}

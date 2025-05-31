"use client";

import TriangleCalculator from "@/components/triangle/TriangleCalculator";
import FAQSection from "./FAQSection";

export default function TrianglePage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Triangle Calculator (Area, Angles, Sides, Pythagorean Theorem &
          Trigonometry)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Comprehensive triangle calculator for geometry and trigonometry with
          area calculations, side lengths, angles, and advanced triangle
          solving. Features Pythagorean theorem, Law of Sines, Law of Cosines,
          Heron's formula, and special right triangles (30-60-90, 45-45-90).
          Perfect for students, engineers, architects, and anyone working with
          geometric calculations and trigonometric problems.
        </p>
      </div>

      <div className="space-y-8">
        {/* Triangle Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <TriangleCalculator />
        </div>

        {/* Educational Content */}
        <FAQSection />
      </div>
    </div>
  );
}

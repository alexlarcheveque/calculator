"use client";

import SlabCalculator from "./SlabCalculator";
import RoundCalculator from "./RoundCalculator";
import TubeCalculator from "./TubeCalculator";
import CurbCalculator from "./CurbCalculator";
import StairsCalculator from "./StairsCalculator";
import FAQSection from "./FAQSection";

export default function ConcretePage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Concrete Calculator (Slabs, Footings, Steps, Volume & Cost Estimation)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Comprehensive concrete calculator for all project types including
          slabs, driveways, patios, footings, stairs, curbs, round columns, and
          tubes. Calculate concrete volume, bags needed, costs, and mixing
          ratios with precision. Features multiple shape calculators, PSI
          strength recommendations, bag coverage rates, and curing timelines.
          Perfect for contractors, DIY homeowners, and construction
          professionals planning residential and commercial concrete projects
          with accurate material estimation and budget planning.
        </p>
      </div>

      <div className="space-y-8">
        <SlabCalculator />
        <RoundCalculator />
        <TubeCalculator />
        <CurbCalculator />
        <StairsCalculator />
        <FAQSection />
      </div>
    </div>
  );
}

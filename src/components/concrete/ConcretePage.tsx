"use client";

import SlabCalculator from "./SlabCalculator";
import RoundCalculator from "./RoundCalculator";
import TubeCalculator from "./TubeCalculator";
import CurbCalculator from "./CurbCalculator";
import StairsCalculator from "./StairsCalculator";
import FAQSection from "./FAQSection";

export default function ConcretePage() {
  return (
    <div className="space-y-8">
      <SlabCalculator />
      <RoundCalculator />
      <TubeCalculator />
      <CurbCalculator />
      <StairsCalculator />
      <FAQSection />
    </div>
  );
}

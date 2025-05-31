"use client";

import { useState, useEffect } from "react";
import ConceptionForm from "@/components/conception/ConceptionForm";
import ConceptionSummary from "@/components/conception/ConceptionSummary";
import ConceptionChart from "@/components/conception/ConceptionChart";
import FertilityTable from "@/components/conception/FertilityTable";
import FAQSection from "./FAQSection";
import {
  calculateConception,
  calculateMultipleCycles,
} from "@/utils/conceptionCalculations";
import {
  ConceptionFormValues,
  ConceptionResults,
  FertilityPeriod,
} from "@/types/conception";

export default function ConceptionPage() {
  const [formValues, setFormValues] = useState<ConceptionFormValues>({
    lastPeriodDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    cycleLength: 28,
  });

  const [results, setResults] = useState<ConceptionResults | null>(null);
  const [multipleCycles, setMultipleCycles] = useState<FertilityPeriod[]>([]);

  useEffect(() => {
    const { lastPeriodDate, cycleLength } = formValues;

    if (!lastPeriodDate || cycleLength < 22 || cycleLength > 44) {
      return;
    }

    const conceptionResults = calculateConception({
      lastPeriodDate,
      cycleLength,
    });

    const cyclesData = calculateMultipleCycles(
      {
        lastPeriodDate,
        cycleLength,
      },
      6
    );

    setResults(conceptionResults);
    setMultipleCycles(cyclesData);
  }, [formValues]);

  const handleInputChange = (name: string, value: Date | number) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Conception Calculator (Fertile Window, Ovulation & Best Days to
          Conceive)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Calculate your fertile window and optimal conception dates with our
          comprehensive conception calculator. Track ovulation timing, identify
          your most fertile days, and plan for pregnancy with accurate cycle
          predictions. Features multi-cycle fertility tracking, ovulation
          calendar, and detailed conception probability analysis. Essential for
          family planning, fertility awareness, and understanding your
          reproductive cycle for natural conception timing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <ConceptionForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <ConceptionSummary results={results} />
              <ConceptionChart
                results={results}
                multipleCycles={multipleCycles}
              />
              <FertilityTable data={multipleCycles} />
            </>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

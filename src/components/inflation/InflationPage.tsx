"use client";

import { useState, useEffect } from "react";
import InflationForm from "@/components/inflation/InflationForm";
import InflationSummary from "@/components/inflation/InflationSummary";
import InflationCharts from "@/components/inflation/InflationCharts";
import InflationBasics from "@/components/inflation/InflationBasics";
import EconomicImpacts from "@/components/inflation/EconomicImpacts";
import ProtectionStrategies from "@/components/inflation/ProtectionStrategies";
import InflationFAQSection from "@/components/inflation/FAQSection";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  calculateForwardInflation,
  calculateBackwardInflation,
} from "@/utils/inflationCalculations";
import {
  InflationFormValues,
  InflationResults,
  InflationCalculatorType,
} from "@/types/inflation";

export default function InflationPage() {
  const [formValues, setFormValues, isFormLoaded] =
    useLocalStorage<InflationFormValues>("inflationFormValues", {
      calculatorType: InflationCalculatorType.FORWARD_RATE,
      startingAmount: 100,
      startMonth: 1,
      startYear: 2015,
      endMonth: 1,
      endYear: 2025,
      inflationRate: 3,
      years: 10,
    });

  const [results, setResults] = useState<InflationResults | null>(null);

  useEffect(() => {
    // Only calculate when localStorage has loaded and we have valid input
    if (!isFormLoaded || !formValues || formValues.startingAmount <= 0) {
      return;
    }

    const { calculatorType, startingAmount, inflationRate, years } = formValues;

    let inflationResults: InflationResults;

    try {
      switch (calculatorType) {
        case InflationCalculatorType.FORWARD_RATE:
          if (inflationRate <= 0 || years <= 0) return;
          inflationResults = calculateForwardInflation({
            startingAmount,
            inflationRate,
            years,
          });
          break;
        case InflationCalculatorType.BACKWARD_RATE:
          if (inflationRate <= 0 || years <= 0) return;
          inflationResults = calculateBackwardInflation({
            startingAmount,
            inflationRate,
            years,
          });
          break;
        default:
          return;
      }

      setResults(inflationResults);
    } catch (error) {
      console.error("Error calculating inflation:", error);
      setResults(null);
    }
  }, [formValues, isFormLoaded]);

  const handleInputChange = (name: string, value: number) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculatorTypeChange = (type: InflationCalculatorType) => {
    setFormValues((prev) => ({ ...prev, calculatorType: type }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <InflationForm
            values={formValues}
            onChange={handleInputChange}
            onCalculatorTypeChange={handleCalculatorTypeChange}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && isFormLoaded && (
            <>
              <InflationSummary results={results} />
              <InflationCharts results={results} />
            </>
          )}

          {(!results || !isFormLoaded) && (
            <div className="text-center text-gray-500 lg:mt-20">
              {!isFormLoaded
                ? "Loading..."
                : "Enter values to calculate inflation impact."}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8 mb-16">
        <InflationBasics />
        <EconomicImpacts />
        <ProtectionStrategies />
      </div>
      {/* FAQ Section */}
      <InflationFAQSection />
    </div>
  );
}

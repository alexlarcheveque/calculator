"use client";

import { useState, useEffect } from "react";
import CompoundInterestForm from "@/components/compound-interest/CompoundInterestForm";
import CompoundInterestSummary from "@/components/compound-interest/CompoundInterestSummary";
import CompoundInterestChart from "@/components/compound-interest/CompoundInterestChart";
import CompoundInterestExample from "@/components/compound-interest/CompoundInterestExample";
import CompoundInterestBasics from "@/components/compound-interest/CompoundInterestBasics";
import CompoundingFrequency from "@/components/compound-interest/CompoundingFrequency";
import CompoundInterestFormulas from "@/components/compound-interest/CompoundInterestFormulas";
import FAQSection from "@/components/compound-interest/FAQSection";
import {
  calculateCompoundInterest,
  calculateEffectiveAnnualRate,
  CompoundInterestResults,
} from "@/utils/compoundInterestCalculations";

interface FormValues {
  principal: number;
  rate: number;
  time: number;
  compoundingFrequency: number;
}

export default function CompoundInterestPage() {
  const [formValues, setFormValues] = useState<FormValues>({
    principal: 5000,
    rate: 5,
    time: 10,
    compoundingFrequency: 1,
  });

  const [results, setResults] = useState<CompoundInterestResults | null>(null);

  useEffect(() => {
    if (
      formValues.principal > 0 &&
      formValues.rate >= 0 &&
      formValues.time > 0 &&
      formValues.compoundingFrequency > 0
    ) {
      const calculatedResults = calculateCompoundInterest(formValues);
      setResults(calculatedResults);
    } else {
      setResults(null);
    }
  }, [formValues]);

  const handleInputChange = (field: keyof FormValues, value: number) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Compound Interest Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Calculate compound interest growth with our comprehensive calculator.
          Compare different compounding frequencies (daily, monthly, quarterly,
          annual), analyze the power of exponential growth, and understand
          effective annual rates (APY vs APR). Features the Rule of 72 for
          doubling time estimates, continuous compounding calculations, and
          real-world examples. Essential for savings planning, investment growth
          projections, debt payoff strategies, and understanding the time value
          of money for long-term financial success.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <CompoundInterestForm
            values={formValues}
            onChange={handleInputChange}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <CompoundInterestSummary results={results} />
              <CompoundInterestChart
                results={results}
                formValues={formValues}
              />

              {/* Effective Annual Rate display */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Interest Rate Information
                </h3>
                <div className="text-sm text-gray-600">
                  Effective Annual Rate (APY):{" "}
                  <span className="font-semibold text-blue-600">
                    {results.effectiveAnnualRate.toFixed(5)}%
                  </span>
                </div>
              </div>
            </>
          )}

          {!results && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter valid values to see compound interest calculations.
            </p>
          )}
        </div>
      </div>

      {/* Compound Interest Growth Example */}
      <div className="mb-16">
        <CompoundInterestExample />
      </div>

      {/* Info Cards Section */}
      <div className="space-y-8 mb-16">
        <CompoundInterestBasics />
        <CompoundingFrequency />
        <CompoundInterestFormulas />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

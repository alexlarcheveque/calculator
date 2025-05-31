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
              Enter investment details to calculate compound interest.
            </p>
          )}
        </div>
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

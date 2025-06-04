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
  CompoundInterestResults,
  CompoundingFrequency as CompoundingFrequencyEnum,
  CompoundInterestFormValues,
} from "@/types/compoundInterest";
import { calculateCompoundInterestGrowth } from "@/utils/compoundInterestCalculations";

interface FormValues {
  principal: number;
  rate: number;
  time: number;
  compoundingFrequency: CompoundingFrequencyEnum;
}

export default function CompoundInterestPage() {
  const [formValues, setFormValues] = useState<FormValues>({
    principal: 5000,
    rate: 5,
    time: 10,
    compoundingFrequency: CompoundingFrequencyEnum.ANNUALLY,
  });

  const [results, setResults] = useState<CompoundInterestResults | null>(null);

  useEffect(() => {
    if (
      formValues.principal > 0 &&
      formValues.rate >= 0 &&
      formValues.time > 0
    ) {
      const calculatedResults = calculateCompoundInterestGrowth({
        principal: formValues.principal,
        interestRate: formValues.rate,
        compoundingFrequency: formValues.compoundingFrequency,
        timeYears: formValues.time,
      });

      // Convert the growth data points to CompoundInterestResults
      const lastDataPoint = calculatedResults[calculatedResults.length - 1];
      setResults({
        inputRate: formValues.rate,
        inputFrequency: formValues.compoundingFrequency,
        outputRate: formValues.rate,
        outputFrequency: formValues.compoundingFrequency,
        effectiveAnnualRate:
          ((lastDataPoint.totalValue / formValues.principal) **
            (1 / formValues.time) -
            1) *
          100,
      });
    } else {
      setResults(null);
    }
  }, [formValues]);

  const handleInputChange = (
    field: string,
    value: number | CompoundingFrequencyEnum
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Convert FormValues to CompoundInterestFormValues
  const compoundInterestFormValues: CompoundInterestFormValues = {
    inputInterestRate: formValues.rate,
    inputCompoundingFrequency: formValues.compoundingFrequency,
    outputCompoundingFrequency: formValues.compoundingFrequency,
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <CompoundInterestForm
            values={compoundInterestFormValues}
            onChange={handleInputChange}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <CompoundInterestSummary results={results} />
              <CompoundInterestChart
                data={calculateCompoundInterestGrowth({
                  principal: formValues.principal,
                  interestRate: formValues.rate,
                  compoundingFrequency: formValues.compoundingFrequency,
                  timeYears: formValues.time,
                })}
                title="Compound Interest Growth"
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

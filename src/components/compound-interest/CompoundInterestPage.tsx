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
import {
  calculateCompoundInterestGrowth,
  calculateCompoundInterestConversion,
} from "@/utils/compoundInterestCalculations";

interface FormValues {
  principal: number;
  rate: number;
  time: number;
  inputCompoundingFrequency: CompoundingFrequencyEnum;
  outputCompoundingFrequency: CompoundingFrequencyEnum;
}

export default function CompoundInterestPage() {
  const [formValues, setFormValues] = useState<FormValues>({
    principal: 5000,
    rate: 5,
    time: 10,
    inputCompoundingFrequency: CompoundingFrequencyEnum.ANNUALLY,
    outputCompoundingFrequency: CompoundingFrequencyEnum.MONTHLY,
  });

  const [results, setResults] = useState<CompoundInterestResults | null>(null);

  useEffect(() => {
    if (formValues.rate >= 0) {
      // Calculate the rate conversion
      const conversionResults = calculateCompoundInterestConversion({
        interestRate: formValues.rate,
        inputFrequency: formValues.inputCompoundingFrequency,
        outputFrequency: formValues.outputCompoundingFrequency,
      });

      setResults(conversionResults);
    } else {
      setResults(null);
    }
  }, [formValues]);

  const handleInputChange = (
    field: string,
    value: number | CompoundingFrequencyEnum
  ) => {
    // Map form field names to state properties
    if (field === "inputInterestRate") {
      setFormValues((prev) => ({ ...prev, rate: value as number }));
    } else if (field === "inputCompoundingFrequency") {
      setFormValues((prev) => ({
        ...prev,
        inputCompoundingFrequency: value as CompoundingFrequencyEnum,
      }));
    } else if (field === "outputCompoundingFrequency") {
      setFormValues((prev) => ({
        ...prev,
        outputCompoundingFrequency: value as CompoundingFrequencyEnum,
      }));
    } else {
      // Fallback for other fields
      setFormValues((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Convert FormValues to CompoundInterestFormValues
  const compoundInterestFormValues: CompoundInterestFormValues = {
    inputInterestRate: formValues.rate,
    inputCompoundingFrequency: formValues.inputCompoundingFrequency,
    outputCompoundingFrequency: formValues.outputCompoundingFrequency,
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
          {results && <CompoundInterestSummary results={results} />}

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

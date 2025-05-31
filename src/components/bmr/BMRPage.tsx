"use client";

import { useState, useEffect } from "react";
import BMRForm from "@/components/bmr/BMRForm";
import BMRSummary from "@/components/bmr/BMRSummary";
import BMRCharts from "@/components/bmr/BMRCharts";
import ActivityTable from "@/components/bmr/ActivityTable";
import { calculateBMR } from "@/utils/bmrCalculations";
import { BMRFormValues, BMRResults } from "@/types/bmr";
import FAQSection from "@/components/bmr/FAQSection";

export default function BMRPage() {
  const [formValues, setFormValues] = useState<BMRFormValues>({
    age: 25,
    gender: "male",
    height: 5.83, // 5'10"
    weight: 160,
    heightUnit: "feet",
    weightUnit: "lbs",
    formula: "mifflin",
    bodyFatPercentage: 20,
    resultUnit: "calories",
  });

  const [results, setResults] = useState<BMRResults | null>(null);

  useEffect(() => {
    const { age, height, weight } = formValues;

    if (age <= 0 || height <= 0 || weight <= 0) {
      return;
    }

    const bmrResults = calculateBMR(formValues);
    setResults(bmrResults);
  }, [formValues]);

  const handleInputChange = (name: string, value: number | string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <BMRForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <BMRSummary results={results} formValues={formValues} />
              <BMRCharts results={results} formValues={formValues} />
              <ActivityTable results={results} formValues={formValues} />
            </>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

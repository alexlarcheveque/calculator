"use client";

import { useState, useEffect } from "react";
import BMIForm from "@/components/bmi/BMIForm";
import BMISummary from "@/components/bmi/BMISummary";
import BMIGaugeChart from "@/components/bmi/BMIGaugeChart";
import BMICategoryTable from "@/components/bmi/BMICategoryTable";
import FAQSection from "@/components/bmi/FAQSection";
import { calculateBMI } from "@/utils/bmiCalculations";
import { BMIFormValues, BMIResults, UnitSystem, Gender } from "@/types/bmi";

export default function BMIPage() {
  const [formValues, setFormValues] = useState<BMIFormValues>({
    unitSystem: UnitSystem.IMPERIAL,
    age: 25,
    gender: Gender.MALE,
    heightFeet: 5,
    heightInches: 10,
    heightCm: 180,
    weightLbs: 160,
    weightKg: 65,
  });

  const [results, setResults] = useState<BMIResults | null>(null);

  useEffect(() => {
    // Validate inputs before calculating
    const isValidImperial =
      formValues.unitSystem === UnitSystem.IMPERIAL &&
      formValues.heightFeet > 0 &&
      formValues.heightInches >= 0 &&
      formValues.weightLbs > 0;

    const isValidMetric =
      formValues.unitSystem === UnitSystem.METRIC &&
      formValues.heightCm > 0 &&
      formValues.weightKg > 0;

    if (formValues.age > 0 && (isValidImperial || isValidMetric)) {
      const bmiResults = calculateBMI(formValues);
      setResults(bmiResults);
    } else {
      setResults(null);
    }
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
          <BMIForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <BMISummary results={results} />
              <BMIGaugeChart results={results} />
            </>
          )}
        </div>
      </div>

      {/* BMI Category Table */}
      <div className="mb-16">
        <BMICategoryTable />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

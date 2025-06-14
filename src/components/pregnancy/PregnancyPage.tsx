"use client";

import { useState, useEffect } from "react";
import PregnancyForm from "@/components/pregnancy/PregnancyForm";
import PregnancySummary from "@/components/pregnancy/PregnancySummary";
import PregnancyCharts from "@/components/pregnancy/PregnancyCharts";
import PregnancyTimeline from "@/components/pregnancy/PregnancyTimeline";
import PregnancyBasics from "@/components/pregnancy/PregnancyBasics";
import PregnancyDevelopment from "@/components/pregnancy/PregnancyDevelopment";
import PregnancyHealth from "@/components/pregnancy/PregnancyHealth";

import { calculatePregnancy } from "@/utils/pregnancyCalculations";
import {
  PregnancyFormValues,
  PregnancyResults,
  CalculationMethod,
  EmbryoAge,
} from "@/types/pregnancy";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import FAQSection from "@/components/pregnancy/FAQSection";

export default function PregnancyPage() {
  const [formValues, setFormValues] = useLocalStorage<PregnancyFormValues>(
    "pregnancyFormValues",
    {
      calculationMethod: CalculationMethod.DUE_DATE,
      dueDate: new Date(Date.now() + 119 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // ~17 weeks from now (to show week 23)
      lastPeriodDate: new Date(
        Date.now() - 10 * 7 * 24 * 60 * 60 * 1000 // 10 weeks ago
      )
        .toISOString()
        .split("T")[0],
      cycleLength: 28,
      conceptionDate: "",
      ultrasoundDate: "",
      ultrasoundWeeks: 20,
      ultrasoundDays: 0,
      ivfTransferDate: "",
      embryoAge: EmbryoAge.DAY_5,
    }
  );

  const [results, setResults] = useState<PregnancyResults | null>(null);

  useEffect(() => {
    try {
      let dateToUse: string = "";

      switch (formValues.calculationMethod) {
        case CalculationMethod.DUE_DATE:
          dateToUse = formValues.dueDate;
          break;
        case CalculationMethod.LAST_PERIOD:
          dateToUse = formValues.lastPeriodDate;
          break;
        case CalculationMethod.CONCEPTION_DATE:
          dateToUse = formValues.conceptionDate;
          break;
        case CalculationMethod.ULTRASOUND:
          dateToUse = formValues.ultrasoundDate;
          break;
        case CalculationMethod.IVF_TRANSFER:
          dateToUse = formValues.ivfTransferDate;
          break;
      }

      if (!dateToUse) {
        setResults(null);
        return;
      }

      const pregnancyResults = calculatePregnancy({
        method: formValues.calculationMethod,
        date: new Date(dateToUse),
        cycleLength: formValues.cycleLength,
        ultrasoundWeeks: formValues.ultrasoundWeeks,
        ultrasoundDays: formValues.ultrasoundDays,
        embryoAge: formValues.embryoAge,
      });

      setResults(pregnancyResults);
    } catch (error) {
      console.error("Error calculating pregnancy:", error);
      setResults(null);
    }
  }, [formValues]);

  const handleInputChange = (name: string, value: string | number) => {
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
          <PregnancyForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <PregnancySummary results={results} />
              <PregnancyCharts results={results} />
              <PregnancyTimeline results={results} />
            </>
          )}

          {!results && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter your last menstrual period date to calculate pregnancy
              details.
            </p>
          )}
        </div>
      </div>

      {/* Info Sections */}
      <div className="space-y-8 mb-16">
        <PregnancyBasics />
        <PregnancyDevelopment />
        <PregnancyHealth />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

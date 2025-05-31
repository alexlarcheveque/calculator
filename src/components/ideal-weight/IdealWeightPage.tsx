"use client";

import { useState, useEffect } from "react";
import IdealWeightForm from "@/components/ideal-weight/IdealWeightForm";
import IdealWeightSummary from "@/components/ideal-weight/IdealWeightSummary";
import IdealWeightChart from "@/components/ideal-weight/IdealWeightChart";
import FAQSection from "@/components/ideal-weight/FAQSection";
import {
  calculateIdealWeight,
  feetInchesToCm,
} from "@/utils/idealWeightCalculations";
import {
  IdealWeightFormValues,
  IdealWeightResults,
  UnitSystem,
  Gender,
} from "@/types/idealWeight";

export default function IdealWeightPage() {
  const [formValues, setFormValues] = useState<IdealWeightFormValues>({
    age: 25,
    gender: Gender.MALE,
    unitSystem: UnitSystem.IMPERIAL,
    heightFeet: 5,
    heightInches: 10,
    heightCm: 180,
  });

  const [results, setResults] = useState<IdealWeightResults | null>(null);

  useEffect(() => {
    const { age, gender, unitSystem, heightFeet, heightInches, heightCm } =
      formValues;

    // Validate inputs
    if (age < 2 || age > 80) return;

    let heightInCm: number;

    if (unitSystem === UnitSystem.IMPERIAL) {
      if (
        heightFeet < 3 ||
        heightFeet > 8 ||
        heightInches < 0 ||
        heightInches > 11
      )
        return;
      heightInCm = feetInchesToCm(heightFeet, heightInches);
    } else {
      if (heightCm < 100 || heightCm > 250) return;
      heightInCm = heightCm;
    }

    const idealWeightResults = calculateIdealWeight({
      heightInCm,
      gender,
      unitSystem,
    });

    setResults(idealWeightResults);
  }, [formValues]);

  const handleInputChange = (name: string, value: number | string) => {
    const newValues = { ...formValues, [name]: value };

    // When switching unit systems, convert height values
    if (name === "unitSystem") {
      if (
        value === UnitSystem.METRIC &&
        formValues.unitSystem === UnitSystem.IMPERIAL
      ) {
        // Convert from imperial to metric
        const heightInCm = feetInchesToCm(
          formValues.heightFeet,
          formValues.heightInches
        );
        newValues.heightCm = Math.round(heightInCm * 10) / 10; // Round to 1 decimal
      } else if (
        value === UnitSystem.IMPERIAL &&
        formValues.unitSystem === UnitSystem.METRIC
      ) {
        // Convert from metric to imperial
        const totalInches = formValues.heightCm / 2.54;
        newValues.heightFeet = Math.floor(totalInches / 12);
        newValues.heightInches = Math.round((totalInches % 12) * 10) / 10; // Round to 1 decimal
      }
    }

    setFormValues(newValues);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ideal Weight Calculator (Healthy Weight Range & BMI Analysis)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Calculate your ideal body weight using multiple medical formulas
          including Robinson, Miller, Devine, Hamwi, and healthy BMI ranges.
          Determine optimal weight targets for health, fitness goals, and
          medical assessments based on height, age, and gender. Features
          comprehensive weight ranges, visual charts, and expert recommendations
          for achieving and maintaining healthy body weight through scientific
          calculations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <IdealWeightForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <IdealWeightSummary results={results} />
              <IdealWeightChart results={results} />
            </>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

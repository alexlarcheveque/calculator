"use client";

import { useState, useEffect } from "react";
import BodyFatForm from "@/components/body-fat/BodyFatForm";
import BodyFatSummary from "@/components/body-fat/BodyFatSummary";
import BodyFatCharts from "@/components/body-fat/BodyFatCharts";
import ReferenceTables from "@/components/body-fat/ReferenceTables";
import FAQSection from "@/components/body-fat/FAQSection";
import { calculateBodyFat } from "@/utils/bodyFatCalculations";
import {
  BodyFatFormValues,
  BodyFatResults,
  UnitSystem,
  Gender,
} from "@/types/bodyFat";

export default function BodyFatPage() {
  const [formValues, setFormValues] = useState<BodyFatFormValues>({
    unitSystem: UnitSystem.US,
    gender: Gender.MALE,
    age: 25,
    // US Units
    weightLbs: 152,
    heightFeet: 5,
    heightInches: 10.5,
    neckFeet: 1,
    neckInches: 7.5,
    waistFeet: 3,
    waistInches: 1.5,
    hipFeet: 2,
    hipInches: 10.5,
    // Metric Units
    weightKg: 70,
    heightCm: 178,
    neckCm: 50,
    waistCm: 96,
    hipCm: 92,
  });

  const [results, setResults] = useState<BodyFatResults | null>(null);

  useEffect(() => {
    // Convert form values to calculation parameters
    let weight: number;
    let height: number;
    let neck: number;
    let waist: number;
    let hip: number | undefined;

    if (formValues.unitSystem === UnitSystem.US) {
      weight = formValues.weightLbs;
      height = formValues.heightFeet * 12 + formValues.heightInches;
      neck = formValues.neckFeet * 12 + formValues.neckInches;
      waist = formValues.waistFeet * 12 + formValues.waistInches;
      hip =
        formValues.gender === Gender.FEMALE
          ? formValues.hipFeet * 12 + formValues.hipInches
          : undefined;
    } else {
      weight = formValues.weightKg;
      height = formValues.heightCm;
      neck = formValues.neckCm;
      waist = formValues.waistCm;
      hip = formValues.gender === Gender.FEMALE ? formValues.hipCm : undefined;
    }

    // Validate inputs
    if (
      weight <= 0 ||
      height <= 0 ||
      neck <= 0 ||
      waist <= 0 ||
      formValues.age <= 0
    ) {
      return;
    }

    if (formValues.gender === Gender.FEMALE && (!hip || hip <= 0)) {
      return;
    }

    const bodyFatResults = calculateBodyFat({
      gender: formValues.gender,
      age: formValues.age,
      weight,
      height,
      neck,
      waist,
      hip,
      unitSystem: formValues.unitSystem,
    });

    setResults(bodyFatResults);
  }, [formValues]);

  const handleInputChange = (name: string, value: number | string) => {
    const newValues = { ...formValues, [name]: value };

    // Handle unit system changes
    if (name === "unitSystem") {
      const newUnitSystem = value as UnitSystem;
      if (
        newUnitSystem === UnitSystem.METRIC &&
        formValues.unitSystem === UnitSystem.US
      ) {
        // Convert US to Metric
        newValues.weightKg =
          Math.round((formValues.weightLbs / 2.20462) * 10) / 10;
        newValues.heightCm =
          Math.round(
            (formValues.heightFeet * 12 + formValues.heightInches) * 2.54 * 10
          ) / 10;
        newValues.neckCm =
          Math.round(
            (formValues.neckFeet * 12 + formValues.neckInches) * 2.54 * 10
          ) / 10;
        newValues.waistCm =
          Math.round(
            (formValues.waistFeet * 12 + formValues.waistInches) * 2.54 * 10
          ) / 10;
        newValues.hipCm =
          Math.round(
            (formValues.hipFeet * 12 + formValues.hipInches) * 2.54 * 10
          ) / 10;
      } else if (
        newUnitSystem === UnitSystem.US &&
        formValues.unitSystem === UnitSystem.METRIC
      ) {
        // Convert Metric to US
        newValues.weightLbs =
          Math.round(formValues.weightKg * 2.20462 * 10) / 10;

        const totalHeightInches = formValues.heightCm / 2.54;
        newValues.heightFeet = Math.floor(totalHeightInches / 12);
        newValues.heightInches = Math.round((totalHeightInches % 12) * 10) / 10;

        const totalNeckInches = formValues.neckCm / 2.54;
        newValues.neckFeet = Math.floor(totalNeckInches / 12);
        newValues.neckInches = Math.round((totalNeckInches % 12) * 10) / 10;

        const totalWaistInches = formValues.waistCm / 2.54;
        newValues.waistFeet = Math.floor(totalWaistInches / 12);
        newValues.waistInches = Math.round((totalWaistInches % 12) * 10) / 10;

        const totalHipInches = formValues.hipCm / 2.54;
        newValues.hipFeet = Math.floor(totalHipInches / 12);
        newValues.hipInches = Math.round((totalHipInches % 12) * 10) / 10;
      }
    }

    setFormValues(newValues);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <BodyFatForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <BodyFatSummary results={results} />
              <BodyFatCharts results={results} gender={formValues.gender} />
            </>
          )}

          {!results && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter your measurements to calculate body fat percentage.
            </p>
          )}
        </div>
      </div>

      {/* Reference Tables */}
      <div className="mb-16">
        <ReferenceTables />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

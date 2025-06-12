"use client";

import { useState, useEffect } from "react";
import CalorieForm from "@/components/calorie/CalorieForm";
import CalorieSummary from "@/components/calorie/CalorieSummary";
import CalorieCharts from "@/components/calorie/CalorieCharts";
import FAQSection from "@/components/calorie/FAQSection";
import CalorieBasics from "@/components/calorie/CalorieBasics";
import NutritionGuidelines from "@/components/calorie/NutritionGuidelines";
import {
  calculateCalories,
  convertHeightToMetric,
  convertWeightToMetric,
} from "@/utils/calorieCalculations";
import {
  CalorieFormValues,
  CalorieResults,
  Gender,
  ActivityLevel,
  BMRFormula,
  UnitSystem,
  ResultUnit,
} from "@/types/calorie";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function CaloriePage() {
  const [formValues, setFormValues] = useLocalStorage<CalorieFormValues>(
    "calorieFormValues",
    {
      age: 25,
      gender: Gender.MALE,
      heightFeet: 5,
      heightInches: 10,
      heightCm: 178,
      weightLbs: 165,
      weightKg: 75,
      activityLevel: ActivityLevel.MODERATE,
      unitSystem: UnitSystem.IMPERIAL,
      resultUnit: ResultUnit.CALORIES,
      bmrFormula: BMRFormula.MIFFLIN,
      bodyFatPercentage: 20,
    }
  );

  const [results, setResults] = useState<CalorieResults | null>(null);

  useEffect(() => {
    const {
      age,
      gender,
      heightFeet,
      heightInches,
      heightCm,
      weightLbs,
      weightKg,
      activityLevel,
      unitSystem,
      bmrFormula,
      bodyFatPercentage,
    } = formValues;

    // Convert to metric for calculations
    const heightInCm =
      unitSystem === UnitSystem.IMPERIAL
        ? convertHeightToMetric(heightFeet, heightInches)
        : heightCm;

    const weightInKg =
      unitSystem === UnitSystem.IMPERIAL
        ? convertWeightToMetric(weightLbs)
        : weightKg;

    // Validate inputs
    if (
      age < 15 ||
      age > 80 ||
      heightInCm < 100 ||
      heightInCm > 250 ||
      weightInKg < 20 ||
      weightInKg > 200
    ) {
      return;
    }

    const calorieResults = calculateCalories({
      age,
      gender,
      heightCm: heightInCm,
      weightKg: weightInKg,
      activityLevel,
      bmrFormula,
      bodyFatPercentage:
        bmrFormula === BMRFormula.KATCH_MCARDLE ? bodyFatPercentage : undefined,
    });

    setResults(calorieResults);
  }, [formValues]);

  const handleInputChange = (name: string, value: number | string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultipleInputChanges = (updates: Partial<CalorieFormValues>) => {
    setFormValues((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <CalorieForm
            values={formValues}
            onChange={handleInputChange}
            onMultipleChanges={handleMultipleInputChanges}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <CalorieSummary
                results={results}
                resultUnit={formValues.resultUnit}
              />
              <CalorieCharts
                results={results}
                resultUnit={formValues.resultUnit}
              />{" "}
            </>
          )}

          {!results && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter your details to calculate calorie needs.
            </p>
          )}
        </div>
      </div>

      {/* Info Sections */}
      <div className="space-y-8 mb-16">
        <CalorieBasics />
        <NutritionGuidelines />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

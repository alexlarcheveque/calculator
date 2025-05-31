"use client";

import { useState, useEffect } from "react";
import CalorieForm from "@/components/calorie/CalorieForm";
import CalorieSummary from "@/components/calorie/CalorieSummary";
import CalorieCharts from "@/components/calorie/CalorieCharts";
import FoodEnergyConverter from "@/components/calorie/FoodEnergyConverter";
import FAQSection from "@/components/calorie/FAQSection";
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

export default function CaloriePage() {
  const [formValues, setFormValues] = useState<CalorieFormValues>({
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
  });

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

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Calorie Calculator (Daily Calorie Needs)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Calculate your daily calorie needs with our comprehensive calculator
          using multiple BMR formulas (Mifflin-St Jeor, Harris-Benedict,
          Katch-McArdle). Determine calories for weight loss, maintenance, or
          muscle gain based on your age, gender, height, weight, and activity
          level. Features macronutrient distribution, food energy conversion,
          and personalized recommendations for healthy weight management and
          fitness goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <CalorieForm values={formValues} onChange={handleInputChange} />
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
              />
            </>
          )}
        </div>
      </div>

      {/* Food Energy Converter */}
      <div className="mb-16">
        <FoodEnergyConverter />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

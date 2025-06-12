"use client";

import { IdealWeightResults, UnitSystem } from "@/types/idealWeight";
import { formatWeight } from "@/utils/idealWeightCalculations";
import { kgToLbs, lbsToKg } from "@/utils/idealWeightCalculations";

interface BMICategoriesChartProps {
  results: IdealWeightResults;
}

export default function BMICategoriesChart({
  results,
}: BMICategoriesChartProps) {
  // BMI categories and their ranges
  const categories = [
    { name: "Underweight", min: 0, max: 18.5, color: "bg-blue-400" },
    { name: "Normal", min: 18.5, max: 25, color: "bg-green-400" },
    { name: "Overweight", min: 25, max: 30, color: "bg-yellow-400" },
    { name: "Obese", min: 30, max: 40, color: "bg-red-400" },
  ];

  // Calculate weight ranges for each BMI category based on user's height
  const heightInCm =
    results.heightInCm ??
    (results.heightInInches ? results.heightInInches * 2.54 : 0);
  const heightInMeters = heightInCm / 100;

  const weightRanges = categories.map((category) => ({
    ...category,
    minWeight: category.min * heightInMeters * heightInMeters,
    maxWeight: category.max * heightInMeters * heightInMeters,
  }));

  // If using imperial units, convert weight ranges to lbs for display and calculations
  const displayRanges =
    results.unitSystem === UnitSystem.IMPERIAL
      ? weightRanges.map((r) => ({
          ...r,
          minWeight: kgToLbs(r.minWeight),
          maxWeight: kgToLbs(r.maxWeight),
        }))
      : weightRanges;

  // Width percentages for each segment (must sum to 100)
  const widthMap: Record<string, number> = {
    Underweight: 15,
    Normal: 35,
    Overweight: 25,
    Obese: 25,
  } as const;

  // Calculate current BMI range (18.5-25 for normal)
  const normalRange = displayRanges.find((r) => r.name === "Normal");

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          BMI Weight Categories
        </h3>
        <p className="text-sm text-gray-600">
          Weight ranges based on your height
        </p>
      </div>

      {/* Linear gauge */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="relative mb-8">
          {/* Main bar */}
          <div className="flex h-12 rounded-lg overflow-hidden border border-gray-300">
            {displayRanges.map((range, index) => {
              const isLast = index === displayRanges.length - 1;
              const width = isLast
                ? "25%"
                : range.name === "Normal"
                ? "35%"
                : range.name === "Overweight"
                ? "25%"
                : "15%";

              const outlineClass =
                range.name === "Normal"
                  ? "ring-2 ring-inset ring-gray-800 z-10"
                  : "";

              return (
                <div
                  key={range.name}
                  className={`${range.color} relative ${outlineClass}`}
                  style={{ width }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {range.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category details */}
        <div className="grid grid-cols-2 gap-4">
          {displayRanges.map((range) => (
            <div key={range.name} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className={`w-4 h-4 ${range.color} rounded mr-2`}></div>
                <span className="font-medium text-gray-800">{range.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                BMI: {range.min} - {range.max === 40 ? "40+" : range.max}
              </div>
              <div className="text-sm text-gray-600">
                Weight: {formatWeight(range.minWeight, results.unitSystem)} -{" "}
                {range.max === 40
                  ? formatWeight(range.maxWeight * 1.5, results.unitSystem) +
                    "+"
                  : formatWeight(range.maxWeight, results.unitSystem)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Your ideal weight range (
            {formatWeight(results.bmiRangeMin, results.unitSystem)} -{" "}
            {formatWeight(results.bmiRangeMax, results.unitSystem)}) falls in
            the Normal BMI category.
          </p>
        </div>
      </div>
    </div>
  );
}

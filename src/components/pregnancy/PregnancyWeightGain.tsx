"use client";

import { useState } from "react";

interface WeightGainData {
  prePregnancyWeight: number;
  currentWeight: number;
  heightFeet: number;
  heightInches: number;
  currentWeek: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active";
}

export default function PregnancyWeightGain() {
  const [data, setData] = useState<WeightGainData>({
    prePregnancyWeight: 0,
    currentWeight: 0,
    heightFeet: 5,
    heightInches: 4,
    currentWeek: 20,
    activityLevel: "moderate",
  });

  const [unit, setUnit] = useState<"lbs" | "kg">("lbs");

  const handleInputChange = (
    field: keyof WeightGainData,
    value: string | number
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: typeof value === "string" ? parseFloat(value) || 0 : value,
    }));
  };

  // Calculate BMI
  const calculateBMI = () => {
    if (!data.prePregnancyWeight || !data.heightFeet) return 0;

    const totalInches = data.heightFeet * 12 + data.heightInches;
    const weightInPounds =
      unit === "kg" ? data.prePregnancyWeight * 2.205 : data.prePregnancyWeight;

    return (weightInPounds / (totalInches * totalInches)) * 703;
  };

  // Get BMI category
  const getBMICategory = () => {
    const bmi = calculateBMI();
    if (bmi < 18.5) return "underweight";
    if (bmi < 25) return "normal";
    if (bmi < 30) return "overweight";
    return "obese";
  };

  // Get recommended weight gain based on BMI category
  const getRecommendedWeightGain = () => {
    const category = getBMICategory();

    switch (category) {
      case "underweight":
        return { min: 28, max: 40, total: "28-40" };
      case "normal":
        return { min: 25, max: 35, total: "25-35" };
      case "overweight":
        return { min: 15, max: 25, total: "15-25" };
      case "obese":
        return { min: 11, max: 20, total: "11-20" };
      default:
        return { min: 25, max: 35, total: "25-35" };
    }
  };

  // Calculate expected weight gain by current week
  const getExpectedWeightGainByWeek = () => {
    const recommended = getRecommendedWeightGain();
    const category = getBMICategory();

    if (data.currentWeek <= 12) {
      // First trimester: typically 1-4 lbs total
      return { min: 1, max: 4 };
    } else {
      // After first trimester
      const weeksAfterFirst = data.currentWeek - 12;
      let weeklyGain;

      switch (category) {
        case "underweight":
          weeklyGain = 1.0; // 1 lb per week
          break;
        case "normal":
          weeklyGain = 1.0; // 1 lb per week
          break;
        case "overweight":
          weeklyGain = 0.6; // 0.6 lb per week
          break;
        case "obese":
          weeklyGain = 0.5; // 0.5 lb per week
          break;
        default:
          weeklyGain = 1.0;
      }

      const firstTrimesterGain = 2.5; // Average first trimester gain
      const expectedGain = firstTrimesterGain + weeksAfterFirst * weeklyGain;

      return {
        min: Math.max(1, expectedGain - 3),
        max: expectedGain + 3,
      };
    }
  };

  // Calculate current weight gain
  const getCurrentWeightGain = () => {
    return data.currentWeight - data.prePregnancyWeight;
  };

  // Assess current weight gain status
  const getWeightGainStatus = () => {
    const currentGain = getCurrentWeightGain();
    const expected = getExpectedWeightGainByWeek();

    if (currentGain < expected.min) {
      return {
        status: "below",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50 border-yellow-200",
      };
    } else if (currentGain > expected.max) {
      return {
        status: "above",
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200",
      };
    } else {
      return {
        status: "normal",
        color: "text-green-600",
        bgColor: "bg-green-50 border-green-200",
      };
    }
  };

  const bmi = calculateBMI();
  const bmiCategory = getBMICategory();
  const recommendedGain = getRecommendedWeightGain();
  const currentGain = getCurrentWeightGain();
  const expectedGain = getExpectedWeightGainByWeek();
  const status = getWeightGainStatus();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Pregnancy Weight Gain Calculator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Your Information
          </h3>

          <div className="space-y-4">
            {/* Unit Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit System
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="lbs"
                    checked={unit === "lbs"}
                    onChange={() => setUnit("lbs")}
                    className="mr-2"
                  />
                  Pounds/Feet
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="kg"
                    checked={unit === "kg"}
                    onChange={() => setUnit("kg")}
                    className="mr-2"
                  />
                  Kilograms/Meters
                </label>
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder={unit === "lbs" ? "Feet" : "Meters"}
                  value={data.heightFeet || ""}
                  onChange={(e) =>
                    handleInputChange("heightFeet", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {unit === "lbs" && (
                  <input
                    type="number"
                    placeholder="Inches"
                    min="0"
                    max="11"
                    value={data.heightInches || ""}
                    onChange={(e) =>
                      handleInputChange("heightInches", e.target.value)
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>

            {/* Pre-pregnancy Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pre-pregnancy Weight ({unit})
              </label>
              <input
                type="number"
                value={data.prePregnancyWeight || ""}
                onChange={(e) =>
                  handleInputChange("prePregnancyWeight", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Current Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Weight ({unit})
              </label>
              <input
                type="number"
                value={data.currentWeight || ""}
                onChange={(e) =>
                  handleInputChange("currentWeight", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Current Week */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Week of Pregnancy
              </label>
              <input
                type="number"
                min="1"
                max="42"
                value={data.currentWeek || ""}
                onChange={(e) =>
                  handleInputChange("currentWeek", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Weight Gain Assessment
          </h3>

          <div className="space-y-4">
            {/* BMI Information */}
            <div className="p-4 bg-gray-50 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-2">
                Pre-pregnancy BMI
              </h4>
              <p className="text-2xl font-bold text-blue-600">
                {bmi.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 capitalize">
                Category: {bmiCategory.replace("_", " ")}
              </p>
            </div>

            {/* Recommended Total Weight Gain */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">
                Recommended Total Weight Gain
              </h4>
              <p className="text-xl font-bold text-blue-600">
                {recommendedGain.total} {unit}
              </p>
            </div>

            {/* Current Status */}
            <div className={`p-4 rounded-lg border ${status.bgColor}`}>
              <h4 className={`font-semibold mb-2 ${status.color}`}>
                Current Weight Gain Status
              </h4>
              <p className="text-lg font-bold">
                Gained: {currentGain.toFixed(1)} {unit}
              </p>
              <p className="text-sm">
                Expected range for week {data.currentWeek}:{" "}
                {expectedGain.min.toFixed(1)}-{expectedGain.max.toFixed(1)}{" "}
                {unit}
              </p>

              {status.status === "below" && (
                <p className="text-sm mt-2 text-yellow-700">
                  Consider discussing with your healthcare provider about
                  increasing caloric intake.
                </p>
              )}
              {status.status === "above" && (
                <p className="text-sm mt-2 text-red-700">
                  Consider discussing with your healthcare provider about
                  managing weight gain.
                </p>
              )}
              {status.status === "normal" && (
                <p className="text-sm mt-2 text-green-700">
                  Your weight gain is within the recommended range!
                </p>
              )}
            </div>

            {/* Weekly Target */}
            {data.currentWeek > 12 && (
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">
                  Weekly Target (2nd & 3rd Trimester)
                </h4>
                <p className="text-sm text-purple-700">
                  {bmiCategory === "underweight" && "1.0 lb (0.45 kg) per week"}
                  {bmiCategory === "normal" && "1.0 lb (0.45 kg) per week"}
                  {bmiCategory === "overweight" && "0.6 lb (0.27 kg) per week"}
                  {bmiCategory === "obese" && "0.5 lb (0.23 kg) per week"}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800">
              <strong>Disclaimer:</strong> This calculator provides general
              guidelines based on IOM recommendations. Always consult with your
              healthcare provider for personalized advice regarding weight gain
              during pregnancy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

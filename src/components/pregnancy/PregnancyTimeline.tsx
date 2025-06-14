"use client";

import { PregnancyResults } from "@/types/pregnancy";
import { format } from "date-fns";

interface PregnancyTimelineProps {
  results: PregnancyResults;
}

export default function PregnancyTimeline({ results }: PregnancyTimelineProps) {
  const today = new Date();

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case "development":
        return "👶";
      case "appointment":
        return "🏥";
      case "test":
        return "🩺";
      case "preparation":
        return "📋";
      default:
        return "📅";
    }
  };

  const getBabySize = (week: number) => {
    // Baby size data based on gestational week (same as PregnancySummary)
    const sizeData: {
      [key: number]: {
        length: number;
        lengthCm: number;
        weight: number;
        weightGrams: number;
      };
    } = {
      8: { length: 0.6, lengthCm: 1.6, weight: 0.002, weightGrams: 1 },
      12: { length: 2.1, lengthCm: 5.4, weight: 0.03, weightGrams: 14 },
      16: { length: 4.6, lengthCm: 11.6, weight: 0.22, weightGrams: 100 },
      20: { length: 6.5, lengthCm: 16.4, weight: 0.66, weightGrams: 300 },
      24: { length: 11.8, lengthCm: 30.0, weight: 1.32, weightGrams: 600 },
      28: { length: 14.8, lengthCm: 37.6, weight: 2.2, weightGrams: 1000 },
      32: { length: 16.7, lengthCm: 42.4, weight: 3.75, weightGrams: 1700 },
      36: { length: 18.7, lengthCm: 47.4, weight: 5.78, weightGrams: 2622 },
      40: { length: 20.2, lengthCm: 51.2, weight: 7.63, weightGrams: 3462 },
    };

    // Fruit/object size comparisons for display
    const getSizeComparison = (week: number) => {
      if (week < 6) return "poppy seed";
      if (week < 8) return "lentil";
      if (week < 10) return "raspberry";
      if (week < 12) return "prune";
      if (week < 14) return "lime";
      if (week < 16) return "lemon";
      if (week < 18) return "avocado";
      if (week < 20) return "bell pepper";
      if (week < 22) return "banana";
      if (week < 24) return "papaya";
      if (week < 26) return "ear of corn";
      if (week < 28) return "scallion";
      if (week < 30) return "eggplant";
      if (week < 32) return "cabbage";
      if (week < 34) return "jicama";
      if (week < 36) return "cantaloupe";
      if (week < 38) return "romaine lettuce";
      if (week < 40) return "leek";
      return "watermelon";
    };

    // Find the closest week data or interpolate
    const weeks = Object.keys(sizeData)
      .map(Number)
      .sort((a, b) => a - b);

    if (week <= weeks[0])
      return { ...sizeData[weeks[0]], size: getSizeComparison(week) };
    if (week >= weeks[weeks.length - 1])
      return {
        ...sizeData[weeks[weeks.length - 1]],
        size: getSizeComparison(week),
      };

    // Find the two closest weeks for interpolation
    let lowerWeek = weeks[0];
    let upperWeek = weeks[weeks.length - 1];

    for (let i = 0; i < weeks.length - 1; i++) {
      if (week >= weeks[i] && week <= weeks[i + 1]) {
        lowerWeek = weeks[i];
        upperWeek = weeks[i + 1];
        break;
      }
    }

    // Linear interpolation
    const ratio = (week - lowerWeek) / (upperWeek - lowerWeek);
    const lowerData = sizeData[lowerWeek];
    const upperData = sizeData[upperWeek];

    const interpolatedData = {
      length: +(
        lowerData.length +
        (upperData.length - lowerData.length) * ratio
      ).toFixed(1),
      lengthCm: +(
        lowerData.lengthCm +
        (upperData.lengthCm - lowerData.lengthCm) * ratio
      ).toFixed(1),
      weight: +(
        lowerData.weight +
        (upperData.weight - lowerData.weight) * ratio
      ).toFixed(2),
      weightGrams: Math.round(
        lowerData.weightGrams +
          (upperData.weightGrams - lowerData.weightGrams) * ratio
      ),
    };

    return {
      ...interpolatedData,
      size: getSizeComparison(week),
    };
  };

  const getWeeklyInsights = (week: number) => {
    const insights = {
      4: {
        symptoms: ["Missed period", "Light spotting possible", "Fatigue"],
        development: "Neural tube formation begins",
        tips: [
          "Start prenatal vitamins",
          "Avoid alcohol and smoking",
          "Schedule first appointment",
        ],
      },
      8: {
        symptoms: [
          "Morning sickness",
          "Breast tenderness",
          "Frequent urination",
        ],
        development: "Heart starts beating, limb buds forming",
        tips: ["Eat small frequent meals", "Stay hydrated", "Rest when needed"],
      },
      12: {
        symptoms: ["Reduced nausea", "Increased energy", "Food cravings"],
        development: "All major organs formed, reflexes developing",
        tips: [
          "Consider telling family/friends",
          "Continue prenatal care",
          "Plan nutrition",
        ],
      },
      16: {
        symptoms: ["Glowing skin", "Growing belly", "Less fatigue"],
        development: "Gender may be visible, baby can hear",
        tips: [
          "Start thinking about nursery",
          "Consider maternity clothes",
          "Enjoy increased energy",
        ],
      },
      20: {
        symptoms: ["Round ligament pain", "Backache", "Leg cramps"],
        development: "Baby very active, developing sleep patterns",
        tips: [
          "Sleep on your side",
          "Gentle exercise",
          "Anatomy scan scheduled",
        ],
      },
      24: {
        symptoms: ["Shortness of breath", "Heartburn", "Swollen feet"],
        development: "Lungs developing, brain growth accelerating",
        tips: [
          "Glucose screening test",
          "Monitor fetal movements",
          "Prepare birth plan",
        ],
      },
      28: {
        symptoms: [
          "Braxton Hicks contractions",
          "Difficulty sleeping",
          "Hemorrhoids",
        ],
        development: "Eyes can open, rapid brain development",
        tips: [
          "Start childbirth classes",
          "Plan maternity leave",
          "Whooping cough vaccine",
        ],
      },
      32: {
        symptoms: [
          "Increased appetite",
          "Pelvic pressure",
          "Frequent urination returns",
        ],
        development: "Bones hardening, immune system developing",
        tips: ["Hospital tour", "Install car seat", "Pack hospital bag"],
      },
      36: {
        symptoms: [
          "Nesting instinct",
          "Braxton Hicks increase",
          "Difficulty moving",
        ],
        development: "Lungs nearly mature, baby gaining weight rapidly",
        tips: [
          "Finalize birth plan",
          "Wash baby clothes",
          "Final preparations",
        ],
      },
      40: {
        symptoms: [
          "Anxious for labor",
          "Uncomfortable",
          "Irregular contractions",
        ],
        development: "Baby fully developed and ready for birth",
        tips: [
          "Watch for labor signs",
          "Stay close to hospital",
          "Rest as much as possible",
        ],
      },
    };

    const exactWeek = insights[week as keyof typeof insights];
    if (exactWeek) return exactWeek;

    // Find closest week
    const weeks = Object.keys(insights)
      .map(Number)
      .sort((a, b) => a - b);
    const closestWeek = weeks.reduce((prev, curr) =>
      Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
    );
    return insights[closestWeek as keyof typeof insights];
  };

  const getMilestoneColor = (type: string) => {
    switch (type) {
      case "development":
        return "bg-blue-100 border-blue-300 text-blue-700";
      case "appointment":
        return "bg-green-100 border-green-300 text-green-700";
      case "test":
        return "bg-purple-100 border-purple-300 text-purple-700";
      case "preparation":
        return "bg-orange-100 border-orange-300 text-orange-700";
      default:
        return "bg-gray-100 border-gray-300 text-gray-700";
    }
  };

  const isPastMilestone = (milestoneDate: Date) => {
    return milestoneDate < today;
  };

  const isCurrentWeek = (week: number) => {
    return week === results.currentWeek;
  };

  // Sort milestones by week
  const sortedMilestones = [...results.milestones].sort(
    (a, b) => a.week - b.week
  );

  const currentWeekInsights = getWeeklyInsights(results.currentWeek);
  const currentBabySize = getBabySize(results.currentWeek);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Pregnancy Timeline
      </h3>

      {/* Current Week Spotlight */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4">
            {results.currentWeek}
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-800">
              Week {results.currentWeek} Spotlight
            </h4>
            <p className="text-gray-600">
              Your baby is the size of a {currentBabySize.size}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Baby Development */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">👶</span>
              <h5 className="font-semibold text-gray-800">Baby Development</h5>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              {currentWeekInsights.development}
            </p>
            <div className="text-xs text-blue-600 font-medium">
              Size: {currentBabySize.length}" ({currentBabySize.lengthCm} cm)
              <br />
              Weight: {currentBabySize.weight} lbs (
              {currentBabySize.weightGrams}g)
            </div>
          </div>

          {/* Your Body */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">🤱</span>
              <h5 className="font-semibold text-gray-800">Common Symptoms</h5>
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              {currentWeekInsights.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                  {symptom}
                </li>
              ))}
            </ul>
          </div>

          {/* This Week's Tips */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">💡</span>
              <h5 className="font-semibold text-gray-800">This Week's Tips</h5>
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              {currentWeekInsights.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-4">
          {sortedMilestones.map((milestone, index) => (
            <div
              key={index}
              className={`relative flex items-start space-x-4 ${
                isCurrentWeek(milestone.week) ? "transform scale-105" : ""
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`
                relative z-10 flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium flex-shrink-0
                ${
                  isPastMilestone(milestone.date)
                    ? "bg-green-500 text-white"
                    : isCurrentWeek(milestone.week)
                    ? "bg-blue-500 text-white shadow-lg ring-4 ring-blue-100"
                    : "bg-white border-2 border-gray-300 text-gray-600"
                }
              `}
              >
                {isPastMilestone(milestone.date) ? "✓" : milestone.week}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div
                  className={`
                  p-4 rounded-lg border transition-all duration-200
                  ${
                    isCurrentWeek(milestone.week)
                      ? "bg-blue-50 border-blue-200 shadow-md"
                      : isPastMilestone(milestone.date)
                      ? "bg-gray-50 border-gray-200 opacity-75"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }
                `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {getMilestoneIcon(milestone.type)}
                      </span>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-800">
                          Week {milestone.week}: {milestone.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(milestone.date, "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    {isCurrentWeek(milestone.week) && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Simplified info for development milestones */}
                  {milestone.type === "development" && (
                    <div className="mt-2 text-xs text-blue-600">
                      Baby size: {getBabySize(milestone.week).size} •{" "}
                      {getBabySize(milestone.week).length}" (
                      {getBabySize(milestone.week).lengthCm} cm) •{" "}
                      {getBabySize(milestone.week).weight} lbs (
                      {getBabySize(milestone.week).weightGrams}g)
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {sortedMilestones.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No milestones available for this pregnancy timeline.</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is BMR (Basal Metabolic Rate)?",
    answer:
      "BMR is the amount of energy expended while at rest in a neutrally temperate environment, in a post-absorptive state (meaning that the digestive system is inactive, which requires about 12 hours of fasting). It represents the minimum amount of energy needed to keep your body functioning, including breathing, circulation, cell production, nutrient processing, protein synthesis, and ion transport.",
  },
  {
    question: "How is BMR different from RMR (Resting Metabolic Rate)?",
    answer:
      "While BMR and RMR are often used interchangeably, there is a key difference. BMR measurements must meet total physiological equilibrium while RMR conditions of measurement can be altered and defined by contextual limitations. RMR is the rate at which the body burns energy in a relaxed, but not fully inactive state. BMR is typically measured under more restrictive circumstances.",
  },
  {
    question: "Which BMR formula is most accurate?",
    answer:
      "The Mifflin-St Jeor Equation is generally considered the most accurate for most people. The Katch-McArdle Formula can be more accurate for people who are leaner and know their body fat percentage, as it takes lean body mass into account. The Harris-Benedict Equation was one of the earliest but has been largely superseded by the Mifflin-St Jeor equation.",
  },
  {
    question: "What factors affect BMR?",
    answer:
      "Several factors influence BMR: Muscle Mass (more muscle = higher BMR), Age (BMR decreases with age), Genetics, Weather (cold environments raise BMR), Diet (small frequent meals can increase BMR, while starvation can reduce it by up to 30%), Pregnancy (increases BMR), and certain Supplements like caffeine.",
  },
  {
    question: "How accurate are online BMR calculators?",
    answer:
      "Online BMR calculators provide estimates based on statistical data and established formulas. A 2005 meta-analysis showed that even when controlling all factors, there's still a 26% unknown variance between people. For the most accurate measurement, consult a certified specialist or use a calorimetry device available at many health clubs and medical facilities.",
  },
  {
    question: "How do I use my BMR to determine daily calorie needs?",
    answer:
      "Your BMR is multiplied by an activity factor to determine your Total Daily Energy Expenditure (TDEE). Activity factors range from 1.2 (sedentary) to 1.9 (very active). For example, if your BMR is 1,500 calories and you're moderately active, your daily calorie needs would be approximately 1,500 × 1.55 = 2,325 calories.",
  },
  {
    question: "Can I increase my BMR?",
    answer:
      "Yes, you can influence your BMR through: Building muscle mass (muscle tissue burns more calories at rest than fat tissue), staying hydrated, eating enough protein (thermic effect of food), getting adequate sleep, and maintaining a healthy weight. Crash dieting can actually lower your BMR as your body adapts to conserve energy.",
  },
  {
    question: "Why is my BMR important for weight management?",
    answer:
      "BMR typically accounts for 60-75% of your total daily calorie expenditure. Understanding your BMR helps you determine appropriate calorie intake for weight loss, maintenance, or gain. For weight loss, you need to create a calorie deficit below your TDEE, but eating below your BMR for extended periods can slow your metabolism.",
  },
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openItems.includes(index) ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">BMR Formulas Used</h3>
        <div className="text-sm text-blue-800 space-y-3">
          <div>
            <p className="font-medium">Mifflin-St Jeor Equation:</p>
            <p>Men: BMR = 10W + 6.25H - 5A + 5</p>
            <p>Women: BMR = 10W + 6.25H - 5A - 161</p>
          </div>
          <div>
            <p className="font-medium">Revised Harris-Benedict Equation:</p>
            <p>Men: BMR = 13.397W + 4.799H - 5.677A + 88.362</p>
            <p>Women: BMR = 9.247W + 3.098H - 4.330A + 447.593</p>
          </div>
          <div>
            <p className="font-medium">Katch-McArdle Formula:</p>
            <p>BMR = 370 + 21.6(1 - F)W</p>
          </div>
          <p className="text-xs mt-2">
            Where: W = weight in kg, H = height in cm, A = age in years, F =
            body fat percentage
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How Much Should I Weigh?",
    answer:
      'Most everyone has at some point tried to lose weight, or at least known somebody who has. This is largely due to the perception of an "ideal" body weight, which is often based on what we see promoted through various media such as social media, TV, movies, magazines, etc. Although ideal body weight (IBW) today is sometimes based on perceived visual appeal, IBW was actually introduced to estimate dosages for medical use, and the formulas that calculate it are not at all related to how a person looks at a given weight.',
  },
  {
    question: "What factors affect ideal weight?",
    answer:
      "Several factors can affect ideal weight including age, gender, height, body frame size, muscle mass, bone density, and overall health. Age shouldn't be a large determinant past adolescence, but lean muscle mass decreases as people age. Gender affects weight as males generally have higher muscle mass and bone density. Height directly correlates with weight, and body frame size (small, medium, or large) can significantly impact ideal weight calculations.",
  },
  {
    question: "What are the different IBW formulas?",
    answer:
      "The main formulas are: Robinson (1983) - modification of Devine formula; Miller (1983) - another Devine modification; Devine (1974) - originally for medicinal dosages, became universal IBW determinant; Hamwi (1964) - invented for medicinal dosage purposes. All formulas use a base weight for 5 feet height with incremental weight added per inch over 5 feet.",
  },
  {
    question: "How accurate are these calculations?",
    answer:
      "IBW formulas have limitations as they only consider height and gender, not muscle mass, bone density, body composition, or individual health factors. They're designed to be applicable to a wide range of people but cannot be highly accurate for every individual. These should be used as general guidelines, not strict values to achieve.",
  },
  {
    question: "What is the healthy BMI range?",
    answer:
      "The World Health Organization (WHO) recommends a healthy BMI range of 18.5-25 for both males and females. BMI is calculated as weight in kg divided by height in meters squared. While BMI is widely used in medical fields as a quick health indicator, it also has limitations as it doesn't account for muscle mass or body composition.",
  },
  {
    question: "Are these formulas suitable for children?",
    answer:
      "No, all the adult IBW formulas are for ages 18 and older. For children and teens, refer to CDC BMI charts which show percentiles based on age. The CDC recommends children maintain a BMI between the 5th and 85th percentile for their age group.",
  },
  {
    question: "Should I try to achieve my calculated ideal weight?",
    answer:
      "Not necessarily. These calculations are references only and it's more important to focus on healthy lifestyle choices like regular exercise, eating unprocessed foods, getting enough sleep, and managing stress. You can be perfectly healthy above or below your calculated IBW. Consult healthcare professionals for personalized guidance.",
  },
  {
    question: "How do I determine my body frame size?",
    answer:
      'Body frame size is categorized as small, medium, or large based on wrist circumference relative to height. For women under 5\'2": small (<5.5"), medium (5.5"-5.75"), large (>5.75"). For women 5\'2"-5\'5": small (<6"), medium (6"-6.25"), large (>6.25"). For women over 5\'5": small (<6.25"), medium (6.25"-6.5"), large (>6.5"). For men over 5\'5": small (5.5"-6.5"), medium (6.5"-7.5"), large (>7.5").',
  },
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-2">
          Learn more about ideal weight calculations and their limitations
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {faqData.map((item, index) => (
          <div key={index} className="p-6">
            <button
              onClick={() => toggleItem(index)}
              className="flex justify-between items-center w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
            >
              <h3 className="text-lg font-semibold text-gray-800 pr-4">
                {item.question}
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
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
              <div className="mt-4 text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-50 rounded-b-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Related Calculators
        </h3>
        <div className="flex flex-wrap gap-2">
          <a
            href="/bmi"
            className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            BMI Calculator
          </a>
          <a
            href="/body-fat"
            className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            Body Fat Calculator
          </a>
          <a
            href="/calorie"
            className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            Calorie Calculator
          </a>
          <a
            href="/bmr"
            className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            BMR Calculator
          </a>
        </div>
      </div>
    </div>
  );
}

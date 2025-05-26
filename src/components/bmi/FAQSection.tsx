"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is BMI and how is it calculated?",
    answer:
      "BMI (Body Mass Index) is a measurement of a person's leanness or corpulence based on their height and weight. It's calculated by dividing weight in kilograms by height in meters squared (kg/m²). For US units, the formula is: BMI = 703 × (weight in pounds) / (height in inches)².",
  },
  {
    question: "Is BMI accurate for everyone?",
    answer:
      "BMI is a useful screening tool but has limitations. It doesn't distinguish between muscle and fat mass, so athletes with high muscle mass may have high BMIs despite being healthy. It also doesn't account for age, sex, ethnicity, or body composition differences.",
  },
  {
    question: "What is BMI Prime?",
    answer:
      "BMI Prime is the ratio of a person's BMI to the upper limit of normal BMI (25 kg/m²). A BMI Prime less than 0.74 is underweight, 0.74-1 is normal, greater than 1 is overweight, and greater than 1.2 is obese.",
  },
  {
    question: "What is the Ponderal Index?",
    answer:
      "The Ponderal Index is similar to BMI but uses the cube of height instead of the square. It's calculated as weight (kg) / height (m)³. It's more reliable for very tall or short individuals compared to BMI.",
  },
  {
    question: "What's considered a healthy BMI range?",
    answer:
      "For adults, a healthy BMI range is typically 18.5-25 kg/m². However, this can vary slightly based on factors like age, ethnicity, and individual health conditions. It's best to consult with a healthcare provider for personalized advice.",
  },
  {
    question: "How does BMI differ for children and teens?",
    answer:
      "For children and teens (ages 2-20), BMI is calculated the same way but interpreted using age and sex-specific percentiles rather than fixed ranges. The CDC provides BMI-for-age growth charts for this purpose.",
  },
  {
    question: "Can BMI predict health risks?",
    answer:
      "BMI can indicate potential health risks associated with being underweight, overweight, or obese. However, it should be used alongside other health assessments like waist circumference, blood pressure, and overall fitness level for a complete health picture.",
  },
  {
    question: "What should I do if my BMI is outside the normal range?",
    answer:
      "If your BMI is outside the normal range, consider consulting with a healthcare provider. They can assess your overall health, discuss lifestyle changes, and determine if your BMI is a concern based on your individual circumstances.",
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <span className="text-gray-500 text-xl">
                {openItems.includes(index) ? "−" : "+"}
              </span>
            </button>

            {openItems.includes(index) && (
              <div className="px-4 pb-3">
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Important Note
        </h3>
        <p className="text-blue-700 text-sm">
          This BMI calculator is for informational purposes only and should not
          replace professional medical advice. Always consult with a healthcare
          provider for personalized health assessments and recommendations.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is body fat percentage?",
    answer:
      "Body fat percentage is the proportion of your body weight that consists of fat tissue. It includes both essential fat (needed for basic physical and physiological health) and storage fat (accumulated energy reserves).",
  },
  {
    question: "How accurate is the U.S. Navy Method?",
    answer:
      "The U.S. Navy Method is considered one of the more accurate field methods for estimating body fat percentage, with an error rate of approximately ±3-4%. However, it's still an estimation and may not be as accurate as more advanced methods like DEXA scans or hydrostatic weighing.",
  },
  {
    question: "Why do men and women have different body fat ranges?",
    answer:
      "Women naturally have higher essential body fat percentages (10-13%) compared to men (2-5%) due to biological differences related to reproductive functions, hormone production, and body composition. This is why healthy body fat ranges differ between genders.",
  },
  {
    question: "What's the difference between the Navy Method and BMI Method?",
    answer:
      "The Navy Method uses body circumference measurements and is generally more accurate for estimating body fat. The BMI Method uses height, weight, and age but doesn't account for muscle mass, so it may overestimate body fat in muscular individuals and underestimate it in those with low muscle mass.",
  },
  {
    question: "How should I measure my body for accurate results?",
    answer:
      "For the most accurate measurements: measure your waist at the narrowest point (for women) or at the navel (for men), measure your neck just below the larynx, and for women, measure hips at the widest point. Take measurements without clothing and don't pull the tape too tight.",
  },
  {
    question: "What are the health risks of having too much body fat?",
    answer:
      "Excess body fat, particularly visceral fat around organs, is associated with increased risk of cardiovascular disease, type 2 diabetes, high blood pressure, sleep apnea, and certain cancers. It can also affect hormone production and overall quality of life.",
  },
  {
    question: "Can I have too little body fat?",
    answer:
      "Yes, having body fat below essential levels can be dangerous. It can lead to hormone imbalances, loss of menstrual function in women, decreased immune function, and increased risk of injury. Essential fat is necessary for basic physiological functions.",
  },
  {
    question: "How often should I measure my body fat?",
    answer:
      "For tracking progress, measuring body fat percentage monthly is usually sufficient, as changes occur gradually. Daily or weekly measurements aren't recommended as normal fluctuations in hydration and other factors can affect results.",
  },
];

export default function BodyFatFAQSection() {
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
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              <span className="text-gray-500">
                {openItems.includes(index) ? "−" : "+"}
              </span>
            </button>
            {openItems.includes(index) && (
              <div className="px-4 pb-3 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

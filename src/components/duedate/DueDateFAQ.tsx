"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How accurate are due date calculations?",
    answer:
      "Due date calculations provide an estimate, with only about 4% of babies born on their exact due date. Most babies are born within 2 weeks before or after the estimated due date. The calculation assumes a 280-day (40-week) pregnancy from the last menstrual period.",
  },
  {
    question: "What's the difference between gestational age and fetal age?",
    answer:
      "Gestational age is calculated from the first day of your last menstrual period (LMP) and is about 2 weeks longer than fetal age. Fetal age (or conceptional age) is calculated from the actual conception date. Medical professionals typically use gestational age.",
  },
  {
    question: "When is ultrasound dating most accurate?",
    answer:
      "Ultrasound dating is most accurate in the first trimester, particularly between 8-13 weeks. Early ultrasounds can predict due dates within 3-5 days. Later in pregnancy, ultrasounds become less accurate for dating due to individual variations in fetal growth.",
  },
  {
    question: "What does 'full-term' mean?",
    answer:
      "Full-term pregnancy is now defined as 37-42 weeks. Babies born between 37-39 weeks are 'early term,' 39-41 weeks are 'full term,' and 41-42 weeks are 'late term.' Babies born before 37 weeks are considered preterm, and after 42 weeks are post-term.",
  },
  {
    question: "How is IVF due date calculation different?",
    answer:
      "IVF due dates can be calculated more precisely because the exact fertilization and transfer dates are known. The calculation depends on the embryo age at transfer: for a 3-day embryo, subtract 17 days from transfer date to get LMP; for a 5-day embryo, subtract 19 days.",
  },
  {
    question: "What if my cycles are irregular?",
    answer:
      "If you have irregular cycles, due date calculation based on LMP may be less accurate. In these cases, early ultrasound dating or conception date (if known) may provide a more reliable estimate. Discuss with your healthcare provider for the best approach.",
  },
  {
    question: "When do the trimesters begin and end?",
    answer:
      "The first trimester is weeks 1-13, second trimester is weeks 14-27, and third trimester is weeks 28-40 (or until delivery). These divisions help track fetal development and maternal changes throughout pregnancy.",
  },
  {
    question: "What is the significance of viability at 24 weeks?",
    answer:
      "24 weeks is considered the threshold of viability, meaning babies born at this gestational age have a reasonable chance of survival with intensive medical care. However, outcomes improve significantly with each additional week of pregnancy.",
  },
];

export default function DueDateFAQ() {
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
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  openItems.includes(index) ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Important Note</h3>
        <p className="text-blue-800 text-sm">
          This calculator provides estimates for educational purposes only.
          Always consult with your healthcare provider for personalized medical
          advice and accurate pregnancy dating. Your doctor may adjust your due
          date based on ultrasound measurements and other clinical factors.
        </p>
      </div>
    </div>
  );
}

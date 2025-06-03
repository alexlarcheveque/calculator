"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How accurate is the pregnancy calculator?",
    answer:
      "The pregnancy calculator provides estimates based on standard pregnancy calculations. Due dates are estimates, and only about 4% of babies are born on their exact due date. Most babies are born within two weeks of the estimated due date.",
  },
  {
    question: "What is the difference between gestational age and fetal age?",
    answer:
      "Gestational age is calculated from the first day of your last menstrual period (LMP) and is the standard used by healthcare providers. Fetal age (also called embryonic age) is calculated from conception, which typically occurs about 2 weeks after LMP.",
  },
  {
    question: "How is the due date calculated?",
    answer:
      "The due date is typically calculated as 280 days (40 weeks) from the first day of your last menstrual period. This is based on Naegele's rule, which assumes a 28-day menstrual cycle with ovulation occurring on day 14.",
  },
  {
    question: "What are the three trimesters of pregnancy?",
    answer:
      "The first trimester is weeks 1-12, the second trimester is weeks 13-26, and the third trimester is weeks 27-40. Each trimester brings different developmental milestones and physical changes.",
  },
  {
    question: "When should I have my first prenatal appointment?",
    answer:
      "Most healthcare providers recommend scheduling your first prenatal appointment between 8-10 weeks of pregnancy. However, if you have any medical conditions or concerns, you may need to be seen earlier.",
  },
  {
    question: "How accurate are ultrasound dating scans?",
    answer:
      "Ultrasound dating is most accurate in the first trimester, typically within 3-5 days. As pregnancy progresses, the accuracy decreases. First trimester ultrasounds are often used to adjust due dates if they differ significantly from LMP calculations.",
  },
  {
    question: "What is IVF transfer date calculation?",
    answer:
      "For IVF pregnancies, the transfer date and embryo age are used to calculate the due date. A day 3 embryo transfer is equivalent to 17 days after LMP, while a day 5 transfer is equivalent to 19 days after LMP.",
  },
  {
    question: "Can my due date change?",
    answer:
      "Yes, your due date may be adjusted based on ultrasound measurements, especially if there's a significant difference between the LMP-based date and ultrasound dating. First trimester ultrasounds are considered the most accurate for dating.",
  },
  {
    question: "What if I don't remember my last menstrual period?",
    answer:
      "If you don't remember your LMP, your healthcare provider can estimate your due date using ultrasound measurements. Early ultrasounds (before 20 weeks) are most accurate for determining gestational age.",
  },
  {
    question: "When is a baby considered full-term?",
    answer:
      "A baby is considered full-term between 37-42 weeks of pregnancy. Babies born before 37 weeks are considered preterm, while those born after 42 weeks are considered post-term.",
  },
];

export default function PregnancyFAQSection() {
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
        {faqData.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <span className="ml-6 flex-shrink-0">
                {openItems.includes(index) ? (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500"
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
                )}
              </span>
            </button>
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Important Note
        </h3>
        <p className="text-blue-800 text-sm">
          This calculator provides estimates for educational purposes only.
          Always consult with your healthcare provider for personalized medical
          advice and accurate pregnancy dating. Every pregnancy is unique, and
          individual circumstances may affect timing and development.
        </p>
      </div>
    </div>
  );
}

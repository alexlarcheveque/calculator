"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is compound interest?",
    answer:
      "Compound interest is interest earned on both the principal and on the accumulated interest. Unlike simple interest, which is calculated only on the principal amount, compound interest allows your money to grow exponentially over time as interest earns interest.",
  },
  {
    question: "How does compounding frequency affect my returns?",
    answer:
      "The more frequently interest compounds, the more you earn. For example, daily compounding will yield slightly more than monthly compounding, which yields more than annual compounding. However, the difference becomes marginal at higher frequencies.",
  },
  {
    question: "What is the difference between APR and APY?",
    answer:
      "APR (Annual Percentage Rate) is the simple annual rate without compounding effects. APY (Annual Percentage Yield) includes the effects of compounding and represents the true annual return. APY is always higher than or equal to APR.",
  },
  {
    question: "What is continuous compounding?",
    answer:
      "Continuous compounding is the mathematical limit of compounding frequency. It assumes interest is compounded an infinite number of times per year. While theoretical, it provides the maximum possible return for a given interest rate.",
  },
  {
    question: "How do I use the Rule of 72?",
    answer:
      "The Rule of 72 is a quick way to estimate how long it takes for an investment to double. Simply divide 72 by the annual interest rate. For example, at 6% interest, it takes approximately 72 ÷ 6 = 12 years to double your money.",
  },
  {
    question:
      "Why is compound interest called the 'eighth wonder of the world'?",
    answer:
      "Albert Einstein allegedly called compound interest the 'eighth wonder of the world' because of its powerful wealth-building potential over time. The exponential growth effect means that starting early and being patient can lead to dramatic wealth accumulation.",
  },
  {
    question: "How does compound interest work against debt?",
    answer:
      "Just as compound interest helps investments grow, it works against you with debt. Credit card debt, for example, compounds monthly, meaning you pay interest on interest if you don't pay off the full balance. This is why paying off high-interest debt should be a priority.",
  },
  {
    question:
      "What's the difference between nominal and effective interest rates?",
    answer:
      "The nominal rate is the stated annual rate without considering compounding effects. The effective rate (APY) accounts for compounding and represents the true annual return. Our calculator converts between these different rate expressions.",
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-gray-800">{item.question}</span>
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
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          Related Calculators
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <a
            href="/interest"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Interest Calculator
          </a>
          <a
            href="/investment"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Investment Calculator
          </a>
          <a
            href="/retirement"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Retirement Calculator
          </a>
          <a
            href="/mortgage"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Mortgage Calculator
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is amortization?",
    answer:
      "Amortization is the process of paying off a loan through regular monthly payments over a set period of time. Each payment includes both principal (the amount borrowed) and interest. Early in the loan term, more of each payment goes toward interest, while later payments apply more toward the principal balance.",
  },
  {
    question: "How is the monthly payment calculated?",
    answer:
      "The monthly payment is calculated using the loan amount, interest rate, and loan term. The formula ensures that if you make the same payment each month, the loan will be completely paid off by the end of the term. The calculation uses compound interest to determine the exact payment amount needed.",
  },
  {
    question: "Why do early payments have more interest?",
    answer:
      "Interest is calculated on the remaining loan balance. Since the balance is highest at the beginning of the loan, the interest portion of early payments is larger. As you pay down the principal over time, the interest portion decreases and the principal portion increases.",
  },
  {
    question: "What are extra payments and how do they help?",
    answer:
      "Extra payments are additional amounts you pay toward the principal balance beyond your required monthly payment. These payments directly reduce the loan balance, which means less interest accrues over time. This can significantly reduce the total interest paid and shorten the loan term.",
  },
  {
    question: "When should I make extra payments?",
    answer:
      "Extra payments are most effective early in the loan term when the principal balance is highest. However, they can be beneficial at any time. Consider making extra payments when you have surplus income, receive bonuses, or want to pay off the loan faster.",
  },
  {
    question: "What's the difference between loan term in years vs. months?",
    answer:
      "Most loans are quoted in years (like 15-year or 30-year mortgages), but you can also specify additional months. For example, a 15-year 6-month loan would be 15 years and 6 months total. This gives you more precise control over your loan term.",
  },
  {
    question: "How accurate are these calculations?",
    answer:
      "These calculations are mathematically accurate based on the standard amortization formula used by most lenders. However, actual loan terms may include additional fees, insurance, or other costs not reflected in this basic calculation. Always consult with your lender for exact payment amounts.",
  },
  {
    question: "Can I use this for any type of loan?",
    answer:
      "This calculator works for any fixed-rate, fully amortizing loan including mortgages, auto loans, personal loans, and student loans. It does not work for interest-only loans, adjustable-rate loans, or credit cards with revolving balances.",
  },
];

export default function AmortizationFAQ() {
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
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <span className="text-gray-500 text-xl">
                {openItems.includes(index) ? "−" : "+"}
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

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">
          Related Calculators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <a
            href="/mortgage"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Mortgage Calculator
          </a>
          <span className="text-gray-500">More calculators coming soon...</span>
        </div>
      </div>
    </div>
  );
}

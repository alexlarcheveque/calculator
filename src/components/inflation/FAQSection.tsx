"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is inflation and how does it affect purchasing power?",
    answer:
      "Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power. When inflation occurs, each unit of currency buys fewer goods and services than it did before. For example, if inflation is 3% per year, something that costs $100 today would cost $103 next year.",
  },
  {
    question: "What is the Consumer Price Index (CPI)?",
    answer:
      "The Consumer Price Index (CPI) is a measure that examines the weighted average of prices of a basket of consumer goods and services, such as transportation, food, and medical care. It's calculated by taking price changes for each item in the predetermined basket and averaging them. The CPI is one of the most frequently used statistics for identifying periods of inflation or deflation.",
  },
  {
    question: "How accurate are the CPI-based calculations?",
    answer:
      "CPI-based calculations use official U.S. Bureau of Labor Statistics data and provide a good approximation of historical inflation. However, individual experiences may vary based on spending patterns, geographic location, and the specific goods and services purchased. The CPI represents an average across all urban consumers.",
  },
  {
    question: "What's the difference between the three calculator types?",
    answer:
      "The CPI Data Calculator uses historical government data for precise calculations between specific dates. The Forward Rate Calculator projects future values using a constant inflation rate. The Backward Rate Calculator estimates what past purchasing power would be worth today, also using a constant rate.",
  },
  {
    question: "What is a typical inflation rate?",
    answer:
      "Historically, the U.S. has experienced an average annual inflation rate of around 2-3%. The Federal Reserve targets a 2% inflation rate as optimal for economic growth. However, inflation can vary significantly during different economic periods, ranging from negative (deflation) to double digits during periods of economic instability.",
  },
  {
    question: "How can I protect my money from inflation?",
    answer:
      "Common strategies include investing in assets that typically outpace inflation such as stocks, real estate, or Treasury Inflation-Protected Securities (TIPS). Diversifying investments, considering commodities, and maintaining some exposure to international markets can also help. However, all investments carry risk and it's important to consult with financial professionals.",
  },
  {
    question: "Why do the forward and backward calculators use flat rates?",
    answer:
      "Flat rate calculators are useful for theoretical scenarios and planning purposes. They allow you to model 'what if' situations using assumed constant inflation rates. While real inflation varies year to year, using a flat rate helps in financial planning and understanding the general impact of inflation over time.",
  },
  {
    question: "How often is CPI data updated?",
    answer:
      "The Bureau of Labor Statistics releases CPI data monthly, typically around the middle of the following month. This calculator includes data through the most recent available period. For the most current official data, visit the BLS website at bls.gov/cpi.",
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
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">
          Related Calculators
        </h3>
        <div className="flex flex-wrap gap-2">
          <a
            href="/investment"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Investment Calculator
          </a>
          <span className="text-gray-400">|</span>
          <a
            href="/loan"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Loan Calculator
          </a>
          <span className="text-gray-400">|</span>
          <a
            href="/retirement"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Retirement Calculator
          </a>
        </div>
      </div>
    </div>
  );
}

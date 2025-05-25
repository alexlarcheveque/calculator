import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How much should I save for retirement?",
    answer:
      "Financial experts generally recommend saving 10-15% of your pre-tax income for retirement. However, the exact amount depends on your lifestyle goals, expected retirement age, and other income sources like Social Security or pensions. Use our retirement calculator to get a personalized estimate based on your specific situation.",
  },
  {
    question: "What is the 4% rule for retirement withdrawals?",
    answer:
      "The 4% rule suggests that you can safely withdraw 4% of your retirement savings in the first year of retirement, then adjust that amount for inflation each subsequent year. This rule is based on historical market data and is designed to make your money last 30 years. However, market conditions and personal circumstances may require adjusting this percentage.",
  },
  {
    question: "When should I start saving for retirement?",
    answer:
      "The best time to start saving for retirement is as early as possible. Thanks to compound interest, money saved in your 20s and 30s will grow significantly more than money saved later in life. Even if you can only save small amounts initially, starting early gives your investments more time to grow.",
  },
  {
    question: "What's the difference between a 401(k) and an IRA?",
    answer:
      "A 401(k) is an employer-sponsored retirement plan that often includes employer matching contributions. Contribution limits are higher ($23,000 in 2024). An IRA (Individual Retirement Account) is opened independently and has lower contribution limits ($7,000 in 2024). Both offer tax advantages, and you can contribute to both if eligible.",
  },
  {
    question: "How does inflation affect retirement planning?",
    answer:
      "Inflation reduces the purchasing power of your money over time. What costs $100 today might cost $180 in 20 years with 3% inflation. This is why it's important to account for inflation in retirement planning and consider investments that historically outpace inflation, like stocks and real estate.",
  },
  {
    question: "Should I pay off debt or save for retirement first?",
    answer:
      "Generally, you should contribute enough to your 401(k) to get the full employer match (if available), then focus on high-interest debt. After eliminating high-interest debt, prioritize retirement savings. Low-interest debt (like mortgages) can often be maintained while simultaneously saving for retirement.",
  },
  {
    question: "What investment return should I expect for retirement planning?",
    answer:
      "Historical stock market returns average around 10% annually, but a conservative planning assumption is 6-7% to account for inflation and market volatility. As you approach retirement, you may want to shift to more conservative investments with lower expected returns but less risk.",
  },
  {
    question: "How much will Social Security provide in retirement?",
    answer:
      "Social Security replaces about 40% of pre-retirement income for average earners. The exact amount depends on your earnings history and the age when you claim benefits. You can claim as early as 62 (with reduced benefits) or delay until 70 (for increased benefits). Check your Social Security statement for personalized estimates.",
  },
];

export default function RetirementFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Frequently Asked Questions About Retirement Planning
      </h2>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-200"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
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
              </div>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Disclaimer:</strong> These calculators are for educational
          purposes only and should not be considered as professional financial
          advice. Please consult with a qualified financial advisor for
          personalized retirement planning guidance.
        </p>
      </div>
    </div>
  );
}

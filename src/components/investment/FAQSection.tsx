import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is compound interest and how does it work?",
    answer:
      "Compound interest is the interest calculated on the initial principal and also on the accumulated interest from previous periods. This means your money grows exponentially over time, as you earn interest on both your original investment and the interest that has already been added to your account. The frequency of compounding (daily, monthly, quarterly, annually) affects how quickly your investment grows.",
  },
  {
    question: "How often should I make additional contributions?",
    answer:
      "The frequency of contributions depends on your financial situation and goals. Monthly contributions are often preferred as they align with most people's income schedules and help with dollar-cost averaging. However, annual contributions can also be effective, especially for retirement accounts with annual contribution limits. The key is consistency and starting as early as possible to maximize the power of compound interest.",
  },
  {
    question: "What's a realistic return rate for investments?",
    answer:
      "Historical stock market returns have averaged around 7-10% annually over long periods, but this varies significantly by asset class and time period. Conservative investments like bonds or CDs might return 2-5%, while stocks can be more volatile with higher potential returns. It's important to consider your risk tolerance, investment timeline, and diversification when setting return expectations. Past performance doesn't guarantee future results.",
  },
  {
    question: "Should I contribute at the beginning or end of each period?",
    answer:
      "Contributing at the beginning of each period (month or year) is generally better because your money has more time to compound. This is called an 'annuity due' versus an 'ordinary annuity.' The difference becomes more significant over longer time periods and with higher return rates. However, the most important factor is making consistent contributions regardless of timing.",
  },
  {
    question: "How does investment length affect my returns?",
    answer:
      "Time is one of the most powerful factors in investing due to compound interest. The longer your investment period, the more time your money has to grow exponentially. Even small amounts invested early can grow to substantial sums over decades. This is why starting to invest early, even with small amounts, is often more beneficial than waiting to invest larger amounts later.",
  },
  {
    question: "What types of investments can I use this calculator for?",
    answer:
      "This calculator works for any investment with a fixed or estimated return rate, including savings accounts, CDs, bonds, stock market investments, retirement accounts (401k, IRA), and more. However, it assumes a constant return rate, which may not reflect the volatility of actual market investments. For more complex investment scenarios with varying returns, consider consulting with a financial advisor.",
  },
  {
    question: "How do taxes affect my investment returns?",
    answer:
      "This calculator doesn't account for taxes, which can significantly impact your actual returns. Different types of accounts have different tax treatments: taxable accounts are subject to capital gains and dividend taxes, while tax-advantaged accounts like 401(k)s and IRAs offer tax deferrals or tax-free growth. Consider the tax implications of your investment strategy and consult with a tax professional for personalized advice.",
  },
  {
    question: "What's the difference between nominal and real returns?",
    answer:
      "Nominal returns are the actual percentage returns without adjusting for inflation, while real returns account for the purchasing power lost to inflation. For example, if your investment returns 7% but inflation is 3%, your real return is approximately 4%. When planning long-term investments, it's important to consider inflation's impact on your purchasing power over time.",
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
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
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
        <h3 className="font-semibold text-blue-900 mb-2">
          Important Disclaimer
        </h3>
        <p className="text-blue-800 text-sm">
          This calculator provides estimates based on the information you
          provide and should not be considered as financial advice. Investment
          returns are not guaranteed and actual results may vary significantly.
          Past performance does not guarantee future results. Please consult
          with a qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
}

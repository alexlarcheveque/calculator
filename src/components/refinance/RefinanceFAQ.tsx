import { useState } from "react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  id: string;
}

const faqItems: FAQItem[] = [
  {
    question: "When should I consider refinancing my loan?",
    answer: (
      <p>
        Consider refinancing when interest rates have dropped significantly
        below your current rate, when your credit score has improved, when you
        want to change your loan term, or when you need cash from your home's
        equity. Generally, if you can reduce your interest rate by 0.5-1% or
        more, refinancing may be beneficial.
      </p>
    ),
    id: "faq-1",
  },
  {
    question: "What is the break-even point in refinancing?",
    answer: (
      <p>
        The break-even point is the time it takes for your monthly savings to
        equal the total closing costs of refinancing. For example, if
        refinancing costs $3,000 and saves you $150 per month, your break-even
        point is 20 months. If you plan to stay in your home longer than the
        break-even period, refinancing typically makes financial sense.
      </p>
    ),
    id: "faq-2",
  },
  {
    question: "What is cash-out refinancing?",
    answer: (
      <p>
        Cash-out refinancing allows you to refinance for more than you currently
        owe and receive the difference in cash. This lets you tap into your
        home's equity for major expenses like home improvements, debt
        consolidation, or investments. Keep in mind that this increases your
        loan balance and monthly payments.
      </p>
    ),
    id: "faq-3",
  },
  {
    question: "What are mortgage points and should I pay them?",
    answer: (
      <p>
        Mortgage points (also called discount points) are fees paid upfront to
        reduce your interest rate. Each point typically costs 1% of your loan
        amount and reduces your rate by about 0.25%. Points can be beneficial if
        you plan to stay in your home long enough to recoup the upfront cost
        through lower monthly payments.
      </p>
    ),
    id: "faq-4",
  },
  {
    question: "How much does refinancing typically cost?",
    answer: (
      <p>
        Refinancing costs typically range from 2-5% of your loan amount. Common
        fees include application fees, appraisal fees, origination fees, title
        insurance, and recording fees. Some lenders offer "no-cost" refinancing,
        but they typically roll the costs into your loan amount or charge a
        higher interest rate.
      </p>
    ),
    id: "faq-5",
  },
  {
    question: "Can I refinance if I have an FHA or VA loan?",
    answer: (
      <p>
        Yes, you can refinance government-backed loans. FHA loans offer
        streamline refinancing options that require minimal documentation. VA
        loans have Interest Rate Reduction Refinance Loans (IRRRL) for easier
        refinancing. You can also refinance from an FHA or VA loan to a
        conventional loan if you have sufficient equity.
      </p>
    ),
    id: "faq-6",
  },
  {
    question: "How does my credit score affect refinancing?",
    answer: (
      <p>
        Your credit score significantly impacts the interest rates you'll
        qualify for when refinancing. Generally, scores of 740+ get the best
        rates, while scores below 620 may face challenges. If your credit has
        improved since your original loan, you may qualify for better terms.
        Check your credit report before applying and consider improving your
        score if needed.
      </p>
    ),
    id: "faq-7",
  },
  {
    question: "Should I refinance to a shorter or longer term?",
    answer: (
      <p>
        Refinancing to a shorter term (like 15 years) typically offers lower
        interest rates and saves money long-term, but increases monthly
        payments. Extending to a longer term reduces monthly payments but
        increases total interest paid. Choose based on your financial goals:
        shorter terms for savings, longer terms for cash flow relief.
      </p>
    ),
    id: "faq-8",
  },
];

export default function RefinanceFAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg">
            <button
              className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={() => toggleItem(item.id)}
              aria-expanded={openItems.includes(item.id)}
              aria-controls={`content-${item.id}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800 pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      openItems.includes(item.id) ? "rotate-180" : ""
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
                </div>
              </div>
            </button>

            {openItems.includes(item.id) && (
              <div id={`content-${item.id}`} className="px-4 pb-4">
                <div className="text-gray-700 text-sm leading-relaxed">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

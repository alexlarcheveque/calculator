import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Interest Rate?",
    answer:
      "Interest rate is the amount charged by lenders to borrowers for the use of money, expressed as a percentage of the principal, or original amount borrowed. It can also be described as the cost to borrow money. For instance, an 8% interest rate for borrowing $100 a year will obligate a person to pay $108 at year-end.",
  },
  {
    question: "How does this calculator work?",
    answer:
      "This calculator uses the Newton-Raphson method to determine the interest rate when you know the loan amount, term, and monthly payment. It's particularly useful when car dealers or lenders only provide monthly payment information without disclosing the actual interest rate.",
  },
  {
    question: "What's the difference between simple and compound interest?",
    answer:
      "Simple interest is calculated as a percentage of principal only, while compound interest is calculated as a percentage of the principal along with any accrued interest. Most formal interest payment calculations today are compounded, including those for this calculator.",
  },
  {
    question: "What is APR and how is it different from interest rate?",
    answer:
      "APR (Annual Percentage Rate) includes the interest rate plus additional fees and costs associated with the loan. APR provides a more accurate representation of the total cost of borrowing when shopping and comparing similar loans.",
  },
  {
    question: "What factors affect interest rates?",
    answer:
      "Interest rates are affected by both controllable and uncontrollable factors. Uncontrollable factors include economic policy, inflation, economic activity, and unemployment rates. Controllable factors include your credit score, loan term, down payment amount, and the type of loan (secured vs. unsecured).",
  },
  {
    question: "How can I get better interest rates?",
    answer:
      "To receive better interest rates: maintain a good credit score, consider secured loans with collateral, choose shorter loan terms, make larger down payments, avoid applying for credit too frequently, shop around with different lenders, and borrow during favorable economic conditions.",
  },
  {
    question:
      "What is the difference between fixed and variable interest rates?",
    answer:
      "Fixed rates remain the same percentage for the life of the loan and will not change. Variable rates can fluctuate over time based on factors such as market indices, inflation, or other economic indicators. This calculator displays results as fixed interest rates.",
  },
  {
    question: "Why might my calculated rate differ from what I was quoted?",
    answer:
      "The calculated rate might differ from quoted rates due to additional fees, promotional rates, compound vs. simple interest calculations, or different calculation methods. Always verify the terms and ask for clarification on any discrepancies.",
  },
];

export default function FAQSection() {
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  openItems.includes(index) ? "rotate-180" : ""
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
            </button>

            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Related Calculators */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Related Calculators
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <a
            href="/mortgage"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Mortgage Calculator
          </a>
          <a href="/loan" className="text-blue-600 hover:text-blue-800 text-sm">
            Loan Calculator
          </a>
          <a
            href="/auto-loan"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Auto Loan Calculator
          </a>
          <a
            href="/compound-interest"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Compound Interest
          </a>
          <a href="/apr" className="text-blue-600 hover:text-blue-800 text-sm">
            APR Calculator
          </a>
          <a
            href="/payment"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Payment Calculator
          </a>
          <a
            href="/investment"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Investment Calculator
          </a>
          <a
            href="/refinance"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Refinance Calculator
          </a>
        </div>
      </div>
    </div>
  );
}

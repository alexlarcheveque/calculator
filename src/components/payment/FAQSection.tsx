import { useState } from "react";
import Script from "next/script";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  id: string;
}

const faqItems: FAQItem[] = [
  {
    question:
      "What's the difference between Fixed Term and Fixed Payment modes?",
    answer: (
      <p>
        Fixed Term mode calculates your monthly payment amount based on a
        specific loan term (e.g., 15 years). Fixed Payment mode calculates how
        long it will take to pay off your loan with a specific monthly payment
        amount. Use Fixed Term when you want to know your monthly payment for a
        certain time period, and use Fixed Payment when you want to know how
        quickly you can pay off debt with a specific payment amount.
      </p>
    ),
    id: "payment-faq-1",
  },
  {
    question: "How do I choose between a shorter or longer loan term?",
    answer: (
      <p>
        Shorter loan terms (like 15 years) typically have higher monthly
        payments but lower total interest costs. Longer loan terms (like 30
        years) have lower monthly payments but higher total interest costs.
        Choose a shorter term if you can afford higher monthly payments and want
        to save on interest. Choose a longer term if you need lower monthly
        payments to fit your budget.
      </p>
    ),
    id: "payment-faq-2",
  },
  {
    question: "What happens if my monthly payment is too low?",
    answer: (
      <p>
        If your monthly payment is too low (less than the monthly interest),
        your loan balance will actually grow over time instead of decreasing.
        This is called negative amortization. The calculator will show an error
        if your payment is insufficient to cover the interest, ensuring your
        loan will be paid off eventually.
      </p>
    ),
    id: "payment-faq-3",
  },
  {
    question: "How does the interest rate affect my payments?",
    answer: (
      <p>
        Higher interest rates significantly increase both your monthly payment
        (in Fixed Term mode) and the time needed to pay off your loan (in Fixed
        Payment mode). Even a small increase in interest rate can result in
        thousands of dollars more in total interest over the life of the loan.
        Shop around for the best rates and consider improving your credit score
        to qualify for lower rates.
      </p>
    ),
    id: "payment-faq-4",
  },
  {
    question: "Should I make extra payments on my loan?",
    answer: (
      <p>
        Making extra payments can significantly reduce your total interest costs
        and shorten your loan term. Even an extra $50-100 per month can save
        thousands in interest. However, consider your other financial priorities
        first - if you have high-interest debt (like credit cards) or lack an
        emergency fund, address those first before making extra loan payments.
      </p>
    ),
    id: "payment-faq-5",
  },
  {
    question: "What is an amortization schedule?",
    answer: (
      <p>
        An amortization schedule shows how your loan balance decreases over time
        with each payment. Early payments consist mostly of interest with little
        principal reduction. As the loan progresses, more of each payment goes
        toward principal and less toward interest. This is why making extra
        payments early in the loan term has the greatest impact on total
        interest savings.
      </p>
    ),
    id: "payment-faq-6",
  },
  {
    question: "Can I use this calculator for any type of loan?",
    answer: (
      <p>
        This calculator works for any fixed-rate loan with regular monthly
        payments, including mortgages, auto loans, personal loans, and student
        loans. It assumes equal monthly payments throughout the loan term. For
        loans with variable interest rates, graduated payments, or other special
        terms, the results may not be accurate.
      </p>
    ),
    id: "payment-faq-7",
  },
  {
    question: "How accurate are these calculations?",
    answer: (
      <p>
        The calculations use standard loan formulas and provide accurate results
        for the inputs you provide. However, actual loan terms may include
        additional fees, insurance, or other costs not reflected in this basic
        calculation. Always consult with your lender for exact payment amounts
        and terms before making financial decisions.
      </p>
    ),
    id: "payment-faq-8",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Create the FAQ schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          typeof item.answer === "string"
            ? item.answer
            : (item.answer as any).props.children,
      },
    })),
  };

  return (
    <section className="mt-16">
      <Script id="payment-faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto">
        {faqItems.map((item, index) => (
          <div
            key={item.id}
            className="border-b border-gray-200 last:border-b-0"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full py-4 px-2 text-left focus:outline-none"
              aria-expanded={openIndex === index}
              aria-controls={item.id}
            >
              <span className="text-lg font-medium text-gray-900">
                {item.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id={item.id}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96 pb-4" : "max-h-0"
              }`}
            >
              <div className="px-2 text-gray-600">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

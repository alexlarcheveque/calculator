import { useState } from 'react';
import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  id: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How is the monthly mortgage payment calculated?",
    answer: (
      <p>
        Your monthly mortgage payment consists of principal and interest payments, plus potential 
        property taxes, homeowner's insurance, and homeowner's association (HOA) fees. The principal 
        and interest are calculated using the loan amount, interest rate, and loan term using the formula: 
        M = P[r(1+r)^n]/[(1+r)^n-1], where P is the principal, r is the monthly interest rate, and n is 
        the total number of payments.
      </p>
    ),
    id: "faq-1"
  },
  {
    question: "How much down payment should I make?",
    answer: (
      <p>
        The traditional down payment is 20% of the home's purchase price, which allows you to avoid 
        private mortgage insurance (PMI). However, many loan programs accept lower down payments, 
        sometimes as low as 3-5%. Keep in mind that a lower down payment means a larger loan amount 
        and potentially higher monthly payments and overall interest costs.
      </p>
    ),
    id: "faq-2"
  },
  {
    question: "What's the difference between a 15-year and 30-year mortgage?",
    answer: (
      <p>
        A 15-year mortgage typically has higher monthly payments but lower interest rates than a 30-year 
        mortgage. With a 15-year mortgage, you'll pay less interest over the life of the loan and build 
        equity faster. A 30-year mortgage offers lower monthly payments, making it more affordable month 
        to month, but you'll pay more in interest over time and build equity more slowly.
      </p>
    ),
    id: "faq-3"
  },
  {
    question: "What factors affect my mortgage interest rate?",
    answer: (
      <p>
        Several factors can influence your mortgage interest rate, including your credit score, loan 
        amount, down payment, loan term, loan type (conventional, FHA, VA, etc.), property location, 
        and current market conditions. Generally, a higher credit score, larger down payment, and 
        shorter loan term will help you secure a lower interest rate.
      </p>
    ),
    id: "faq-4"
  },
  {
    question: "What are property taxes and how are they calculated?",
    answer: (
      <p>
        Property taxes are imposed by local governments and are calculated based on the assessed value 
        of your property. The tax rate varies by location and is expressed as a percentage of the 
        property's assessed value. Property taxes typically fund local services like schools, roads, 
        and emergency services. Many lenders collect property taxes as part of your monthly mortgage 
        payment and hold them in an escrow account until they're due.
      </p>
    ),
    id: "faq-5"
  },
  {
    question: "How accurate is this mortgage calculator?",
    answer: (
      <p>
        This calculator provides a good estimate of your monthly mortgage payment and amortization 
        schedule based on the information you provide. However, actual costs may vary based on specific 
        loan terms, local property tax rates, insurance costs, and other factors. For the most accurate 
        information, consult with a mortgage lender or financial advisor.
      </p>
    ),
    id: "faq-6"
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
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof item.answer === 'string' 
          ? item.answer 
          : (item.answer as any).props.children
      }
    }))
  };

  return (
    <section className="mt-16">
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
      
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
              <span className="text-lg font-medium text-gray-900">{item.question}</span>
              <svg 
                className={`w-5 h-5 text-gray-500 transform ${openIndex === index ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div 
              id={item.id}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
              }`}
            >
              <div className="px-2 text-gray-600">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 
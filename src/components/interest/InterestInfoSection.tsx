"use client";

import { useState } from "react";
import Script from "next/script";

interface InfoSection {
  title: string;
  content: React.ReactNode;
  id: string;
}

const interestInfoItems: InfoSection[] = [
  {
    id: "intro-interest",
    title: "What is Interest?",
    content: (
      <>
        <p className="mb-2">
          Interest is the compensation paid by a borrower to a lender for the
          use of money, expressed as a percentage or an amount. The concept of
          interest is fundamental to most financial instruments.
        </p>
        <p>
          There are two primary methods of accumulating interest: simple
          interest and compound interest. This calculator focuses on compound
          interest.
        </p>
      </>
    ),
  },
  {
    id: "simple-interest",
    title: "Simple Interest Explained",
    content: (
      <>
        <p className="mb-2">
          Simple interest is calculated only on the principal amount of a loan
          or deposit. For example, if you deposit $100 at a simple interest rate
          of 10% per year, you will earn $10 in interest each year.
        </p>
        <p className="font-mono bg-muted p-2 rounded text-sm my-2 text-center">
          Interest = Principal × Interest Rate × Term
        </p>
        <p>
          If you borrowed $100 for two years at 10% simple interest, you would
          pay $100 (principal) + $10 (year 1 interest) + $10 (year 2 interest) =
          $120.
        </p>
        <p className="mt-2">
          However, simple interest is rarely used in real-world financial
          products compared to compound interest.
        </p>
      </>
    ),
  },
  {
    id: "compound-interest",
    title: "The Power of Compound Interest",
    content: (
      <>
        <p className="mb-2">
          Compound interest is interest calculated on the initial principal,
          which also includes all of the accumulated interest from previous
          periods on a deposit or loan.
        </p>
        <p className="mb-2">
          Using the previous example: $100 borrowed for two years at 10%
          interest, compounded annually.
          <br />
          Year 1: $100 × 10% = $10 interest. New balance = $110.
          <br />
          Year 2: $110 × 10% = $11 interest. New balance = $121.
        </p>
        <p className="mb-2">
          You would owe $121, which is $1 more than with simple interest because
          interest was earned on the previously accrued interest.
        </p>
        <p>
          The more frequently interest is compounded (e.g., monthly, daily), the
          higher the interest earned on an original principal will be.
          Continuous compounding represents the mathematical limit of
          compounding frequency.
        </p>
      </>
    ),
  },
  {
    id: "rule-of-72",
    title: "The Rule of 72",
    content: (
      <>
        <p className="mb-2">
          The Rule of 72 is a quick way to estimate the number of years required
          to double your money at a given annual rate of return.
        </p>
        <p className="font-mono bg-muted p-2 rounded text-sm my-2 text-center">
          Years to Double ≈ 72 / Interest Rate
        </p>
        <p className="mb-2">
          Example: To double $1,000 at an 8% interest rate, it would take
          approximately 72 / 8 = 9 years.
        </p>
        <p>
          This rule works best for interest rates between 6% and 10% but
          provides a reasonable estimate for rates up to 20%.
        </p>
      </>
    ),
  },
  {
    id: "contributions",
    title: "Periodic Contributions",
    content: (
      <>
        <p className="mb-2">
          This calculator allows for periodic deposits (contributions), which is
          useful if you plan to save a certain amount regularly.
        </p>
        <p>
          An important factor is whether contributions occur at the beginning or
          end of each compounding period. Contributions made at the beginning of
          a period will earn interest for that period, while contributions made
          at the end will not start earning interest until the next period.
        </p>
      </>
    ),
  },
  {
    id: "tax-rate",
    title: "Impact of Tax Rate",
    content: (
      <>
        <p className="mb-2">
          Interest income from sources like bonds, savings accounts, and
          Certificates of Deposit (CDs) can be subject to taxes. In the U.S.,
          corporate bond interest is usually taxed, while some government bond
          interest might be exempt from state/local taxes but not federal.
        </p>
        <p>
          Taxes can significantly affect your net returns. For example, a 6%
          return over 20 years on $100 would yield $320.71 tax-free. However,
          with a 25% marginal tax rate applied each compounding period, the end
          balance would be lower, around $239.78.
        </p>
      </>
    ),
  },
  {
    id: "inflation-rate",
    title: "Considering Inflation",
    content: (
      <>
        <p className="mb-2">
          Inflation is the rate at which the general level of prices for goods
          and services is rising, and consequently, the purchasing power of
          currency is falling. The average inflation rate in the U.S. has
          historically been around 3% per year.
        </p>
        <p className="mb-2">
          This calculator can adjust the final balance for inflation to show its
          buying power in today's terms. For a quick estimate without this
          adjustment, you can set the inflation rate to 0.
        </p>
        <p>
          The combination of taxes and inflation can make it challenging to grow
          the real value of your money. Earning a return rate that significantly
          outpaces both is key to increasing purchasing power over time.
        </p>
      </>
    ),
  },
];

const SectionItem: React.FC<{
  item: InfoSection;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full py-4 px-1 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-sm"
      aria-expanded={isOpen}
      aria-controls={item.id}
    >
      <span className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
        {item.title}
      </span>
      <svg
        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
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
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="px-1 py-3 text-gray-600 text-sm leading-relaxed">
        {item.content}
      </div>
    </div>
  </div>
);

export default function InterestInfoSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first section by default

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const interestFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: interestInfoItems.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        // Extracting text from ReactNode for schema is non-trivial and might require
        // a different approach if rich text is needed here. For simplicity, we'll use a placeholder.
        text:
          typeof item.content === "string"
            ? item.content
            : "Detailed explanation available in the section.",
      },
    })),
  };

  return (
    <section>
      <Script
        id="interest-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(interestFAQSchema) }}
      />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Understanding Interest Calculations
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="divide-y divide-gray-200">
          {interestInfoItems.map((item, index) => (
            <SectionItem
              key={item.id}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggleSection(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

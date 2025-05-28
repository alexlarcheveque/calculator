import FAQSection, { FAQItem } from "@/components/ui/FAQSection";

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
  return (
    <FAQSection
      items={faqItems}
      title="Frequently Asked Questions"
      allowMultipleOpen={true}
      includeSchema={true}
      schemaId="refinance-faq-schema"
    />
  );
}

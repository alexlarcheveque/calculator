import FAQSection, { FAQItem } from "@/components/ui/FAQSection";

const faqItems: FAQItem[] = [
  {
    question: "How is the monthly mortgage payment calculated?",
    answer: (
      <p>
        Your monthly mortgage payment consists of principal and interest
        payments, plus potential property taxes, homeowner's insurance, and
        homeowner's association (HOA) fees. The principal and interest are
        calculated using the loan amount, interest rate, and loan term using the
        formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is the principal, r is the
        monthly interest rate, and n is the total number of payments.
      </p>
    ),
    id: "faq-1",
  },
  {
    question: "How much down payment should I make?",
    answer: (
      <p>
        The traditional down payment is 20% of the home's purchase price, which
        allows you to avoid private mortgage insurance (PMI). However, many loan
        programs accept lower down payments, sometimes as low as 3-5%. Keep in
        mind that a lower down payment means a larger loan amount and
        potentially higher monthly payments and overall interest costs.
      </p>
    ),
    id: "faq-2",
  },
  {
    question: "What's the difference between a 15-year and 30-year mortgage?",
    answer: (
      <p>
        A 15-year mortgage typically has higher monthly payments but lower
        interest rates than a 30-year mortgage. With a 15-year mortgage, you'll
        pay less interest over the life of the loan and build equity faster. A
        30-year mortgage offers lower monthly payments, making it more
        affordable month to month, but you'll pay more in interest over time and
        build equity more slowly.
      </p>
    ),
    id: "faq-3",
  },
  {
    question: "What factors affect my mortgage interest rate?",
    answer: (
      <p>
        Several factors can influence your mortgage interest rate, including
        your credit score, loan amount, down payment, loan term, loan type
        (conventional, FHA, VA, etc.), property location, and current market
        conditions. Generally, a higher credit score, larger down payment, and
        shorter loan term will help you secure a lower interest rate.
      </p>
    ),
    id: "faq-4",
  },
  {
    question: "What are property taxes and how are they calculated?",
    answer: (
      <p>
        Property taxes are imposed by local governments and are calculated based
        on the assessed value of your property. The tax rate varies by location
        and is expressed as a percentage of the property's assessed value.
        Property taxes typically fund local services like schools, roads, and
        emergency services. Many lenders collect property taxes as part of your
        monthly mortgage payment and hold them in an escrow account until
        they're due.
      </p>
    ),
    id: "faq-5",
  },
  {
    question: "How accurate is this mortgage calculator?",
    answer: (
      <p>
        This calculator provides a good estimate of your monthly mortgage
        payment and amortization schedule based on the information you provide.
        However, actual costs may vary based on specific loan terms, local
        property tax rates, insurance costs, and other factors. For the most
        accurate information, consult with a mortgage lender or financial
        advisor.
      </p>
    ),
    id: "faq-6",
  },
];

export default function MortgageFAQSection() {
  return (
    <FAQSection
      items={faqItems}
      title="Frequently Asked Questions"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="faq-schema"
      className="mt-16"
    />
  );
}

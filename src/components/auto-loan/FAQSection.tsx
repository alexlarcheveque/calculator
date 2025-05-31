import FAQSection, { FAQItem } from "../ui/FAQSection";

const autoLoanFAQItems: FAQItem[] = [
  {
    id: "what-is-auto-loan",
    question: "What is an auto loan and how does it work?",
    answer: (
      <>
        <p className="mb-2">
          An auto loan is a secured loan specifically for purchasing vehicles,
          where the car serves as collateral to protect the lender.
        </p>
        <p className="mb-2">
          <strong>How auto loans work:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Secured financing:</strong> Vehicle serves as collateral,
            enabling lower rates
          </li>
          <li>
            <strong>Fixed payments:</strong> Equal monthly payments over the
            loan term
          </li>
          <li>
            <strong>Repossession risk:</strong> Lender can seize vehicle if
            payments stop
          </li>
          <li>
            <strong>Title transfer:</strong> You own the car but lender holds
            title until paid off
          </li>
        </ul>
        <p className="text-sm">
          <strong>Common terms:</strong> 36-84 months with rates typically 3-12%
          depending on credit, vehicle age, and market conditions.
        </p>
      </>
    ),
  },
  {
    id: "how-calculate-auto-loan-payment",
    question: "How do I calculate my monthly auto loan payment?",
    answer: (
      <>
        <p className="mb-2">
          Monthly auto loan payments are calculated using the loan amount,
          interest rate, and loan term with this formula:
        </p>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-3">
          M = P × [r(1+r)^n] / [(1+r)^n-1]
        </p>
        <p className="mb-2">
          Where: M = monthly payment, P = principal (loan amount), r = monthly
          interest rate, n = number of payments
        </p>
        <p className="mb-2">
          <strong>Example: $30,000 car loan at 5% for 60 months:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Monthly payment: $566.14</li>
          <li>Total payments: $33,968.22</li>
          <li>Total interest: $3,968.22</li>
        </ul>
      </>
    ),
  },
  {
    id: "dealership-vs-bank-financing",
    question: "Should I get financing from a dealership or bank?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Bank/Credit Union financing advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Pre-approval:</strong> Know your budget before shopping
          </li>
          <li>
            <strong>Rate shopping:</strong> Compare offers from multiple lenders
          </li>
          <li>
            <strong>Negotiating power:</strong> Focus on car price, not monthly
            payments
          </li>
          <li>
            <strong>Often lower rates:</strong> Especially from credit unions
          </li>
        </ul>
        <p className="mb-2">
          <strong>Dealership financing advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Convenience:</strong> One-stop shopping for car and loan
          </li>
          <li>
            <strong>Manufacturer incentives:</strong> 0% APR promotions on new
            cars
          </li>
          <li>
            <strong>Special programs:</strong> May work with customers with poor
            credit
          </li>
          <li>
            <strong>Immediate decisions:</strong> Faster approval process
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-much-down-payment-auto-loan",
    question: "How much should I put down on an auto loan?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Recommended down payment guidelines:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>New cars:</strong> 10-20% of purchase price
          </li>
          <li>
            <strong>Used cars:</strong> 15-25% due to faster depreciation
          </li>
          <li>
            <strong>Luxury vehicles:</strong> 20%+ to offset rapid value loss
          </li>
        </ul>
        <p className="mb-2">
          <strong>Benefits of larger down payments:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Lower monthly payments and total interest costs</li>
          <li>Reduced risk of being underwater on the loan</li>
          <li>May qualify for better interest rates</li>
          <li>Lower loan-to-value ratio improves approval odds</li>
        </ul>
        <p className="text-sm">
          <strong>Important:</strong> Never deplete your emergency fund for a
          down payment. Maintain 3-6 months of expenses in savings.
        </p>
      </>
    ),
  },
  {
    id: "what-fees-car-purchase",
    question: "What fees should I expect when buying a car?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Mandatory government fees:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Sales tax:</strong> 0-10%+ depending on state (some states
            exempt)
          </li>
          <li>
            <strong>Title fees:</strong> $15-$100 for title transfer
          </li>
          <li>
            <strong>Registration:</strong> $20-$300 for license plates and
            registration
          </li>
          <li>
            <strong>Inspection fees:</strong> $10-$50 in required states
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common dealer fees:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Documentation fee:</strong> $200-$800 (negotiable in some
            states)
          </li>
          <li>
            <strong>Destination charge:</strong> $900-$1,500 (manufacturer fee)
          </li>
          <li>
            <strong>Dealer prep:</strong> Often included but sometimes listed
            separately
          </li>
        </ul>
        <p className="text-sm">
          <strong>Pro tip:</strong> You can often roll taxes and fees into your
          loan, but this increases your total interest cost.
        </p>
      </>
    ),
  },
  {
    id: "new-vs-used-car-financing",
    question: "How does financing differ for new vs. used cars?",
    answer: (
      <>
        <p className="mb-2">
          <strong>New car financing advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Lower rates:</strong> Often 1-3% lower than used car rates
          </li>
          <li>
            <strong>Longer terms:</strong> Up to 84 months available
          </li>
          <li>
            <strong>Manufacturer incentives:</strong> 0% APR promotions common
          </li>
          <li>
            <strong>Easier approval:</strong> Less risk for lenders
          </li>
        </ul>
        <p className="mb-2">
          <strong>Used car financing considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Higher rates:</strong> Typically 2-5% higher than new car
            rates
          </li>
          <li>
            <strong>Shorter terms:</strong> Usually max 60-72 months
          </li>
          <li>
            <strong>Age restrictions:</strong> Many lenders won't finance cars
            over 7-10 years old
          </li>
          <li>
            <strong>Mileage limits:</strong> High-mileage vehicles may not
            qualify
          </li>
        </ul>
        <p className="text-sm">
          <strong>Sweet spot:</strong> 2-3 year old certified pre-owned vehicles
          often offer best balance of price, rates, and warranty coverage.
        </p>
      </>
    ),
  },
  {
    id: "cash-rebate-vs-low-interest",
    question: "Should I choose a cash rebate or low-interest financing?",
    answer: (
      <>
        <p className="mb-2">
          This decision depends on the rebate amount, interest rate difference,
          and your loan term.
        </p>
        <p className="mb-2">
          <strong>Choose low-interest financing when:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            Promotional rate is 0-2% and significantly lower than market rates
          </li>
          <li>You're financing for a long term (60+ months)</li>
          <li>The rebate is small relative to the interest savings</li>
          <li>You don't have cash for a large down payment</li>
        </ul>
        <p className="mb-2">
          <strong>Choose cash rebate when:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Rebate is substantial ($2,000+ and rate difference is small)</li>
          <li>You're financing for a short term (36-48 months)</li>
          <li>You can use rebate to increase down payment</li>
          <li>Market rates are competitive with promotional rate</li>
        </ul>
        <p className="text-sm">
          <strong>Calculator tip:</strong> Use our calculator to compare total
          costs of both scenarios over your intended loan term.
        </p>
      </>
    ),
  },
  {
    id: "trade-in-vs-private-sale",
    question: "Should I trade in my car or sell it privately?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Trade-in advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Tax savings:</strong> Pay sales tax only on difference (most
            states)
          </li>
          <li>
            <strong>Convenience:</strong> Complete transaction at dealership
          </li>
          <li>
            <strong>No hassle:</strong> Avoid advertising, showing, negotiating
            with buyers
          </li>
          <li>
            <strong>Guaranteed sale:</strong> No risk of buyer financing falling
            through
          </li>
        </ul>
        <p className="mb-2">
          <strong>Private sale advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Higher value:</strong> Often $1,000-$3,000 more than
            trade-in
          </li>
          <li>
            <strong>Market price:</strong> Full fair market value for your
            vehicle
          </li>
          <li>
            <strong>Timing control:</strong> Sell when market conditions are
            favorable
          </li>
        </ul>
        <p className="text-sm">
          <strong>Break-even analysis:</strong> If private sale premium exceeds
          the tax savings from trade-in, selling privately usually makes
          financial sense.
        </p>
      </>
    ),
  },
  {
    id: "should-pay-cash-or-finance",
    question: "Should I pay cash for a car or finance it?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Consider paying cash when:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>High interest rates:</strong> Auto loan rates above 6-8%
          </li>
          <li>
            <strong>Strong emergency fund:</strong> 6+ months expenses remain
            after purchase
          </li>
          <li>
            <strong>Debt-free goal:</strong> Want to avoid all monthly payments
          </li>
          <li>
            <strong>Older vehicle:</strong> Used cars that may not qualify for
            good rates
          </li>
        </ul>
        <p className="mb-2">
          <strong>Consider financing when:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Low promotional rates:</strong> 0-3% financing available
          </li>
          <li>
            <strong>Investment opportunities:</strong> Can earn more than loan
            rate elsewhere
          </li>
          <li>
            <strong>Cash preservation:</strong> Keep money for emergencies or
            opportunities
          </li>
          <li>
            <strong>Credit building:</strong> Establish or improve credit
            history
          </li>
        </ul>
        <p className="text-sm">
          <strong>Rule of thumb:</strong> If you can invest cash at higher
          return than loan rate, financing often makes sense.
        </p>
      </>
    ),
  },
  {
    id: "auto-loan-early-payoff",
    question: "Should I pay off my auto loan early?",
    answer: (
      <>
        <p className="mb-2">
          Early payoff can save significant interest, but consider these factors
          first:
        </p>
        <p className="mb-2">
          <strong>Pay off early when:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>High interest rate:</strong> Loan rate above 6-8%
          </li>
          <li>
            <strong>Strong emergency fund:</strong> Maintain 3-6 months expenses
          </li>
          <li>
            <strong>No prepayment penalty:</strong> Check loan terms first
          </li>
          <li>
            <strong>High-interest debt:</strong> Auto loan is your highest-rate
            debt
          </li>
        </ul>
        <p className="mb-2">
          <strong>Consider keeping the loan when:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Low rate:</strong> 0-4% loans, invest extra money instead
          </li>
          <li>
            <strong>Other debt:</strong> Pay off higher-rate credit cards first
          </li>
          <li>
            <strong>Investment opportunities:</strong> 401(k) match or
            tax-advantaged accounts
          </li>
          <li>
            <strong>Cash flow needs:</strong> Upcoming major expenses
          </li>
        </ul>
      </>
    ),
  },
];

export default function AutoLoanFAQSection() {
  return (
    <FAQSection
      items={autoLoanFAQItems}
      title="Frequently Asked Questions About Auto Loans"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="auto-loan-calculator-faq-schema"
      className="mt-16"
      relatedLinks={[
        { href: "/loan", label: "Loan Calculator" },
        { href: "/mortgage", label: "Mortgage Calculator" },
        { href: "/investment", label: "Investment Calculator" },
        { href: "/compound-interest", label: "Compound Interest Calculator" },
      ]}
    />
  );
}

import FAQSection, { FAQItem } from "@/components/ui/FAQSection";

const faqItems: FAQItem[] = [
  {
    id: "when-refinance-mortgage-makes-sense",
    question: "When does refinancing make financial sense?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Rate reduction scenarios (break-even analysis):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>0.5% rate drop:</strong> Often worth it if staying 3+ years
          </li>
          <li>
            <strong>1% rate drop:</strong> Almost always beneficial after 2+
            years
          </li>
          <li>
            <strong>1.5%+ rate drop:</strong> Refinance immediately, payback
            often under 18 months
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example: $300,000 loan at 7% to 5.5% (30-year term):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Monthly savings:</strong> $284 ($1,996 to $1,712)
          </li>
          <li>
            <strong>Refinance costs:</strong> ~$6,000-9,000
          </li>
          <li>
            <strong>Break-even:</strong> 21-32 months
          </li>
          <li>
            <strong>5-year savings:</strong> $17,040 total
          </li>
        </ul>
        <p className="text-sm">
          <strong>Other scenarios:</strong> Credit improvement (100+ point
          increase), cash-out needs, ARM to fixed conversion, or loan term
          changes.
        </p>
      </>
    ),
  },
  {
    id: "break-even-point-calculation",
    question: "How do I calculate the refinance break-even point?",
    answer: (
      <>
        <p className="mb-2">
          <strong>
            Break-even formula: Total Closing Costs ÷ Monthly Savings =
            Break-even Months
          </strong>
        </p>
        <p className="mb-2">
          <strong>Real example scenarios:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Scenario 1:</strong> $8,000 costs, $200/month savings = 40
            months break-even
          </li>
          <li>
            <strong>Scenario 2:</strong> $5,000 costs, $350/month savings = 14
            months break-even
          </li>
          <li>
            <strong>Scenario 3:</strong> $12,000 costs, $500/month savings = 24
            months break-even
          </li>
        </ul>
        <p className="mb-2">
          <strong>Additional considerations beyond break-even:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Lifetime savings:</strong> Calculate total interest
            reduction over full loan term
          </li>
          <li>
            <strong>Opportunity cost:</strong> What else could you earn on
            closing cost money?
          </li>
          <li>
            <strong>Plans to move:</strong> Will you stay past break-even point?
          </li>
          <li>
            <strong>Cash flow needs:</strong> Immediate monthly payment relief
            value
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cash-out-refinance-strategy",
    question: "When should I consider cash-out refinancing?",
    answer: (
      <>
        <p className="mb-2">
          Cash-out refinancing taps home equity but increases loan balance and
          payments.
        </p>
        <p className="mb-2">
          <strong>Example: $400,000 home, $200,000 owed (50% equity):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Available cash-out:</strong> ~$120,000 (keeping 20% equity)
          </li>
          <li>
            <strong>New loan amount:</strong> $320,000 ($200k owed + $120k cash)
          </li>
          <li>
            <strong>Payment increase:</strong> ~$400-600/month for $120k
            additional
          </li>
        </ul>
        <p className="mb-2">
          <strong>Best uses for cash-out refinancing:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>High-return investments:</strong> Rental property, business
            expansion
          </li>
          <li>
            <strong>High-interest debt payoff:</strong> Credit cards at 20%+
            rates
          </li>
          <li>
            <strong>Value-adding improvements:</strong> Kitchen/bath renovations
          </li>
          <li>
            <strong>Education funding:</strong> Lower rates than student loans
          </li>
        </ul>
        <p className="text-sm">
          <strong>Avoid for:</strong> Vacations, luxury purchases, cars, or
          lifestyle inflation. Your home is collateral!
        </p>
      </>
    ),
  },
  {
    id: "mortgage-points-worth-paying",
    question: "Are mortgage points worth paying to lower my rate?",
    answer: (
      <>
        <p className="mb-2">
          Each point costs 1% of loan amount and typically reduces rate by
          0.25%, requiring break-even analysis.
        </p>
        <p className="mb-2">
          <strong>
            $250,000 loan: 1 point costs $2,500, saves ~0.25% rate:
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Rate reduction:</strong> 6.0% to 5.75% saves $36/month
          </li>
          <li>
            <strong>Break-even time:</strong> $2,500 ÷ $36 = 69 months (5.8
            years)
          </li>
          <li>
            <strong>10-year savings:</strong> $4,320 total ($1,820 net after
            point cost)
          </li>
          <li>
            <strong>30-year savings:</strong> $12,960 total ($10,460 net after
            point cost)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Points make sense when you:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Plan to stay in home 7+ years minimum</li>
          <li>Have extra cash available (not borrowing for points)</li>
          <li>Want to maximize long-term savings</li>
          <li>Prefer lower ongoing payments vs upfront costs</li>
        </ul>
        <p className="text-sm">
          <strong>Skip points if:</strong> Moving within 5 years, tight on cash,
          or can invest the money at higher returns.
        </p>
      </>
    ),
  },
  {
    id: "refinance-closing-costs-breakdown",
    question: "What are typical refinancing costs and how can I minimize them?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Typical refinance costs (2-5% of loan amount):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Appraisal:</strong> $400-800 (required for most loans)
          </li>
          <li>
            <strong>Origination fee:</strong> 0.5-1.5% of loan amount
          </li>
          <li>
            <strong>Title insurance:</strong> $500-2,000 (varies by state)
          </li>
          <li>
            <strong>Credit report:</strong> $25-50 per borrower
          </li>
          <li>
            <strong>Attorney/escrow:</strong> $500-1,500 (state dependent)
          </li>
          <li>
            <strong>Recording fees:</strong> $50-500 (county dependent)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Cost minimization strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Shop multiple lenders:</strong> Fees vary significantly
          </li>
          <li>
            <strong>Negotiate fees:</strong> Origination fees often flexible
          </li>
          <li>
            <strong>No-cost refinance:</strong> Higher rate but $0 out of pocket
          </li>
          <li>
            <strong>Lender credits:</strong> Lender pays costs for higher rate
          </li>
        </ul>
        <p className="text-sm">
          <strong>$300,000 example:</strong> Total costs $6,000-15,000. No-cost
          option might add 0.25% rate but eliminates upfront fees.
        </p>
      </>
    ),
  },
  {
    id: "government-loan-refinance-options",
    question: "What are my options for refinancing FHA, VA, or USDA loans?",
    answer: (
      <>
        <p className="mb-2">
          <strong>FHA Streamline Refinance benefits:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>No appraisal required:</strong> Faster processing, lower
            costs
          </li>
          <li>
            <strong>Minimal documentation:</strong> No income/employment
            verification
          </li>
          <li>
            <strong>Net tangible benefit:</strong> Must reduce payment by 5% or
            more
          </li>
          <li>
            <strong>Keep MIP:</strong> Mortgage insurance continues if original
            loan had it
          </li>
        </ul>
        <p className="mb-2">
          <strong>VA Interest Rate Reduction Refinance Loan (IRRRL):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>No appraisal needed:</strong> Streamlined process for
            veterans
          </li>
          <li>
            <strong>100% financing:</strong> Can roll all costs into loan
          </li>
          <li>
            <strong>Lower interest rate required:</strong> Must reduce rate
            unless ARM to fixed
          </li>
          <li>
            <strong>No funding fee:</strong> If disabled veteran or first-time
            use
          </li>
        </ul>
        <p className="mb-2">
          <strong>Converting to conventional loan:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Eliminates FHA mortgage insurance premium with 20% equity</li>
          <li>May qualify for better rates with improved credit</li>
          <li>More flexibility in loan terms and options</li>
        </ul>
      </>
    ),
  },
  {
    id: "credit-score-refinance-impact",
    question: "How does my credit score affect refinancing rates and approval?",
    answer: (
      <>
        <p className="mb-2">
          <strong>
            Credit score rate tiers (approximate rates for $300,000 loan):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>740+ (Excellent):</strong> Best rates, ~6.0% (full approval)
          </li>
          <li>
            <strong>680-739 (Good):</strong> Standard rates, ~6.25% (+0.25%)
          </li>
          <li>
            <strong>620-679 (Fair):</strong> Higher rates, ~6.75% (+0.75%)
          </li>
          <li>
            <strong>Below 620:</strong> Limited options, ~7.5%+ if approved
          </li>
        </ul>
        <p className="mb-2">
          <strong>Monthly payment impact ($300,000 30-year loan):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>740+ score (6.0%):</strong> $1,799/month
          </li>
          <li>
            <strong>680 score (6.25%):</strong> $1,848/month (+$49)
          </li>
          <li>
            <strong>640 score (6.75%):</strong> $1,946/month (+$147)
          </li>
          <li>
            <strong>600 score (7.5%):</strong> $2,098/month (+$299)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Improvement strategy:</strong> If score increased 100+ points
          since original loan, refinancing often saves thousands annually.
        </p>
      </>
    ),
  },
  {
    id: "loan-term-refinance-strategy",
    question: "Should I refinance to a shorter or longer loan term?",
    answer: (
      <>
        <p className="mb-2">
          <strong>$250,000 loan at 6% interest comparison:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>30-year refi:</strong> $1,499/month, $289,595 total interest
          </li>
          <li>
            <strong>15-year refi:</strong> $2,109/month, $129,686 total interest
          </li>
          <li>
            <strong>Difference:</strong> $610 higher payment, $159,909 less
            interest
          </li>
        </ul>
        <p className="mb-2">
          <strong>Choose shorter term (15-20 years) when you:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Can afford higher payments:</strong> Stable income, low
            debt-to-income
          </li>
          <li>
            <strong>Want maximum savings:</strong> Prioritize long-term wealth
            building
          </li>
          <li>
            <strong>Approaching retirement:</strong> Pay off home before
            retiring
          </li>
          <li>
            <strong>Have emergency fund:</strong> 6+ months expenses saved
          </li>
        </ul>
        <p className="mb-2">
          <strong>Choose longer term (30 years) when you:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Need lower payments for cash flow or qualify for larger home</li>
          <li>Have high-return investment opportunities (8%+ returns)</li>
          <li>Prioritize flexibility over total cost optimization</li>
        </ul>
      </>
    ),
  },
  {
    id: "refinance-timing-rate-environment",
    question: "How do I time refinancing in different rate environments?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Falling rate environment strategy:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Lock rates promptly:</strong> Rates can rise during
            processing
          </li>
          <li>
            <strong>Consider rate float down:</strong> Some lenders allow
            one-time rate reduction
          </li>
          <li>
            <strong>Monitor daily:</strong> Rate changes happen quickly in
            volatile markets
          </li>
          <li>
            <strong>Avoid waiting:</strong> "Perfect timing" often costs more
            than acting decisively
          </li>
        </ul>
        <p className="mb-2">
          <strong>Rising rate environment strategy:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Act quickly:</strong> Rates may continue rising, limiting
            future opportunities
          </li>
          <li>
            <strong>Compare to current loan:</strong> Even small savings may be
            worth it
          </li>
          <li>
            <strong>Consider ARM options:</strong> If planning to move within
            5-7 years
          </li>
        </ul>
        <p className="mb-2">
          <strong>Rate lock strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Standard lock: 30-45 days (most common, usually free)</li>
          <li>Extended lock: 60-90 days (costs 0.125-0.25% of loan amount)</li>
          <li>Rate lock extensions: Often available for fee if delays occur</li>
        </ul>
      </>
    ),
  },
  {
    id: "refinance-calculator-limitations",
    question: "What limitations should I know about refinance calculators?",
    answer: (
      <>
        <p className="mb-2">
          <strong>What calculators typically don't include:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>All closing costs:</strong> State/local fees vary
            significantly
          </li>
          <li>
            <strong>Credit score impact:</strong> Your actual rate may differ
          </li>
          <li>
            <strong>Property value changes:</strong> Appraisal may affect
            loan-to-value
          </li>
          <li>
            <strong>Tax implications:</strong> Points deductibility, timing
            considerations
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world factors affecting outcomes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Processing delays:</strong> Rate locks expire, markets
            change
          </li>
          <li>
            <strong>Property issues:</strong> Appraisal problems, title
            complications
          </li>
          <li>
            <strong>Income verification:</strong> Self-employed borrowers face
            additional scrutiny
          </li>
          <li>
            <strong>Debt-to-income changes:</strong> New debts can affect
            approval
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best practice:</strong> Use calculators for initial analysis,
          then get personalized quotes from multiple lenders for actual terms
          and costs.
        </p>
      </>
    ),
  },
];

export default function RefinanceFAQ() {
  return (
    <FAQSection
      items={faqItems}
      title="Frequently Asked Questions About Mortgage Refinancing"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="refinance-faq-schema"
      relatedLinks={[
        { href: "/mortgage", label: "Mortgage Calculator" },
        { href: "/payment", label: "Payment Calculator" },
        { href: "/loan", label: "Loan Calculator" },
        { href: "/amortization", label: "Amortization Calculator" },
        { href: "/interest-rate", label: "Interest Rate Calculator" },
      ]}
    />
  );
}

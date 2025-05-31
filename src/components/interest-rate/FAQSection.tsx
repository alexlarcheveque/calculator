import FAQSection, { FAQItem } from "../ui/FAQSection";

const interestRateFAQItems: FAQItem[] = [
  {
    id: "reverse-calculate-interest-rate",
    question:
      "How do I reverse-calculate an interest rate from payment information?",
    answer: (
      <>
        <p className="mb-2">
          Interest rate reverse calculation helps you verify dealer quotes and
          compare loan offers when only payment information is provided.
        </p>
        <p className="mb-2">
          <strong>Real-world example scenarios:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Auto dealer quote:</strong> $25,000 loan, $450/month for 60
            months = 6.99% APR
          </li>
          <li>
            <strong>Personal loan offer:</strong> $15,000 loan, $320/month for
            48 months = 9.2% APR
          </li>
          <li>
            <strong>Mortgage quote:</strong> $300,000 loan, $1,800/month for 30
            years = 6.5% APR
          </li>
        </ul>
        <p className="mb-2">
          <strong>When reverse calculation is most useful:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Dealer negotiations:</strong> Verify if "special financing"
            is actually competitive
          </li>
          <li>
            <strong>Loan shopping:</strong> Compare offers presented with
            different payment structures
          </li>
          <li>
            <strong>Budget planning:</strong> Determine if a payment fits your
            affordability at various rates
          </li>
          <li>
            <strong>Credit analysis:</strong> Understand what rate your credit
            score is actually getting
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "interest-rate-calculation-methods",
    question: "How does the calculator determine interest rates so accurately?",
    answer: (
      <>
        <p className="mb-2">
          The calculator uses the Newton-Raphson iterative method to solve the
          complex present value equation for unknown interest rates.
        </p>
        <p className="mb-2">
          <strong>Standard loan payment formula solved for rate:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Given:</strong> Principal (P), Monthly Payment (PMT), Number
            of Payments (n)
          </li>
          <li>
            <strong>Find:</strong> Monthly interest rate (r), then convert to
            annual percentage
          </li>
          <li>
            <strong>Accuracy:</strong> Iterates until solution is precise to
            0.001% or better
          </li>
        </ul>
        <p className="mb-2">
          <strong>
            Real calculation example ($20,000 loan, $400/month, 60 months):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Initial guess starts at reasonable rate (5-15%)</li>
          <li>
            Each iteration refines the guess based on payment formula error
          </li>
          <li>Converges to 7.2% annual rate within 5-10 iterations</li>
          <li>Result matches bank calculations to the penny over loan life</li>
        </ul>
      </>
    ),
  },
  {
    id: "apr-vs-interest-rate-real-cost",
    question:
      "What's the real difference between APR and interest rate in cost?",
    answer: (
      <>
        <p className="mb-2">
          APR includes all loan costs, providing the true borrowing cost, while
          interest rate only reflects the basic borrowing charge.
        </p>
        <p className="mb-2">
          <strong>$200,000 mortgage comparison example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Interest rate:</strong> 6.0% (loan payment calculation only)
          </li>
          <li>
            <strong>APR:</strong> 6.3% (includes $8,000 in fees spread over loan
            term)
          </li>
          <li>
            <strong>Monthly payment:</strong> $1,199 (based on 6.0% rate)
          </li>
          <li>
            <strong>True cost:</strong> $8,000 additional upfront + interest
            charges
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common fees included in APR but not interest rate:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Origination fees:</strong> 0.5-2.0% of loan amount
          </li>
          <li>
            <strong>Discount points:</strong> 1% per point paid upfront
          </li>
          <li>
            <strong>Processing fees:</strong> $300-1,500 depending on lender
          </li>
          <li>
            <strong>Mortgage insurance:</strong> 0.5-1.5% annually for high LTV
            loans
          </li>
        </ul>
        <p className="text-sm">
          <strong>Shopping tip:</strong> Always compare APR between similar
          loans, not just interest rates or monthly payments.
        </p>
      </>
    ),
  },
  {
    id: "credit-score-interest-rate-impact",
    question: "How much does my credit score actually affect my interest rate?",
    answer: (
      <>
        <p className="mb-2">
          Credit scores create distinct rate tiers with significant cost
          differences over the loan term.
        </p>
        <p className="mb-2">
          <strong>$25,000 auto loan for 60 months by credit score:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Excellent (750+):</strong> 4.5% rate, $466/month, $2,946
            total interest
          </li>
          <li>
            <strong>Good (700-749):</strong> 6.2% rate, $485/month, $4,081 total
            interest
          </li>
          <li>
            <strong>Fair (650-699):</strong> 9.8% rate, $525/month, $6,484 total
            interest
          </li>
          <li>
            <strong>Poor (600-649):</strong> 15.2% rate, $595/month, $10,691
            total interest
          </li>
        </ul>
        <p className="mb-2">
          <strong>Credit improvement return on investment:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>650 to 700 score:</strong> Save $3,207 on $25,000 loan
          </li>
          <li>
            <strong>700 to 750 score:</strong> Save additional $1,135
          </li>
          <li>
            <strong>Total impact:</strong> 150-point improvement saves $7,745
            (31% of loan amount)
          </li>
          <li>
            <strong>Time investment:</strong> 12-24 months of credit repair pays
            decades of dividends
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "loan-term-interest-rate-relationship",
    question: "How do loan terms affect the interest rates I'm offered?",
    answer: (
      <>
        <p className="mb-2">
          Lenders typically offer better rates for shorter terms but charge
          premium rates for very short or very long terms.
        </p>
        <p className="mb-2">
          <strong>$30,000 auto loan rate structure by term:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>24 months:</strong> 5.8% rate, $1,323/month, $1,752 total
            interest
          </li>
          <li>
            <strong>36 months:</strong> 5.2% rate, $902/month, $2,472 total
            interest (best rate)
          </li>
          <li>
            <strong>48 months:</strong> 5.9% rate, $704/month, $3,792 total
            interest
          </li>
          <li>
            <strong>60 months:</strong> 6.5% rate, $586/month, $5,160 total
            interest
          </li>
          <li>
            <strong>72 months:</strong> 7.2% rate, $511/month, $6,792 total
            interest
          </li>
        </ul>
        <p className="mb-2">
          <strong>Why rates vary by term:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Short terms (12-24 months):</strong> Higher rates due to
            fixed processing costs
          </li>
          <li>
            <strong>Sweet spot (36-48 months):</strong> Best rates, optimal
            risk/reward for lenders
          </li>
          <li>
            <strong>Long terms (60+ months):</strong> Higher rates due to
            increased default risk over time
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "dealer-financing-vs-bank-rates",
    question: "Should I trust dealer financing or get my own bank loan?",
    answer: (
      <>
        <p className="mb-2">
          Dealers often mark up rates from their lending partners but may offer
          promotional rates that beat banks.
        </p>
        <p className="mb-2">
          <strong>
            Real comparison example ($35,000 car loan, 700 credit score):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Credit union rate:</strong> 5.5% APR, $668/month for 60
            months
          </li>
          <li>
            <strong>Bank pre-approval:</strong> 6.2% APR, $681/month for 60
            months
          </li>
          <li>
            <strong>Dealer "standard" rate:</strong> 7.8% APR, $706/month (2%
            markup)
          </li>
          <li>
            <strong>Dealer promotional:</strong> 2.9% APR, $629/month
            (manufacturer incentive)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Pre-approval strategy benefits:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Negotiating power:</strong> Know your baseline rate before
            shopping
          </li>
          <li>
            <strong>Spot markups:</strong> Dealers typically add 1-3% to buy
            rate they receive
          </li>
          <li>
            <strong>Faster closing:</strong> Avoid financing delays at
            dealership
          </li>
          <li>
            <strong>True comparison:</strong> Evaluate dealer promotions against
            your actual options
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best practice:</strong> Get pre-approved, then let dealer try
          to beat your rate. Take whichever is genuinely better.
        </p>
      </>
    ),
  },
  {
    id: "promotional-vs-standard-interest-rates",
    question: "When are promotional interest rates actually worth it?",
    answer: (
      <>
        <p className="mb-2">
          Promotional rates can offer genuine savings but often come with
          trade-offs or qualification restrictions.
        </p>
        <p className="mb-2">
          <strong>0% financing vs cash rebate analysis ($40,000 car):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>0% APR option:</strong> $667/month for 60 months, $0
            interest cost
          </li>
          <li>
            <strong>$3,000 rebate + 5.9% financing:</strong> $37,000 loan,
            $705/month, $5,300 interest
          </li>
          <li>
            <strong>Net comparison:</strong> 0% saves $2,300 over rebate option
          </li>
          <li>
            <strong>Cash buyer advantage:</strong> $3,000 rebate + invest
            savings at 7% = $4,207 total benefit
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common promotional rate conditions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Credit requirements:</strong> Often need 720+ credit score
          </li>
          <li>
            <strong>Term restrictions:</strong> May only apply to specific loan
            lengths
          </li>
          <li>
            <strong>Model limitations:</strong> Usually on slow-moving or
            outgoing models
          </li>
          <li>
            <strong>Regional availability:</strong> Not offered in all markets
          </li>
        </ul>
        <p className="text-sm">
          <strong>Decision rule:</strong> Calculate total cost of each option
          over the full term, including any rebates or incentives.
        </p>
      </>
    ),
  },
  {
    id: "fixed-vs-variable-rate-scenarios",
    question: "When should I choose fixed vs variable interest rates?",
    answer: (
      <>
        <p className="mb-2">
          Fixed rates provide payment certainty while variable rates can save
          money in declining rate environments.
        </p>
        <p className="mb-2">
          <strong>$150,000 HELOC comparison over 10 years:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Fixed rate (7.5%):</strong> $1,776/month, $213,120 total
            cost
          </li>
          <li>
            <strong>Variable rate (starts 6.5%):</strong> Initial $1,704/month
            payment
          </li>
          <li>
            <strong>If rates rise to 9%:</strong> Variable payment becomes
            $1,899/month
          </li>
          <li>
            <strong>If rates fall to 5%:</strong> Variable payment drops to
            $1,591/month
          </li>
        </ul>
        <p className="mb-2">
          <strong>Choose fixed rates when:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Budget certainty needed:</strong> Fixed income, tight budget
            constraints
          </li>
          <li>
            <strong>Rates are low historically:</strong> Lock in favorable
            long-term rates
          </li>
          <li>
            <strong>Rising rate environment:</strong> Fed is increasing rates
          </li>
          <li>
            <strong>Risk averse:</strong> Prefer predictable payments over
            potential savings
          </li>
        </ul>
        <p className="mb-2">
          <strong>Choose variable rates when:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Rates are high and expected to fall</li>
          <li>Short-term borrowing (under 3 years)</li>
          <li>Can handle payment increases in budget</li>
          <li>Rate has caps limiting maximum increases</li>
        </ul>
      </>
    ),
  },
  {
    id: "interest-rate-locks-timing",
    question: "How do interest rate locks work and when should I use them?",
    answer: (
      <>
        <p className="mb-2">
          Rate locks guarantee your interest rate for a specific period,
          protecting against rate increases during loan processing.
        </p>
        <p className="mb-2">
          <strong>Rate lock scenarios ($300,000 mortgage at 6.5%):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>No lock, rates rise to 7%:</strong> Payment increases from
            $1,896 to $1,996 (+$100/month)
          </li>
          <li>
            <strong>30-day lock (free):</strong> Keep 6.5% rate if closing on
            time
          </li>
          <li>
            <strong>60-day lock (0.125% fee):</strong> Costs $375 but guarantees
            rate
          </li>
          <li>
            <strong>Rate lock extension:</strong> Additional 15 days typically
            costs $200-500
          </li>
        </ul>
        <p className="mb-2">
          <strong>Rate lock strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Rising rate environment:</strong> Lock immediately upon
            application
          </li>
          <li>
            <strong>Falling rates:</strong> Consider "float down" options (pay
            fee for one-time reduction)
          </li>
          <li>
            <strong>Tight timeline:</strong> Extended locks prevent delays from
            forcing higher rates
          </li>
          <li>
            <strong>Market volatility:</strong> Lock provides certainty
            regardless of direction
          </li>
        </ul>
        <p className="text-sm">
          <strong>Important:</strong> Rate locks are binding commitments.
          Switching lenders means losing your locked rate.
        </p>
      </>
    ),
  },
  {
    id: "interest-rate-calculator-limitations",
    question: "What are the limitations of interest rate calculators?",
    answer: (
      <>
        <p className="mb-2">
          <strong>What interest rate calculators assume:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Standard amortization:</strong> Regular monthly payments
            reducing principal
          </li>
          <li>
            <strong>Fixed payment amount:</strong> Same payment every month
            throughout term
          </li>
          <li>
            <strong>No additional fees:</strong> Rate calculation excludes
            origination or other costs
          </li>
          <li>
            <strong>Compound interest:</strong> Monthly compounding typical for
            most loans
          </li>
        </ul>
        <p className="mb-2">
          <strong>Scenarios where calculators may be inaccurate:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Balloon payments:</strong> Large final payment changes
            effective rate
          </li>
          <li>
            <strong>Interest-only periods:</strong> Initial payments don't
            reduce principal
          </li>
          <li>
            <strong>Graduated payments:</strong> Payment amounts change over
            time
          </li>
          <li>
            <strong>Skip payment options:</strong> Missed payments affect total
            interest
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world factors not captured:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Promotional periods:</strong> Teaser rates that change after
            initial period
          </li>
          <li>
            <strong>Penalty rates:</strong> Higher rates triggered by late
            payments
          </li>
          <li>
            <strong>Variable rate adjustments:</strong> Future rate changes in
            ARM loans
          </li>
          <li>
            <strong>Prepayment benefits:</strong> Interest savings from extra
            payments
          </li>
        </ul>
      </>
    ),
  },
];

export default function InterestRateFAQSection() {
  return (
    <FAQSection
      items={interestRateFAQItems}
      title="Frequently Asked Questions About Interest Rate Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="interest-rate-faq-schema"
      relatedLinks={[
        { href: "/mortgage", label: "Mortgage Calculator" },
        { href: "/loan", label: "Loan Calculator" },
        { href: "/auto-loan", label: "Auto Loan Calculator" },
        { href: "/compound-interest", label: "Compound Interest Calculator" },
        { href: "/payment", label: "Payment Calculator" },
        { href: "/refinance", label: "Refinance Calculator" },
      ]}
    />
  );
}

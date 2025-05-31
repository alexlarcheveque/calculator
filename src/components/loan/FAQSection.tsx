import FAQSection, { FAQItem } from "../ui/FAQSection";

const loanFAQItems: FAQItem[] = [
  {
    id: "what-is-amortized-loan",
    question: "What is an amortized loan and how does it work?",
    answer: (
      <>
        <p className="mb-2">
          An amortized loan is repaid through regular, equal payments over a set
          period, with each payment covering both principal and interest.
        </p>
        <p className="mb-2">
          <strong>How amortization works:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Early payments:</strong> Mostly interest, small principal
            reduction
          </li>
          <li>
            <strong>Middle payments:</strong> Gradually shift toward more
            principal
          </li>
          <li>
            <strong>Late payments:</strong> Mostly principal, small interest
            portion
          </li>
          <li>
            <strong>Final payment:</strong> Loan balance reaches zero
          </li>
        </ul>
        <p className="text-sm">
          <strong>Common examples:</strong> Mortgages, auto loans, personal
          loans, and student loans. This structure ensures predictable monthly
          payments while building equity over time.
        </p>
      </>
    ),
  },
  {
    id: "secured-vs-unsecured-loans-difference",
    question: "What's the difference between secured and unsecured loans?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Secured loans require collateral:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Examples:</strong> Mortgages (house), auto loans (car), home
            equity loans
          </li>
          <li>
            <strong>Advantages:</strong> Lower interest rates, higher approval
            rates, larger amounts
          </li>
          <li>
            <strong>Risk:</strong> Lender can seize collateral if you default
          </li>
          <li>
            <strong>Typical rates:</strong> 3-8% depending on loan type
          </li>
        </ul>
        <p className="mb-2">
          <strong>Unsecured loans have no collateral requirement:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Examples:</strong> Personal loans, credit cards, student
            loans
          </li>
          <li>
            <strong>Advantages:</strong> No risk of losing assets, faster
            approval
          </li>
          <li>
            <strong>Disadvantages:</strong> Higher rates, stricter credit
            requirements
          </li>
          <li>
            <strong>Typical rates:</strong> 6-36% depending on creditworthiness
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-calculate-loan-payments",
    question: "How do I calculate my monthly loan payment?",
    answer: (
      <>
        <p className="mb-2">
          Monthly loan payments are calculated using the principal amount,
          interest rate, and loan term with this standard formula:
        </p>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-3">
          M = P × [r(1+r)^n] / [(1+r)^n-1]
        </p>
        <p className="mb-2">
          Where: M = monthly payment, P = principal loan amount, r = monthly
          interest rate, n = total number of payments
        </p>
        <p className="mb-2">
          <strong>
            Example calculation for $20,000 loan at 6% for 5 years:
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Monthly payment: $386.66</li>
          <li>Total payments: $23,199.30</li>
          <li>Total interest: $3,199.30</li>
        </ul>
      </>
    ),
  },
  {
    id: "what-factors-affect-loan-interest-rates",
    question: "What factors determine my loan interest rate?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Personal factors you can control:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Credit score:</strong> 720+ gets best rates, each 100 points
            can save 1-2%
          </li>
          <li>
            <strong>Income stability:</strong> Steady employment history
            preferred
          </li>
          <li>
            <strong>Debt-to-income ratio:</strong> Lower DTI qualifies for
            better rates
          </li>
          <li>
            <strong>Down payment/collateral:</strong> More security = lower
            rates
          </li>
          <li>
            <strong>Loan term:</strong> Shorter terms typically offer lower
            rates
          </li>
        </ul>
        <p className="mb-2">
          <strong>Market factors beyond your control:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Federal Reserve interest rate policies</li>
          <li>Economic conditions and inflation expectations</li>
          <li>Lender's funding costs and risk appetite</li>
          <li>Competition in the lending market</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-much-can-i-borrow",
    question: "How much can I borrow and what determines loan approval?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Standard lending guidelines:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Personal loans:</strong> $1,000-$100,000 (typically 2-7x
            monthly income)
          </li>
          <li>
            <strong>Auto loans:</strong> Up to 120% of vehicle value
          </li>
          <li>
            <strong>Home loans:</strong> 3-5x annual income (varies by location)
          </li>
          <li>
            <strong>Debt-to-income limit:</strong> Usually 36-43% of gross
            monthly income
          </li>
        </ul>
        <p className="mb-2">
          <strong>Key approval factors:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Credit score (most lenders prefer 650+ for good rates)</li>
          <li>Steady income and employment history</li>
          <li>Low existing debt relative to income</li>
          <li>Adequate collateral (for secured loans)</li>
          <li>Sufficient cash reserves for payments</li>
        </ul>
      </>
    ),
  },
  {
    id: "what-is-compound-interest-loans",
    question: "How does compound interest affect my loan payments?",
    answer: (
      <>
        <p className="mb-2">
          Compound interest means you pay interest on both the principal and any
          unpaid accumulated interest, making the frequency of compounding
          important:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Daily compounding:</strong> Interest calculated every day
            (highest cost)
          </li>
          <li>
            <strong>Monthly compounding:</strong> Most common for personal/auto
            loans
          </li>
          <li>
            <strong>Annually:</strong> Interest calculated once per year (lowest
            cost)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example impact on $10,000 loan at 8% for 5 years:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Annual compounding: $14,693 total cost</li>
          <li>Monthly compounding: $14,898 total cost</li>
          <li>Daily compounding: $14,918 total cost</li>
        </ul>
      </>
    ),
  },
  {
    id: "what-is-deferred-payment-loan",
    question: "What is a deferred payment loan and when is it used?",
    answer: (
      <>
        <p className="mb-2">
          Deferred payment loans require no regular payments during the loan
          term - you pay everything (principal plus accumulated interest) at
          maturity.
        </p>
        <p className="mb-2">
          <strong>Common uses:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Bridge loans:</strong> Short-term financing until permanent
            funding
          </li>
          <li>
            <strong>Construction loans:</strong> Payment deferred until project
            completion
          </li>
          <li>
            <strong>Student loans:</strong> Some programs defer payments until
            graduation
          </li>
          <li>
            <strong>Seasonal businesses:</strong> Payments aligned with income
            cycles
          </li>
        </ul>
        <p className="mb-2">
          <strong>Important considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Interest compounds during deferral period</li>
          <li>Final payment can be much larger than original loan</li>
          <li>Typically higher interest rates than regular loans</li>
          <li>Must have plan for large final payment</li>
        </ul>
      </>
    ),
  },
  {
    id: "longer-vs-shorter-loan-terms",
    question: "Should I choose a longer or shorter loan term?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Shorter loan terms (2-3 years):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Pros:</strong> Lower interest rates, less total interest,
            faster debt freedom
          </li>
          <li>
            <strong>Cons:</strong> Higher monthly payments, less cash flow
            flexibility
          </li>
          <li>
            <strong>Best for:</strong> Strong income, wanting to minimize total
            cost
          </li>
        </ul>
        <p className="mb-2">
          <strong>Longer loan terms (5-7 years):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Pros:</strong> Lower monthly payments, better cash flow
          </li>
          <li>
            <strong>Cons:</strong> Higher interest rates, more total interest
            paid
          </li>
          <li>
            <strong>Best for:</strong> Tight budgets, wanting payment
            flexibility
          </li>
        </ul>
        <p className="text-sm">
          <strong>Example:</strong> $25,000 auto loan at 6% costs $483/month
          (5-year) vs. $403/month (6-year), but saves $1,200 in total interest
          with shorter term.
        </p>
      </>
    ),
  },
  {
    id: "how-do-bonds-work-as-loans",
    question: "How do bonds work as investments and loan instruments?",
    answer: (
      <>
        <p className="mb-2">
          When you buy a bond, you're lending money to the issuer (government,
          corporation) in exchange for regular interest payments and return of
          principal at maturity.
        </p>
        <p className="mb-2">
          <strong>Key bond characteristics:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Face value:</strong> Amount paid back at maturity (usually
            $1,000)
          </li>
          <li>
            <strong>Coupon rate:</strong> Annual interest rate paid to
            bondholders
          </li>
          <li>
            <strong>Maturity date:</strong> When principal is repaid
          </li>
          <li>
            <strong>Credit rating:</strong> Risk assessment (AAA = safest, D =
            default)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Types of bonds:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Government bonds:</strong> Low risk, lower returns (1-4%)
          </li>
          <li>
            <strong>Corporate bonds:</strong> Higher risk, higher returns (3-8%)
          </li>
          <li>
            <strong>Municipal bonds:</strong> Tax advantages for local investors
          </li>
          <li>
            <strong>Zero-coupon bonds:</strong> No periodic payments, bought at
            discount
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "loan-calculator-accuracy-limitations",
    question:
      "How accurate is this loan calculator and what are its limitations?",
    answer: (
      <>
        <p className="mb-2">
          Our calculator provides mathematically precise calculations based on
          standard loan formulas used by financial institutions worldwide.
        </p>
        <p className="mb-2">
          <strong>What the calculator includes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Exact principal and interest calculations</li>
          <li>Complete amortization schedules</li>
          <li>Multiple compounding frequency options</li>
          <li>Three different loan types (amortized, deferred, bond)</li>
        </ul>
        <p className="mb-2">
          <strong>What to consider separately:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Origination fees and closing costs (typically 1-8% of loan)</li>
          <li>Prepayment penalties (varies by lender)</li>
          <li>Insurance requirements (PMI, life insurance)</li>
          <li>Tax implications of loan interest</li>
          <li>Variable rate changes over time</li>
        </ul>
      </>
    ),
  },
];

export default function LoanFAQSection() {
  return (
    <FAQSection
      items={loanFAQItems}
      title="Frequently Asked Questions About Loans"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="loan-calculator-faq-schema"
      className="mt-16"
      relatedLinks={[
        { href: "/auto-loan", label: "Auto Loan Calculator" },
        { href: "/mortgage", label: "Mortgage Calculator" },
        { href: "/investment", label: "Investment Calculator" },
        { href: "/compound-interest", label: "Compound Interest Calculator" },
      ]}
    />
  );
}

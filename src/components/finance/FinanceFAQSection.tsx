"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const financeFAQItems: FAQItem[] = [
  {
    id: "time-value-money-fundamentals",
    question:
      "What is Time Value of Money and why does it matter for my finances?",
    answer: (
      <>
        <p className="mb-2">
          Time Value of Money (TVM) recognizes that money available today is
          worth more than the same amount in the future due to earning
          potential.
        </p>
        <p className="mb-2">
          <strong>Real-world examples demonstrating TVM:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Investment growth:</strong> $10,000 invested at 7% becomes
            $19,672 in 10 years
          </li>
          <li>
            <strong>Inflation impact:</strong> $100 today buys what $134 will
            buy in 10 years (3% inflation)
          </li>
          <li>
            <strong>Loan cost:</strong> $200,000 mortgage at 6% costs $431,676
            total over 30 years
          </li>
          <li>
            <strong>Retirement planning:</strong> $500/month for 30 years at 8%
            = $681,537 vs $180,000 total contributions
          </li>
        </ul>
        <p className="mb-2">
          <strong>Critical financial decisions using TVM:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Should I take a lump sum or annuity payments from my pension?</li>
          <li>Is it better to pay cash or finance a major purchase?</li>
          <li>How much do I need to save now to reach my retirement goal?</li>
          <li>Which investment offers the better return over time?</li>
        </ul>
      </>
    ),
  },
  {
    id: "present-value-practical-applications",
    question: "How do I use Present Value in real financial decisions?",
    answer: (
      <>
        <p className="mb-2">
          Present Value calculates today's worth of future money, helping you
          compare options and make informed decisions.
        </p>
        <p className="mb-2">
          <strong>Lottery/pension decision example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Option A:</strong> $1 million lump sum today
          </li>
          <li>
            <strong>Option B:</strong> $60,000 annually for 25 years = $1.5
            million total
          </li>
          <li>
            <strong>PV of Option B at 6% rate:</strong> $766,961
          </li>
          <li>
            <strong>Decision:</strong> Take the $1 million lump sum (worth
            $233,039 more)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Investment valuation example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Rental property:</strong> Expected $2,000/month rent for 10
            years
          </li>
          <li>
            <strong>Total future income:</strong> $240,000 over 10 years
          </li>
          <li>
            <strong>PV at 8% discount rate:</strong> $161,036
          </li>
          <li>
            <strong>Investment decision:</strong> Don't pay more than $161,036
            for positive return
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key insight:</strong> Higher discount rates reduce present
          value, reflecting greater risk or opportunity cost.
        </p>
      </>
    ),
  },
  {
    id: "future-value-wealth-building",
    question:
      "How does Future Value help me plan for long-term financial goals?",
    answer: (
      <>
        <p className="mb-2">
          Future Value shows how current investments or savings will grow over
          time, essential for goal planning.
        </p>
        <p className="mb-2">
          <strong>Retirement planning example ($1,000 monthly savings):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Starting at age 25 (40 years at 7%):</strong> $2,610,064 at
            retirement
          </li>
          <li>
            <strong>Starting at age 35 (30 years at 7%):</strong> $1,220,794 at
            retirement
          </li>
          <li>
            <strong>Starting at age 45 (20 years at 7%):</strong> $491,846 at
            retirement
          </li>
          <li>
            <strong>Cost of delay:</strong> 10-year delay costs $1.39 million!
          </li>
        </ul>
        <p className="mb-2">
          <strong>Education savings example (newborn child):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Goal:</strong> $100,000 for college in 18 years
          </li>
          <li>
            <strong>Monthly savings needed at 6%:</strong> $279/month
          </li>
          <li>
            <strong>Total contributions:</strong> $60,228 (grows to $100,000)
          </li>
          <li>
            <strong>Compound interest contribution:</strong> $39,772 (39.8% of
            total)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Planning strategy:</strong> Start with your goal amount, work
          backward to determine required monthly savings.
        </p>
      </>
    ),
  },
  {
    id: "payment-calculations-loan-analysis",
    question: "How do I calculate loan payments and analyze affordability?",
    answer: (
      <>
        <p className="mb-2">
          PMT calculations determine required payments for loans or investments
          to reach specific financial objectives.
        </p>
        <p className="mb-2">
          <strong>Mortgage affordability analysis:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>$300,000 loan at 6.5% for 30 years:</strong> $1,896/month
            payment
          </li>
          <li>
            <strong>Same loan for 15 years:</strong> $2,613/month payment
            (+$717)
          </li>
          <li>
            <strong>Total interest savings (15 vs 30 year):</strong> $212,226
          </li>
          <li>
            <strong>Decision factor:</strong> Can budget handle $717 extra
            monthly?
          </li>
        </ul>
        <p className="mb-2">
          <strong>Investment accumulation example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Goal:</strong> $500,000 in 20 years for retirement
          </li>
          <li>
            <strong>Current savings:</strong> $50,000 already invested
          </li>
          <li>
            <strong>Expected return:</strong> 8% annually
          </li>
          <li>
            <strong>Required monthly payment:</strong> $1,053 (to reach goal)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Affordability rule:</strong> Total debt payments shouldn't
          exceed 36% of gross monthly income.
        </p>
      </>
    ),
  },
  {
    id: "interest-rate-calculation-scenarios",
    question:
      "When should I calculate interest rates and what do they tell me?",
    answer: (
      <>
        <p className="mb-2">
          Interest rate calculations help evaluate investment performance and
          compare financial opportunities.
        </p>
        <p className="mb-2">
          <strong>Investment performance analysis:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Scenario:</strong> Bought stock for $10,000, sold for
            $15,000 after 3 years
          </li>
          <li>
            <strong>Calculated return:</strong> 14.47% annually
          </li>
          <li>
            <strong>Comparison:</strong> S&P 500 averaged 10% same period
          </li>
          <li>
            <strong>Evaluation:</strong> Investment outperformed market by 4.47%
          </li>
        </ul>
        <p className="mb-2">
          <strong>Debt vs investment decision:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Extra mortgage payment opportunity:</strong> 6.5% guaranteed
            return
          </li>
          <li>
            <strong>Stock market historical average:</strong> 10% but volatile
          </li>
          <li>
            <strong>Bond investment opportunity:</strong> 4% stable return
          </li>
          <li>
            <strong>Optimal strategy:</strong> Pay mortgage over bonds, consider
            stocks for risk tolerance
          </li>
        </ul>
        <p className="mb-2">
          <strong>Dealer financing evaluation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Car dealer offers: $30,000 loan, $550/month for 60 months</li>
          <li>Calculated interest rate: 8.24% APR</li>
          <li>Bank pre-approval: 5.9% APR for same terms</li>
          <li>Decision: Use bank financing, save $87/month</li>
        </ul>
      </>
    ),
  },
  {
    id: "number-periods-timing-analysis",
    question:
      "How do I determine the optimal time horizon for my financial goals?",
    answer: (
      <>
        <p className="mb-2">
          Number of periods calculations help optimize timing for achieving
          financial objectives.
        </p>
        <p className="mb-2">
          <strong>Debt payoff acceleration analysis:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>$50,000 student loan at 6.5%:</strong>
          </li>
          <li>
            <strong>$500/month payments:</strong> Paid off in 11.9 years,
            $21,260 total interest
          </li>
          <li>
            <strong>$700/month payments:</strong> Paid off in 7.8 years, $14,326
            total interest
          </li>
          <li>
            <strong>$200 extra saves:</strong> $6,934 interest and 4.1 years
          </li>
        </ul>
        <p className="mb-2">
          <strong>Investment doubling timeline:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>$25,000 investment doubling to $50,000:</strong>
          </li>
          <li>
            <strong>At 4% return:</strong> 17.7 years to double
          </li>
          <li>
            <strong>At 7% return:</strong> 10.2 years to double
          </li>
          <li>
            <strong>At 10% return:</strong> 7.3 years to double
          </li>
          <li>
            <strong>Rate impact:</strong> 3% higher return saves 10.4 years
          </li>
        </ul>
        <p className="text-sm">
          <strong>Rule of 72 verification:</strong> 72 ÷ interest rate =
          approximate doubling time in years.
        </p>
      </>
    ),
  },
  {
    id: "compounding-frequency-optimization",
    question: "How much difference does compounding frequency actually make?",
    answer: (
      <>
        <p className="mb-2">
          Compounding frequency affects returns, but the impact diminishes at
          higher frequencies.
        </p>
        <p className="mb-2">
          <strong>
            $10,000 investment at 6% for 10 years with different compounding:
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Annual compounding:</strong> $17,908 (baseline)
          </li>
          <li>
            <strong>Quarterly compounding:</strong> $18,061 (+$153)
          </li>
          <li>
            <strong>Monthly compounding:</strong> $18,167 (+$259)
          </li>
          <li>
            <strong>Daily compounding:</strong> $18,221 (+$313)
          </li>
          <li>
            <strong>Continuous compounding:</strong> $18,221 (+$313)
          </li>
        </ul>
        <p className="mb-2">
          <strong>High-yield savings account example ($50,000 at 4.5%):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Annual compounding:</strong> $2,250 annual interest
          </li>
          <li>
            <strong>Monthly compounding:</strong> $2,296 annual interest (+$46)
          </li>
          <li>
            <strong>Daily compounding:</strong> $2,302 annual interest (+$52)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Practical takeaway:</strong> Focus on finding higher interest
          rates rather than optimizing compounding frequency. A 0.5% rate
          increase has more impact than switching from annual to daily
          compounding.
        </p>
      </>
    ),
  },
  {
    id: "payment-timing-beginning-vs-end",
    question:
      "When does payment timing (beginning vs end of period) matter most?",
    answer: (
      <>
        <p className="mb-2">
          Payment timing affects the total value of annuities and loan
          calculations based on interest earning opportunity.
        </p>
        <p className="mb-2">
          <strong>
            Retirement contribution timing ($500/month at 7% for 30 years):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>End of month payments:</strong> $566,764 total accumulation
          </li>
          <li>
            <strong>Beginning of month payments:</strong> $606,564 total
            accumulation
          </li>
          <li>
            <strong>Timing advantage:</strong> $39,800 more (7% additional
            growth)
          </li>
          <li>
            <strong>Percentage impact:</strong> Beginning payments worth 7% more
          </li>
        </ul>
        <p className="mb-2">
          <strong>Loan payment scenarios:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Mortgage payments:</strong> Almost always end of month
            (after living in home)
          </li>
          <li>
            <strong>Rent payments:</strong> Beginning of month (before
            occupying)
          </li>
          <li>
            <strong>Lease payments:</strong> Often beginning of period
          </li>
          <li>
            <strong>Insurance premiums:</strong> Beginning of coverage period
          </li>
        </ul>
        <p className="text-sm">
          <strong>When it matters most:</strong> High interest rates and long
          time periods amplify timing differences.
        </p>
      </>
    ),
  },
  {
    id: "financial-calculator-vs-spreadsheet",
    question:
      "Should I use a financial calculator or build my own spreadsheet?",
    answer: (
      <>
        <p className="mb-2">
          Financial calculators excel at standard TVM problems while
          spreadsheets offer flexibility for complex scenarios.
        </p>
        <p className="mb-2">
          <strong>Financial calculator advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Speed:</strong> Instant results for standard calculations
          </li>
          <li>
            <strong>Accuracy:</strong> Built-in formulas prevent calculation
            errors
          </li>
          <li>
            <strong>Professional standard:</strong> Used in finance exams and
            industry
          </li>
          <li>
            <strong>Verification:</strong> Easy to double-check loan quotes and
            investment returns
          </li>
        </ul>
        <p className="mb-2">
          <strong>Spreadsheet advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Flexibility:</strong> Handle irregular payments, changing
            rates
          </li>
          <li>
            <strong>Visualization:</strong> Charts and graphs for presentations
          </li>
          <li>
            <strong>Scenario analysis:</strong> What-if comparisons and
            sensitivity analysis
          </li>
          <li>
            <strong>Complex modeling:</strong> Tax implications, multiple
            variables
          </li>
        </ul>
        <p className="mb-2">
          <strong>Best practice approach:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Use financial calculator for quick standard calculations</li>
          <li>Build spreadsheets for complex planning scenarios</li>
          <li>Cross-verify important calculations with both methods</li>
          <li>
            Financial calculator for exams, spreadsheets for real-world analysis
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "tvm-calculator-limitations",
    question: "What are the limitations of Time Value of Money calculators?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Key assumptions that may not reflect reality:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Constant interest rates:</strong> Real rates fluctuate with
            economic conditions
          </li>
          <li>
            <strong>Regular payments:</strong> Life events may interrupt planned
            contributions
          </li>
          <li>
            <strong>No transaction costs:</strong> Real investments have fees,
            taxes, commissions
          </li>
          <li>
            <strong>Perfect timing:</strong> Assumes payments made exactly on
            schedule
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world factors not captured:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Inflation impact:</strong> Purchasing power changes over
            time
          </li>
          <li>
            <strong>Tax implications:</strong> Investment gains, deductible loan
            interest
          </li>
          <li>
            <strong>Risk variations:</strong> Different investments have
            different volatility
          </li>
          <li>
            <strong>Liquidity needs:</strong> Emergency access to funds may be
            required
          </li>
        </ul>
        <p className="mb-2">
          <strong>Scenarios requiring advanced modeling:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Variable interest rates (ARMs, bonds with changing yields)</li>
          <li>Irregular cash flows (bonuses, commission income)</li>
          <li>Tax-advantaged accounts (401k, IRA contribution limits)</li>
          <li>Complex loan structures (interest-only, balloon payments)</li>
        </ul>
      </>
    ),
  },
];

export default function FinanceFAQSection() {
  return (
    <FAQSection
      items={financeFAQItems}
      title="Frequently Asked Questions About Time Value of Money"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="finance-calculator-faq-schema"
      relatedLinks={[
        { href: "/mortgage", label: "Mortgage Calculator" },
        { href: "/loan", label: "Loan Calculator" },
        { href: "/investment", label: "Investment Calculator" },
        { href: "/compound-interest", label: "Compound Interest Calculator" },
        { href: "/retirement", label: "Retirement Calculator" },
      ]}
    />
  );
}

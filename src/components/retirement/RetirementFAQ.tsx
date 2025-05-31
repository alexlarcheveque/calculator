import FAQSection, { FAQItem } from "../ui/FAQSection";

const retirementFAQItems: FAQItem[] = [
  {
    id: "how-much-save-retirement",
    question: "How much should I save for retirement?",
    answer: (
      <>
        <p className="mb-2">
          <strong>General savings guidelines:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>10-15% rule:</strong> Save 10-15% of pre-tax income annually
          </li>
          <li>
            <strong>Age-based targets:</strong> Save 1x annual income by 30, 3x
            by 40, 6x by 50, 8x by 60
          </li>
          <li>
            <strong>25x rule:</strong> Save 25x your annual retirement expenses
          </li>
          <li>
            <strong>80% replacement:</strong> Plan to replace 70-90% of
            pre-retirement income
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example for $75,000 annual income:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Save $7,500-$11,250 annually (10-15%)</li>
          <li>
            Target $1.5-2 million by retirement (25x $60,000-80,000 expenses)
          </li>
          <li>Provides $50,000-70,000 annual retirement income</li>
        </ul>
      </>
    ),
  },
  {
    id: "what-is-4-percent-rule",
    question: "What is the 4% rule and is it still valid?",
    answer: (
      <>
        <p className="mb-2">
          The 4% rule suggests withdrawing 4% of your retirement portfolio in
          year one, then adjusting for inflation annually. Based on historical
          data, this approach had a 95% success rate over 30-year periods.
        </p>
        <p className="mb-2">
          <strong>How it works:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Year 1:</strong> Withdraw 4% of $1 million = $40,000
          </li>
          <li>
            <strong>Year 2:</strong> Adjust $40,000 for inflation (3% = $41,200)
          </li>
          <li>
            <strong>Continue:</strong> Inflation adjustments regardless of
            portfolio performance
          </li>
        </ul>
        <p className="mb-2">
          <strong>Modern considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Some experts now suggest 3-3.5% due to lower expected returns</li>
          <li>
            Consider flexible withdrawal strategies that adjust based on market
            performance
          </li>
          <li>Factor in Social Security and other income sources</li>
        </ul>
      </>
    ),
  },
  {
    id: "when-start-saving-retirement",
    question:
      "When should I start saving for retirement and why does timing matter?",
    answer: (
      <>
        <p className="mb-2">
          Start saving as early as possible to maximize the power of compound
          interest.
        </p>
        <p className="mb-2">
          <strong>Compound interest example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Start at 25:</strong> Save $200/month, have $1.37 million by
            65 (7% return)
          </li>
          <li>
            <strong>Start at 35:</strong> Save $200/month, have $610,000 by 65
            (7% return)
          </li>
          <li>
            <strong>Start at 45:</strong> Save $200/month, have $262,000 by 65
            (7% return)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Even small amounts help:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>$50/month from age 25 = $342,000 by age 65</li>
          <li>$100/month from age 22 = $693,000 by age 65</li>
          <li>
            Every year you delay costs tens of thousands in potential growth
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "401k-vs-ira-difference",
    question: "What's the difference between 401(k) and IRA accounts?",
    answer: (
      <>
        <p className="mb-2">
          <strong>401(k) advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Higher limits:</strong> $23,000 in 2024 ($30,500 if 50+)
          </li>
          <li>
            <strong>Employer match:</strong> Free money up to company limits
          </li>
          <li>
            <strong>Automatic payroll deduction:</strong> Easy to maintain
            consistency
          </li>
          <li>
            <strong>Loan options:</strong> Some plans allow borrowing against
            balance
          </li>
        </ul>
        <p className="mb-2">
          <strong>IRA advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Investment control:</strong> Choose any investments, not
            just plan options
          </li>
          <li>
            <strong>Lower fees:</strong> Often lower expense ratios than 401(k)
            plans
          </li>
          <li>
            <strong>Roth option:</strong> Tax-free growth and withdrawals in
            retirement
          </li>
          <li>
            <strong>No required distributions:</strong> Roth IRAs have no RMDs
            during lifetime
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best strategy:</strong> Contribute enough to 401(k) for full
          employer match, then maximize IRA, then additional 401(k)
          contributions.
        </p>
      </>
    ),
  },
  {
    id: "roth-vs-traditional-retirement-accounts",
    question: "Should I choose Roth or traditional retirement accounts?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Choose traditional (tax-deductible now) when:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>High current tax bracket:</strong> 22% or higher marginal
            rate
          </li>
          <li>
            <strong>Expect lower retirement taxes:</strong> Lower income or tax
            bracket in retirement
          </li>
          <li>
            <strong>Need immediate tax deduction:</strong> Reduces current year
            tax bill
          </li>
          <li>
            <strong>High income:</strong> May not qualify for Roth IRA
            contributions
          </li>
        </ul>
        <p className="mb-2">
          <strong>Choose Roth (tax-free in retirement) when:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Low current tax bracket:</strong> 12% or lower marginal rate
          </li>
          <li>
            <strong>Young age:</strong> Decades for tax-free growth
          </li>
          <li>
            <strong>Expect higher future taxes:</strong> Higher income or tax
            rates in retirement
          </li>
          <li>
            <strong>Estate planning:</strong> No required minimum distributions
          </li>
        </ul>
        <p className="text-sm">
          <strong>Hedge strategy:</strong> Many financial advisors recommend
          splitting contributions between Roth and traditional to hedge against
          future tax uncertainty.
        </p>
      </>
    ),
  },
  {
    id: "inflation-impact-retirement",
    question: "How does inflation affect retirement planning?",
    answer: (
      <>
        <p className="mb-2">
          Inflation erodes purchasing power over time, making retirement
          planning challenging without proper adjustments.
        </p>
        <p className="mb-2">
          <strong>Inflation impact examples (3% annual inflation):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>20 years:</strong> $100 purchasing power = $55 today
          </li>
          <li>
            <strong>30 years:</strong> $100 purchasing power = $41 today
          </li>
          <li>
            <strong>$50,000 retirement income:</strong> Needs $90,000+ in 20
            years
          </li>
        </ul>
        <p className="mb-2">
          <strong>Inflation protection strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Stock investments:</strong> Historically outpace inflation
            over long periods
          </li>
          <li>
            <strong>TIPS bonds:</strong> Treasury Inflation-Protected Securities
            adjust with CPI
          </li>
          <li>
            <strong>Real estate:</strong> Property values and rents typically
            rise with inflation
          </li>
          <li>
            <strong>I Bonds:</strong> Government savings bonds with inflation
            adjustments
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "social-security-retirement-benefits",
    question: "How much will Social Security provide and when can I claim it?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Social Security benefit basics:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Average replacement:</strong> 40% of pre-retirement income
          </li>
          <li>
            <strong>Maximum benefit:</strong> ~$4,555/month at full retirement
            age (2024)
          </li>
          <li>
            <strong>Based on:</strong> Highest 35 years of inflation-adjusted
            earnings
          </li>
          <li>
            <strong>COLA adjustments:</strong> Annual increases based on
            inflation
          </li>
        </ul>
        <p className="mb-2">
          <strong>Claiming age strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Age 62:</strong> Earliest claiming, 25-30% reduction in
            benefits
          </li>
          <li>
            <strong>Full retirement age:</strong> 66-67 depending on birth year,
            100% benefits
          </li>
          <li>
            <strong>Age 70:</strong> Maximum benefits, 132% of full retirement
            amount
          </li>
        </ul>
        <p className="text-sm">
          <strong>Planning tip:</strong> Delaying Social Security from full
          retirement age to 70 increases benefits by 8% per year, providing
          significant lifetime value for healthy individuals.
        </p>
      </>
    ),
  },
  {
    id: "debt-vs-retirement-savings-priority",
    question: "Should I pay off debt or save for retirement first?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Priority order for most people:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Emergency fund:</strong> $1,000 starter emergency fund
          </li>
          <li>
            <strong>Employer match:</strong> Contribute enough to get full
            401(k) match
          </li>
          <li>
            <strong>High-interest debt:</strong> Pay off credit cards, personal
            loans (&gt;7% interest)
          </li>
          <li>
            <strong>Emergency fund:</strong> Build to 3-6 months of expenses
          </li>
          <li>
            <strong>Retirement savings:</strong> Maximize 401(k) and IRA
            contributions
          </li>
          <li>
            <strong>Low-interest debt:</strong> Consider keeping mortgages,
            student loans (&lt;4% interest)
          </li>
        </ol>
        <p className="mb-2">
          <strong>Exception scenarios:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Always get the full employer match - it's an immediate 100% return
          </li>
          <li>
            Very low interest debt (0-3%) can be maintained while investing
          </li>
          <li>
            Older workers may prioritize retirement catch-up contributions
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "retirement-withdrawal-strategies",
    question: "What are the best retirement withdrawal strategies?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Popular withdrawal strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>4% rule:</strong> Fixed percentage with inflation
            adjustments
          </li>
          <li>
            <strong>Bucket strategy:</strong> Divide investments into short,
            medium, long-term buckets
          </li>
          <li>
            <strong>Dynamic withdrawal:</strong> Adjust based on market
            performance and portfolio value
          </li>
          <li>
            <strong>Bond ladder:</strong> Systematic bond maturity schedule for
            predictable income
          </li>
        </ul>
        <p className="mb-2">
          <strong>Tax-efficient withdrawal order:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Taxable accounts:</strong> Withdraw from regular investment
            accounts first
          </li>
          <li>
            <strong>Tax-deferred accounts:</strong> 401(k), traditional IRA
            (required after 73)
          </li>
          <li>
            <strong>Tax-free accounts:</strong> Roth IRA last - preserve
            tax-free growth
          </li>
        </ol>
        <p className="text-sm">
          <strong>Important:</strong> Consider required minimum distributions
          (RMDs) starting at age 73 for traditional retirement accounts.
        </p>
      </>
    ),
  },
  {
    id: "best-retirement-age-planning",
    question: "What's the optimal age to retire?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Key retirement age milestones:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Age 55:</strong> Some 401(k) penalty-free withdrawals if
            separated from service
          </li>
          <li>
            <strong>Age 59½:</strong> Penalty-free retirement account
            withdrawals
          </li>
          <li>
            <strong>Age 62:</strong> Earliest Social Security claiming (reduced
            benefits)
          </li>
          <li>
            <strong>Age 65:</strong> Medicare eligibility begins
          </li>
          <li>
            <strong>Age 66-67:</strong> Full Social Security retirement age
          </li>
          <li>
            <strong>Age 70:</strong> Maximum Social Security benefits
          </li>
        </ul>
        <p className="mb-2">
          <strong>Financial readiness factors:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            25x annual expenses saved (or ability to live on 4% withdrawals)
          </li>
          <li>Healthcare coverage plan until Medicare</li>
          <li>Debt paid off, especially mortgage</li>
          <li>Emergency fund for unexpected retirement expenses</li>
        </ul>
      </>
    ),
  },
];

export default function RetirementFAQ() {
  return (
    <FAQSection
      items={retirementFAQItems}
      title="Frequently Asked Questions About Retirement Planning"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="retirement-calculator-faq-schema"
      relatedLinks={[
        { href: "/investment", label: "Investment Calculator" },
        { href: "/compound-interest", label: "Compound Interest Calculator" },
        { href: "/inflation", label: "Inflation Calculator" },
        { href: "/income-tax", label: "Income Tax Calculator" },
      ]}
    />
  );
}

import FAQSection, { FAQItem } from "../ui/FAQSection";

const interestFAQItems: FAQItem[] = [
  {
    id: "simple-vs-compound-interest-difference",
    question: "What's the difference between simple and compound interest?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Simple Interest:</strong> Calculated only on the original
          principal amount. Formula: Principal × Rate × Time
        </p>
        <p className="mb-2">
          <strong>Compound Interest:</strong> Calculated on principal plus all
          accumulated interest from previous periods.
        </p>
        <p className="mb-2">
          <strong>Example comparison ($1,000 at 8% for 10 years):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Simple Interest:</strong> $1,000 + ($1,000 × 0.08 × 10) =
            $1,800
          </li>
          <li>
            <strong>Compound Interest:</strong> $1,000 × (1.08)^10 = $2,159
          </li>
          <li>
            <strong>Difference:</strong> $359 more with compound interest
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key insight:</strong> The longer the time period and higher
          the interest rate, the greater the advantage of compound interest.
        </p>
      </>
    ),
  },
  {
    id: "compounding-frequency-impact-returns",
    question: "How does compounding frequency dramatically affect my returns?",
    answer: (
      <>
        <p className="mb-2">
          More frequent compounding increases returns, but with diminishing
          effects at higher frequencies.
        </p>
        <p className="mb-2">
          <strong>
            $10,000 at 6% for 20 years with different frequencies:
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Annual:</strong> $32,071 (compound once per year)
          </li>
          <li>
            <strong>Semi-annual:</strong> $32,620 (compound twice per year,
            +$549)
          </li>
          <li>
            <strong>Quarterly:</strong> $32,907 (compound 4x per year, +$836)
          </li>
          <li>
            <strong>Monthly:</strong> $33,102 (compound 12x per year, +$1,031)
          </li>
          <li>
            <strong>Daily:</strong> $33,201 (compound 365x per year, +$1,130)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Practical tip:</strong> While daily is mathematically best,
          the difference from monthly is minimal ($99). Focus on finding the
          highest interest rate available.
        </p>
      </>
    ),
  },
  {
    id: "rule-of-72-doubling-calculator",
    question: "How do I use the Rule of 72 to estimate doubling time?",
    answer: (
      <>
        <p className="mb-2">
          The Rule of 72 provides a quick mental calculation: divide 72 by your
          annual interest rate to estimate years to double.
        </p>
        <p className="mb-2">
          <strong>Rule of 72 examples with verification:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>4% interest:</strong> 72 ÷ 4 = 18 years (actual: 17.7 years)
          </li>
          <li>
            <strong>6% interest:</strong> 72 ÷ 6 = 12 years (actual: 11.9 years)
          </li>
          <li>
            <strong>8% interest:</strong> 72 ÷ 8 = 9 years (actual: 9.0 years)
          </li>
          <li>
            <strong>10% interest:</strong> 72 ÷ 10 = 7.2 years (actual: 7.3
            years)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world application:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>$5,000 emergency fund at 5% APY → $10,000 in ~14.4 years</li>
          <li>$25,000 401(k) at 7% average → $50,000 in ~10.3 years</li>
        </ul>
      </>
    ),
  },
  {
    id: "contribution-timing-impact",
    question: "Should I make contributions at the beginning or end of periods?",
    answer: (
      <>
        <p className="mb-2">
          Contributing at the beginning of each period provides better returns
          because your money earns interest for the entire period.
        </p>
        <p className="mb-2">
          <strong>$500 monthly contribution at 6% for 10 years:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Beginning of month:</strong> $81,940 final value
          </li>
          <li>
            <strong>End of month:</strong> $79,085 final value
          </li>
          <li>
            <strong>Difference:</strong> $2,855 more with beginning
            contributions
          </li>
          <li>
            <strong>Percentage advantage:</strong> 3.6% higher returns
          </li>
        </ul>
        <p className="mb-2">
          <strong>Annual contribution comparison ($6,000 at 7%):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Beginning of year: Extra year of 7% growth = $420 more annually
          </li>
          <li>Over 30 years: Beginning contributions worth ~$57,000 more</li>
        </ul>
      </>
    ),
  },
  {
    id: "taxes-impact-interest-earnings",
    question: "How do taxes dramatically reduce my interest earnings?",
    answer: (
      <>
        <p className="mb-2">
          Taxes on interest earnings can significantly reduce your effective
          returns, making tax strategy crucial.
        </p>
        <p className="mb-2">
          <strong>
            $50,000 investment at 6% annual return (25% tax bracket):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Before taxes:</strong> $3,000 annual interest
          </li>
          <li>
            <strong>Tax owed:</strong> $750 (25% of $3,000)
          </li>
          <li>
            <strong>After-tax return:</strong> $2,250 (effective 4.5% rate)
          </li>
          <li>
            <strong>20-year difference:</strong> $89,542 taxable vs $107,946
            tax-free
          </li>
        </ul>
        <p className="mb-2">
          <strong>Tax-advantaged account strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>401(k)/IRA: Tax-deferred growth, pay taxes on withdrawal</li>
          <li>Roth IRA: Tax-free growth and qualified withdrawals</li>
          <li>HSA: Triple tax advantage (deductible, growth, withdrawals)</li>
        </ul>
      </>
    ),
  },
  {
    id: "inflation-real-returns-purchasing-power",
    question: "How does inflation affect my real returns and purchasing power?",
    answer: (
      <>
        <p className="mb-2">
          Inflation erodes purchasing power over time, making "real returns"
          (after inflation) more important than nominal returns.
        </p>
        <p className="mb-2">
          <strong>Example: $100,000 earning 5% with 3% inflation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Nominal return:</strong> 5% annually
          </li>
          <li>
            <strong>Real return:</strong> ~2% annually (5% - 3% inflation)
          </li>
          <li>
            <strong>After 20 years:</strong> $265,330 nominal value
          </li>
          <li>
            <strong>Purchasing power:</strong> Only $147,010 in today's dollars
          </li>
        </ul>
        <p className="mb-2">
          <strong>Historical inflation impact (3% average):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>$100 today needs $134 in 10 years to buy the same goods</li>
          <li>
            $100 today needs $181 in 20 years to maintain purchasing power
          </li>
          <li>Safe investments earning 2% lose purchasing power over time</li>
        </ul>
      </>
    ),
  },
  {
    id: "regular-contributions-compound-growth",
    question: "How much do regular contributions accelerate compound growth?",
    answer: (
      <>
        <p className="mb-2">
          Regular contributions create a powerful combination of dollar-cost
          averaging and extended compounding periods.
        </p>
        <p className="mb-2">
          <strong>
            Comparison: $20,000 lump sum vs $200/month for 8 years (7% return):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Lump sum:</strong> $20,000 grows to $34,349 in 8 years
          </li>
          <li>
            <strong>Monthly contributions:</strong> $19,200 total invested grows
            to $23,520
          </li>
          <li>
            <strong>Combined approach:</strong> $20,000 lump + $100/month =
            $44,064
          </li>
        </ul>
        <p className="mb-2">
          <strong>
            Small amounts, big impact over time ($100/month at 7%):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>10 years: $17,307 ($12,000 invested + $5,307 growth)</li>
          <li>20 years: $52,397 ($24,000 invested + $28,397 growth)</li>
          <li>30 years: $121,997 ($36,000 invested + $85,997 growth)</li>
        </ul>
      </>
    ),
  },
  {
    id: "best-compound-interest-investments",
    question: "What are the best investments for maximizing compound interest?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Conservative/guaranteed options:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>High-yield savings:</strong> 4-5% APY, FDIC insured, daily
            compounding
          </li>
          <li>
            <strong>CDs:</strong> 4-6% APY, guaranteed returns, penalty for
            early withdrawal
          </li>
          <li>
            <strong>I Bonds:</strong> Inflation protection, 6-month minimum,
            $10K annual limit
          </li>
        </ul>
        <p className="mb-2">
          <strong>Growth-oriented options:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>S&P 500 index funds:</strong> Historical 10% average,
            reinvested dividends
          </li>
          <li>
            <strong>Target-date funds:</strong> Automatic rebalancing, 6-8%
            long-term average
          </li>
          <li>
            <strong>REIT funds:</strong> Real estate exposure, 4-8% dividend
            yields
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key factor:</strong> Choose investments that automatically
          reinvest earnings for true compound growth.
        </p>
      </>
    ),
  },
  {
    id: "when-start-compound-investing-early",
    question: "Why is starting early so crucial for compound interest success?",
    answer: (
      <>
        <p className="mb-2">
          Starting early gives compound interest maximum time to work, creating
          exponential growth in later years.
        </p>
        <p className="mb-2">
          <strong>The power of early starts ($300/month at 8% return):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Start at 22:</strong> $2.3 million by age 65 (43 years)
          </li>
          <li>
            <strong>Start at 32:</strong> $958,000 by age 65 (33 years)
          </li>
          <li>
            <strong>Start at 42:</strong> $367,000 by age 65 (23 years)
          </li>
          <li>
            <strong>Cost of delay:</strong> 10-year delay costs $1.34 million!
          </li>
        </ul>
        <p className="mb-2">
          <strong>Einstein's alleged quote proven ($5,000/year at 7%):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Age 25-35 (10 years), then stop: $1.14 million at 65</li>
          <li>Age 35-65 (30 years): $505,000 at 65</li>
          <li>10 early years outperform 30 later years by $635,000!</li>
        </ul>
      </>
    ),
  },
  {
    id: "compound-interest-calculator-limitations",
    question: "What are the limitations of interest calculators I should know?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Calculator assumptions that may not reflect reality:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Constant interest rates:</strong> Real rates fluctuate with
            economic conditions
          </li>
          <li>
            <strong>Regular contributions:</strong> Life events may interrupt
            planned savings
          </li>
          <li>
            <strong>No withdrawals:</strong> Emergencies may require early
            access to funds
          </li>
          <li>
            <strong>Perfect tax planning:</strong> Tax situations change over
            time
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world factors to consider:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Economic cycles:</strong> Recessions, market crashes, rate
            changes
          </li>
          <li>
            <strong>Personal factors:</strong> Job loss, health issues, family
            changes
          </li>
          <li>
            <strong>Fees and expenses:</strong> Management fees reduce effective
            returns
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best practice:</strong> Use calculators for goal-setting and
          planning, but build in safety margins (lower return assumptions) and
          review plans annually.
        </p>
      </>
    ),
  },
];

export default function InterestFAQSection() {
  return (
    <FAQSection
      items={interestFAQItems}
      title="Frequently Asked Questions About Interest Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="interest-calculator-faq-schema"
      relatedLinks={[
        { href: "/compound-interest", label: "Compound Interest Calculator" },
        { href: "/investment", label: "Investment Calculator" },
        { href: "/retirement", label: "Retirement Calculator" },
        { href: "/savings", label: "Savings Calculator" },
        { href: "/loan", label: "Loan Calculator" },
      ]}
    />
  );
}

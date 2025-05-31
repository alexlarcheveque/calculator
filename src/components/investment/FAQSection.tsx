import FAQSection, { FAQItem } from "../ui/FAQSection";

const investmentFAQItems: FAQItem[] = [
  {
    id: "what-is-compound-interest",
    question: "What is compound interest and how does it work?",
    answer: (
      <>
        <p className="mb-2">
          Compound interest is the interest calculated on both the initial
          principal and accumulated interest from previous periods, creating
          exponential growth over time.
        </p>
        <p className="mb-2">
          <strong>Compound interest example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>$10,000 initial investment</strong> at 7% annual return
          </li>
          <li>
            <strong>Year 1:</strong> $10,000 + $700 interest = $10,700
          </li>
          <li>
            <strong>Year 2:</strong> $10,700 + $749 interest = $11,449
          </li>
          <li>
            <strong>Year 10:</strong> $19,672 (nearly doubled)
          </li>
          <li>
            <strong>Year 20:</strong> $38,697 (nearly quadrupled)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Compounding frequency matters:</strong> Daily compounding vs
          annual can add hundreds or thousands to your returns over decades.
        </p>
      </>
    ),
  },
  {
    id: "realistic-return-rate-expectations",
    question:
      "What are realistic return rate expectations for different investments?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Historical average annual returns (long-term):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>S&P 500 stocks:</strong> 10% (before inflation, including
            dividends)
          </li>
          <li>
            <strong>Diversified stock portfolio:</strong> 7-9% real returns
          </li>
          <li>
            <strong>Bonds (government/corporate):</strong> 4-6% annually
          </li>
          <li>
            <strong>High-yield savings/CDs:</strong> 1-5% (varies with Fed
            rates)
          </li>
          <li>
            <strong>Real estate (REITs):</strong> 6-8% including appreciation
          </li>
        </ul>
        <p className="mb-2">
          <strong>Risk vs return considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Conservative (bonds, CDs): Lower volatility, 3-5% expected returns
          </li>
          <li>
            Moderate (60/40 stocks/bonds): Medium volatility, 6-7% expected
            returns
          </li>
          <li>
            Aggressive (80%+ stocks): Higher volatility, 8-10% expected returns
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "optimal-contribution-frequency-timing",
    question: "What's the optimal contribution frequency and timing?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Contribution frequency comparison:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Monthly contributions:</strong> Better for dollar-cost
            averaging, easier budgeting
          </li>
          <li>
            <strong>Annual contributions:</strong> Slightly higher returns if
            invested early in year
          </li>
          <li>
            <strong>Bi-weekly contributions:</strong> 26 payments = effectively
            13 months of contributions
          </li>
        </ul>
        <p className="mb-2">
          <strong>Timing example ($6,000 annual contribution):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Beginning of period:</strong> $500/month starting January =
            $6,500 end value
          </li>
          <li>
            <strong>End of period:</strong> $500/month starting December =
            $6,275 end value
          </li>
          <li>
            <strong>Difference:</strong> $225 more per year with early
            contributions
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best practice:</strong> Contribute as early and consistently
          as possible. Automate investments to remove timing decisions.
        </p>
      </>
    ),
  },
  {
    id: "time-horizon-impact-investment-growth",
    question: "How does time horizon dramatically impact investment growth?",
    answer: (
      <>
        <p className="mb-2">
          Time is the most powerful factor in wealth building due to compound
          growth acceleration.
        </p>
        <p className="mb-2">
          <strong>$500/month investment at 7% return:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>10 years:</strong> $82,846 total ($60,000 contributions +
            $22,846 growth)
          </li>
          <li>
            <strong>20 years:</strong> $246,192 total ($120,000 contributions +
            $126,192 growth)
          </li>
          <li>
            <strong>30 years:</strong> $612,090 total ($180,000 contributions +
            $432,090 growth)
          </li>
          <li>
            <strong>40 years:</strong> $1,309,962 total ($240,000 contributions
            + $1,069,962 growth)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key insight:</strong> The last 10 years (30-40) generate more
          wealth than the first 30 years combined due to exponential compound
          growth.
        </p>
      </>
    ),
  },
  {
    id: "investment-account-types-tax-implications",
    question:
      "What investment account types should I use and how do taxes affect returns?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Tax-advantaged accounts (prioritize these):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>401(k)/403(b):</strong> Tax-deferred growth, potential
            employer match, $23,000 limit (2024)
          </li>
          <li>
            <strong>Traditional IRA:</strong> Tax-deductible contributions,
            $7,000 limit (2024)
          </li>
          <li>
            <strong>Roth IRA:</strong> Tax-free growth and withdrawals, $7,000
            limit (2024)
          </li>
          <li>
            <strong>HSA:</strong> Triple tax advantage, $4,300 individual limit
            (2024)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Tax impact example (25% tax bracket):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Taxable account: 7% return becomes ~5.25% after taxes on gains
          </li>
          <li>
            Tax-deferred account: Full 7% growth, taxes paid on withdrawal
          </li>
          <li>
            Roth account: Full 7% growth, no taxes on qualified withdrawals
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "dollar-cost-averaging-vs-lump-sum",
    question: "Should I invest a lump sum or use dollar-cost averaging?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Lump sum investing advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Historically superior:</strong> Markets rise ~75% of the
            time
          </li>
          <li>
            <strong>Maximum time in market:</strong> More time for compound
            growth
          </li>
          <li>
            <strong>Example:</strong> $60,000 lump sum vs $5,000/month for 12
            months
          </li>
        </ul>
        <p className="mb-2">
          <strong>Dollar-cost averaging (DCA) advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Emotional benefits:</strong> Reduces regret from poor timing
          </li>
          <li>
            <strong>Risk reduction:</strong> Smooths out market volatility
          </li>
          <li>
            <strong>Budget-friendly:</strong> Easier to manage cash flow
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best approach:</strong> Lump sum for windfall money, DCA for
          regular income. Combine both strategies for optimal results.
        </p>
      </>
    ),
  },
  {
    id: "inflation-impact-real-returns",
    question: "How does inflation affect my real investment returns?",
    answer: (
      <>
        <p className="mb-2">
          Inflation erodes purchasing power, making it crucial to consider real
          (inflation-adjusted) returns for long-term planning.
        </p>
        <p className="mb-2">
          <strong>Nominal vs real returns (3% inflation):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>7% nominal return:</strong> 4% real return after inflation
          </li>
          <li>
            <strong>10% nominal return:</strong> 7% real return after inflation
          </li>
          <li>
            <strong>3% bond return:</strong> 0% real return (breaks even with
            inflation)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Long-term inflation impact example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>$100,000 today needs $134,000 in 10 years (3% inflation)</li>
          <li>$100,000 today needs $180,000 in 20 years (3% inflation)</li>
          <li>
            Stock investments historically outpace inflation by 4-7% annually
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "portfolio-diversification-asset-allocation",
    question: "How should I diversify my investment portfolio?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Age-based asset allocation rule of thumb:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Age 25:</strong> 75% stocks, 25% bonds (aggressive growth)
          </li>
          <li>
            <strong>Age 35:</strong> 65% stocks, 35% bonds (moderate growth)
          </li>
          <li>
            <strong>Age 45:</strong> 55% stocks, 45% bonds (balanced approach)
          </li>
          <li>
            <strong>Age 55:</strong> 45% stocks, 55% bonds (conservative)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Diversification within stocks:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>US large-cap:</strong> 40-50% (S&P 500 index funds)
          </li>
          <li>
            <strong>US small/mid-cap:</strong> 10-20% (higher growth potential)
          </li>
          <li>
            <strong>International developed:</strong> 20-30% (geographic
            diversification)
          </li>
          <li>
            <strong>Emerging markets:</strong> 5-10% (higher risk/reward)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Simple approach:</strong> Target-date funds or three-fund
          portfolio (total stock, international stock, total bond) for instant
          diversification.
        </p>
      </>
    ),
  },
  {
    id: "investment-fees-expense-ratios-impact",
    question: "How do investment fees and expense ratios impact my returns?",
    answer: (
      <>
        <p className="mb-2">
          Investment fees compound negatively over time, significantly reducing
          long-term wealth accumulation.
        </p>
        <p className="mb-2">
          <strong>
            Fee impact example ($100,000 over 30 years at 7% return):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>0.05% expense ratio:</strong> $759,368 final value
          </li>
          <li>
            <strong>0.5% expense ratio:</strong> $663,148 final value
          </li>
          <li>
            <strong>1.5% expense ratio:</strong> $507,931 final value
          </li>
          <li>
            <strong>Cost difference:</strong> $251,437 lost to high fees!
          </li>
        </ul>
        <p className="mb-2">
          <strong>Fee comparison by investment type:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Index funds:</strong> 0.03-0.20% expense ratios
          </li>
          <li>
            <strong>Actively managed funds:</strong> 0.5-2.0% expense ratios
          </li>
          <li>
            <strong>Target-date funds:</strong> 0.1-0.75% expense ratios
          </li>
          <li>
            <strong>Financial advisor fees:</strong> 0.5-1.5% annually
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "investment-calculator-limitations-considerations",
    question:
      "What are the limitations of investment calculators and what should I consider?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Calculator assumptions and limitations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Constant returns:</strong> Assumes steady growth, but
            markets are volatile
          </li>
          <li>
            <strong>No sequence risk:</strong> Doesn't account for poor returns
            early in retirement
          </li>
          <li>
            <strong>Tax simplification:</strong> Doesn't model complex tax
            scenarios
          </li>
          <li>
            <strong>No market crashes:</strong> Doesn't simulate bear markets or
            recessions
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Market volatility:</strong> Returns vary significantly
            year-to-year
          </li>
          <li>
            <strong>Life changes:</strong> Job loss, health issues, family
            changes affect contributions
          </li>
          <li>
            <strong>Behavioral factors:</strong> Panic selling during downturns
            hurts long-term returns
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best use:</strong> Use calculators for general planning and
          goal-setting, but build in safety margins and regularly review your
          strategy with changing circumstances.
        </p>
      </>
    ),
  },
];

export default function InvestmentFAQSection() {
  return (
    <FAQSection
      items={investmentFAQItems}
      title="Frequently Asked Questions About Investment Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="investment-calculator-faq-schema"
      relatedLinks={[
        { href: "/retirement", label: "Retirement Calculator" },
        { href: "/compound-interest", label: "Compound Interest Calculator" },
        { href: "/inflation", label: "Inflation Calculator" },
        { href: "/income-tax", label: "Income Tax Calculator" },
      ]}
      disclaimer={
        <div>
          <h3 className="font-semibold text-blue-900 mb-2">
            Important Disclaimer
          </h3>
          <p className="text-blue-800 text-sm">
            This calculator provides estimates based on the information you
            provide and should not be considered as financial advice. Investment
            returns are not guaranteed and actual results may vary
            significantly. Past performance does not guarantee future results.
            Please consult with a qualified financial advisor before making
            investment decisions.
          </p>
        </div>
      }
    />
  );
}

"use client";

import FAQSection, { FAQItem } from "@/components/ui/FAQSection";

const inflationFAQItems: FAQItem[] = [
  {
    id: "what-is-inflation-impact",
    question: "What is inflation and how does it impact my money?",
    answer: (
      <>
        <p className="mb-2">
          Inflation is the rate at which the general price level of goods and
          services rises, reducing the purchasing power of money over time. When
          inflation occurs, each dollar buys fewer goods and services than
          before.
        </p>
        <p className="mb-2">
          <strong>Real-world example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>$100 in 2000 had the same purchasing power as $175 in 2024</li>
          <li>3% annual inflation means $100 becomes worth $97 next year</li>
          <li>Over 20 years at 3% inflation, $100 loses 45% of its value</li>
        </ul>
        <p>
          This is why long-term financial planning must account for inflation to
          maintain real purchasing power.
        </p>
      </>
    ),
  },
  {
    id: "how-cpi-calculated",
    question: "How is the Consumer Price Index (CPI) calculated?",
    answer: (
      <>
        <p className="mb-2">
          The CPI measures the average change in prices paid by urban consumers
          for a market basket of goods and services, tracked by the U.S. Bureau
          of Labor Statistics.
        </p>
        <p className="mb-2">
          <strong>CPI methodology:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Market basket:</strong> ~80,000 items across 200+ categories
          </li>
          <li>
            <strong>Weight system:</strong> Based on consumer spending patterns
          </li>
          <li>
            <strong>Geographic coverage:</strong> 87 urban areas representing
            93% of U.S. population
          </li>
          <li>
            <strong>Data collection:</strong> Monthly price surveys from
            retailers, service providers
          </li>
        </ul>
        <p className="mb-2">
          <strong>Major CPI categories and weights (2024):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Housing: 33.3% • Transportation: 15.4% • Food: 13.4%</li>
          <li>Medical care: 8.1% • Recreation: 5.2% • Education: 3.0%</li>
        </ul>
      </>
    ),
  },
  {
    id: "accuracy-cpi-calculations",
    question: "How accurate are CPI-based inflation calculations?",
    answer: (
      <>
        <p className="mb-2">
          CPI-based calculations using official BLS data provide highly accurate
          historical inflation measurements, but individual experiences may vary
          significantly.
        </p>
        <p className="mb-2">
          <strong>Factors affecting personal inflation rates:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Geographic location:</strong> Housing costs vary
            dramatically by region
          </li>
          <li>
            <strong>Lifestyle differences:</strong> Young adults vs. retirees
            face different inflation
          </li>
          <li>
            <strong>Income level:</strong> Higher earners may experience lower
            effective inflation
          </li>
          <li>
            <strong>Spending patterns:</strong> Heavy technology users see
            deflation in some categories
          </li>
        </ul>
        <p>
          CPI represents an average across all urban consumers and may not
          reflect your specific situation, but it's the best available benchmark
          for general inflation trends.
        </p>
      </>
    ),
  },
  {
    id: "calculator-types-difference",
    question:
      "What's the difference between the three inflation calculator types?",
    answer: (
      <>
        <p className="mb-2">
          Each calculator serves different purposes for inflation analysis:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm mb-3">
          <li>
            <strong>CPI Data Calculator:</strong> Uses actual historical
            government data for precise calculations between specific dates.
            Best for determining real historical purchasing power changes.
          </li>
          <li>
            <strong>Forward Rate Calculator:</strong> Projects future purchasing
            power using an assumed constant inflation rate. Ideal for financial
            planning and "what-if" scenarios.
          </li>
          <li>
            <strong>Backward Rate Calculator:</strong> Estimates what past
            purchasing power would be worth today using a constant rate. Useful
            for historical comparisons and analysis.
          </li>
        </ul>
        <p>
          <strong>When to use each:</strong> Use CPI for historical accuracy,
          Forward for planning, Backward for historical context.
        </p>
      </>
    ),
  },
  {
    id: "typical-inflation-rates",
    question: "What are typical inflation rates and what's considered normal?",
    answer: (
      <>
        <p className="mb-2">
          <strong>U.S. Historical Inflation Patterns:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Long-term average (1913-2024):</strong> ~3.2% annually
          </li>
          <li>
            <strong>Fed target rate:</strong> 2% (considered optimal for growth)
          </li>
          <li>
            <strong>Post-2008 average:</strong> ~2.1% (unusually low period)
          </li>
          <li>
            <strong>1970s-1980s peak:</strong> Up to 14.8% (1980)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Inflation ranges and meanings:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>0-2%: Low/healthy inflation</li>
          <li>2-4%: Moderate inflation</li>
          <li>4-10%: High inflation</li>
          <li>10%+: Very high inflation/hyperinflation risk</li>
          <li>Negative: Deflation (prices falling)</li>
        </ul>
      </>
    ),
  },
  {
    id: "protect-money-from-inflation",
    question: "How can I protect my money from inflation?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Traditional inflation hedges:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Stocks:</strong> Companies can raise prices, historically
            outpace inflation
          </li>
          <li>
            <strong>Real estate:</strong> Property values and rents typically
            rise with inflation
          </li>
          <li>
            <strong>TIPS:</strong> Treasury Inflation-Protected Securities
            adjust with CPI
          </li>
          <li>
            <strong>Commodities:</strong> Gold, oil, agricultural products often
            rise with inflation
          </li>
        </ul>
        <p className="mb-2">
          <strong>Modern strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>I Bonds:</strong> Government bonds that adjust for inflation
            (up to $10K/year)
          </li>
          <li>
            <strong>Floating-rate debt:</strong> Interest rates adjust with
            inflation
          </li>
          <li>
            <strong>International exposure:</strong> Foreign stocks/bonds in
            different currency zones
          </li>
        </ul>
        <p className="text-sm text-gray-600">
          <strong>Important:</strong> All investments carry risk. Consult
          financial professionals and diversify holdings.
        </p>
      </>
    ),
  },
  {
    id: "why-use-flat-inflation-rates",
    question:
      "Why do forward and backward calculators use flat rates instead of variable rates?",
    answer: (
      <>
        <p className="mb-2">
          Flat rate calculators serve important planning and analytical purposes
          despite real inflation's variability:
        </p>
        <p className="mb-2">
          <strong>Benefits of flat rate modeling:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Financial planning:</strong> Provides consistent baseline
            for retirement/investment planning
          </li>
          <li>
            <strong>Scenario analysis:</strong> Test different "what-if"
            inflation assumptions
          </li>
          <li>
            <strong>Simplicity:</strong> Easier to understand and communicate
            than complex variable models
          </li>
          <li>
            <strong>Conservative planning:</strong> Can use higher rates for
            worst-case scenarios
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world application:</strong> Many financial advisors use
          3% flat rate for planning despite knowing actual inflation varies,
          because it provides a reasonable long-term assumption.
        </p>
      </>
    ),
  },
  {
    id: "cpi-data-frequency-updates",
    question:
      "How often is CPI data updated and how current is this calculator?",
    answer: (
      <>
        <div>
          <p className="mb-2">
            <strong>Official CPI release schedule:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
            <li>
              <strong>Monthly releases:</strong> Typically mid-month for
              previous month
            </li>
            <li>
              <strong>Preliminary data:</strong> Available ~2 weeks after
              month-end
            </li>
            <li>
              <strong>Final data:</strong> Revisions rare but can occur
            </li>
            <li>
              <strong>Annual summaries:</strong> December release includes full
              year
            </li>
          </ul>
          <p className="mb-2">
            <strong>This calculator includes:</strong> Data through the most
            recent available BLS release. For real-time official data, visit{" "}
            <strong>bls.gov/cpi</strong>.
          </p>
          <p>
            <strong>Regional data:</strong> BLS also provides regional CPI data
            for major metropolitan areas, which can differ significantly from
            national averages.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "inflation-vs-deflation",
    question: "What's the difference between inflation and deflation?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Inflation vs. Deflation comparison:</strong>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
          <div>
            <p className="font-semibold mb-2">Inflation (Prices Rising):</p>
            <ul className="space-y-1">
              <li>• Money loses purchasing power</li>
              <li>• Debtors benefit (pay back with cheaper dollars)</li>
              <li>• Savers lose if returns &lt; inflation</li>
              <li>• Economy typically grows</li>
              <li>• Employment often increases</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Deflation (Prices Falling):</p>
            <ul className="space-y-1">
              <li>• Money gains purchasing power</li>
              <li>• Debtors hurt (debt becomes more expensive)</li>
              <li>• Cash holders benefit</li>
              <li>• Economic contraction risk</li>
              <li>• Unemployment may rise</li>
            </ul>
          </div>
        </div>
        <p>
          <strong>Historical context:</strong> The U.S. experienced significant
          deflation during the Great Depression (1930s) and brief deflationary
          periods in 2009 and 2015.
        </p>
      </>
    ),
  },
  {
    id: "inflation-impact-fixed-income",
    question: "How does inflation affect people on fixed incomes?",
    answer: (
      <>
        <p className="mb-2">
          Fixed income recipients face the greatest inflation risk because their
          income doesn't adjust with rising prices, creating a steady erosion of
          purchasing power.
        </p>
        <p className="mb-2">
          <strong>Most affected groups:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Retirees:</strong> Pensions without COLA adjustments lose
            value
          </li>
          <li>
            <strong>Bond investors:</strong> Fixed interest payments buy less
            over time
          </li>
          <li>
            <strong>Minimum wage workers:</strong> Wages often lag inflation
            adjustments
          </li>
          <li>
            <strong>Renters:</strong> May face rapid rent increases in
            high-inflation periods
          </li>
        </ul>
        <p className="mb-2">
          <strong>Protection strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Social Security: Includes annual COLA adjustments</li>
          <li>
            TIPS and I Bonds: Government securities that adjust for inflation
          </li>
          <li>Variable annuities: Can provide inflation-adjusted income</li>
          <li>
            Dividend-growing stocks: Companies that regularly increase payouts
          </li>
        </ul>
      </>
    ),
  },
];

export default function InflationFAQSection() {
  return (
    <FAQSection
      items={inflationFAQItems}
      title="Frequently Asked Questions About Inflation"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="inflation-calculator-faq-schema"
      relatedLinks={[
        { href: "/investment", label: "Investment Calculator" },
        { href: "/retirement", label: "Retirement Calculator" },
        { href: "/compound-interest", label: "Compound Interest Calculator" },
        { href: "/income-tax", label: "Income Tax Calculator" },
      ]}
    />
  );
}

import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const protectionStrategiesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Protecting against inflation requires a multi-faceted approach combining smart investment choices, strategic financial planning, and practical money management. The key is diversification across asset classes and strategies that can outpace or adjust with inflation over time.",
  },
  {
    type: "subheader",
    heading: "Traditional Inflation Hedges",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Stocks and Equity Investments",
        description:
          "Companies can raise prices with inflation and have historically provided returns above inflation over long periods. Focus on quality companies with pricing power and strong competitive moats.",
      },
      {
        title: "Real Estate",
        description:
          "Property values and rental income typically rise with inflation. Consider direct ownership, REITs, or real estate crowdfunding platforms for exposure to this inflation hedge.",
      },
      {
        title: "Commodities",
        description:
          "Gold, oil, agricultural products, and other commodities often appreciate during inflationary periods. Can be accessed through ETFs, futures, or commodity-focused mutual funds.",
      },
      {
        title: "Treasury Inflation-Protected Securities (TIPS)",
        description:
          "Government bonds that adjust principal and interest payments based on CPI changes. Provide direct inflation protection but may have lower returns during low inflation periods.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Modern Investment Strategies",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "I Bonds (Series I Savings Bonds)",
        description:
          "Government savings bonds that adjust for inflation with no risk of principal loss. Limited to $10,000 per person annually but offer excellent inflation protection for smaller amounts",
      },
      {
        label: "Floating Rate Debt",
        description:
          "Bonds and loans with interest rates that adjust with market conditions. Bank loans, floating rate notes, and variable rate CDs can provide protection against rising rates",
      },
      {
        label: "International Diversification",
        description:
          "Foreign stocks and bonds can provide exposure to different inflation environments. Some countries may experience lower inflation or currency appreciation",
      },
      {
        label: "Inflation-Linked Corporate Bonds",
        description:
          "Some corporations issue bonds with inflation adjustments. These can offer higher yields than TIPS while still providing inflation protection",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Sector-Specific Strategies",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Inflation-Resistant Investment Sectors",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">
                Historically outperform during inflation:
              </p>
              <ul className="space-y-1">
                <li>
                  • <strong>Energy:</strong> Oil, gas, renewable energy
                  companies
                </li>
                <li>
                  • <strong>Materials:</strong> Mining, chemicals, construction
                  materials
                </li>
                <li>
                  • <strong>Consumer staples:</strong> Food, beverages,
                  household products
                </li>
                <li>
                  • <strong>Utilities:</strong> Regulated companies that can
                  pass through costs
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">
                May struggle during high inflation:
              </p>
              <ul className="space-y-1">
                <li>
                  • <strong>Growth technology:</strong> High-valuation companies
                </li>
                <li>
                  • <strong>Long-term bonds:</strong> Fixed payments lose value
                </li>
                <li>
                  • <strong>High-dividend stocks:</strong> If dividends don't
                  adjust
                </li>
                <li>
                  • <strong>Cash equivalents:</strong> Unless rates exceed
                  inflation
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Financial Planning Approaches",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Debt Management",
        description:
          "Fixed-rate debt becomes cheaper to repay during inflation. Consider locking in low fixed rates on mortgages and other major loans while avoiding variable rate debt.",
      },
      {
        title: "Emergency Fund Strategy",
        description:
          "Keep emergency funds in high-yield savings or short-term CDs that can adjust with rates. Consider laddering CDs or using money market funds that benefit from rising rates.",
      },
      {
        title: "Income Planning",
        description:
          "Pursue careers with inflation-adjustment potential. Develop skills that are in demand and can command higher wages as the economy grows.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Practical Protection Techniques",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "success",
      title: "Everyday Inflation Defense Strategies",
      content: (
        <div>
          <p className="mb-2">
            <strong>Smart shopping and lifestyle adjustments:</strong>
          </p>
          <ul className="space-y-2 text-sm mb-3">
            <li>
              • <strong>Bulk purchasing:</strong> Buy non-perishables in bulk
              when prices are low
            </li>
            <li>
              • <strong>Generic substitutes:</strong> Switch to store brands to
              combat food inflation
            </li>
            <li>
              • <strong>Energy efficiency:</strong> Invest in efficiency to
              reduce utility cost impact
            </li>
            <li>
              • <strong>Transportation alternatives:</strong> Consider public
              transit, cycling, or remote work
            </li>
          </ul>
          <p className="mb-2">
            <strong>Timing strategies:</strong>
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              • Lock in fixed-rate services (gym memberships, subscriptions)
            </li>
            <li>
              • Prepay for services likely to increase (insurance, property
              taxes)
            </li>
            <li>• Time major purchases before anticipated price increases</li>
            <li>• Negotiate inflation escalators in contracts you receive</li>
          </ul>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Asset Allocation Guidelines",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Age-Based Allocation",
        description:
          "Younger investors can emphasize growth stocks and real estate for long-term inflation protection. Older investors might focus more on TIPS, I Bonds, and inflation-adjusted income sources",
      },
      {
        label: "Risk Tolerance Considerations",
        description:
          "Conservative investors should prioritize TIPS and I Bonds despite lower returns. Aggressive investors can emphasize stocks, REITs, and commodity exposure",
      },
      {
        label: "Time Horizon Planning",
        description:
          "Short-term needs should stay in inflation-adjusted cash equivalents. Long-term goals can use more volatile but potentially higher-returning inflation hedges",
      },
      {
        label: "Rebalancing Strategy",
        description:
          "Regularly review and rebalance based on inflation expectations. Increase inflation hedges when inflation is expected to rise, reduce when it's expected to fall",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Common Mistakes to Avoid",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Inflation Protection Pitfalls",
      content: (
        <div>
          <ul className="space-y-2 text-sm">
            <li>
              • <strong>Over-concentrating in one hedge:</strong> Diversify
              across multiple inflation-protection strategies
            </li>
            <li>
              • <strong>Timing the market:</strong> Maintain consistent
              allocation rather than trying to predict inflation peaks
            </li>
            <li>
              • <strong>Ignoring deflation risk:</strong> Some hedges perform
              poorly if deflation occurs instead
            </li>
            <li>
              • <strong>High fees:</strong> Avoid expensive actively-managed
              funds that may not justify their costs
            </li>
            <li>
              • <strong>Short-term focus:</strong> Inflation protection works
              best over longer time periods
            </li>
            <li>
              • <strong>All-or-nothing approach:</strong> Gradual implementation
              often works better than dramatic shifts
            </li>
          </ul>
        </div>
      ),
    },
  },
];

export default function ProtectionStrategies() {
  return (
    <InfoCard
      title="Inflation Protection Strategies"
      sections={protectionStrategiesSections}
    />
  );
}

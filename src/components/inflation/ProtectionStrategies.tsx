import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const protectionStrategiesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Protecting against inflation requires diversification across asset classes and strategies that can outpace or adjust with inflation over time.",
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
        title: "Stocks and Equities",
        description:
          "Companies can raise prices with inflation. Focus on quality companies with pricing power.",
      },
      {
        title: "Real Estate",
        description:
          "Property values and rental income typically rise with inflation. Consider REITs for easier access.",
      },
      {
        title: "Commodities",
        description:
          "Gold, oil, and agricultural products often appreciate during inflation. Access through ETFs.",
      },
      {
        title: "TIPS Bonds",
        description:
          "Treasury Inflation-Protected Securities adjust payments with CPI changes for direct protection.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Financial Planning",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Debt Management",
        description:
          "Lock in fixed-rate debt before rates rise. Avoid variable rate debt during inflation.",
      },
      {
        title: "Emergency Funds",
        description:
          "Use high-yield savings or short-term CDs that adjust with rising rates.",
      },
      {
        title: "Income Planning",
        description:
          "Develop skills in demand that can command inflation-adjusted wages over time.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Practical Tips",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Smart Shopping",
        description:
          "Buy non-perishables in bulk, use store brands, and invest in energy efficiency.",
      },
      {
        label: "Transportation",
        description:
          "Consider public transit, cycling, or remote work to reduce transportation costs.",
      },
      {
        label: "Service Contracts",
        description:
          "Lock in fixed-rate services and prepay for likely price increases when possible.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Common Mistakes",
      content: (
        <div>
          <ul className="space-y-2 text-sm">
            <li>
              • <strong>Over-concentrating:</strong> Diversify across multiple
              strategies
            </li>
            <li>
              • <strong>Market timing:</strong> Maintain consistent allocation
            </li>
            <li>
              • <strong>High fees:</strong> Avoid expensive actively-managed
              funds
            </li>
            <li>
              • <strong>Short-term focus:</strong> Inflation protection works
              best long-term
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

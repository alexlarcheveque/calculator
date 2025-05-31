import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const inflationBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Inflation represents the gradual increase in prices of goods and services over time, reducing the purchasing power of money. Understanding inflation is crucial for financial planning, investment decisions, and preserving wealth in the long term.",
  },
  {
    type: "subheader",
    heading: "What Is Inflation?",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Economic Definition",
        description:
          "Inflation is the sustained increase in the general price level of goods and services in an economy over time. It represents the decline in purchasing power of a currency.",
      },
      {
        title: "Practical Impact",
        description:
          "When inflation occurs, each dollar you own buys fewer goods and services than before. This affects everything from groceries to housing costs to investment returns.",
      },
      {
        title: "Measurement Period",
        description:
          "Inflation is typically measured annually but can be calculated for any time period. Short-term fluctuations are common, but long-term trends matter most for planning.",
      },
      {
        title: "Economic Necessity",
        description:
          "Moderate inflation (around 2%) is actually healthy for economic growth, encouraging spending and investment while avoiding the risks of deflation.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "How Inflation Is Measured",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Consumer Price Index (CPI)",
        description:
          "Most widely used measure tracking prices of a market basket of goods and services purchased by urban consumers. Covers housing, transportation, food, medical care, recreation, education, and more",
      },
      {
        label: "Producer Price Index (PPI)",
        description:
          "Measures average changes in selling prices received by domestic producers. Often considered a leading indicator of consumer price changes",
      },
      {
        label: "Personal Consumption Expenditures (PCE)",
        description:
          "Federal Reserve's preferred measure, slightly different methodology than CPI. Generally shows lower inflation rates and better captures substitution effects",
      },
      {
        label: "Core Inflation",
        description:
          "Excludes volatile food and energy prices to show underlying inflation trends. Used by policymakers to make more stable decisions",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Types of Inflation",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Inflation Categories by Cause",
      content: (
        <div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-1">Demand-Pull Inflation:</p>
              <p className="mb-2">
                Occurs when demand for goods exceeds supply capacity
              </p>
              <p className="text-xs text-gray-600">
                Example: Post-pandemic surge in goods demand
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Cost-Push Inflation:</p>
              <p className="mb-2">
                Rising production costs force businesses to raise prices
              </p>
              <p className="text-xs text-gray-600">
                Example: Oil price increases affecting transportation
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Built-In Inflation:</p>
              <p className="mb-2">
                Expectations of future inflation become self-fulfilling
              </p>
              <p className="text-xs text-gray-600">
                Example: Workers demanding higher wages anticipating price rises
              </p>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Inflation Calculation Principles",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "tip",
      title: "Basic Inflation Formulas",
      content: (
        <div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-1">Inflation Rate Calculation:</p>
              <p className="font-mono bg-gray-100 p-2 rounded mb-1">
                Inflation Rate = ((Current Price - Past Price) / Past Price) ×
                100
              </p>
              <p className="text-xs text-gray-600">
                Example: ($110 - $100) / $100 × 100 = 10% inflation
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Future Value with Inflation:</p>
              <p className="font-mono bg-gray-100 p-2 rounded mb-1">
                Future Value = Present Value × (1 + inflation rate)^years
              </p>
              <p className="text-xs text-gray-600">
                Example: $100 × (1.03)^10 = $134.39 after 10 years at 3%
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Real vs. Nominal Value:</p>
              <p className="font-mono bg-gray-100 p-2 rounded mb-1">
                Real Value = Nominal Value / (1 + inflation rate)^years
              </p>
              <p className="text-xs text-gray-600">
                Determines purchasing power in today's dollars
              </p>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Historical Context",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Great Depression (1930s)",
        description:
          "Severe deflation occurred with prices falling dramatically. Unemployment reached 25% and economic output collapsed, showing the dangers of deflation.",
      },
      {
        title: "Great Inflation (1970s-80s)",
        description:
          "Inflation peaked at 14.8% in 1980 due to oil crises and monetary policy. Led to high interest rates and economic recession to combat inflation.",
      },
      {
        title: "Modern Era (1990s-2020s)",
        description:
          "Generally low and stable inflation around 2-3% annually. Recent pandemic-era surge showed inflation can return quickly during economic disruption.",
      },
    ],
  },
];

export default function InflationBasics() {
  return (
    <InfoCard
      title="Understanding Inflation Fundamentals"
      sections={inflationBasicsSections}
    />
  );
}

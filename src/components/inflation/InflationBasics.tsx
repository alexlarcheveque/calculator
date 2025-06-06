import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const inflationBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Inflation reduces the purchasing power of money over time. Understanding inflation is essential for financial planning and protecting your wealth.",
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
          "Sustained increase in the general price level of goods and services, reducing currency purchasing power.",
      },
      {
        title: "Practical Impact",
        description:
          "Each dollar buys fewer goods and services over time, affecting groceries, housing, and investment returns.",
      },
      {
        title: "Measurement Period",
        description:
          "Typically measured annually, though short-term fluctuations are common. Long-term trends matter most.",
      },
      {
        title: "Economic Role",
        description:
          "Moderate inflation (~2%) is healthy for economic growth while avoiding deflation risks.",
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
          "Tracks prices of consumer goods and services including housing, transportation, food, and medical care.",
      },
      {
        label: "Core Inflation",
        description:
          "Excludes volatile food and energy prices to show underlying inflation trends for policy decisions.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Types of Inflation",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Demand-Pull Inflation",
        description:
          "Occurs when demand exceeds supply capacity. Example: Post-pandemic goods demand surge.",
      },
      {
        label: "Cost-Push Inflation",
        description:
          "Rising production costs force businesses to raise prices. Example: Oil price increases.",
      },
      {
        label: "Built-In Inflation",
        description:
          "Expectations of future inflation become self-fulfilling through wage and price increases.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Basic Inflation Formulas",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 1,
    gridItems: [
      {
        title: "Inflation Rate",
        description: "Calculate the percentage change in prices over time",
      },
      {
        title: "Future Value",
        description: "Determine what money will be worth in the future",
      },
      {
        title: "Real Value",
        description: "Find the purchasing power in today's dollars",
      },
    ],
  },
  {
    type: "text",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Inflation Rate</h4>
          <code className="text-sm font-mono text-gray-800">
            ((Current Price - Past Price) / Past Price) × 100
          </code>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Future Value</h4>
          <code className="text-sm font-mono text-gray-800">
            Present Value × (1 + inflation rate)^years
          </code>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Real Value</h4>
          <code className="text-sm font-mono text-gray-800">
            Nominal Value / (1 + inflation rate)^years
          </code>
        </div>
      </div>
    ),
  },
  {
    type: "subheader",
    heading: "Historical Context",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Great Inflation (1970s-80s)",
        description:
          "Inflation peaked at 14.8% in 1980, leading to high interest rates and recession.",
      },
      {
        title: "Modern Era (1990s-2020s)",
        description:
          "Generally stable 2-3% inflation. Recent pandemic surge showed inflation can return quickly.",
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

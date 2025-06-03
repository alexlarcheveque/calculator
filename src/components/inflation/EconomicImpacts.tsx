import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const economicImpactsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Inflation affects different sectors of the economy and groups of people in dramatically different ways. Understanding these varied impacts helps you make better financial decisions and protect yourself from inflation's negative effects while potentially benefiting from its positive aspects.",
  },
  {
    type: "subheader",
    heading: "Impact on Different Groups",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Fixed Income Recipients",
        description:
          "Retirees, pensioners, and bondholders face the greatest inflation risk. Their income doesn't adjust with rising prices, steadily eroding purchasing power over time.",
      },
      {
        title: "Debtors (Borrowers)",
        description:
          "Those with fixed-rate debt benefit from inflation. They repay loans with dollars that are worth less than when they borrowed, effectively reducing their real debt burden.",
      },
      {
        title: "Workers with Flexible Wages",
        description:
          "Employees whose wages adjust with inflation or who can change jobs for higher pay may keep pace with or even benefit from moderate inflation through wage growth.",
      },
      {
        title: "Asset Owners",
        description:
          "Real estate and stock owners often benefit as asset prices typically rise with or ahead of inflation, preserving or increasing real wealth over time.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Effects on Asset Classes",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Cash and Savings Accounts",
        description:
          "Lose purchasing power if interest rates are below inflation. Money sitting in low-yield accounts becomes worth less over time in real terms",
      },
      {
        label: "Bonds and Fixed Income",
        description:
          "Existing bonds lose value as new bonds offer higher rates. However, Treasury Inflation-Protected Securities (TIPS) adjust payments with inflation",
      },
      {
        label: "Stocks and Equities",
        description:
          "Companies can often raise prices to match inflation, potentially maintaining profit margins. Stock prices historically outpace inflation over long periods",
      },
      {
        label: "Real Estate",
        description:
          "Property values and rental income typically rise with inflation. Real estate is considered one of the best inflation hedges over the long term",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Sectoral Inflation Variations",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Uneven Inflation Across Categories (Recent Examples)",
      content: (
        <div>
          <p className="mb-2">
            <strong>High inflation sectors (2022-2024):</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
            <div>
              <p className="font-semibold mb-2">Above-average inflation:</p>
              <ul className="space-y-1">
                <li>• Housing: Rent, home prices</li>
                <li>• Energy: Gasoline, utilities</li>
                <li>• Food: Groceries, restaurants</li>
                <li>• Services: Healthcare, education</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Below-average or deflation:</p>
              <ul className="space-y-1">
                <li>• Technology: Computers, electronics</li>
                <li>• Vehicles: Used cars (after 2022 peak)</li>
                <li>• Communications: Phone, internet</li>
                <li>• Some goods: Furniture, clothing</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            Personal inflation rates vary significantly based on spending
            patterns
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Geographic and Demographic Variations",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Urban vs. Rural",
        description:
          "Urban areas often see higher housing inflation but better access to competitive pricing. Rural areas may face higher transportation costs and limited competition.",
      },
      {
        title: "Regional Differences",
        description:
          "West Coast and Northeast typically experience higher inflation rates, especially for housing. Some regions may see deflation in specific categories.",
      },
      {
        title: "Age-Based Impact",
        description:
          "Young adults face higher education and housing inflation. Older adults experience more healthcare inflation but may have lower transportation costs.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Business and Investment Implications",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "success",
      title: "How Businesses Respond to Inflation",
      content: (
        <div>
          <p className="mb-2">
            <strong>Common business strategies during inflation:</strong>
          </p>
          <ul className="space-y-2 text-sm mb-3">
            <li>
              • <strong>Price increases:</strong> Pass costs to consumers, but
              risk losing market share
            </li>
            <li>
              • <strong>Cost management:</strong> Improve efficiency, automate
              processes, renegotiate contracts
            </li>
            <li>
              • <strong>Inventory management:</strong> Buy materials early to
              avoid higher future costs
            </li>
            <li>
              • <strong>Debt utilization:</strong> Take on fixed-rate debt that
              becomes cheaper to repay
            </li>
          </ul>
          <p className="mb-2">
            <strong>Investment sector performance during inflation:</strong>
          </p>
          <ul className="space-y-1 text-sm">
            <li>• Energy and commodities: Often outperform</li>
            <li>• Real estate and REITs: Generally benefit</li>
            <li>• Technology growth stocks: May underperform initially</li>
            <li>
              • Financial services: May benefit from higher interest rates
            </li>
          </ul>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Monetary Policy Responses",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Federal Reserve Actions",
        description:
          "The Fed typically raises interest rates to combat high inflation, making borrowing more expensive and saving more attractive to cool economic demand",
      },
      {
        label: "Government Fiscal Policy",
        description:
          "Government may reduce spending or increase taxes during high inflation, though political constraints often limit these actions",
      },
      {
        label: "International Coordination",
        description:
          "Global inflation may require coordinated central bank responses, as unilateral actions can affect currency values and trade balances",
      },
      {
        label: "Timeline for Effect",
        description:
          "Monetary policy changes typically take 12-18 months to fully impact inflation, creating lag times between policy changes and economic results",
      },
    ],
  },
];

export default function EconomicImpacts() {
  return (
    <InfoCard
      title="Economic Impacts of Inflation"
      sections={economicImpactsSections}
    />
  );
}

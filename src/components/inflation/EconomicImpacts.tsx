import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const economicImpactsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Inflation affects different groups and sectors in dramatically different ways. Understanding these impacts helps you make better financial decisions.",
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
          "Retirees and bondholders face the greatest risk as their income doesn't adjust with rising prices.",
      },
      {
        title: "Debtors (Borrowers)",
        description:
          "Benefit from inflation by repaying loans with dollars worth less than when borrowed.",
      },
      {
        title: "Flexible Wage Workers",
        description:
          "Employees with adjustable wages may keep pace with or benefit from moderate inflation.",
      },
      {
        title: "Asset Owners",
        description:
          "Real estate and stock owners often benefit as asset prices typically rise with inflation.",
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
        label: "Cash and Savings",
        description:
          "Lose purchasing power when interest rates are below inflation rates.",
      },
      {
        label: "Stocks and Bonds",
        description:
          "Stocks can raise prices with inflation and historically outpace it. Bonds lose value unless inflation-protected like TIPS.",
      },
      {
        label: "Real Estate",
        description:
          "Property values and rental income typically rise with inflation, making it a strong hedge.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Sector Variations",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "High Inflation Sectors",
        description:
          "Housing, energy, food, and services typically experience above-average inflation.",
      },
      {
        title: "Low Inflation Sectors",
        description:
          "Technology, communications, and some consumer goods often see below-average inflation.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Business Response",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Pricing Strategies",
        description:
          "Companies pass costs to consumers but risk market share loss. Focus on efficiency improvements.",
      },
      {
        label: "Investment Performance",
        description:
          "Energy and commodities outperform. Real estate and REITs benefit. Tech stocks may underperform.",
      },
      {
        label: "Financial Management",
        description:
          "Businesses take fixed-rate debt and buy inventory early to avoid higher future costs.",
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

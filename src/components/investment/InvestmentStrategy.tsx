import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const investmentStrategySections: ContentSection[] = [
  {
    type: "text",
    content:
      "While our calculator provides valuable estimates for fixed-return investments, real-world investing requires understanding market dynamics, risk management, and strategic planning to achieve long-term financial success.",
  },
  {
    type: "subheader",
    heading: "Important Investment Considerations",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Market Volatility",
        description:
          "Real investment returns fluctuate significantly year-to-year. The stock market can have negative returns in some years and exceptional gains in others.",
      },
      {
        title: "Inflation Impact",
        description:
          "Your purchasing power decreases over time due to inflation. A 7% return when inflation is 3% gives you a real return of about 4%.",
      },
      {
        title: "Tax Implications",
        description:
          "Different account types (401k, IRA, taxable) have varying tax treatments that significantly affect your actual returns and withdrawal strategies.",
      },
      {
        title: "Risk vs. Return",
        description:
          "Higher potential returns typically come with higher risk. Conservative investments offer stability but lower returns over long periods.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Smart Investment Strategies",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Diversification",
        description:
          "Spread investments across different asset classes (stocks, bonds, real estate) to reduce risk while maintaining growth potential.",
      },
      {
        label: "Dollar-Cost Averaging",
        description:
          "Invest the same amount regularly regardless of market conditions. This reduces the impact of market volatility over time.",
      },
      {
        label: "Asset Allocation",
        description:
          "Balance your portfolio based on age, risk tolerance, and goals. Younger investors can typically take more risk for higher potential returns.",
      },
      {
        label: "Regular Rebalancing",
        description:
          "Periodically adjust your portfolio to maintain your target allocation as market movements change your investment mix.",
      },
      {
        label: "Tax-Advantaged Accounts",
        description:
          "Maximize contributions to 401(k)s, IRAs, and other tax-deferred accounts before investing in taxable accounts.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Setting Realistic Expectations",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Conservative (2-4%)",
        description:
          "Savings accounts, CDs, government bonds. Low risk, low return, good for emergency funds and short-term goals.",
      },
      {
        title: "Moderate (4-7%)",
        description:
          "Balanced mix of stocks and bonds. Moderate risk and return, suitable for medium-term goals and risk-averse investors.",
      },
      {
        title: "Aggressive (7-10%+)",
        description:
          "Heavy stock allocation or growth investments. Higher volatility but potentially greater long-term returns for patient investors.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Remember",
      content:
        "This calculator provides estimates based on fixed returns. Actual investment performance varies significantly. Always consult with a qualified financial advisor and diversify your investments to manage risk appropriately.",
    },
  },
];

export default function InvestmentStrategy() {
  return (
    <InfoCard
      title="Investment Strategy & Risk Management"
      sections={investmentStrategySections}
    />
  );
}

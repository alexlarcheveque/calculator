import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const interestRateFactorsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Interest rates aren't set arbitrarily—they're influenced by a complex web of economic factors, personal financial circumstances, and market conditions. Understanding these factors can help you make better financial decisions and potentially secure better rates.",
  },
  {
    type: "subheader",
    heading: "Economic Factors",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Federal Reserve Policy",
        description:
          "The Federal Reserve sets the federal funds rate, which influences all other interest rates in the economy. When the Fed raises rates, borrowing becomes more expensive across the board.",
      },
      {
        title: "Inflation Rates",
        description:
          "Higher inflation typically leads to higher interest rates as lenders need to maintain their real return. The Fed often raises rates to combat inflation.",
      },
      {
        title: "Economic Growth",
        description:
          "Strong economic growth can lead to higher interest rates as demand for credit increases. Conversely, economic slowdowns often result in lower rates.",
      },
      {
        title: "Government Debt",
        description:
          "High government debt levels can influence interest rates through their impact on bond yields and investor confidence in the economy.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Personal Financial Factors",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      "Your personal financial profile significantly impacts the interest rates you'll be offered by lenders:",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Credit Score",
        description:
          "Higher credit scores typically qualify for lower interest rates. A score above 740 usually gets the best rates.",
      },
      {
        label: "Debt-to-Income Ratio",
        description:
          "Lower debt relative to income suggests better ability to repay, leading to more favorable rates.",
      },
      {
        label: "Employment History",
        description:
          "Stable employment and consistent income history demonstrate reliability to lenders.",
      },
      {
        label: "Down Payment Size",
        description:
          "Larger down payments reduce lender risk and often result in lower interest rates.",
      },
      {
        label: "Loan-to-Value Ratio",
        description:
          "Lower LTV ratios (borrowing less relative to asset value) typically qualify for better rates.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Loan-Specific Factors",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Loan Term Length",
        description:
          "Shorter loan terms typically have lower interest rates but higher monthly payments. Longer terms mean higher rates but lower monthly payments.",
      },
      {
        title: "Loan Amount",
        description:
          "Very large loans (jumbo loans) and very small loans may have different rate structures than standard loan amounts.",
      },
      {
        title: "Loan Type",
        description:
          "Different types of loans (conventional, FHA, VA, etc.) have different risk profiles and corresponding interest rates.",
      },
      {
        title: "Points and Fees",
        description:
          "Paying points upfront can reduce your interest rate. One point typically equals 1% of the loan amount and reduces the rate by 0.25%.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Rate Shopping Tips",
      content: (
        <div className="space-y-2 mt-2">
          <p>
            • <strong>Compare multiple lenders:</strong> Rates can vary
            significantly between lenders
          </p>
          <p>
            • <strong>Get quotes within 14-45 days:</strong> Multiple credit
            inquiries count as one if done within this window
          </p>
          <p>
            • <strong>Consider the total cost:</strong> Look at APR, not just
            the interest rate
          </p>
          <p>
            • <strong>Improve your profile:</strong> Work on credit score and
            reduce debt before applying
          </p>
        </div>
      ),
    },
  },
];

export default function InterestRateFactors() {
  return (
    <InfoCard
      title="What Affects Interest Rates?"
      sections={interestRateFactorsSections}
    />
  );
}

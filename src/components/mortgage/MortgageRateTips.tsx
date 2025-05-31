import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const mortgageRateTipsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Getting the best mortgage rate can save you thousands of dollars over the life of your loan. Here are proven strategies to help you secure the most competitive rate possible.",
  },
  {
    type: "subheader",
    heading: "Essential Rate Optimization Tips",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Improve Your Credit Score",
        description:
          "Pay down existing debt, avoid new credit inquiries, and ensure credit reports are accurate",
      },
      {
        label: "Save for a Larger Down Payment",
        description:
          "20% down payment eliminates PMI and demonstrates financial strength to lenders",
      },
      {
        label: "Shop Multiple Lenders",
        description:
          "Compare rates, fees, and terms from banks, credit unions, and online lenders",
      },
      {
        label: "Consider Mortgage Points",
        description:
          "Paying points upfront can lower your interest rate if you plan to stay in the home long-term",
      },
      {
        label: "Get Pre-approved",
        description:
          "Pre-approval shows sellers you're a serious buyer and can close quickly",
      },
      {
        label: "Lock Your Rate",
        description:
          "Rate locks protect against rate increases during the loan processing period",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Additional Money-Saving Strategies",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Time Your Application",
        description:
          "Apply when rates are favorable and avoid major financial changes during the process. Keep your employment and debt levels stable.",
      },
      {
        title: "Consider Different Loan Programs",
        description:
          "Explore FHA, VA, USDA, or state first-time buyer programs that may offer better rates or terms for your situation.",
      },
      {
        title: "Negotiate Closing Costs",
        description:
          "Ask lenders to waive or reduce fees, or consider a slightly higher rate in exchange for lender credits toward closing costs.",
      },
      {
        title: "Maintain Strong Finances",
        description:
          "Keep consistent income, avoid large purchases, and maintain steady bank account balances during the application process.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Calculator Tip",
      content:
        "Use our mortgage calculator above to see exactly how different rates and down payment amounts affect your monthly payments. Even a 0.25% rate difference can save thousands over the loan term.",
    },
  },
];

export default function MortgageRateTips() {
  return (
    <InfoCard
      title="Getting the Best Mortgage Rate"
      sections={mortgageRateTipsSections}
    />
  );
}

import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const autoLoanCostFactorsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Beyond the sticker price, many additional costs affect your total auto loan expense. Understanding these factors helps you budget accurately and avoid surprises at closing.",
  },
  {
    type: "subheader",
    heading: "Additional Costs to Consider",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Sales Tax",
        description:
          "Varies by state from 0% to 10%+. Some states allow you to finance sales tax as part of your loan, while others require payment upfront.",
      },
      {
        title: "Title & Registration Fees",
        description:
          "State-mandated fees for vehicle title transfer and registration. These typically range from $50 to several hundred dollars depending on your state.",
      },
      {
        title: "Documentation Fees",
        description:
          "Dealer charges for processing paperwork, usually $100-$500. Some states cap these fees, while others allow dealers to charge whatever they want.",
      },
      {
        title: "Destination Charges",
        description:
          "Manufacturer fee for shipping the vehicle from factory to dealer, typically $900-$1,500. This fee is usually non-negotiable.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Money-Saving Strategies",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Larger Down Payment",
        description:
          "Reduces loan amount, monthly payments, and total interest. Aim for 10-20% down to avoid being underwater on the loan",
      },
      {
        label: "Shorter Loan Terms",
        description:
          "Higher monthly payments but significantly less total interest. A 36-month loan costs much less than 72 months overall",
      },
      {
        label: "Trade-In Tax Benefits",
        description:
          "In most states, you only pay sales tax on the difference between new car price and trade value, saving hundreds or thousands",
      },
      {
        label: "Manufacturer Incentives",
        description:
          "Look for cash rebates, low APR offers, or special financing. Sometimes 0% financing beats taking a cash rebate",
      },
      {
        label: "End-of-Year Timing",
        description:
          "Shop for previous model year vehicles or time purchases for end-of-month/quarter when dealers need to meet quotas",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Cash vs. Financing Decision",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Consider Paying Cash When:",
        description:
          "You have plenty of emergency savings remaining, interest rates are high (above 6-7%), or you want to avoid monthly payments and own the car outright.",
      },
      {
        title: "Consider Financing When:",
        description:
          "You can get very low rates (0-3%), want to preserve cash for investments or emergencies, or need to build credit history with on-time payments.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "tip",
      title: "Pro Tip",
      content:
        "Use our calculator to compare total costs with different down payments and loan terms. Sometimes a slightly higher monthly payment saves thousands in total interest.",
    },
  },
];

export default function AutoLoanCostFactors() {
  return (
    <InfoCard
      title="Auto Loan Costs & Savings Strategies"
      sections={autoLoanCostFactorsSections}
    />
  );
}

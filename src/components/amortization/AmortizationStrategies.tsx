import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const amortizationStrategiesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Paying off your loan faster can save thousands in interest payments and free up your financial future. Here are proven strategies to accelerate your loan payoff and build wealth more quickly.",
  },
  {
    type: "subheader",
    heading: "Extra Payment Strategies",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Monthly Extra Principal",
        description:
          "Add a fixed amount to your monthly payment that goes directly toward principal. Even $50-100 extra monthly can save years off your loan term.",
      },
      {
        title: "Annual Lump Sum",
        description:
          "Use tax refunds, bonuses, or windfalls to make large principal payments once or twice a year. This strategy provides maximum interest savings.",
      },
      {
        title: "Bi-Weekly Payments",
        description:
          "Split your monthly payment in half and pay every two weeks. This results in 26 payments (13 months worth) each year instead of 12.",
      },
      {
        title: "Round-Up Method",
        description:
          "Round your payment up to the nearest $50 or $100. This small increase creates significant long-term savings with minimal budget impact.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Smart Timing Strategies",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Early Years Focus",
        description:
          "Extra payments in the first 5-10 years provide maximum impact since more goes toward interest reduction",
      },
      {
        label: "Rate Drop Opportunities",
        description:
          "When rates fall, keep making the same payment amount rather than reducing to the new minimum",
      },
      {
        label: "Income Increase Strategy",
        description:
          "When you get a raise, apply the increase directly to your loan payment before lifestyle inflation sets in",
      },
      {
        label: "Refinance with Shorter Term",
        description:
          "If rates drop significantly, refinance to a shorter term (15-year vs 30-year) for faster payoff",
      },
      {
        label: "Recasting Your Loan",
        description:
          "Make a large principal payment and ask your lender to recalculate (recast) your payment schedule",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Before Making Extra Payments",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Emergency Fund",
        description:
          "Ensure you have 3-6 months of expenses saved before accelerating loan payments",
      },
      {
        label: "High-Interest Debt",
        description:
          "Pay off credit cards and other high-interest debt first, as they typically have higher rates than mortgages",
      },
      {
        label: "Employer 401(k) Match",
        description:
          "Maximize any employer matching contributions before making extra loan payments",
      },
      {
        label: "Investment Opportunity Cost",
        description:
          "Consider whether investing the extra money could provide higher returns than your loan interest rate",
      },
    ],
  },
];

export default function AmortizationStrategies() {
  return (
    <InfoCard
      title="Strategies to Pay Off Loans Faster"
      sections={amortizationStrategiesSections}
    />
  );
}

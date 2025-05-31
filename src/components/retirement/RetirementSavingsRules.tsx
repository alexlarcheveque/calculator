import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const retirementSavingsRulesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "How much should you save for retirement? While this depends on individual circumstances, financial experts have developed several helpful rules of thumb to guide your retirement planning and ensure you're on track.",
  },
  {
    type: "subheader",
    heading: "Popular Retirement Savings Rules",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "10-15% Rule",
        description:
          "Save 10-15% of your pre-tax income annually during working years. Someone earning $50,000 should save $5,000-$7,500 yearly. Starting at age 25, this can build a $1 million nest egg by retirement.",
      },
      {
        title: "80% Replacement Rule",
        description:
          "Plan to need 70-80% of your pre-retirement income to maintain your lifestyle. If you earned $100,000 working, you'd need $70,000-$80,000 annually in retirement from all sources combined.",
      },
      {
        title: "4% Withdrawal Rule",
        description:
          "Withdraw 4% of your retirement savings in year one, then adjust for inflation. If you need $100,000 annually, you'd need $2.5 million saved ($100,000 ÷ 4% = $2.5M).",
      },
      {
        title: "25x Annual Expenses",
        description:
          "Save 15-25 times your desired annual retirement income. This rule provides a cushion for market volatility and helps ensure your money lasts throughout retirement.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Age-Based Savings Milestones",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "By Age 30",
        description:
          "Have 1x your annual salary saved (if you earn $50,000, have $50,000 saved)",
      },
      {
        label: "By Age 40",
        description:
          "Have 3x your annual salary saved (3x current income in retirement accounts)",
      },
      {
        label: "By Age 50",
        description:
          "Have 6x your annual salary saved (you can also make catch-up contributions at this age)",
      },
      {
        label: "By Age 60",
        description:
          "Have 8x your annual salary saved (you're in the home stretch of retirement planning)",
      },
      {
        label: "By Age 67",
        description:
          "Have 10x your annual salary saved (this should support 80% income replacement)",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Factors That Affect Your Savings Target",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Lifestyle Goals",
        description:
          "Modest retirement requires less savings than luxury travel and dining. Define your retirement vision to set appropriate targets.",
      },
      {
        title: "Health & Longevity",
        description:
          "Family history of longevity means you need money to last longer. Plan for healthcare costs that increase with age.",
      },
      {
        title: "Other Income Sources",
        description:
          "Social Security, pensions, or part-time work reduce required personal savings. Factor in all expected income streams.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "tip",
      title: "Start Where You Are",
      content:
        "These are guidelines, not rigid requirements. If you're behind, don't get discouraged - start saving what you can now and increase contributions when possible. Use our calculator to create a personalized plan.",
    },
  },
];

export default function RetirementSavingsRules() {
  return (
    <InfoCard
      title="How Much to Save for Retirement"
      sections={retirementSavingsRulesSections}
    />
  );
}

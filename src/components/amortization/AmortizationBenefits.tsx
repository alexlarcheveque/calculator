import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const amortizationBenefitsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Understanding your loan's amortization schedule provides powerful insights that can save you thousands of dollars and help you make smarter financial decisions throughout your loan term.",
  },
  {
    type: "subheader",
    heading: "Financial Benefits",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Interest Savings Awareness",
        description:
          "See exactly how much interest you're paying each month and over the loan's lifetime. This knowledge motivates strategic extra payments.",
      },
      {
        title: "Payment Timing Optimization",
        description:
          "Understand when extra payments have maximum impact. Early payments reduce more interest than later payments.",
      },
      {
        title: "Equity Building Visibility",
        description:
          "Track how much equity you're building each month and when you'll reach important milestones like 20% equity.",
      },
      {
        title: "Refinancing Decision Support",
        description:
          "Know your exact payoff timeline to evaluate whether refinancing makes financial sense based on remaining term.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Strategic Planning Advantages",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Budget Planning",
        description:
          "Plan for future cash flow by knowing exactly when your loan will be paid off",
      },
      {
        label: "Investment Decisions",
        description:
          "Compare the guaranteed return of extra payments vs. potential investment returns",
      },
      {
        label: "Tax Planning",
        description:
          "Track deductible interest payments for tax purposes and plan for when deductions will decrease",
      },
      {
        label: "Major Purchase Timing",
        description:
          "Plan major life events around your loan payoff timeline and increased cash flow",
      },
      {
        label: "Estate Planning",
        description:
          "Understand your debt obligations and how accelerated payments affect your financial legacy",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Psychological Benefits",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Progress Visualization",
        description:
          "Watch your principal balance decrease and see tangible progress toward financial freedom.",
      },
      {
        title: "Goal Setting",
        description:
          "Set specific payoff targets and create actionable plans to achieve them faster.",
      },
      {
        title: "Stress Reduction",
        description:
          "Eliminate uncertainty about your loan by understanding exactly where you stand.",
      },
      {
        title: "Motivation Building",
        description:
          "See the compound effect of extra payments to stay motivated about debt elimination.",
      },
    ],
  },
];

export default function AmortizationBenefits() {
  return (
    <InfoCard
      title="Benefits of Understanding Amortization"
      sections={amortizationBenefitsSections}
    />
  );
}

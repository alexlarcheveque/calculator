import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const refinanceInfoSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Loan refinancing involves taking out a new loan, usually with more favorable terms, in order to pay off an old one. Terms and conditions of refinancing vary widely. Refinancing is more commonly associated with home mortgages, car loans, or student loans.",
  },
  {
    type: "subheader",
    heading: "Common Reasons to Refinance",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Save Money",
        description:
          "If interest rates have decreased since you got your original loan, refinancing can help you secure a lower rate and save money on interest costs.",
      },
      {
        title: "Need Cash",
        description:
          "Cash-out refinancing allows you to borrow against your home's equity and receive cash for home improvements, debt consolidation, or other expenses.",
      },
      {
        title: "Lower Payments",
        description:
          "Extending your loan term through refinancing can reduce your monthly payments, providing more breathing room in your budget.",
      },
      {
        title: "Shorten the Loan",
        description:
          "Refinancing to a shorter term can help you pay off your loan faster and save significantly on total interest paid.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Refinance Costs to Consider",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Application Fee",
        description: "Typically 1% of the loan amount",
      },
      {
        label: "Home Appraisal",
        description: "Usually a few hundred dollars",
      },
      {
        label: "Origination Fee/Points",
        description: "Normally 0-2% of the loan amount",
      },
      {
        label: "Title Search",
        description: "A few hundred dollars for title verification",
      },
      {
        label: "Recording Fees",
        description: "County/city paperwork handling charges",
      },
      {
        label: "Inspection Fees",
        description: "Property condition evaluation costs",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Important",
      content:
        "Consider the break-even point when refinancing. This is how long it will take for your monthly savings to offset the closing costs. If you plan to move before reaching the break-even point, refinancing may not be beneficial.",
    },
  },
];

export default function RefinanceInfo() {
  return (
    <InfoCard
      title="What is Loan Refinancing?"
      sections={refinanceInfoSections}
    />
  );
}

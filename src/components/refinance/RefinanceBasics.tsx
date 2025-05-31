import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const refinanceBasicsSections: ContentSection[] = [
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
];

export default function RefinanceBasics() {
  return (
    <InfoCard
      title="What is Loan Refinancing?"
      sections={refinanceBasicsSections}
    />
  );
}

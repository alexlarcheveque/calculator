import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const refinanceCostsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Understanding the costs associated with refinancing is crucial for determining whether it makes financial sense. These upfront expenses must be weighed against the potential long-term savings.",
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
    type: "subheader",
    heading: "Break-Even Analysis",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      "The break-even point is the time it takes for your monthly savings to offset the closing costs. To calculate this, divide your total closing costs by your monthly payment savings. For example, if closing costs are $3,000 and you save $150/month, your break-even point is 20 months.",
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

export default function RefinanceCosts() {
  return (
    <InfoCard
      title="Refinancing Costs & Break-Even Analysis"
      sections={refinanceCostsSections}
    />
  );
}

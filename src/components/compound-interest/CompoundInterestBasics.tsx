import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const compoundInterestBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Interest is the cost of using borrowed money or the return earned on invested money. Understanding the difference between simple and compound interest is crucial for making informed financial decisions and maximizing your wealth-building potential.",
  },
  {
    type: "subheader",
    heading: "Simple vs. Compound Interest",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Simple Interest",
        description:
          "Interest earned only on the principal (original amount). The interest stays constant each period. Formula: Principal × Rate × Time",
      },
      {
        title: "Compound Interest",
        description:
          "Interest earned on both principal AND accumulated interest from previous periods. This creates exponential growth over time.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Compound Interest Example",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "neutral",
      title: "Real-World Example",
      content: (
        <div>
          <p className="mb-3">
            If you invest $1,000 at 10% interest for 2 years:
          </p>

          <div className="mb-4">
            <p className="font-medium mb-2">Simple Interest:</p>
            <ul className="list-disc list-inside text-sm mb-2 ml-4">
              <li>Year 1: $1,000 × 10% = $100 → Balance: $1,100</li>
              <li>Year 2: $1,000 × 10% = $100 → Balance: $1,200</li>
            </ul>
          </div>

          <div className="mb-4">
            <p className="font-medium mb-2">Compound Interest:</p>
            <ul className="list-disc list-inside text-sm mb-2 ml-4">
              <li>Year 1: $1,000 × 10% = $100 → Balance: $1,100</li>
              <li>Year 2: $1,100 × 10% = $110 → Balance: $1,210</li>
            </ul>
          </div>

          <p className="font-medium text-green-700 border-t pt-3">
            Result: Compound interest produces $10 extra ($1,210 vs $1,200).
            This advantage grows exponentially over longer time periods.
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Why Compound Interest Matters",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Exponential Growth",
        description:
          "The longer your money compounds, the faster it grows. This exponential effect becomes dramatic over decades",
      },
      {
        label: "Time is Critical",
        description:
          "Starting early gives your money more time to compound. Even small amounts invested young can outperform larger amounts invested later",
      },
      {
        label: "Reinvestment Power",
        description:
          "Automatically reinvesting dividends, interest, and gains maximizes the compounding effect",
      },
      {
        label: "The Rule of 72",
        description:
          "Divide 72 by your interest rate to estimate how long it takes to double your money. At 6%, money doubles in about 12 years",
      },
    ],
  },
];

export default function CompoundInterestBasics() {
  return (
    <InfoCard
      title="Understanding Compound Interest"
      sections={compoundInterestBasicsSections}
    />
  );
}

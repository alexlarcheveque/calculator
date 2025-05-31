import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const interestBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Interest is the compensation paid for the use of money over time. Understanding different types of interest calculations is essential for making informed financial decisions about savings, investments, and loans.",
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
          "Calculated only on the principal amount. Interest stays constant each period. Formula: Principal × Rate × Time. Rarely used in modern finance.",
      },
      {
        title: "Compound Interest",
        description:
          "Calculated on principal plus accumulated interest. Creates exponential growth as interest earns interest. Used in most savings and investment accounts.",
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
      type: "info",
      title: "The Power of Compounding",
      content: (
        <div>
          <p className="mb-2">
            $100 invested at 10% annual interest for 2 years:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">Simple Interest:</p>
              <p>Year 1: $100 + $10 = $110</p>
              <p>Year 2: $110 + $10 = $120</p>
              <p className="font-medium">Total: $120</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Compound Interest:</p>
              <p>Year 1: $100 × 1.10 = $110</p>
              <p>Year 2: $110 × 1.10 = $121</p>
              <p className="font-medium">Total: $121</p>
            </div>
          </div>
          <p className="mt-2 text-center font-medium">
            Compound advantage: $1 extra
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Key Interest Concepts",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Principal",
        description:
          "The initial amount of money invested or borrowed before any interest is added",
      },
      {
        label: "Interest Rate",
        description:
          "The percentage charged on the principal, typically expressed as an annual rate",
      },
      {
        label: "Time Period",
        description:
          "The length of time the money is invested or borrowed, affecting total interest earned",
      },
      {
        label: "Compounding Frequency",
        description:
          "How often interest is calculated and added to the balance (annual, monthly, daily, etc.)",
      },
    ],
  },
];

export default function InterestBasicsCard() {
  return (
    <InfoCard
      title="Understanding Interest Calculations"
      sections={interestBasicsSections}
    />
  );
}

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
    type: "text",
    content: (
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h4 className="font-semibold text-lg mb-4 text-gray-800">
          Example: $1,000 invested at 8% annual interest for 10 years
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h5 className="font-semibold text-md mb-3 text-red-700">
              Simple Interest
            </h5>
            <div className="space-y-1 text-sm">
              <p>
                Interest per year: $1,000 × 8% ={" "}
                <span className="font-medium">$80</span>
              </p>
              <p>
                Total interest: $80 × 10 years ={" "}
                <span className="font-medium">$800</span>
              </p>
              <p>
                Principal + Interest ={" "}
                <span className="font-medium">$1,800</span>
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-200">
              <p className="font-semibold text-red-700">Final Amount: $1,800</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h5 className="font-semibold text-md mb-3 text-green-700">
              Compound Interest
            </h5>
            <div className="space-y-1 text-sm">
              <p>Formula: $1,000 × (1.08)^10</p>
              <p>
                Growth factor: <span className="font-medium">2.159</span>
              </p>
              <p>
                Final calculation: <span className="font-medium">$2,159</span>
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-200">
              <p className="font-semibold text-green-700">
                Final Amount: $2,159
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
            <span className="text-green-800 font-semibold">
              💰 Compound Advantage: $359 extra (20% more!)
            </span>
          </div>
        </div>
      </div>
    ),
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

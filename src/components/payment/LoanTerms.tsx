import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const loanTermsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Loan term length dramatically affects both your monthly payment amount and total interest costs. Understanding the trade-offs helps you choose the right balance between affordability and long-term savings.",
  },
  {
    type: "subheader",
    heading: "Short-Term vs. Long-Term Loans",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Short-Term Loans (10-15 years)",
        description:
          "Higher monthly payments but significantly lower total interest costs. Best for those with stable income who want to build equity quickly and save money long-term.",
      },
      {
        title: "Long-Term Loans (25-30 years)",
        description:
          "Lower monthly payments but higher total interest costs. Better for those who need payment flexibility or want to free up cash flow for other investments.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Common Loan Term Options",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "15-Year Mortgage",
        description:
          "Popular choice offering significant interest savings (often 50% less total interest than 30-year) with manageable payment increases",
      },
      {
        label: "30-Year Mortgage",
        description:
          "Standard option providing lowest monthly payments and maximum flexibility, though with higher total costs",
      },
      {
        label: "Auto Loans (3-7 years)",
        description:
          "Shorter terms (3-4 years) minimize interest but increase payments. Longer terms (6-7 years) risk owing more than car's value",
      },
      {
        label: "Personal Loans (2-7 years)",
        description:
          "Typically shorter terms due to higher rates. Longer terms available but increase total cost significantly",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Term Length Decision Framework",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Choose Shorter Terms If:",
        description:
          "Stable income, minimal other debt, want to build equity fast, plan to stay long-term, comfortable with higher payments.",
      },
      {
        title: "Choose Longer Terms If:",
        description:
          "Variable income, other high-priority debts, need payment flexibility, investment opportunities available, prefer liquidity.",
      },
      {
        title: "Hybrid Strategy:",
        description:
          "Take longer term for flexibility but make extra payments when possible. Gives you options while still allowing accelerated payoff.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Real Impact Example",
    headingLevel: "h4",
  },
  {
    type: "text",
    content: (
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h4 className="font-semibold text-lg mb-4 text-gray-800">
          $200,000 mortgage at 6% interest:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h5 className="font-semibold text-md mb-3 text-green-700">
              15-Year Term
            </h5>
            <div className="space-y-1 text-sm">
              <p>
                Monthly Payment: <span className="font-medium">$1,687</span>
              </p>
              <p>
                Total Interest: <span className="font-medium">$103,788</span>
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-200">
              <p className="font-semibold text-green-700">
                Better Long-term Value
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h5 className="font-semibold text-md mb-3 text-red-700">
              30-Year Term
            </h5>
            <div className="space-y-1 text-sm">
              <p>
                Monthly Payment: <span className="font-medium">$1,199</span>
              </p>
              <p>
                Total Interest: <span className="font-medium">$231,676</span>
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-200">
              <p className="font-semibold text-red-700">Higher Total Cost</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
            <span className="text-green-800 font-semibold">
              💰 Savings with 15-year: $127,888 in interest
            </span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function LoanTerms() {
  return (
    <InfoCard
      title="Loan Terms & Payment Impact"
      sections={loanTermsSections}
    />
  );
}

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
    type: "callout",
    callout: {
      type: "info",
      title: "Real Impact Example",
      content: (
        <div>
          <p className="mb-2">$200,000 mortgage at 6% interest:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">15-Year Term:</p>
              <p>Monthly Payment: $1,687</p>
              <p>Total Interest: $103,788</p>
            </div>
            <div>
              <p className="font-semibold">30-Year Term:</p>
              <p>Monthly Payment: $1,199</p>
              <p>Total Interest: $231,676</p>
            </div>
          </div>
          <p className="mt-2 font-medium text-center">
            Savings with 15-year: $127,888 in interest
          </p>
        </div>
      ),
    },
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

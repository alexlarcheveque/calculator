import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const interestRateStrategiesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Getting the best possible interest rate can save you thousands of dollars over the life of a loan. Whether you're applying for a new loan or managing existing debt, these strategies can help you secure better rates and reduce your overall borrowing costs.",
  },
  {
    type: "subheader",
    heading: "Before You Apply",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "✅ Build Your Credit Score",
        description:
          "Pay bills on time, reduce credit utilization below 30%, and avoid opening new accounts before applying. Even a 20-point increase can significantly impact your rate.",
      },
      {
        title: "✅ Reduce Debt-to-Income Ratio",
        description:
          "Pay down existing debts and avoid taking on new obligations. Lenders prefer DTI ratios below 36% for the best rates.",
      },
      {
        title: "✅ Save for a Larger Down Payment",
        description:
          "A 20% down payment often qualifies for the best rates and eliminates PMI. Even an extra 5% can improve your rate.",
      },
      {
        title: "✅ Shop Around",
        description:
          "Get quotes from at least 3-4 lenders within a 45-day window. Rates can vary by 0.5% or more between lenders.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Refinancing Strategies",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      "Refinancing can be a powerful tool to reduce your interest costs, but timing and strategy matter:",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Rate and Term Refinance",
        description:
          "Replace your current loan with a new one at a lower rate or different term. Best when rates have dropped 0.75% or more.",
      },
      {
        label: "Cash-Out Refinance",
        description:
          "Borrow more than you owe and take the difference in cash. Useful for home improvements or debt consolidation.",
      },
      {
        label: "Break-Even Analysis",
        description:
          "Calculate how long it takes for monthly savings to offset closing costs. Generally, plan to stay in the home for at least this long.",
      },
      {
        label: "Credit Improvement Refinance",
        description:
          "If your credit has improved significantly since your original loan, you may qualify for much better rates.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Negotiation Tactics",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Leverage Competing Offers",
        description:
          "Use offers from other lenders to negotiate better terms. Many lenders will match or beat competitor rates for qualified borrowers.",
      },
      {
        title: "Consider Points vs. Rate",
        description:
          "Evaluate whether paying discount points upfront makes sense based on how long you plan to keep the loan.",
      },
      {
        title: "Bundle Services",
        description:
          "Some lenders offer rate discounts for existing customers or for bundling services like checking accounts.",
      },
      {
        title: "Timing Your Application",
        description:
          "Apply when your financial profile is strongest and consider seasonal factors that might affect lender capacity.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Common Refinancing Mistakes",
      content: (
        <div className="space-y-2 mt-2">
          <p>
            ❌ <strong>Only focusing on rate:</strong> Consider closing costs,
            loan terms, and total cost
          </p>
          <p>
            ❌ <strong>Refinancing too often:</strong> Each refinance has costs
            that may outweigh benefits
          </p>
          <p>
            ❌ <strong>Extending loan terms:</strong> Lower payments might mean
            higher total interest costs
          </p>
          <p>
            ❌ <strong>Cashing out equity frivolously:</strong> Your home isn't
            an ATM—use equity wisely
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Alternative Loan Strategies",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Bi-Weekly Payments",
        description:
          "Making payments every two weeks instead of monthly results in 26 payments per year, effectively making one extra payment and reducing total interest.",
      },
      {
        title: "Extra Principal Payments",
        description:
          "Adding extra money to principal each month can significantly reduce the loan term and total interest paid.",
      },
      {
        title: "ARM vs. Fixed Strategy",
        description:
          "Consider adjustable-rate mortgages if you plan to move or refinance within the initial fixed period.",
      },
      {
        title: "Shorter Loan Terms",
        description:
          "15-year loans typically have rates 0.5-0.75% lower than 30-year loans, plus you'll pay much less total interest.",
      },
    ],
  },
];

export default function InterestRateStrategies() {
  return (
    <InfoCard
      title="Interest Rate Optimization Strategies"
      sections={interestRateStrategiesSections}
    />
  );
}

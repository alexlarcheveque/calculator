import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const paymentStrategiesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Different payment strategies can significantly impact your total interest costs and loan payoff timeline. Choose strategies that align with your financial goals, cash flow situation, and overall debt management plan.",
  },
  {
    type: "subheader",
    heading: "Payment Frequency Strategies",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Bi-Weekly Payments",
        description:
          "Pay half your monthly payment every two weeks (26 payments = 13 monthly payments per year). This extra payment can cut 4-6 years off a 30-year mortgage.",
      },
      {
        title: "Extra Principal Payments",
        description:
          "Add extra money to your regular payment that goes directly toward principal. Even $50-100 extra monthly can save thousands in interest.",
      },
      {
        title: "Annual Lump Sum",
        description:
          "Use tax refunds, bonuses, or windfalls to make large principal payments once or twice per year for significant interest savings.",
      },
      {
        title: "Round-Up Payments",
        description:
          "Round your payment up to the nearest $50 or $100. This simple strategy can shave years off your loan with minimal budget impact.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Payment Prioritization Framework",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "1. High-Interest Debt First",
        description:
          "Pay minimums on all loans, but focus extra payments on highest interest rate debt (typically credit cards at 18-25%)",
      },
      {
        label: "2. Emergency Fund",
        description:
          "Build 3-6 months of expenses in savings before aggressively paying down low-interest debt like mortgages",
      },
      {
        label: "3. Employer Match",
        description:
          "Maximize employer 401k matching before extra loan payments - it's guaranteed 50-100% return",
      },
      {
        label: "4. Tax-Advantaged Accounts",
        description:
          "Consider maxing 401k/IRA contributions before paying extra on low-interest loans, especially if you're in a high tax bracket",
      },
    ],
  },
  {
    type: "subheader",
    heading: "When to Avoid Extra Payments",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Consider These Factors",
      content: (
        <div>
          <ul className="space-y-2 text-sm">
            <li>
              • <strong>Low interest rates:</strong> If your loan rate is below
              4-5%, investing extra money may yield better returns
            </li>
            <li>
              • <strong>Tax deductions:</strong> Mortgage interest deduction may
              make keeping the loan beneficial
            </li>
            <li>
              • <strong>Liquidity needs:</strong> Loan payments can't be undone
              - keep adequate emergency funds
            </li>
            <li>
              • <strong>Investment opportunities:</strong> Compare guaranteed
              loan savings vs. potential investment returns
            </li>
          </ul>
        </div>
      ),
    },
  },
];

export default function PaymentStrategies() {
  return (
    <InfoCard
      title="Payment Strategies & Optimization"
      sections={paymentStrategiesSections}
    />
  );
}

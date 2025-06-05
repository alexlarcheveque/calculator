import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const amortizationBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Amortization is the process of gradually paying off a debt through regular payments over time. Each payment typically includes both principal (the amount borrowed) and interest (the cost of borrowing). Early in the loan term, most of your payment goes toward interest, but over time, more goes toward reducing the principal balance.",
  },
  {
    type: "subheader",
    heading: "How Amortization Works",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Interest Front-Loaded",
        description:
          "In the early years, most of your payment goes toward interest because interest is calculated on the remaining balance, which is highest at the beginning.",
      },
      {
        title: "Principal Acceleration",
        description:
          "As you pay down the balance, less interest accrues each month, so more of your payment goes toward principal, accelerating payoff.",
      },
      {
        title: "Fixed Payment Schedule",
        description:
          "With a fixed-rate loan, your total monthly payment stays the same throughout the loan term, only the allocation between principal and interest changes.",
      },
      {
        title: "Compound Effect",
        description:
          "The more principal you pay early, the less interest you'll pay overall because interest compounds on the remaining balance.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Types of Amortizing Loans",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Mortgage Loans",
        description:
          "Home loans typically amortized over 15 or 30 years with fixed or adjustable rates",
      },
      {
        label: "Auto Loans",
        description:
          "Vehicle financing usually amortized over 3-7 years with fixed monthly payments",
      },
      {
        label: "Personal Loans",
        description:
          "Unsecured loans often amortized over 2-7 years for debt consolidation or major purchases",
      },
      {
        label: "Student Loans",
        description:
          "Education loans typically amortized over 10-25 years with various repayment options",
      },
      {
        label: "Business Loans",
        description:
          "Commercial financing can be amortized over various terms depending on the purpose and collateral",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Calculator Benefit",
      content:
        "Use our amortization calculator above to see exactly how your payments are allocated between principal and interest each month. Understanding this breakdown helps you make informed decisions about extra payments and refinancing.",
    },
  },
];

export default function AmortizationBasics() {
  return (
    <InfoCard
      title="Understanding Loan Amortization"
      sections={amortizationBasicsSections}
    />
  );
}

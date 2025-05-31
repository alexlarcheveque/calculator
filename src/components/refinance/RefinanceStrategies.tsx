import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const refinanceStrategiesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Successful refinancing requires strategic timing and preparation. These proven strategies can help you maximize your savings and secure the best possible terms for your new loan.",
  },
  {
    type: "subheader",
    heading: "When to Consider Refinancing",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Interest Rates Drop",
        description:
          "Generally worth considering when rates are 0.5-1% lower than your current rate, though even smaller drops can be beneficial depending on your situation.",
      },
      {
        title: "Credit Score Improved",
        description:
          "If your credit score has increased significantly since your original loan, you may qualify for better rates and terms.",
      },
      {
        title: "Change Loan Terms",
        description:
          "Switch from adjustable to fixed-rate, change loan duration, or eliminate PMI when you reach 20% equity.",
      },
      {
        title: "Access Home Equity",
        description:
          "Cash-out refinancing can provide funds for home improvements, debt consolidation, or other major expenses.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Refinancing Best Practices",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Shop Multiple Lenders",
        description:
          "Get quotes from at least 3-4 lenders to compare rates, fees, and terms",
      },
      {
        label: "Lock Your Rate",
        description:
          "Secure your interest rate once you find a good deal to protect against market fluctuations",
      },
      {
        label: "Prepare Documentation",
        description:
          "Gather recent pay stubs, tax returns, bank statements, and current mortgage information",
      },
      {
        label: "Consider No-Closing-Cost Options",
        description:
          "Some lenders offer no-cost refinancing in exchange for a slightly higher interest rate",
      },
      {
        label: "Time Your Application",
        description:
          "Apply when your financial situation is stable and avoid major purchases during the process",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Calculator Tip",
      content:
        "Use our refinance calculator above to compare your current mortgage payments with potential new loan terms. This helps you evaluate whether refinancing makes sense for your specific situation.",
    },
  },
];

export default function RefinanceStrategies() {
  return (
    <InfoCard
      title="Refinancing Strategies & Best Practices"
      sections={refinanceStrategiesSections}
    />
  );
}

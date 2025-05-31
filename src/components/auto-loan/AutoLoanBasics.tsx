import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const autoLoanBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "An auto loan is a secured loan specifically designed to help you purchase a vehicle. The vehicle itself serves as collateral, which typically results in lower interest rates compared to unsecured loans. Understanding how auto loans work can help you make better financing decisions and save money.",
  },
  {
    type: "subheader",
    heading: "How Auto Loans Work",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Secured by Vehicle",
        description:
          "The car, truck, or SUV you're purchasing serves as collateral for the loan. This security allows lenders to offer lower interest rates than unsecured loans.",
      },
      {
        title: "Fixed Monthly Payments",
        description:
          "Most auto loans have fixed monthly payments that include both principal and interest. Your payment amount stays the same throughout the loan term.",
      },
      {
        title: "Common Loan Terms",
        description:
          "Typical auto loan terms range from 36 to 84 months (3-7 years). Shorter terms mean higher monthly payments but less total interest paid.",
      },
      {
        title: "Interest Rates Vary",
        description:
          "Rates depend on your credit score, loan term, vehicle age, and market conditions. New cars often qualify for better rates than used vehicles.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Key Auto Loan Components",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Vehicle Price",
        description:
          "The total cost of the car including any dealer-installed options",
      },
      {
        label: "Down Payment",
        description:
          "Upfront cash payment that reduces your loan amount and monthly payments",
      },
      {
        label: "Trade-in Value",
        description:
          "Credit applied from your current vehicle toward the new purchase",
      },
      {
        label: "Loan Amount",
        description: "Vehicle price minus down payment and trade-in value",
      },
      {
        label: "Annual Percentage Rate (APR)",
        description:
          "The total cost of the loan including interest and fees, expressed annually",
      },
      {
        label: "Loan Term",
        description:
          "The length of time you have to repay the loan, typically 3-7 years",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Calculator Tip",
      content:
        "Use our auto loan calculator above to see how different down payment amounts, loan terms, and interest rates affect your monthly payment and total loan cost.",
    },
  },
];

export default function AutoLoanBasics() {
  return (
    <InfoCard
      title="Understanding Auto Loans"
      sections={autoLoanBasicsSections}
    />
  );
}

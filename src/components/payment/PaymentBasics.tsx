import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const paymentBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Loan payments are structured to pay off both principal and interest over a set period. Understanding how payments work helps you make informed decisions about loan terms, payment amounts, and overall borrowing strategy.",
  },
  {
    type: "subheader",
    heading: "How Loan Payments Work",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Fixed vs. Variable Payments",
        description:
          "Most loans have fixed monthly payments that stay the same throughout the loan term. This makes budgeting easier and provides payment predictability.",
      },
      {
        title: "Principal and Interest",
        description:
          "Each payment includes both principal (reducing loan balance) and interest (cost of borrowing). The ratio changes over time but the total payment stays the same.",
      },
      {
        title: "Payment Schedule",
        description:
          "Payments are typically made monthly, though some loans offer bi-weekly or other schedules. More frequent payments can reduce total interest costs.",
      },
      {
        title: "Payment Calculation",
        description:
          "Payments are calculated using loan amount, interest rate, and term length to ensure the loan is fully paid off by the end of the term.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Payment Components Breakdown",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Principal Portion",
        description:
          "The amount that goes toward paying down your loan balance. This portion increases over time as interest decreases",
      },
      {
        label: "Interest Portion",
        description:
          "The cost of borrowing money, calculated on the remaining balance. This portion decreases over time as the balance gets smaller",
      },
      {
        label: "Escrow (if applicable)",
        description:
          "For mortgages, may include property taxes and insurance. This keeps these costs bundled with your housing payment",
      },
      {
        label: "PMI/MIP (if applicable)",
        description:
          "Private Mortgage Insurance or Mortgage Insurance Premium for loans with less than 20% down payment",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Early Payment Advantage",
      content:
        "Since early payments have more interest and less principal, making extra payments early in the loan term has the greatest impact on reducing total interest costs. Even small extra amounts can save thousands over the loan life.",
    },
  },
];

export default function PaymentBasics() {
  return (
    <InfoCard
      title="Understanding Loan Payments"
      sections={paymentBasicsSections}
    />
  );
}

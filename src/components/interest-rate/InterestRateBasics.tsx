import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const interestRateBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Understanding interest rates is crucial for making informed financial decisions. Whether you're taking out a loan, investing money, or planning your financial future, interest rates directly impact the cost of borrowing and the return on your savings.",
  },
  {
    type: "subheader",
    heading: "What Are Interest Rates?",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      "An interest rate is the percentage of a loan amount charged by a lender to a borrower for the use of money. It represents the cost of borrowing money or the compensation paid by a borrower to a lender. Interest rates are expressed as an annual percentage rate (APR) and can be fixed or variable.",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Simple Interest",
        description:
          "Calculated only on the principal amount. Formula: Interest = Principal × Rate × Time. This type is less common for loans but used in some savings accounts.",
      },
      {
        title: "Compound Interest",
        description:
          "Calculated on both principal and accumulated interest. More common in loans and investments. The frequency of compounding affects the total amount.",
      },
      {
        title: "Fixed Interest Rate",
        description:
          "Remains constant throughout the loan term. Provides predictable monthly payments and protects against rising interest rates.",
      },
      {
        title: "Variable Interest Rate",
        description:
          "Can change over time based on market conditions. Often starts lower than fixed rates but carries the risk of increasing payments.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "How Interest Rate Calculations Work",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      "Interest rate calculations involve several key components that determine your monthly payment and total cost of borrowing:",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Principal Amount",
        description: "The original loan amount borrowed from the lender",
      },
      {
        label: "Interest Rate",
        description: "The annual percentage rate (APR) charged by the lender",
      },
      {
        label: "Loan Term",
        description: "The length of time to repay the loan, typically in years",
      },
      {
        label: "Payment Frequency",
        description: "How often payments are made (monthly, bi-weekly, etc.)",
      },
      {
        label: "Compounding Frequency",
        description:
          "How often interest is calculated and added to the balance",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "neutral",
      title: "Interest Rate Formula",
      content: (
        <div>
          <div className="font-mono text-xl text-center mb-4">
            PMT = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> - 1]
          </div>

          <p className="font-medium mb-3">Where:</p>
          <ul className="list-disc list-inside space-y-1 text-sm ml-4">
            <li>
              <strong>PMT:</strong> Monthly payment amount
            </li>
            <li>
              <strong>P:</strong> Principal loan amount
            </li>
            <li>
              <strong>r:</strong> Monthly interest rate (annual rate ÷ 12)
            </li>
            <li>
              <strong>n:</strong> Total number of payments
            </li>
          </ul>
        </div>
      ),
    },
  },
];

export default function InterestRateBasics() {
  return (
    <InfoCard
      title="Interest Rate Fundamentals"
      sections={interestRateBasicsSections}
    />
  );
}

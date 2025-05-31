import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const loanBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Understanding the fundamental concepts of loans is essential for borrowers to make informed financial decisions. These key terms and concepts apply to most types of loans and affect the total cost of borrowing.",
  },
  {
    type: "subheader",
    heading: "Essential Loan Terms",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Interest Rate",
        description:
          "Nearly all loan structures include interest, which is the profit that banks or lenders make on loans. Interest rate is the percentage of a loan paid by borrowers to lenders. For most loans, interest is paid in addition to principal repayment. Loan interest is usually expressed in APR, or annual percentage rate, which includes both interest and fees.",
      },
      {
        title: "Loan Term",
        description:
          "A loan term is the duration of the loan, given that required minimum payments are made each month. The term of the loan can affect the structure of the loan in many ways. Generally, the longer the term, the more interest will be accrued over time, raising the total cost of the loan for borrowers, but reducing the periodic payments.",
      },
      {
        title: "Compounding Frequency",
        description:
          "Compound interest is interest that is earned not only on the initial principal but also on accumulated interest from previous periods. Generally, the more frequently compounding occurs, the higher the total amount due on the loan. In most loans, compounding occurs monthly.",
      },
      {
        title: "Principal",
        description:
          "The principal is the original amount of money borrowed or the amount still owed on a loan, excluding interest. As you make payments on an amortizing loan, a portion goes toward reducing the principal balance.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "APR vs APY: Understanding the Difference",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      "It is important to understand the difference between APR and APY. The rate usually published by banks for saving accounts, money market accounts, and CDs is the annual percentage yield, or APY. APR (Annual Percentage Rate) is typically used for loans and includes fees, while APY (Annual Percentage Yield) is used for savings accounts and represents compound interest earnings.",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Calculator Tip",
      content:
        "Use our loan calculator above to see how different interest rates, loan terms, and compounding frequencies affect your total loan cost. Experimenting with these variables helps you understand their impact on your payments.",
    },
  },
];

export default function LoanBasics() {
  return (
    <InfoCard title="Loan Basics for Borrowers" sections={loanBasicsSections} />
  );
}

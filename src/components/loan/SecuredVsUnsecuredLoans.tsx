import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const securedVsUnsecuredSections: ContentSection[] = [
  {
    type: "text",
    content:
      "There are two basic kinds of consumer loans: secured or unsecured. Understanding the difference between these loan types is crucial for borrowers as it affects interest rates, qualification requirements, and risk factors.",
  },
  {
    type: "subheader",
    heading: "Secured Loans",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      "A secured loan means that the borrower has put up some asset as a form of collateral before being granted a loan. The lender is issued a lien, which is a right to possession of property belonging to another person until a debt is paid. In other words, defaulting on a secured loan will give the loan issuer the legal ability to seize the asset that was put up as collateral. The most common secured loans are mortgages and auto loans.",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Lower Risk for Lenders",
        description:
          "Lenders are generally hesitant to lend large amounts of money with no guarantee. Secured loans reduce the risk of the borrower defaulting since they risk losing whatever asset they put up as collateral.",
      },
      {
        title: "Higher Approval Rates",
        description:
          "Secured loans generally have a higher chance of approval because the collateral reduces the lender's risk. Even borrowers with lower credit scores may qualify.",
      },
      {
        title: "Lower Interest Rates",
        description:
          "Because of the reduced risk, secured loans typically offer lower interest rates compared to unsecured loans, making them more affordable over time.",
      },
      {
        title: "Larger Loan Amounts",
        description:
          "The collateral allows lenders to offer larger loan amounts, as the asset provides security for the debt. Common examples include home mortgages and auto loans.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Unsecured Loans",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      "An unsecured loan is an agreement to pay a loan back without collateral. Because there is no collateral involved, lenders need a way to verify the financial integrity of their borrowers. This can be achieved through the five C's of credit: Character, Capacity, Capital, Collateral (applies to secured), and Conditions.",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Higher Interest Rates",
        description:
          "Unsecured loans generally feature higher interest rates than secured loans due to the increased risk for lenders. The lack of collateral means higher potential losses if borrowers default.",
      },
      {
        title: "Lower Borrowing Limits",
        description:
          "Without collateral to secure the loan, lenders typically offer lower borrowing limits to minimize their risk exposure. The amount depends heavily on creditworthiness.",
      },
      {
        title: "Shorter Repayment Terms",
        description:
          "Unsecured loans often have shorter repayment terms compared to secured loans, which helps lenders reduce their risk exposure over time.",
      },
      {
        title: "Stricter Qualification",
        description:
          "Lenders may require higher credit scores, stable income, and sometimes a co-signer. If borrowers default, lenders may hire collection agencies to recover the debt.",
      },
    ],
  },
  {
    type: "text",
    content:
      "Examples of unsecured loans include credit cards, personal loans, and student loans. If the collateral is worth less than the outstanding debt on a secured loan, the borrower can still be liable for the remainder of the debt.",
  },
];

export default function SecuredVsUnsecuredLoans() {
  return (
    <InfoCard
      title="Consumer Loans: Secured vs. Unsecured"
      sections={securedVsUnsecuredSections}
    />
  );
}

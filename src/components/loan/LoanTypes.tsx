import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const loanTypesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "A loan is a contract between a borrower and a lender in which the borrower receives an amount of money (principal) that they are obligated to pay back in the future. Most loans can be categorized into one of three categories: Amortized Loan, Deferred Payment Loan, and Bond. This calculator helps you with all three.",
  },
  {
    type: "subheader",
    heading: "Amortized Loan: Fixed Amount Paid Periodically",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      'Many consumer loans fall into this category of loans that have regular payments that are amortized uniformly over their lifetime. Routine payments are made on principal and interest until the loan reaches maturity (is entirely paid off). Some of the most familiar amortized loans include mortgages, car loans, student loans, and personal loans. The word "loan" will probably refer to this type in everyday conversation, not the type in the second or third calculation.',
  },
  {
    type: "text",
    content:
      "Instead of using this general Loan Calculator for highly specific needs, it may be more useful to use specialized calculators such as: Mortgage Calculator, Auto Loan Calculator, Student Loan Calculator, etc.",
  },
  {
    type: "subheader",
    heading: "Deferred Payment Loan: Single Lump Sum Due at Loan Maturity",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      "Many commercial loans or short-term loans are in this category. Unlike the first calculation, which is amortized with payments spread uniformly over their lifetimes, these loans have a single, large lump sum due at maturity. Some loans, such as balloon loans, can also have smaller routine payments during their lifetimes, but this calculation only works for loans with a single payment of all principal and interest due at maturity.",
  },
  {
    type: "subheader",
    heading: "Bond: Predetermined Lump Sum Paid at Loan Maturity",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      "This kind of loan is rarely made except in the form of bonds. Technically, bonds operate differently from more conventional loans in that borrowers make a predetermined payment at maturity. The face, or par value of a bond, is the amount paid by the issuer (borrower) when the bond matures, assuming the borrower doesn't default. Face value denotes the amount received at maturity.",
  },
  {
    type: "text",
    content:
      "Two common bond types are coupon and zero-coupon bonds. With coupon bonds, lenders base coupon interest payments on a percentage of the face value. Coupon interest payments occur at predetermined intervals, usually annually or semi-annually. Zero-coupon bonds do not pay interest directly. Instead, borrowers sell bonds at a deep discount to their face value, then pay the face value when the bond matures. Users should note that the calculator above runs calculations for zero-coupon bonds.",
  },
  {
    type: "text",
    content:
      "After a borrower issues a bond, its value will fluctuate based on interest rates, market forces, and many other factors. While this does not change the bond's value at maturity, a bond's market price can still vary during its lifetime.",
  },
];

export default function LoanTypes() {
  return (
    <InfoCard
      title="Understanding Loan Categories"
      sections={loanTypesSections}
    />
  );
}

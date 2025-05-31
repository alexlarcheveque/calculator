import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const mortgageQualificationSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Mortgage qualification depends on several key factors that lenders evaluate to assess your creditworthiness and ability to repay the loan. Understanding these requirements helps you prepare for the application process.",
  },
  {
    type: "subheader",
    heading: "Qualification Requirements",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Income Verification",
        description:
          "Stable employment history (typically 2+ years) and sufficient income to support mortgage payments. W-2s, pay stubs, and tax returns are required.",
      },
      {
        title: "Credit Requirements",
        description:
          "Minimum credit score varies by loan type: Conventional (620+), FHA (580+), VA (no minimum but 620+ preferred).",
      },
      {
        title: "Asset Documentation",
        description:
          "Proof of funds for down payment, closing costs, and cash reserves. Bank statements and investment account records required.",
      },
      {
        title: "Debt-to-Income Limits",
        description:
          "Total monthly debt payments should not exceed 43-45% of gross monthly income for most loan programs.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Factors Affecting Your Mortgage Rate",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Credit Score",
        description:
          "Higher credit scores typically qualify for lower interest rates. Aim for 740+ for the best rates.",
      },
      {
        title: "Down Payment",
        description:
          "Larger down payments reduce lender risk and can result in better rates and no PMI requirement.",
      },
      {
        title: "Loan Term",
        description:
          "Shorter loan terms generally have lower interest rates but higher monthly payments.",
      },
      {
        title: "Debt-to-Income",
        description:
          "Lower DTI ratios demonstrate financial stability and may qualify for better rates.",
      },
      {
        title: "Property Type",
        description:
          "Investment properties and condos typically have higher rates than primary residences.",
      },
      {
        title: "Market Conditions",
        description:
          "Federal Reserve rates, economic conditions, and housing market trends affect mortgage rates.",
      },
    ],
  },
];

export default function MortgageQualification() {
  return (
    <InfoCard
      title="Mortgage Qualification Requirements"
      sections={mortgageQualificationSections}
    />
  );
}

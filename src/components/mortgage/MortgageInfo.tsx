import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const mortgageInfoSections: ContentSection[] = [
  {
    type: "text",
    content:
      "A mortgage is a secured loan used to purchase or refinance real estate property. The property itself serves as collateral for the loan, meaning the lender can foreclose on the property if payments are not made. Mortgages typically have lower interest rates than unsecured loans due to this collateral, making homeownership more accessible for most buyers.",
  },
  {
    type: "subheader",
    heading: "Types of Mortgage Loans",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Fixed-Rate Mortgage",
        description:
          "Interest rate remains constant throughout the loan term. Popular options include 15-year and 30-year fixed mortgages. Offers payment predictability and protection against rising interest rates.",
      },
      {
        title: "Adjustable-Rate Mortgage (ARM)",
        description:
          "Interest rate can change periodically based on market conditions. Often starts with a lower initial rate but can increase over time. Common types include 5/1 ARM and 7/1 ARM.",
      },
      {
        title: "FHA Loans",
        description:
          "Government-backed loans with lower down payment requirements (as low as 3.5%). Ideal for first-time homebuyers or those with lower credit scores. Requires mortgage insurance premiums.",
      },
      {
        title: "VA Loans",
        description:
          "Available to eligible veterans and military members. Offers no down payment requirement and no private mortgage insurance (PMI). Competitive interest rates and flexible qualification standards.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Key Mortgage Terms",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Principal",
        description: "The original loan amount borrowed to purchase the home",
      },
      {
        label: "Interest Rate (APR)",
        description:
          "The cost of borrowing money, expressed as an annual percentage rate",
      },
      {
        label: "Down Payment",
        description:
          "Upfront payment typically ranging from 3% to 20% of the home's purchase price",
      },
      {
        label: "Private Mortgage Insurance (PMI)",
        description:
          "Required insurance when down payment is less than 20% of home value",
      },
      {
        label: "Escrow Account",
        description:
          "Account used to collect and pay property taxes, homeowners insurance, and HOA fees",
      },
      {
        label: "Debt-to-Income Ratio (DTI)",
        description:
          "Percentage of gross monthly income that goes toward debt payments",
      },
      {
        label: "Loan-to-Value Ratio (LTV)",
        description: "Percentage of the home's value that is being financed",
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
  {
    type: "subheader",
    heading: "How to Qualify for a Mortgage",
    headingLevel: "h3",
  },
  {
    type: "text",
    content:
      "Mortgage qualification depends on several key factors that lenders evaluate to assess your creditworthiness and ability to repay the loan:",
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
    heading: "Tips for Getting the Best Mortgage Rate",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Improve Your Credit Score",
        description:
          "Pay down existing debt, avoid new credit inquiries, and ensure credit reports are accurate",
      },
      {
        label: "Save for a Larger Down Payment",
        description:
          "20% down payment eliminates PMI and demonstrates financial strength to lenders",
      },
      {
        label: "Shop Multiple Lenders",
        description:
          "Compare rates, fees, and terms from banks, credit unions, and online lenders",
      },
      {
        label: "Consider Mortgage Points",
        description:
          "Paying points upfront can lower your interest rate if you plan to stay in the home long-term",
      },
      {
        label: "Get Pre-approved",
        description:
          "Pre-approval shows sellers you're a serious buyer and can close quickly",
      },
      {
        label: "Lock Your Rate",
        description:
          "Rate locks protect against rate increases during the loan processing period",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Pro Tip",
      content:
        "Use our mortgage calculator above to estimate your monthly payments and see how different down payment amounts, interest rates, and loan terms affect your costs. This helps you understand what you can afford before house hunting.",
    },
  },
];

export default function MortgageInfo() {
  return (
    <InfoCard
      title="Complete Guide to Mortgage Loans"
      sections={mortgageInfoSections}
    />
  );
}

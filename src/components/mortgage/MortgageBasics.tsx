import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const mortgageBasicsSections: ContentSection[] = [
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
];

export default function MortgageBasics() {
  return (
    <InfoCard
      title="Mortgage Types & Essential Terms"
      sections={mortgageBasicsSections}
    />
  );
}

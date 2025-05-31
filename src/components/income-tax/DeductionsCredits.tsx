import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const deductionsCreditsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Deductions and credits are the primary ways to reduce your tax liability, but they work differently. Understanding when to itemize, which credits you qualify for, and how to maximize both can significantly reduce your tax burden.",
  },
  {
    type: "subheader",
    heading: "Deductions vs. Credits",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Tax Deductions",
        description:
          "Reduce your taxable income dollar-for-dollar. The tax savings equal your deduction multiplied by your marginal tax rate. A $1,000 deduction saves $220 if you're in the 22% bracket.",
      },
      {
        title: "Tax Credits",
        description:
          "Directly reduce your tax bill dollar-for-dollar. A $1,000 credit reduces your taxes by $1,000 regardless of your tax bracket, making credits more valuable than deductions.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Standard vs. Itemized Deductions",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "2024 Standard Deduction Amounts",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="font-semibold">Single</p>
              <p className="text-lg font-bold text-blue-600">$14,600</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Married Filing Jointly</p>
              <p className="text-lg font-bold text-blue-600">$29,200</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Head of Household</p>
              <p className="text-lg font-bold text-blue-600">$21,900</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-600">
            Additional $1,550 for taxpayers 65 or older (single) or $1,250
            (married)
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Common Itemized Deductions",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "State and Local Taxes (SALT)",
        description:
          "State income, local income, and property taxes combined, capped at $10,000 through 2025. Major limitation for high-tax state residents",
      },
      {
        label: "Mortgage Interest",
        description:
          "Interest on up to $750,000 of acquisition debt for homes purchased after 2017 ($1 million for earlier purchases). Also includes points paid",
      },
      {
        label: "Charitable Contributions",
        description:
          "Donations to qualified organizations, generally limited to 50-60% of AGI. Requires proper documentation and receipts for amounts over $250",
      },
      {
        label: "Medical Expenses",
        description:
          "Qualified medical expenses exceeding 7.5% of AGI. Includes insurance premiums, medical care, prescriptions, and some travel for medical care",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Major Tax Credits",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Child Tax Credit",
        description:
          "$2,000 per qualifying child under 17, with up to $1,400 refundable. Phases out starting at $200,000 (single) or $400,000 (married filing jointly).",
      },
      {
        title: "Child and Dependent Care Credit",
        description:
          "20-35% of qualified expenses up to $3,000 for one child or $6,000 for two or more children. Credit percentage decreases as income increases.",
      },
      {
        title: "American Opportunity Tax Credit",
        description:
          "Up to $2,500 per student for first four years of college. 40% is refundable. Phases out between $80,000-$90,000 (single) or $160,000-$180,000 (joint).",
      },
      {
        title: "Earned Income Tax Credit",
        description:
          "Refundable credit for lower-income workers, ranging from $600-$7,430 for 2024 depending on income and number of children. Encourages work participation.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Maximizing Deductions & Credits",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "tip",
      title: "Tax Optimization Strategies",
      content: (
        <div>
          <p className="mb-2">
            <strong>Deduction strategies:</strong>
          </p>
          <ul className="space-y-1 text-sm mb-3">
            <li>• Bundle deductible expenses into alternating years</li>
            <li>• Consider prepaying property taxes or state taxes</li>
            <li>• Time charitable contributions strategically</li>
            <li>• Use donor-advised funds for large charitable gifts</li>
          </ul>
          <p className="mb-2">
            <strong>Credit optimization:</strong>
          </p>
          <ul className="space-y-1 text-sm">
            <li>• Claim all eligible dependents for Child Tax Credit</li>
            <li>• Time education expenses to maximize credits</li>
            <li>
              • Consider income timing to stay within credit phase-out ranges
            </li>
            <li>
              • Don't overlook lesser-known credits (Retirement Savings,
              Adoption, etc.)
            </li>
          </ul>
        </div>
      ),
    },
  },
];

export default function DeductionsCredits() {
  return (
    <InfoCard
      title="Deductions & Credits Guide"
      sections={deductionsCreditsSections}
    />
  );
}

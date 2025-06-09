import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const deductionsCreditsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Tax deductions and credits can significantly reduce your tax liability. Understanding the difference and maximizing both can save you thousands of dollars annually.",
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
    heading: "Standard Deduction",
    headingLevel: "h3",
  },
  {
    type: "text",
    content: (
      <div>
        <h4 className="font-semibold mb-3">2025 Standard Deduction Amounts</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-1">Single</h5>
            <p className="text-lg font-bold text-blue-600">$15,000</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-1">
              Married Filing Jointly
            </h5>
            <p className="text-lg font-bold text-blue-600">$30,000</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-1">
              Head of Household
            </h5>
            <p className="text-lg font-bold text-blue-600">$22,500</p>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Additional $1,550 for taxpayers 65 or older (single) or $1,250
          (married filing jointly) for each spouse 65 or older
        </p>
      </div>
    ),
  },
  {
    type: "subheader",
    heading: "Major Itemized Deductions",
    headingLevel: "h3",
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
          "Generally up to 60% of AGI for cash donations to qualifying charities. Keep detailed documentation and receipts for amounts over $250",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Major Tax Credits",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Child Tax Credit",
        description:
          "$2,000 per qualifying child under 17, with up to $1,400 refundable. Phases out starting at $200,000 (single) or $400,000 (married filing jointly).",
      },
      {
        label: "Child and Dependent Care Credit",
        description:
          "20-35% of qualified expenses up to $3,000 for one child or $6,000 for two or more children. Credit percentage decreases as income increases.",
      },
      {
        label: "American Opportunity Tax Credit",
        description:
          "Up to $2,500 per student for first four years of college. 40% is refundable. Phases out between $80,000-$90,000 (single) or $160,000-$180,000 (joint).",
      },
      {
        label: "Earned Income Tax Credit",
        description:
          "Refundable credit for lower-income workers, ranging from $649-$8,046 for 2025 depending on income and number of children. Encourages work participation.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Maximizing Deductions & Credits",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Bundle deductible expenses into alternating years",
        description:
          "Concentrate charitable donations, medical expenses, and other deductions into one year to exceed the standard deduction threshold",
      },
      {
        label: "Consider prepaying property taxes or state taxes",
        description:
          "Pay early to maximize deductions in high-income years, but watch SALT cap limitations",
      },
      {
        label: "Time charitable contributions strategically",
        description:
          "Donate appreciated securities to avoid capital gains while getting full deduction value",
      },
      {
        label: "Use donor-advised funds for large charitable gifts",
        description:
          "Get immediate tax deduction while maintaining flexibility over when and where to distribute funds",
      },
      {
        label: "Claim all eligible dependents for Child Tax Credit",
        description:
          "Ensure you meet all requirements and understand phase-out thresholds based on income",
      },
      {
        label: "Time education expenses to maximize credits",
        description:
          "Coordinate timing of tuition payments with American Opportunity and Lifetime Learning Credits",
      },
      {
        label: "Consider income timing to stay within credit phase-out ranges",
        description:
          "Defer income or accelerate deductions to remain eligible for income-limited credits",
      },
      {
        label: "Don't overlook lesser-known credits",
        description:
          "Research Retirement Savings Credit, Adoption Credit, and energy-related credits you may qualify for",
      },
    ],
  },
];

export default function DeductionsCredits() {
  return (
    <InfoCard
      title="Tax Deductions & Credits Guide"
      sections={deductionsCreditsSections}
    />
  );
}

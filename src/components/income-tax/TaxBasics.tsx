import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const taxBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Understanding how income taxes work is essential for financial planning and making informed decisions. The U.S. uses a progressive tax system where higher income levels are taxed at higher rates, but only the income within each bracket is taxed at that rate.",
  },
  {
    type: "subheader",
    heading: "How Tax Brackets Work",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "2024 Federal Tax Brackets (Single Filers)",
      content: (
        <div>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Tax Rate</p>
                <p>10%</p>
                <p>12%</p>
                <p>22%</p>
                <p>24%</p>
                <p>32%</p>
                <p>35%</p>
                <p>37%</p>
              </div>
              <div>
                <p className="font-semibold">Income Range</p>
                <p>$0 - $11,600</p>
                <p>$11,601 - $47,150</p>
                <p>$47,151 - $100,525</p>
                <p>$100,526 - $191,050</p>
                <p>$191,051 - $243,725</p>
                <p>$243,726 - $609,350</p>
                <p>$609,351+</p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-600">
            * Only income within each bracket is taxed at that rate
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Filing Status Impact",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Single",
        description:
          "Unmarried individuals with no dependents. Has the highest tax rates but lowest standard deduction ($14,600 for 2024).",
      },
      {
        title: "Married Filing Jointly",
        description:
          "Married couples filing together. Generally provides the most favorable tax treatment with doubled brackets and standard deduction ($29,200 for 2024).",
      },
      {
        title: "Married Filing Separately",
        description:
          "Married couples filing separate returns. Usually results in higher taxes but may be beneficial with significant medical expenses or miscellaneous deductions.",
      },
      {
        title: "Head of Household",
        description:
          "Unmarried with qualifying dependents. Provides more favorable tax brackets than single status and higher standard deduction ($21,900 for 2024).",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Tax Calculation Process",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "1. Calculate Gross Income",
        description:
          "Add all taxable income sources: wages, interest, dividends, business income, capital gains, and other income reported on tax forms",
      },
      {
        label: "2. Determine Adjusted Gross Income (AGI)",
        description:
          "Subtract above-the-line deductions like IRA contributions, student loan interest, and health savings account contributions",
      },
      {
        label: "3. Apply Standard or Itemized Deductions",
        description:
          "Reduce AGI by either the standard deduction for your filing status or itemized deductions if they're higher",
      },
      {
        label: "4. Calculate Tax on Taxable Income",
        description:
          "Apply progressive tax brackets to determine income tax before credits. Each bracket only applies to income within that range",
      },
      {
        label: "5. Apply Tax Credits",
        description:
          "Subtract credits like Child Tax Credit, Earned Income Credit, and education credits to get final tax liability",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "success",
      title: "Progressive Tax Example",
      content: (
        <div>
          <p className="mb-2">
            <strong>Example:</strong> Single filer with $75,000 income:
          </p>
          <ul className="space-y-1 text-sm">
            <li>• First $11,600 taxed at 10% = $1,160</li>
            <li>• Next $35,550 ($47,150 - $11,600) taxed at 12% = $4,266</li>
            <li>
              • Remaining $27,850 ($75,000 - $47,150) taxed at 22% = $6,127
            </li>
            <li className="font-medium border-t pt-1 mt-2">
              Total tax: $11,553 (15.4% effective rate)
            </li>
          </ul>
        </div>
      ),
    },
  },
];

export default function TaxBasics() {
  return (
    <InfoCard
      title="Understanding Income Tax Basics"
      sections={taxBasicsSections}
    />
  );
}

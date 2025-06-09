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
    type: "text",
    content: (
      <div>
        <h4 className="font-semibold mb-3">
          2025 Federal Tax Brackets (Single Filers)
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Tax Rate
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Income Range
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">10%</td>
                <td className="px-4 py-3 text-sm">$0 - $11,925</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">12%</td>
                <td className="px-4 py-3 text-sm">$11,926 - $48,475</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">22%</td>
                <td className="px-4 py-3 text-sm">$48,476 - $103,350</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">24%</td>
                <td className="px-4 py-3 text-sm">$103,351 - $197,300</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">32%</td>
                <td className="px-4 py-3 text-sm">$197,301 - $250,525</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">35%</td>
                <td className="px-4 py-3 text-sm">$250,526 - $626,350</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">37%</td>
                <td className="px-4 py-3 text-sm">$626,351+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-600">
          * Only income within each bracket is taxed at that rate
        </p>
      </div>
    ),
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
          "Unmarried individuals with no dependents. Has the highest tax rates but lowest standard deduction ($15,000 for 2025).",
      },
      {
        title: "Married Filing Jointly",
        description:
          "Married couples filing together. Generally provides the most favorable tax treatment with doubled brackets and standard deduction ($30,000 for 2025).",
      },
      {
        title: "Married Filing Separately",
        description:
          "Married couples filing separate returns. Usually results in higher taxes but may be beneficial with significant medical expenses or miscellaneous deductions.",
      },
      {
        title: "Head of Household",
        description:
          "Unmarried with qualifying dependents. Provides more favorable tax brackets than single status and higher standard deduction ($22,500 for 2025).",
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
      type: "info",
      title: "Progressive Tax Example",
      content: (
        <div>
          <p className="mb-4 text-base font-medium">
            Single filer with <span className="font-semibold">$75,000</span>{" "}
            income:
          </p>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center py-2 px-3 bg-white rounded border">
              <div className="flex-1">
                <span className="text-sm text-gray-600">
                  First $11,925 taxed at{" "}
                </span>
                <span className="font-medium text-blue-600">10%</span>
              </div>
              <span className="font-semibold">$1,193</span>
            </div>

            <div className="flex justify-between items-center py-2 px-3 bg-white rounded border">
              <div className="flex-1">
                <span className="text-sm text-gray-600">Next $36,550 </span>
                <span className="text-xs text-gray-500">
                  ($48,475 − $11,925)
                </span>
                <span className="text-sm text-gray-600"> taxed at </span>
                <span className="font-medium text-blue-600">12%</span>
              </div>
              <span className="font-semibold">$4,386</span>
            </div>

            <div className="flex justify-between items-center py-2 px-3 bg-white rounded border">
              <div className="flex-1">
                <span className="text-sm text-gray-600">
                  Remaining $26,525{" "}
                </span>
                <span className="text-xs text-gray-500">
                  ($75,000 − $48,475)
                </span>
                <span className="text-sm text-gray-600"> taxed at </span>
                <span className="font-medium text-blue-600">22%</span>
              </div>
              <span className="font-semibold">$5,836</span>
            </div>
          </div>

          <div className="border-t-2 border-gray-300 pt-3 mt-4">
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="font-semibold text-gray-800">
                Total Federal Tax:
              </span>
              <div className="text-right">
                <div className="font-bold text-lg">$11,415</div>
                <div className="text-sm text-gray-600">
                  15.2% effective rate
                </div>
              </div>
            </div>
          </div>
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

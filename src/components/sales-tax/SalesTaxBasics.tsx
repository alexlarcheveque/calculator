import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const salesTaxBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Sales tax is a consumption tax collected by retailers on behalf of state and local governments. Understanding how sales tax works, varies by location, and affects your purchases helps you budget accurately and make informed buying decisions.",
  },
  {
    type: "subheader",
    heading: "How Sales Tax Works",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Point of Collection",
        description:
          "Sales tax is collected by the retailer at the time of purchase. The retailer acts as an agent for the government, collecting the tax from consumers and remitting it to tax authorities.",
      },
      {
        title: "Consumer Impact",
        description:
          "The tax burden ultimately falls on the consumer. While businesses collect and remit the tax, they typically pass the full cost through to customers via higher prices.",
      },
      {
        title: "Geographic Variability",
        description:
          "Rates vary significantly by location due to state, county, city, and special district taxes. The same item can have vastly different tax costs depending on where you buy it.",
      },
      {
        title: "Revenue Purpose",
        description:
          "Sales tax revenue funds essential government services including schools, roads, public safety, and local infrastructure projects. It's a major revenue source for state and local governments.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Sales Tax Calculation Methods",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Standard Sales Tax Formulas",
      content: (
        <div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-1">Calculate Tax Amount:</p>
              <p className="font-mono bg-gray-100 p-2 rounded">
                Sales Tax = Purchase Price × Tax Rate
              </p>
              <p className="text-xs text-gray-600">
                Example: $100 × 0.0625 = $6.25 tax
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Calculate Total Price:</p>
              <p className="font-mono bg-gray-100 p-2 rounded">
                Total Price = Purchase Price × (1 + Tax Rate)
              </p>
              <p className="text-xs text-gray-600">
                Example: $100 × 1.0625 = $106.25 total
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Find Pre-Tax Price:</p>
              <p className="font-mono bg-gray-100 p-2 rounded">
                Pre-Tax Price = Total Price ÷ (1 + Tax Rate)
              </p>
              <p className="text-xs text-gray-600">
                Example: $106.25 ÷ 1.0625 = $100 pre-tax
              </p>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Types of Sales Tax Systems",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Traditional Sales Tax (U.S.)",
        description:
          "Applied only at the final point of sale to end consumers. Tax is 'hidden' until checkout and varies dramatically by jurisdiction. Used primarily in the United States",
      },
      {
        label: "Value-Added Tax (VAT)",
        description:
          "Applied at multiple stages of production and distribution. Tax is included in displayed prices and rates are more uniform. Used in 160+ countries worldwide",
      },
      {
        label: "Goods and Services Tax (GST)",
        description:
          "Similar to VAT but with different administrative structure. Used in countries like Canada, Australia, and India with both federal and provincial/state components",
      },
      {
        label: "Use Tax",
        description:
          "Companion to sales tax for purchases where sales tax wasn't collected. Typically applies to out-of-state purchases and is self-reported by consumers",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Tax Rate Components",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "tip",
      title: "Understanding Combined Rates",
      content: (
        <div>
          <p className="mb-2">
            Your total sales tax rate combines multiple jurisdictions:
          </p>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">State Tax:</p>
                <p>0% - 7.25%</p>
                <p className="text-xs text-gray-600">Set by state government</p>
              </div>
              <div>
                <p className="font-semibold">Local Tax:</p>
                <p>0% - 5%+</p>
                <p className="text-xs text-gray-600">County, city, districts</p>
              </div>
            </div>
            <div className="border-t pt-2 mt-3">
              <p className="font-semibold">Combined rates can reach:</p>
              <p>
                11.45% (Louisiana) • 11.25% (Arkansas) • 10.25% (Washington)
              </p>
            </div>
          </div>
        </div>
      ),
    },
  },
];

export default function SalesTaxBasics() {
  return (
    <InfoCard
      title="Understanding Sales Tax Fundamentals"
      sections={salesTaxBasicsSections}
    />
  );
}

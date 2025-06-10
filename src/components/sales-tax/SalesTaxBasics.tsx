import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const salesTaxBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Sales tax is a consumption tax collected by retailers on behalf of state and local governments throughout the United States. Understanding how sales tax works in 2025, varies by location, and affects your purchases helps you budget accurately, make informed buying decisions, and navigate the evolving landscape of digital commerce.",
  },
  {
    type: "subheader",
    heading: "How Sales Tax Works in 2025",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Point of Collection",
        description:
          "Sales tax is collected by the retailer at the time of purchase, whether in-store or online. The retailer acts as an agent for the government, collecting the tax from consumers and remitting it to tax authorities.",
      },
      {
        title: "Consumer Impact",
        description:
          "The tax burden ultimately falls on the consumer. While businesses collect and remit the tax, they typically pass the full cost through to customers via higher prices, affecting purchasing power.",
      },
      {
        title: "Geographic Variability",
        description:
          "Rates vary significantly by location due to state, county, city, and special district taxes. The same item can have vastly different tax costs depending on where you buy it, with 2025 rates ranging from 0% to over 13%.",
      },
      {
        title: "Revenue Purpose",
        description:
          "Sales tax revenue funds essential government services including schools, roads, public safety, and local infrastructure projects. It's a major revenue source for state and local governments in the digital age.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Sales Tax Calculation Methods for 2025",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "neutral",
      title: "Standard Sales Tax Formulas",
      content: (
        <div>
          <div className="space-y-4 mt-4">
            <div>
              <p className="font-medium mb-2">Calculate Tax Amount:</p>
              <div className="font-mono text-lg text-center mb-2">
                Sales Tax = Purchase Price × Tax Rate
              </div>
              <p className="text-xs text-gray-600 text-center">
                Example: $100 × 0.0825 = $8.25 tax (8.25% rate)
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">Calculate Total Price:</p>
              <div className="font-mono text-lg text-center mb-2">
                Total Price = Purchase Price × (1 + Tax Rate)
              </div>
              <p className="text-xs text-gray-600 text-center">
                Example: $100 × 1.0825 = $108.25 total
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">Find Pre-Tax Price:</p>
              <div className="font-mono text-lg text-center mb-2">
                Pre-Tax Price = Total Price ÷ (1 + Tax Rate)
              </div>
              <p className="text-xs text-gray-600 text-center">
                Example: $108.25 ÷ 1.0825 = $100 pre-tax
              </p>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Types of Sales Tax Systems Worldwide",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Traditional Sales Tax (U.S.)",
        description:
          "Applied only at the final point of sale to end consumers. Tax is 'hidden' until checkout and varies dramatically by jurisdiction. Used primarily in the United States with over 13,000 different tax jurisdictions",
      },
      {
        label: "Value-Added Tax (VAT)",
        description:
          "Applied at multiple stages of production and distribution. Tax is included in displayed prices and rates are more uniform. Used in 160+ countries worldwide with typical rates of 15-25%",
      },
      {
        label: "Goods and Services Tax (GST)",
        description:
          "Similar to VAT but with different administrative structure. Used in countries like Canada, Australia, and India with both federal and provincial/state components",
      },
      {
        label: "Use Tax",
        description:
          "Companion to sales tax for purchases where sales tax wasn't collected. Typically applies to out-of-state purchases and is self-reported by consumers, though enforcement has increased in 2025",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Understanding Combined Tax Rates in 2025",
    headingLevel: "h4",
  },
  {
    type: "text",
    content:
      "Your total sales tax rate combines multiple jurisdictions in 2025. Each level of government can impose its own tax, creating the final rate you pay when making purchases.",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "State Tax Component",
        description:
          "0% - 7.25% in 2025. Set by state government. Five states (Alaska, Delaware, Montana, New Hampshire, Oregon) have no state sales tax, while California has the highest at 7.25%.",
      },
      {
        title: "Local Tax Component",
        description:
          "0% - 8%+ in 2025. Added by counties, cities, and special districts. Can significantly increase your total rate depending on location, with some jurisdictions reaching double digits when combined.",
      },
    ],
  },
  {
    type: "text",
    content:
      "Combined rates in 2025 can reach significant levels: Arizona (up to 13.43%), Arkansas (up to 12.625%), Alabama (up to 13.00%), and Louisiana (up to 12.00%) have some of the highest total rates in the nation.",
  },
];

export default function SalesTaxBasics() {
  return (
    <InfoCard
      title="Understanding Sales Tax Fundamentals in 2025"
      sections={salesTaxBasicsSections}
    />
  );
}

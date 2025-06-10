import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const salesTaxVsOtherTaxesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Understanding how sales tax compares to other forms of taxation helps you make informed financial decisions and better understand your total tax burden. Each tax type serves different purposes and affects different aspects of your financial life.",
  },
  {
    type: "subheader",
    heading: "Sales Tax vs. Income Tax",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Sales Tax Characteristics",
        description:
          "Regressive tax (affects lower-income households more), consumption-based, collected at point of sale, varies by location, immediate payment required, funds state/local services.",
      },
      {
        title: "Income Tax Characteristics",
        description:
          "Progressive tax (higher earners pay more), earnings-based, collected through withholding/quarterly, uniform within jurisdiction, annual reconciliation, funds federal/state programs.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "neutral",
      title: "Tax Rate Comparison Examples",
      content: (
        <div>
          <div className="space-y-3">
            <div>
              <p className="font-medium mb-2">Sales Tax Rates:</p>
              <div className="text-sm space-y-1">
                <p>• Combined rates: 0% - 11.45% depending on location</p>
                <p>• Applied to most goods and some services</p>
                <p>• Immediate payment at purchase</p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Income Tax Rates (2024):</p>
              <div className="text-sm space-y-1">
                <p>• Federal: 10% - 37% marginal rates</p>
                <p>• State: 0% - 13.3% (California highest)</p>
                <p>• Applied to earned and investment income</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Sales Tax vs. Property Tax",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Payment Timing",
        description:
          "Sales tax is paid immediately at purchase, while property tax is assessed annually based on property value and paid in installments",
      },
      {
        label: "Tax Base",
        description:
          "Sales tax applies to consumption of goods/services, property tax applies to ownership of real estate and sometimes personal property",
      },
      {
        label: "Revenue Use",
        description:
          "Both primarily fund local services, but property tax typically funds schools, libraries, and municipal services while sales tax has broader applications",
      },
      {
        label: "Avoidance Strategies",
        description:
          "Sales tax can be avoided by not purchasing or shopping elsewhere; property tax is unavoidable for property owners but may be reduced through exemptions",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Sales Tax vs. Excise Tax",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Sales Tax Application",
        description:
          "Broad-based tax applied to most goods and services at a percentage rate. Transparent to consumers as it's added at checkout. Rates vary by location.",
      },
      {
        title: "Excise Tax Application",
        description:
          "Specific tax on particular goods (gasoline, tobacco, alcohol) at fixed amounts per unit. Often hidden in the price. Rates set by federal/state governments.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Common Excise Taxes vs. Sales Tax",
      content: (
        <div className="space-y-2 text-sm">
          <p>
            <strong>Gasoline:</strong> Federal excise tax of $0.184/gallon +
            state excise taxes + sales tax on the total
          </p>
          <p>
            <strong>Cigarettes:</strong> Federal excise tax of $1.01/pack +
            state excise taxes up to $4.35/pack + sales tax
          </p>
          <p>
            <strong>Alcohol:</strong> Various federal excise rates + state
            excise taxes + sales tax on retail price
          </p>
          <p className="text-xs text-gray-600 mt-2">
            <strong>Note:</strong> These items face multiple layers of taxation,
            making effective tax rates much higher than standard sales tax
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Value-Added Tax (VAT) vs. Sales Tax",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "U.S. Sales Tax System",
        description:
          "Single-stage tax collected only at final sale to consumer. Tax-exclusive pricing (added at checkout). Complex rate variations by location. Administrative burden on retailers.",
      },
      {
        title: "International VAT System",
        description:
          "Multi-stage tax collected at each production level. Tax-inclusive pricing (shown in displayed price). Uniform national rates. More efficient collection system.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Strategic Tax Planning Considerations",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Deduction Strategies",
        description:
          "Choose between deducting sales tax or income tax on federal returns. Sales tax deduction benefits those in high-sales-tax, low-income-tax states",
      },
      {
        label: "Geographic Arbitrage",
        description:
          "Consider total tax burden when relocating. High-income earners might prefer high-sales-tax/low-income-tax states like Texas or Florida",
      },
      {
        label: "Business Structure Impact",
        description:
          "Business purchases avoid sales tax but face income tax on profits. Consider tax implications when structuring major purchases",
      },
      {
        label: "Timing Optimization",
        description:
          "Unlike income tax planning, sales tax is immediate. Plan major purchases around sales tax holidays or favorable jurisdictions",
      },
    ],
  },
];

export default function SalesTaxVsOtherTaxes() {
  return (
    <InfoCard
      title="Sales Tax vs. Other Tax Types"
      sections={salesTaxVsOtherTaxesSections}
    />
  );
}

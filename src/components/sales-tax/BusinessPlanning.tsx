import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const businessPlanningSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Sales tax affects both businesses and consumers in complex ways. Understanding exemptions, business compliance requirements, and strategic planning can save significant money while ensuring legal compliance in our increasingly digital economy.",
  },
  {
    type: "subheader",
    heading: "Business Sales Tax Responsibilities",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Registration Requirements",
        description:
          "Businesses must register for sales tax permits in each state where they have 'nexus' (connection). This includes physical presence, economic activity thresholds, or click-through relationships",
      },
      {
        label: "Collection & Remittance",
        description:
          "Collect appropriate tax rates based on delivery location, maintain detailed records, and remit taxes according to filing frequency (monthly, quarterly, or annually based on volume)",
      },
      {
        label: "Economic Nexus Compliance",
        description:
          "Monitor sales thresholds in each state ($100,000+ sales or 200+ transactions typically triggers nexus). Track carefully as thresholds and rules vary by state",
      },
      {
        label: "Tax Rate Management",
        description:
          "Maintain current rates for thousands of tax jurisdictions. Many businesses use automated tax software to handle rate updates and calculations",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Common Sales Tax Exemptions",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Food & Groceries",
        description:
          "Most states exempt unprepared food items like groceries, but tax prepared foods and restaurant meals. Some states tax all food items while others have complex prepared food definitions.",
      },
      {
        title: "Prescription Medications",
        description:
          "Virtually all states exempt prescription drugs, but over-the-counter medications are typically taxed. Medical devices and equipment often qualify for exemptions with proper documentation.",
      },
      {
        title: "Business Purchases",
        description:
          "Items purchased for resale are exempt with valid resale certificates. Manufacturing equipment, raw materials, and business services often qualify for exemptions.",
      },
      {
        title: "Clothing & Necessities",
        description:
          "Some states exempt basic clothing items, often with price limitations. Cold weather states may exempt seasonal items like winter coats and boots.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Online Sales Tax Rules",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "E-commerce Tax Landscape (Post-Wayfair 2018)",
      content: (
        <div>
          <p className="mb-2">
            <strong>Current requirements for online sellers:</strong>
          </p>
          <ul className="space-y-2 text-sm mb-3">
            <li>
              • <strong>Tax based on delivery address:</strong> Apply rates
              where customer receives items
            </li>
            <li>
              • <strong>Economic nexus triggers:</strong> Registration required
              when exceeding state thresholds
            </li>
            <li>
              • <strong>Marketplace facilitator laws:</strong> Platforms like
              Amazon collect tax for third-party sellers
            </li>
            <li>
              • <strong>Use tax obligations:</strong> Consumers must self-report
              if tax not collected
            </li>
          </ul>
          <p className="text-xs text-gray-600">
            Over 40 states now require out-of-state sellers to collect sales tax
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Consumer Planning Strategies",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Sales Tax Holidays",
        description:
          "Many states offer temporary exemptions on back-to-school items, emergency supplies, or energy-efficient appliances. Plan major purchases around these events for savings.",
      },
      {
        title: "Cross-Border Shopping",
        description:
          "For large purchases, consider shopping in lower-tax jurisdictions. Factor in travel costs and time to determine if savings justify the trip.",
      },
      {
        title: "Business Structure Benefits",
        description:
          "Legitimate business purchases can avoid sales tax with proper resale certificates. Consider business formation for substantial equipment purchases.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Income Tax Deduction Strategies",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Maximizing Sales Tax Deductions",
      content: (
        <div>
          <p className="mb-2">
            <strong>When to deduct sales tax instead of income tax:</strong>
          </p>
          <ul className="space-y-2 text-sm mb-3">
            <li>
              • <strong>No state income tax:</strong> TX, FL, WA, TN, NV, WY, SD
              residents
            </li>
            <li>
              • <strong>Major purchase years:</strong> Car, boat, home
              improvement projects
            </li>
            <li>
              • <strong>High sales tax areas:</strong> When local rates exceed
              8-9%
            </li>
            <li>
              • <strong>Detailed records:</strong> Keep receipts for all taxable
              purchases
            </li>
          </ul>
          <p className="mb-2">
            <strong>IRS optional sales tax tables vs. actual expenses:</strong>
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              • Use IRS tables for convenience (based on income and location)
            </li>
            <li>• Track actual expenses if you made large purchases</li>
            <li>• Add major purchases to table amounts</li>
          </ul>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Future Considerations",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Federal Legislation Efforts",
        description:
          "Ongoing Congressional efforts to create uniform online sales tax rules. The Marketplace Fairness Act and similar bills aim to simplify interstate commerce taxation",
      },
      {
        label: "Technology Integration",
        description:
          "Increased automation in tax calculation, collection, and remittance. APIs and software solutions making compliance easier for small businesses",
      },
      {
        label: "Cryptocurrency Implications",
        description:
          "States developing rules for digital currency transactions. Some treat crypto purchases as taxable events, others are creating exemptions",
      },
      {
        label: "Remote Work Considerations",
        description:
          "Increasing remote work creates nexus questions for businesses. Employee locations may trigger tax obligations in new states",
      },
    ],
  },
];

export default function BusinessPlanning() {
  return (
    <InfoCard
      title="Business Compliance & Planning Strategies"
      sections={businessPlanningSections}
    />
  );
}

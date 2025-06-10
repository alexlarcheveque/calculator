import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const businessPlanningSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Sales tax affects both businesses and consumers in complex ways throughout 2025. Understanding exemptions, business compliance requirements, and strategic planning can save significant money while ensuring legal compliance in our increasingly digital economy.",
  },
  {
    type: "subheader",
    heading: "Business Sales Tax Responsibilities in 2025",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Registration Requirements",
        description:
          "Businesses must register for sales tax permits in each state where they have 'nexus' (connection). This includes physical presence, economic activity thresholds, or click-through relationships in the digital marketplace",
      },
      {
        label: "Collection & Remittance",
        description:
          "Collect appropriate tax rates based on delivery location, maintain detailed records, and remit taxes according to filing frequency (monthly, quarterly, or annually based on volume). Automated systems are increasingly essential",
      },
      {
        label: "Economic Nexus Compliance 2025",
        description:
          "Monitor sales thresholds in each state ($100,000+ sales or 200+ transactions typically triggers nexus). Track carefully as thresholds and rules continue to evolve across jurisdictions",
      },
      {
        label: "Tax Rate Management",
        description:
          "Maintain current rates for over 13,000 tax jurisdictions in 2025. Many businesses use automated tax software to handle rate updates and calculations due to frequent changes",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Common Sales Tax Exemptions in 2025",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Food & Groceries",
        description:
          "Most states exempt unprepared food items like groceries, but tax prepared foods and restaurant meals. Kansas eliminated its 2% state tax on unprepared food in 2025, joining states that fully exempt groceries.",
      },
      {
        title: "Prescription Medications",
        description:
          "Virtually all states exempt prescription drugs, but over-the-counter medications are typically taxed. Medical devices and equipment often qualify for exemptions with proper documentation.",
      },
      {
        title: "Business Purchases",
        description:
          "Items purchased for resale are exempt with valid resale certificates. Manufacturing equipment, raw materials, and business services often qualify for exemptions depending on state policy.",
      },
      {
        title: "Clothing & Necessities",
        description:
          "Some states exempt basic clothing items, often with price limitations. Nevada added diapers (adult and children) to its exemption list in 2025, reflecting consumer necessities.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Online Sales Tax Rules in 2025",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "E-commerce Tax Landscape (2025 Updates)",
      content: (
        <div>
          <p className="mb-2 mt-4">
            <strong>Current requirements for online sellers in 2025:</strong>
          </p>
          <ul className="space-y-2 text-sm mb-3">
            <li>
              • <strong>Tax based on delivery address:</strong> Apply rates
              where customer receives items (destination-based taxation)
            </li>
            <li>
              • <strong>Economic nexus triggers:</strong> Registration required
              when exceeding state thresholds (typically $100K sales/200
              transactions)
            </li>
            <li>
              • <strong>Marketplace facilitator laws:</strong> Platforms like
              Amazon collect tax for third-party sellers in most states
            </li>
            <li>
              • <strong>Digital products taxation:</strong> Louisiana now taxes
              digital audiovisual works, e-books, apps, and games
            </li>
          </ul>
          <p className="text-xs text-gray-600">
            Over 45 states now require out-of-state sellers to collect sales tax
            when meeting economic nexus thresholds
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Consumer Planning Strategies for 2025",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Sales Tax Holidays",
        description:
          "Many states offer temporary exemptions on back-to-school items, emergency supplies, or energy-efficient appliances. Plan major purchases around these events for savings, but note some states have reduced these programs.",
      },
      {
        title: "Cross-Border Shopping",
        description:
          "For large purchases, consider shopping in lower-tax jurisdictions. Factor in travel costs, gas prices, and time to determine if savings justify the trip in 2025's economic environment.",
      },
      {
        title: "Business Structure Benefits",
        description:
          "Legitimate business purchases can avoid sales tax with proper resale certificates. Consider business formation for substantial equipment purchases, but ensure compliance with business purpose requirements.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "2025 Tax Deduction Strategies",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Maximizing Sales Tax Deductions for 2025",
      content: (
        <div>
          <p className="mb-2 mt-4">
            <strong>
              When to deduct sales tax instead of income tax on 2025 returns:
            </strong>
          </p>
          <ul className="space-y-2 text-sm mb-3">
            <li>
              • <strong>No state income tax:</strong> TX, FL, WA, TN, NV, WY,
              SD, AK, NH residents
            </li>
            <li>
              • <strong>Major purchase years:</strong> Car, boat, home
              improvement projects, RVs, or major appliances
            </li>
            <li>
              • <strong>High sales tax areas:</strong> When local rates exceed
              9-10% (Arizona up to 13.43%, Alabama up to 13%)
            </li>
            <li>
              • <strong>Detailed records:</strong> Keep receipts for all taxable
              purchases throughout 2025
            </li>
          </ul>
          <p className="mb-2 mt-4">
            <strong>
              IRS optional sales tax tables vs. actual expenses for 2025:
            </strong>
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              • Use updated IRS tables for convenience (based on income and
              location)
            </li>
            <li>• Track actual expenses if you made large purchases</li>
            <li>• Add major purchases to table amounts for maximum benefit</li>
          </ul>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Future Considerations for 2025 and Beyond",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Federal Legislation Efforts",
        description:
          "Ongoing Congressional efforts to create uniform online sales tax rules. The Marketplace Fairness Act and similar bills aim to simplify interstate commerce taxation for businesses and consumers",
      },
      {
        label: "Technology Integration",
        description:
          "Increased automation in tax calculation, collection, and remittance. APIs and software solutions making compliance easier for small businesses while reducing compliance costs",
      },
      {
        label: "Digital Products Evolution",
        description:
          "More states are expanding taxation to digital products, software-as-a-service, and streaming services. Businesses selling digital products must monitor changing regulations closely",
      },
      {
        label: "Economic Nexus Refinement",
        description:
          "States continue to refine economic nexus thresholds and rules. Alaska eliminated its transaction threshold in 2025, signaling potential simplification trends in some jurisdictions",
      },
    ],
  },
];

export default function BusinessPlanning() {
  return (
    <InfoCard
      title="Sales Tax Business Planning and Consumer Strategies for 2025"
      sections={businessPlanningSections}
    />
  );
}

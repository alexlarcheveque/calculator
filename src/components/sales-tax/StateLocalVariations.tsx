import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const stateLocalVariationsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Sales tax rates vary dramatically across the United States in 2025, with state and local combinations creating complex tax landscapes for consumers and businesses. Understanding these variations is essential for effective financial planning, business operations, and making informed purchasing decisions in today's economy.",
  },
  {
    type: "subheader",
    heading: "States Without Sales Tax in 2025",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Alaska",
        description:
          "No statewide sales tax, but local jurisdictions can impose up to 9.5% in 2025. Many cities and boroughs have their own sales tax, particularly in tourist areas and major municipalities.",
      },
      {
        title: "Delaware",
        description:
          "No state or local sales tax anywhere in the state. Remains a 'tax haven' for shoppers, especially those from high-tax neighboring states like Maryland and Pennsylvania.",
      },
      {
        title: "Montana",
        description:
          "No statewide sales tax and very limited local sales tax. Only a few resort communities can impose local sales tax, primarily on accommodations and resort services.",
      },
      {
        title: "New Hampshire",
        description:
          "No general sales tax, but does impose a 9% tax on prepared meals and hotel accommodations. Popular shopping destination for residents of Massachusetts and other high-tax states.",
      },
      {
        title: "Oregon",
        description:
          "No state or local sales tax anywhere. This makes Oregon particularly attractive for large purchases and continues to influence cross-border shopping patterns with Washington.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Highest Sales Tax States in 2025",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Highest Combined Sales Tax Rates (2025)",
      content: (
        <div>
          <div className="space-y-2 text-sm mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">Top Combined Rates 2025:</p>
                <ul className="space-y-1">
                  <li>
                    • <strong>Louisiana:</strong> Up to 12.00%
                  </li>
                  <li>
                    • <strong>Arkansas:</strong> Up to 12.625%
                  </li>
                  <li>
                    • <strong>Alabama:</strong> Up to 13.00%
                  </li>
                  <li>
                    • <strong>Arizona:</strong> Up to 13.43%
                  </li>
                  <li>
                    • <strong>Tennessee:</strong> Up to 10.00%
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Highest State Rates 2025:</p>
                <ul className="space-y-1">
                  <li>
                    • <strong>California:</strong> 7.25% state
                  </li>
                  <li>
                    • <strong>Indiana:</strong> 7.00% state
                  </li>
                  <li>
                    • <strong>Mississippi:</strong> 7.00% state
                  </li>
                  <li>
                    • <strong>Rhode Island:</strong> 7.00% state
                  </li>
                  <li>
                    • <strong>Tennessee:</strong> 7.00% state
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              <strong>Note:</strong> Louisiana increased its state rate from
              4.45% to 5.00% in 2025 as part of a comprehensive tax reform
              package.
            </p>
          </div>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "2025 Sales Tax Changes and Updates",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Louisiana Tax Reform 2025",
        description:
          "Louisiana increased its state sales tax rate from 4.45% to 5.00% as part of a broader tax reform that includes a 3% flat income tax and 5.5% corporate income tax rate",
      },
      {
        label: "Digital Products Taxation",
        description:
          "Louisiana now applies sales tax to digital products including audiovisual works, e-books, applications, and games, reflecting modern commerce trends",
      },
      {
        label: "Food Tax Reductions",
        description:
          "Kansas reduced its state sales tax on unprepared food from 2% to 0%, though local sales taxes may still apply to these items",
      },
      {
        label: "Economic Nexus Evolution",
        description:
          "Alaska eliminated its 200-transaction threshold, simplifying requirements for remote sellers operating in the state",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Local Tax Complexity in 2025",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "County-Level Taxes",
        description:
          "Most states allow counties to add their own sales tax, typically 0.5% to 5%. County taxes often fund local services like sheriff departments, courts, and infrastructure",
      },
      {
        label: "Municipal Taxes",
        description:
          "Cities and towns can add additional sales tax layers, usually 0.25% to 4%. These fund local services like police, fire, parks, and municipal utilities",
      },
      {
        label: "Special District Taxes",
        description:
          "Transportation authorities, school districts, and other special entities may impose additional taxes. These can add 0.25% to 2% for specific infrastructure projects",
      },
      {
        label: "Destination-Based Taxation",
        description:
          "Tax rates are determined by delivery location, not seller location. This means online purchases face local rates where items are shipped, complicating compliance for e-commerce businesses",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Strategic Shopping and Business Considerations for 2025",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Cross-Border Shopping Opportunities in 2025",
      content: (
        <div>
          <ul className="space-y-2 text-sm mt-4">
            <li>
              • <strong>Delaware outlets:</strong> Zero sales tax continues to
              attract shoppers from PA, MD, NJ for major purchases
            </li>
            <li>
              • <strong>New Hampshire malls:</strong> No sales tax draws MA and
              VT residents, especially for electronics and appliances
            </li>
            <li>
              • <strong>Oregon border cities:</strong> Washington residents
              cross for major purchases to avoid 6.5% state plus local taxes
            </li>
            <li>
              • <strong>Montana resort areas:</strong> No tax on most purchases
              except lodging makes it attractive for recreational vehicle
              purchases
            </li>
          </ul>
          <p className="mt-3 text-xs text-gray-600">
            <strong>2025 Tip:</strong> With gas prices and inflation, calculate
            total costs including travel time and expenses when planning
            cross-border shopping
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Business Impact and Compliance in 2025",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Multi-State Compliance Challenges",
        description:
          "Businesses selling across state lines must track over 13,000 different tax jurisdictions and rates, creating significant administrative burden in our digital economy.",
      },
      {
        title: "Economic Nexus Thresholds 2025",
        description:
          "Most states maintain $100,000 in sales or 200 transactions annually as economic nexus triggers, but monitoring these thresholds across all states remains complex.",
      },
      {
        title: "Technology Solutions",
        description:
          "Automated tax calculation software has become essential for businesses, with APIs and cloud-based solutions helping manage rate updates and multi-jurisdiction compliance.",
      },
    ],
  },
];

export default function StateLocalVariations() {
  return (
    <InfoCard
      title="Understanding State and Local Sales Tax Variations in 2025"
      sections={stateLocalVariationsSections}
    />
  );
}

import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const stateLocalVariationsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Sales tax rates vary dramatically across the United States due to different state policies and local government needs. Understanding these variations helps you plan purchases, business operations, and relocation decisions while navigating the complex landscape of U.S. sales taxation.",
  },
  {
    type: "subheader",
    heading: "States Without Sales Tax",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Alaska",
        description:
          "No statewide sales tax, but local jurisdictions can impose up to 7.5%. Many cities and boroughs have their own sales tax, particularly in tourist areas and major municipalities.",
      },
      {
        title: "Delaware",
        description:
          "No state or local sales tax anywhere in the state. Often called a 'tax haven' for shoppers, especially those from high-tax neighboring states like Maryland and Pennsylvania.",
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
          "No state or local sales tax anywhere. This makes Oregon particularly attractive for large purchases and has influenced cross-border shopping patterns with Washington.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Highest Sales Tax States",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Highest Combined Sales Tax Rates (2024)",
      content: (
        <div>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">Top Combined Rates:</p>
                <ul className="space-y-1">
                  <li>
                    • <strong>Louisiana:</strong> Up to 11.45%
                  </li>
                  <li>
                    • <strong>Arkansas:</strong> Up to 11.25%
                  </li>
                  <li>
                    • <strong>Washington:</strong> Up to 10.25%
                  </li>
                  <li>
                    • <strong>Alabama:</strong> Up to 11.10%
                  </li>
                  <li>
                    • <strong>Tennessee:</strong> Up to 9.75%
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Highest State Rates:</p>
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
          </div>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Local Tax Complexity",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "County-Level Taxes",
        description:
          "Most states allow counties to add their own sales tax, typically 0.5% to 3%. County taxes often fund local services like sheriff departments, courts, and infrastructure",
      },
      {
        label: "Municipal Taxes",
        description:
          "Cities and towns can add additional sales tax layers, usually 0.25% to 2.5%. These fund local services like police, fire, parks, and municipal utilities",
      },
      {
        label: "Special District Taxes",
        description:
          "Transportation authorities, school districts, and other special entities may impose additional taxes. These can add 0.25% to 1% for specific infrastructure projects",
      },
      {
        label: "Destination-Based Taxation",
        description:
          "Tax rates are determined by delivery location, not seller location. This means online purchases face local rates where items are shipped, complicating compliance",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Regional Shopping Strategies",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "tip",
      title: "Cross-Border Shopping Considerations",
      content: (
        <div>
          <p className="mb-2">
            <strong>Popular shopping destinations:</strong>
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              • <strong>Delaware outlets:</strong> No sales tax attracts
              shoppers from PA, MD, NJ
            </li>
            <li>
              • <strong>New Hampshire malls:</strong> No sales tax draws MA and
              VT residents
            </li>
            <li>
              • <strong>Oregon border cities:</strong> Washington residents
              cross for major purchases
            </li>
            <li>
              • <strong>Montana resort areas:</strong> No tax on most purchases
              except lodging
            </li>
          </ul>
          <p className="mt-3 text-xs text-gray-600">
            <strong>Note:</strong> For large purchases, consider travel costs
            vs. tax savings
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Business Impact Considerations",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Multi-State Compliance",
        description:
          "Businesses selling across state lines must track thousands of different tax rates and file returns in multiple jurisdictions, creating significant administrative burden.",
      },
      {
        title: "Economic Nexus Rules",
        description:
          "States can require out-of-state sellers to collect sales tax once they exceed certain sales thresholds, typically $100,000 or 200 transactions annually.",
      },
      {
        title: "Border Competition",
        description:
          "High local sales tax rates can drive customers to neighboring lower-tax areas, affecting local business competitiveness and tax base erosion.",
      },
    ],
  },
];

export default function StateLocalVariations() {
  return (
    <InfoCard
      title="State & Local Sales Tax Variations"
      sections={stateLocalVariationsSections}
    />
  );
}

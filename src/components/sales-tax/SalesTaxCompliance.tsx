import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const salesTaxComplianceSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Sales tax compliance has become increasingly complex with the growth of e-commerce and changing state laws. Understanding your obligations as a business owner or consumer helps avoid penalties and ensures legal compliance in our digital economy.",
  },
  {
    type: "subheader",
    heading: "Business Compliance Requirements",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Registration & Permits",
        description:
          "Obtain sales tax permits in every state where you have nexus. Requirements vary by state, with some requiring bonds or deposits. Failure to register can result in penalties and interest on unpaid taxes.",
      },
      {
        title: "Nexus Determination",
        description:
          "Physical presence (employees, inventory, offices) or economic nexus (sales thresholds) triggers tax obligations. Most states now require collection after $100,000 in sales or 200+ transactions.",
      },
      {
        title: "Rate Management",
        description:
          "Maintain current tax rates for thousands of jurisdictions. Rates change quarterly or more frequently. Many businesses use automated tax software to handle updates and calculations.",
      },
      {
        title: "Record Keeping",
        description:
          "Maintain detailed transaction records, including exempt sales documentation. Most states require 3-7 years of records. Digital records are generally acceptable with proper backup systems.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Filing & Payment Requirements",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Filing Frequency",
        description:
          "Based on tax collected volume: monthly (high volume), quarterly (medium), or annually (low volume). States may require more frequent filing during busy seasons",
      },
      {
        label: "Payment Timing",
        description:
          "Generally due on the 20th of the following month. Some states offer discounts for early payment or electronic filing. Late payments incur penalties and interest",
      },
      {
        label: "Zero Returns",
        description:
          "Required even if no sales occurred during the period. Failure to file zero returns can result in penalties and potential permit revocation",
      },
      {
        label: "Audit Compliance",
        description:
          "Maintain organized records for potential audits. Common audit triggers include late filings, unusual exempt sales patterns, or industry-specific scrutiny",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Common Compliance Mistakes",
      content: (
        <div className="space-y-2 text-sm mt-4">
          <p>
            ❌ <strong>Delayed registration:</strong> Not registering when nexus
            is established
          </p>
          <p>
            ❌ <strong>Incorrect exemptions:</strong> Accepting invalid resale
            certificates
          </p>
          <p>
            ❌ <strong>Rate errors:</strong> Using incorrect rates for delivery
            locations
          </p>
          <p>
            ❌ <strong>Late filings:</strong> Missing filing deadlines even with
            zero sales
          </p>
          <p>
            ❌ <strong>Poor record keeping:</strong> Inadequate documentation
            for exempt sales
          </p>
          <p>
            ❌ <strong>Marketplace confusion:</strong> Misunderstanding who
            collects tax in marketplace sales
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "E-commerce Specific Requirements",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Marketplace Facilitator Laws",
        description:
          "Platforms like Amazon, eBay, and Etsy collect tax for third-party sellers in most states. Sellers may still have filing obligations even when marketplace collects tax.",
      },
      {
        title: "Drop-shipping Compliance",
        description:
          "Complex rules when seller, manufacturer, and customer are in different states. Generally, tax based on customer location, but sourcing rules vary by state.",
      },
      {
        title: "Digital Products",
        description:
          "Software, digital downloads, and SaaS products have varying tax treatment. Some states tax digital products like tangible goods, others exempt them entirely.",
      },
      {
        title: "Subscription Services",
        description:
          "Monthly recurring services may face different rules than one-time purchases. Some states prorate taxes, others tax the full subscription amount upfront.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Consumer Use Tax Obligations",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "When Consumers Owe Use Tax",
      content: (
        <div>
          <p className="mb-2">
            <strong>Use tax applies when:</strong>
          </p>
          <ul className="space-y-1 text-sm mb-3">
            <li>
              • Purchasing from out-of-state sellers who don't collect sales tax
            </li>
            <li>• Buying online from retailers without nexus in your state</li>
            <li>• Private party purchases (cars, boats, equipment)</li>
            <li>• Items purchased for business use in tax-free states</li>
          </ul>
          <p className="mb-2">
            <strong>Reporting methods:</strong>
          </p>
          <ul className="space-y-1 text-sm">
            <li>• Line on state income tax return (most common)</li>
            <li>• Separate use tax return for large purchases</li>
            <li>• Estimated amount based on income if records incomplete</li>
          </ul>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Penalties & Enforcement",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Late Filing Penalties",
        description:
          "Typically 5-25% of tax due, with minimum penalties even for zero returns. Penalty caps vary by state, but can reach 25% of tax owed",
      },
      {
        label: "Interest Charges",
        description:
          "Compound daily from the due date. Rates typically 6-18% annually. Interest applies to both tax owed and penalties",
      },
      {
        label: "Criminal Penalties",
        description:
          "Willful evasion can result in felony charges. Typically requires large amounts ($10,000+) and clear intent to evade",
      },
      {
        label: "Voluntary Disclosure Programs",
        description:
          "Most states offer programs to reduce penalties for businesses coming forward voluntarily. Generally limited to 3-4 years of back taxes",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Best Practices for Compliance",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "✅ Technology Solutions",
        description:
          "Use automated tax software for rate management, calculations, and filing. Solutions like Avalara, TaxJar, or Vertex handle complex multi-state compliance.",
      },
      {
        title: "✅ Professional Assistance",
        description:
          "Work with tax professionals familiar with sales tax law. Consider outsourcing filing and compliance for complex multi-state operations.",
      },
      {
        title: "✅ Regular Monitoring",
        description:
          "Review nexus thresholds monthly. Subscribe to state tax department notifications. Monitor changes in economic nexus laws and marketplace facilitator requirements.",
      },
      {
        title: "✅ Documentation Standards",
        description:
          "Maintain organized records with clear exempt sale justifications. Document business decisions and nexus determinations. Keep software and rate update logs.",
      },
    ],
  },
];

export default function SalesTaxCompliance() {
  return (
    <InfoCard
      title="Sales Tax Compliance & Legal Requirements"
      sections={salesTaxComplianceSections}
    />
  );
}

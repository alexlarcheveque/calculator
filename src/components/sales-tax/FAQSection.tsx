"use client";

import { useState } from "react";
import FAQSection, { FAQItem } from "../ui/FAQSection";

const salesTaxFAQItems: FAQItem[] = [
  {
    id: "what-is-sales-tax",
    question: "What is sales tax and how does it work in 2025?",
    answer: (
      <>
        <p className="mb-2">
          Sales tax is a consumption tax imposed by state and local governments
          on the sale of goods and services. It's collected by the seller at the
          point of purchase and remitted to the government.
        </p>
        <p className="mb-2">
          <strong>Key characteristics in 2025:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Applied only at the final point of sale to consumers</li>
          <li>Collected by businesses on behalf of government</li>
          <li>
            Rates vary by state and local jurisdiction (0% to 13.43% in 2025)
          </li>
          <li>
            Generally applies to tangible goods, many services, and digital
            products
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-calculate-sales-tax",
    question: "How do I calculate sales tax on a purchase in 2025?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Basic Formula:</strong> Sales Tax = Purchase Price × Sales Tax
          Rate
        </p>
        <p className="mb-2">
          <strong>Example calculations with 2025 rates:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>$100 item at 8.25% rate = $100 × 0.0825 = $8.25 tax</li>
          <li>Total with tax = $100 + $8.25 = $108.25</li>
        </ul>
        <p className="mb-2">
          <strong>To find pre-tax price:</strong> Pre-tax Price = Total Price ÷
          (1 + Tax Rate)
        </p>
        <p className="text-sm">
          Example: $108.25 total ÷ 1.0825 = $100 pre-tax price
        </p>
      </>
    ),
  },
  {
    id: "states-without-sales-tax",
    question: "Which states don't have sales tax in 2025?",
    answer: (
      <>
        <p className="mb-2">Five states have no statewide sales tax in 2025:</p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Alaska:</strong> No state sales tax, but local taxes up to
            9.5%
          </li>
          <li>
            <strong>Delaware:</strong> No state or local sales tax
          </li>
          <li>
            <strong>Montana:</strong> No state sales tax, minimal local taxes
          </li>
          <li>
            <strong>New Hampshire:</strong> No sales tax, but 9% tax on
            meals/rooms
          </li>
          <li>
            <strong>Oregon:</strong> No state or local sales tax
          </li>
        </ul>
        <p>
          Even in no-sales-tax states, you may still pay sales tax on online
          purchases from out-of-state retailers due to economic nexus laws.
        </p>
      </>
    ),
  },
  {
    id: "sales-tax-vs-vat",
    question: "What's the difference between sales tax and VAT?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Sales Tax (US System):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Applied only at final point of sale</li>
          <li>Hidden from consumer until purchase</li>
          <li>Collected by retailer</li>
          <li>Rates vary dramatically by location (0% to 13.43% in 2025)</li>
        </ul>
        <p className="mb-2">
          <strong>VAT (Value-Added Tax - Used in 160+ countries):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Applied at each stage of production/distribution</li>
          <li>Included in advertised prices</li>
          <li>More uniform rates nationwide (typically 15-25%)</li>
          <li>Businesses can reclaim VAT on inputs</li>
        </ul>
      </>
    ),
  },
  {
    id: "why-sales-tax-rates-vary",
    question: "Why do sales tax rates vary so much between locations in 2025?",
    answer: (
      <>
        <p className="mb-2">
          Sales tax rates are set independently by different levels of
          government:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>State governments:</strong> Set base sales tax rates
            (0-7.25% in 2025)
          </li>
          <li>
            <strong>Counties:</strong> Can add their own sales tax (up to 5%+)
          </li>
          <li>
            <strong>Cities:</strong> May impose additional municipal sales tax
            (up to 4%+)
          </li>
          <li>
            <strong>Special districts:</strong> Transportation, schools may add
            taxes (up to 2%+)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Highest combined rates in 2025:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Arizona: Up to 13.43%</li>
          <li>Alabama: Up to 13.00%</li>
          <li>Arkansas: Up to 12.625%</li>
          <li>Louisiana: Up to 12.00%</li>
        </ul>
      </>
    ),
  },
  {
    id: "online-sales-tax-2025",
    question: "How does online sales tax work in 2025?",
    answer: (
      <>
        <p className="mb-2">
          Online sales tax has evolved significantly since the 2018 Supreme
          Court Wayfair decision:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Economic nexus:</strong> Most states require tax collection
            if you exceed $100,000 in sales or 200 transactions annually
          </li>
          <li>
            <strong>Destination-based taxation:</strong> Tax rates based on
            where customer receives the product
          </li>
          <li>
            <strong>Marketplace facilitator laws:</strong> Amazon, eBay, etc.
            collect tax for third-party sellers
          </li>
          <li>
            <strong>Digital products:</strong> Many states now tax software,
            streaming services, and digital downloads
          </li>
        </ul>
        <p className="text-sm">
          As of 2025, over 45 states require out-of-state sellers to collect
          sales tax when they meet economic nexus thresholds.
        </p>
      </>
    ),
  },
  {
    id: "sales-tax-exemptions-2025",
    question: "What items are exempt from sales tax in 2025?",
    answer: (
      <>
        <p className="mb-2">
          Common sales tax exemptions vary by state but typically include:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Groceries:</strong> Most states exempt unprepared food
            (Kansas reduced food tax to 0% in 2025)
          </li>
          <li>
            <strong>Prescription medications:</strong> Exempt in virtually all
            states
          </li>
          <li>
            <strong>Clothing:</strong> Some states exempt basic clothing items
          </li>
          <li>
            <strong>Business purchases:</strong> Items for resale with valid
            certificates
          </li>
          <li>
            <strong>Manufacturing equipment:</strong> Often exempt in industrial
            states
          </li>
        </ul>
        <p className="mb-2">
          <strong>2025 updates:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Nevada: Diapers (adult and children) now exempt</li>
          <li>Louisiana: Digital products now taxable</li>
        </ul>
      </>
    ),
  },
  {
    id: "business-sales-tax-compliance",
    question: "What are business sales tax compliance requirements in 2025?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Key compliance requirements for businesses:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Register for sales tax permits in all nexus states</li>
          <li>Collect appropriate tax rates based on customer location</li>
          <li>File returns monthly, quarterly, or annually based on volume</li>
          <li>Maintain detailed transaction records for 3-7 years</li>
          <li>Monitor economic nexus thresholds across all states</li>
        </ul>
        <p className="mb-2">
          <strong>Technology solutions in 2025:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Automated tax calculation software</li>
          <li>Real-time rate updates and nexus monitoring</li>
          <li>Integration with e-commerce platforms</li>
          <li>Streamlined filing and remittance systems</li>
        </ul>
      </>
    ),
  },
];

export default function SalesTaxFAQSection() {
  return (
    <FAQSection
      title="2025 Sales Tax Frequently Asked Questions"
      items={salesTaxFAQItems}
    />
  );
}

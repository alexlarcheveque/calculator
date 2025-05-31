"use client";

import { useState } from "react";
import FAQSection, { FAQItem } from "../ui/FAQSection";

const salesTaxFAQItems: FAQItem[] = [
  {
    id: "what-is-sales-tax",
    question: "What is sales tax and how does it work?",
    answer: (
      <>
        <p className="mb-2">
          Sales tax is a consumption tax imposed by state and local governments
          on the sale of goods and services. It's collected by the seller at the
          point of purchase and remitted to the government.
        </p>
        <p className="mb-2">
          <strong>Key characteristics:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Applied only at the final point of sale to consumers</li>
          <li>Collected by businesses on behalf of government</li>
          <li>Rates vary by state and local jurisdiction</li>
          <li>Generally applies to tangible goods, some services</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-calculate-sales-tax",
    question: "How do I calculate sales tax on a purchase?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Basic Formula:</strong> Sales Tax = Purchase Price × Sales Tax
          Rate
        </p>
        <p className="mb-2">
          <strong>Example calculations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>$100 item at 6.5% rate = $100 × 0.065 = $6.50 tax</li>
          <li>Total with tax = $100 + $6.50 = $106.50</li>
        </ul>
        <p className="mb-2">
          <strong>To find pre-tax price:</strong> Pre-tax Price = Total Price ÷
          (1 + Tax Rate)
        </p>
        <p className="text-sm">
          Example: $106.50 total ÷ 1.065 = $100 pre-tax price
        </p>
      </>
    ),
  },
  {
    id: "states-without-sales-tax",
    question: "Which states don't have sales tax?",
    answer: (
      <>
        <p className="mb-2">Five states have no statewide sales tax:</p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Alaska:</strong> No state sales tax, but local taxes up to
            7.5%
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
          purchases from out-of-state retailers.
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
          <li>Rates vary dramatically by location</li>
        </ul>
        <p className="mb-2">
          <strong>VAT (Value-Added Tax - Used in 160+ countries):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Applied at each stage of production/distribution</li>
          <li>Included in advertised prices</li>
          <li>More uniform rates nationwide</li>
          <li>Businesses can reclaim VAT on inputs</li>
        </ul>
      </>
    ),
  },
  {
    id: "sales-tax-deduction-income-tax",
    question: "Can I deduct sales tax on my federal income tax return?",
    answer: (
      <>
        <p className="mb-2">
          Yes, but only if you itemize deductions. You can choose to deduct
          either:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>State and local income taxes, OR</strong>
          </li>
          <li>
            <strong>State and local sales taxes</strong>
          </li>
        </ul>
        <p className="mb-2">
          <strong>When sales tax deduction makes sense:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>You live in a state with no income tax</li>
          <li>You made large purchases (car, boat, home improvements)</li>
          <li>You can document all sales tax paid throughout the year</li>
        </ul>
      </>
    ),
  },
  {
    id: "why-sales-tax-rates-vary",
    question: "Why do sales tax rates vary so much between locations?",
    answer: (
      <>
        <p className="mb-2">
          Sales tax rates are set independently by different levels of
          government:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>State governments:</strong> Set base sales tax rates
            (0-7.25%)
          </li>
          <li>
            <strong>Counties:</strong> Can add their own sales tax
          </li>
          <li>
            <strong>Cities:</strong> May impose additional municipal sales tax
          </li>
          <li>
            <strong>Special districts:</strong> Transportation, schools may add
            taxes
          </li>
        </ul>
        <p className="mb-2">
          <strong>Highest combined rates (2024):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Tennessee: Up to 9.75%</li>
          <li>Louisiana: Up to 11.45%</li>
          <li>Arkansas: Up to 11.25%</li>
        </ul>
      </>
    ),
  },
  {
    id: "sales-tax-exemptions",
    question: "What items are typically exempt from sales tax?",
    answer: (
      <>
        <p className="mb-2">Common sales tax exemptions (varies by state):</p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Food:</strong> Groceries often exempt, restaurants usually
            taxed
          </li>
          <li>
            <strong>Prescription medications:</strong> Usually exempt
          </li>
          <li>
            <strong>Medical devices:</strong> Often exempt with prescription
          </li>
          <li>
            <strong>Clothing:</strong> Some states exempt basic clothing
          </li>
          <li>
            <strong>Services:</strong> Many professional services exempt
          </li>
        </ul>
        <p className="mb-2">
          <strong>Sales tax holidays:</strong> Many states offer temporary
          exemptions for:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Back-to-school items (clothing, supplies)</li>
          <li>Energy-efficient appliances</li>
          <li>Emergency preparedness supplies</li>
        </ul>
      </>
    ),
  },
  {
    id: "online-purchases-sales-tax",
    question: "How does sales tax work for online purchases?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Current rules (post-2018 Wayfair decision):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Sales tax based on delivery address, not seller location</li>
          <li>Major retailers collect sales tax automatically</li>
          <li>States can require collection from out-of-state sellers</li>
          <li>Economic nexus thresholds vary by state</li>
        </ul>
        <p className="mb-2">
          <strong>Use tax responsibility:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>If sales tax not collected, you may owe "use tax"</li>
          <li>Report on state income tax return</li>
          <li>Same rate as local sales tax</li>
          <li>Many states have voluntary compliance programs</li>
        </ul>
      </>
    ),
  },
  {
    id: "business-sales-tax-collection",
    question: "How do businesses handle sales tax collection and remittance?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Business responsibilities:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Register for sales tax permit in each state where required</li>
          <li>Collect appropriate tax rate based on delivery location</li>
          <li>File regular returns (monthly, quarterly, or annually)</li>
          <li>Remit collected taxes by due dates</li>
        </ul>
        <p className="mb-2">
          <strong>Economic nexus thresholds (varies by state):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>$100,000+ in sales, OR</li>
          <li>200+ separate transactions</li>
          <li>Some states use only sales threshold</li>
        </ul>
      </>
    ),
  },
  {
    id: "sales-tax-planning-strategies",
    question: "Are there strategies to minimize sales tax legally?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Legal strategies to reduce sales tax:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Timing:</strong> Make large purchases during sales tax
            holidays
          </li>
          <li>
            <strong>Location:</strong> Buy in lower-tax jurisdictions (if
            practical)
          </li>
          <li>
            <strong>Business purchases:</strong> Obtain resale certificates for
            inventory
          </li>
          <li>
            <strong>Exemptions:</strong> Understand what qualifies in your state
          </li>
        </ul>
        <p className="mb-2">
          <strong>For businesses:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Use proper exemption certificates</li>
          <li>Consider business structure for purchases</li>
          <li>Track exemptions and deductions carefully</li>
        </ul>
      </>
    ),
  },
];

export default function SalesTaxFAQSection() {
  return (
    <FAQSection
      items={salesTaxFAQItems}
      title="Frequently Asked Questions About Sales Tax"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="sales-tax-calculator-faq-schema"
      relatedLinks={[
        { href: "/income-tax", label: "Income Tax Calculator" },
        { href: "/salary", label: "Salary Calculator" },
      ]}
    />
  );
}

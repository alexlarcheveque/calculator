"use client";

import { useState } from "react";
import FAQSection, { FAQItem } from "../ui/FAQSection";

const incomeTaxFAQItems: FAQItem[] = [
  {
    id: "how-accurate-tax-calculator",
    question: "How accurate is this income tax calculator?",
    answer: (
      <>
        <p className="mb-2">
          This calculator provides reliable estimates based on current federal
          tax brackets, standard deductions, and common tax credits. However,
          actual tax calculations may vary due to:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Alternative Minimum Tax (AMT) considerations</li>
          <li>Additional Medicare tax on high earners</li>
          <li>Net Investment Income Tax (NIIT)</li>
          <li>Complex deduction limitations and phase-outs</li>
          <li>State-specific tax rules and credits</li>
        </ul>
        <p>
          For complex tax situations or professional preparation, consult a
          qualified tax professional.
        </p>
      </>
    ),
  },
  {
    id: "standard-vs-itemized-deductions",
    question: "Should I take the standard deduction or itemize?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Standard Deduction (2024):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Single: $14,600</li>
          <li>Married Filing Jointly: $29,200</li>
          <li>Head of Household: $21,900</li>
        </ul>
        <p className="mb-2">
          <strong>
            Consider itemizing if your total deductions exceed the standard
            deduction:
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>State/local taxes (SALT) up to $10,000</li>
          <li>Mortgage interest and property taxes</li>
          <li>Charitable donations</li>
          <li>Medical expenses exceeding 7.5% of AGI</li>
        </ul>
      </>
    ),
  },
  {
    id: "tax-credits-vs-deductions",
    question: "What's the difference between tax credits and deductions?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Tax Deductions:</strong> Reduce your taxable income. A $1,000
          deduction saves you $220 in taxes if you're in the 22% bracket.
        </p>
        <p className="mb-2">
          <strong>Tax Credits:</strong> Directly reduce your tax bill
          dollar-for-dollar. A $1,000 credit saves you $1,000 in taxes.
        </p>
        <p className="mb-2">
          <strong>Common Tax Credits:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Child Tax Credit: $2,000 per qualifying child</li>
          <li>Child and Dependent Care Credit: Up to $3,000</li>
          <li>American Opportunity Tax Credit: Up to $2,500</li>
          <li>Earned Income Tax Credit: Up to $7,430 (2024)</li>
        </ul>
      </>
    ),
  },
  {
    id: "marginal-vs-effective-tax-rate",
    question: "What's the difference between marginal and effective tax rates?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Marginal Tax Rate:</strong> The tax rate on your last dollar
          of income (your tax bracket). This determines how much tax you'll pay
          on additional income.
        </p>
        <p className="mb-2">
          <strong>Effective Tax Rate:</strong> Your total tax divided by your
          total income. This represents your average tax rate across all income.
        </p>
        <p className="mb-2">
          <strong>Example:</strong> $100,000 income with $18,000 tax bill:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Marginal rate: 22% (if in 22% bracket)</li>
          <li>Effective rate: 18% ($18,000 ÷ $100,000)</li>
        </ul>
      </>
    ),
  },
  {
    id: "what-income-to-include",
    question: "What income should I include in my tax calculation?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Include all taxable income:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Wages, salaries, tips (Form W-2)</li>
          <li>Interest income (Form 1099-INT)</li>
          <li>Dividend income (Form 1099-DIV)</li>
          <li>Capital gains (Form 1099-B)</li>
          <li>Business/self-employment income</li>
          <li>Rental income</li>
          <li>Retirement distributions</li>
        </ul>
        <p className="mb-2">
          <strong>Generally exclude:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Municipal bond interest</li>
          <li>Life insurance proceeds</li>
          <li>Gifts and inheritances</li>
          <li>Some Social Security benefits</li>
        </ul>
      </>
    ),
  },
  {
    id: "salt-deduction-cap",
    question: "How does the SALT deduction cap work?",
    answer: (
      <>
        <p className="mb-2">
          The State and Local Tax (SALT) deduction is capped at $10,000 for all
          filing statuses through 2025.
        </p>
        <p className="mb-2">
          <strong>SALT includes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>State income taxes</li>
          <li>Local income taxes</li>
          <li>Property taxes on personal residence</li>
          <li>State/local sales taxes (if elected instead of income tax)</li>
        </ul>
        <p>
          High-tax states may see limited benefit from itemizing due to this
          cap. Consider strategies like prepaying property taxes or timing state
          tax payments.
        </p>
      </>
    ),
  },
  {
    id: "child-tax-credit-calculation",
    question: "How is the Child Tax Credit calculated?",
    answer: (
      <>
        <p className="mb-2">
          <strong>2024 Child Tax Credit:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>$2,000 per qualifying child under 17</li>
          <li>$500 for other dependents (17-18, full-time students 19-24)</li>
          <li>Up to $1,400 is refundable (Additional Child Tax Credit)</li>
        </ul>
        <p className="mb-2">
          <strong>Phase-out thresholds:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Single: Begins at $200,000 AGI</li>
          <li>Married Filing Jointly: Begins at $400,000 AGI</li>
          <li>Credit reduces by $50 for each $1,000 over threshold</li>
        </ul>
      </>
    ),
  },
  {
    id: "quarterly-tax-payments",
    question: "When should I make quarterly estimated tax payments?",
    answer: (
      <>
        <p className="mb-2">
          Make quarterly payments if you expect to owe $1,000 or more when you
          file your return, and your withholding and credits don't cover at
          least 90% of this year's tax or 100% of last year's tax.
        </p>
        <p className="mb-2">
          <strong>2024 Quarterly Due Dates:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Q1 2024: April 15, 2024</li>
          <li>Q2 2024: June 17, 2024</li>
          <li>Q3 2024: September 16, 2024</li>
          <li>Q4 2024: January 15, 2025</li>
        </ul>
        <p>
          Common situations requiring quarterly payments include self-employment
          income, investment gains, rental income, or insufficient withholding.
        </p>
      </>
    ),
  },
  {
    id: "business-income-self-employment",
    question: "How do I handle business income and self-employment taxes?",
    answer: (
      <>
        <p className="mb-2">
          Self-employment income is subject to both income tax and
          self-employment tax:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Income Tax:</strong> Based on your regular tax brackets
          </li>
          <li>
            <strong>Self-Employment Tax:</strong> 15.3% (12.4% Social Security +
            2.9% Medicare)
          </li>
          <li>
            <strong>Additional Medicare Tax:</strong> 0.9% on income over
            $200,000 (single)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Deductions available:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>50% of self-employment tax</li>
          <li>Business expenses (home office, equipment, etc.)</li>
          <li>Health insurance premiums (if self-employed)</li>
        </ul>
      </>
    ),
  },
  {
    id: "tax-planning-strategies",
    question: "What are some effective tax planning strategies?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Income timing strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Defer income to lower-tax years</li>
          <li>Accelerate deductions into higher-tax years</li>
          <li>Harvest capital losses to offset gains</li>
          <li>Consider Roth conversions in low-income years</li>
        </ul>
        <p className="mb-2">
          <strong>Retirement planning:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Maximize 401(k) contributions ($23,000 limit for 2024)</li>
          <li>IRA contributions ($7,000 limit for 2024)</li>
          <li>HSA contributions (triple tax advantage)</li>
          <li>Consider traditional vs. Roth options</li>
        </ul>
      </>
    ),
  },
];

export default function IncomeTaxFAQSection() {
  return (
    <FAQSection
      items={incomeTaxFAQItems}
      title="Frequently Asked Questions About Income Tax Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="income-tax-calculator-faq-schema"
      relatedLinks={[
        { href: "/salary", label: "Salary Calculator" },
        { href: "/investment", label: "Investment Calculator" },
        { href: "/retirement", label: "Retirement Calculator" },
        { href: "/sales-tax", label: "Sales Tax Calculator" },
      ]}
    />
  );
}

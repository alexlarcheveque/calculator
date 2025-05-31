"use client";

import { useState } from "react";
import FAQSection, { FAQItem } from "../ui/FAQSection";

const salaryFAQItems: FAQItem[] = [
  {
    id: "salary-vs-wage-difference",
    question: "What is the difference between salary and wage?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Salary:</strong> A fixed annual compensation paid regardless
          of hours worked. Salaried employees typically receive the same
          paycheck each period and are often exempt from overtime pay.
        </p>
        <p className="mb-2">
          <strong>Wage:</strong> Hourly compensation based on actual hours
          worked. Wage earners are typically non-exempt and entitled to overtime
          pay for hours worked beyond 40 per week.
        </p>
        <p>
          Salaried positions often include benefits and more job security, while
          wage positions provide direct pay-for-time-worked with overtime
          opportunities.
        </p>
      </>
    ),
  },
  {
    id: "how-calculate-annual-salary",
    question: "How do I calculate my annual salary from hourly wage?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Basic Formula:</strong> Hourly Rate × Hours per Week × 52
          weeks
        </p>
        <p className="mb-2">
          <strong>Example:</strong> $25/hour × 40 hours/week × 52 weeks =
          $52,000 annually
        </p>
        <p className="mb-2">
          <strong>Adjusted Calculation:</strong> Account for unpaid vacation and
          holidays:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Calculate total working days: 260 days (52 weeks × 5 days)</li>
          <li>Subtract vacation/holidays: 260 - 25 = 235 working days</li>
          <li>Adjusted salary: $25 × 8 hours × 235 days = $47,000</li>
        </ul>
      </>
    ),
  },
  {
    id: "pay-frequency-explained",
    question:
      "What are the different pay frequencies and how do they affect my budget?",
    answer: (
      <>
        <p className="mb-2">Common pay frequencies include:</p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Weekly:</strong> 52 paychecks per year, easier budgeting
          </li>
          <li>
            <strong>Bi-weekly:</strong> 26 paychecks per year, most common
          </li>
          <li>
            <strong>Semi-monthly:</strong> 24 paychecks per year, fixed dates
          </li>
          <li>
            <strong>Monthly:</strong> 12 paychecks per year, largest amounts
          </li>
        </ul>
        <p>
          Bi-weekly pay results in two "extra" paychecks per year (26 vs 24),
          which can be helpful for savings goals or debt payments.
        </p>
      </>
    ),
  },
  {
    id: "factors-affecting-salary",
    question: "What factors most influence salary levels?",
    answer: (
      <>
        <p className="mb-2">Key salary determinants include:</p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Education:</strong> Advanced degrees can increase earning
            potential by 25-50%
          </li>
          <li>
            <strong>Experience:</strong> Each year of experience typically adds
            3-5% to salary
          </li>
          <li>
            <strong>Location:</strong> High cost-of-living areas often pay
            20-40% more
          </li>
          <li>
            <strong>Industry:</strong> Tech, finance, and healthcare typically
            offer higher salaries
          </li>
          <li>
            <strong>Company size:</strong> Larger companies often pay more but
            smaller companies may offer equity
          </li>
          <li>
            <strong>Skills:</strong> In-demand technical and soft skills command
            premium pay
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-many-federal-holidays",
    question:
      "How many federal holidays should I include in salary calculations?",
    answer: (
      <>
        <p className="mb-2">
          The U.S. has 11 federal holidays, but most private employers observe
          6-10 holidays:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>New Year's Day, Memorial Day, Independence Day, Labor Day</li>
          <li>Thanksgiving Day, Christmas Day</li>
          <li>
            Martin Luther King Jr. Day, Presidents Day, Columbus Day, Veterans
            Day
          </li>
          <li>Juneteenth (newest federal holiday)</li>
        </ul>
        <p>
          For salary calculations, use 8-10 holidays as a reasonable estimate
          for most employers.
        </p>
      </>
    ),
  },
  {
    id: "paid-time-off-calculation",
    question: "How much paid time off (PTO) is typical?",
    answer: (
      <>
        <p className="mb-2">
          PTO varies significantly by employer and experience level:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Entry level:</strong> 10-15 days per year
          </li>
          <li>
            <strong>Mid-career:</strong> 15-20 days per year
          </li>
          <li>
            <strong>Senior level:</strong> 20-25+ days per year
          </li>
          <li>
            <strong>European companies:</strong> Often 25-30+ days
          </li>
        </ul>
        <p>
          The U.S. has no federal requirement for paid vacation, unlike most
          developed countries.
        </p>
      </>
    ),
  },
  {
    id: "gross-vs-net-salary",
    question: "What's the difference between gross and net salary?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Gross Salary:</strong> Your total compensation before any
          deductions.
        </p>
        <p className="mb-2">
          <strong>Net Salary:</strong> Your take-home pay after deductions
          including:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Federal and state income taxes (varies by bracket)</li>
          <li>Social Security tax (6.2% up to $160,200 in 2023)</li>
          <li>Medicare tax (1.45% on all income)</li>
          <li>Health insurance premiums</li>
          <li>Retirement contributions (401k, etc.)</li>
        </ul>
      </>
    ),
  },
  {
    id: "salary-negotiation-timing",
    question: "When should I negotiate my salary?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Best times to negotiate:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>During job offer discussions (before accepting)</li>
          <li>Annual performance reviews</li>
          <li>After completing major projects or achievements</li>
          <li>When taking on additional responsibilities</li>
          <li>After obtaining new certifications or degrees</li>
        </ul>
        <p>
          Research market rates beforehand and document your achievements to
          support your request.
        </p>
      </>
    ),
  },
  {
    id: "salary-increase-strategies",
    question: "How can I increase my salary over time?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Proven strategies for salary growth:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Skill development:</strong> Learn in-demand technical skills
          </li>
          <li>
            <strong>Performance excellence:</strong> Consistently exceed
            expectations
          </li>
          <li>
            <strong>Network building:</strong> Join professional associations
          </li>
          <li>
            <strong>Education advancement:</strong> Pursue relevant
            certifications or degrees
          </li>
          <li>
            <strong>Job changes:</strong> Strategic moves can increase salary
            10-20%
          </li>
          <li>
            <strong>Leadership roles:</strong> Manage teams or projects
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "freelance-vs-employee-salary",
    question: "How does freelance income compare to employee salary?",
    answer: (
      <>
        <p className="mb-2">
          When comparing freelance rates to salary, consider:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Self-employment taxes:</strong> Additional 7.65% for Social
            Security/Medicare
          </li>
          <li>
            <strong>No benefits:</strong> Health insurance, retirement, PTO are
            your responsibility
          </li>
          <li>
            <strong>Business expenses:</strong> Equipment, software, home office
            costs
          </li>
          <li>
            <strong>Income instability:</strong> Irregular work and payment
            schedules
          </li>
          <li>
            <strong>Higher hourly rates:</strong> Typically 25-50% higher to
            compensate for above factors
          </li>
        </ul>
      </>
    ),
  },
];

export default function SalaryFAQSection() {
  return (
    <FAQSection
      items={salaryFAQItems}
      title="Frequently Asked Questions About Salary Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="salary-calculator-faq-schema"
      relatedLinks={[
        { href: "/income-tax", label: "Income Tax Calculator" },
        { href: "/investment", label: "Investment Calculator" },
        { href: "/retirement", label: "Retirement Calculator" },
        { href: "/mortgage", label: "Mortgage Calculator" },
      ]}
    />
  );
}

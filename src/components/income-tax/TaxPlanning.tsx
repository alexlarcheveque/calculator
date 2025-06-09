import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const taxPlanningSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Strategic tax planning throughout the year can significantly reduce your tax burden. The key is understanding which strategies work best for your situation and implementing them before year-end.",
  },
  {
    type: "subheader",
    heading: "Year-End Tax Strategies",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Maximize Retirement Contributions",
        description:
          "Contribute to tax-advantaged retirement accounts by December 31st (IRA contributions allowed until tax filing deadline). These reduce current taxable income",
      },
      {
        label: "Harvest Tax Losses",
        description:
          "Sell investments at a loss to offset capital gains. Can deduct up to $3,000 in excess losses against ordinary income annually.",
      },
      {
        label: "Bunch Charitable Deductions",
        description:
          "Combine multiple years of charitable giving into one year to exceed the standard deduction threshold, especially effective with donor-advised funds",
      },
      {
        label: "Timing Income and Deductions",
        description:
          "Defer income to next year or accelerate deductions into current year, depending on expected tax bracket changes",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Retirement Account Strategies",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "401(k) Contributions",
        description:
          "2025 limit: $23,500 ($31,000 if 50+). Reduces current taxable income while building retirement savings. Always capture full employer match first",
      },
      {
        label: "Traditional IRA",
        description:
          "2025 limit: $7,000 ($8,000 if 50+). Traditional IRA deduction phases out with higher incomes if you have workplace plan",
      },
      {
        label: "Roth IRA",
        description:
          "Same contribution limits as traditional IRA but no current deduction. Tax-free growth and withdrawals in retirement. Income limits apply",
      },
      {
        label: "Backdoor Roth IRA",
        description:
          "For high earners above Roth IRA income limits. Contribute to non-deductible traditional IRA, then convert to Roth. No income limits on conversions",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Advanced Planning Strategies",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Roth Conversions",
        description:
          "Convert traditional IRA/401(k) funds to Roth during low-income years. Pay taxes now at lower rates for tax-free future growth",
      },
      {
        label: "Qualified Small Business Stock (QSBS)",
        description:
          "Up to $10 million or 10x basis (whichever is greater) exclusion on gain from qualified small business stock held 5+ years",
      },
      {
        label: "Tax-Loss Harvesting in Taxable Accounts",
        description:
          "Systematically realize losses to offset gains throughout the year. Avoid wash sale rules by waiting 31 days before repurchasing",
      },
      {
        label: "Asset Location Optimization",
        description:
          "Place tax-inefficient investments in tax-advantaged accounts and tax-efficient investments in taxable accounts",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Health Savings Account (HSA)",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Triple Tax Advantage",
        description:
          "HSAs offer a triple tax advantage: deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses. 2025 limits: $4,300 (individual), $8,550 (family).",
      },
      {
        label: "Retirement Benefits",
        description:
          "After age 65, HSA functions like traditional IRA for non-medical withdrawals (taxable but no penalty).",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Common Tax Planning Mistakes",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Waiting Until Year-End",
        description:
          "Many strategies require full-year implementation. Start planning in January, not December",
      },
      {
        label: "Ignoring State Taxes",
        description:
          "Focus only on federal tax optimization while ignoring state tax implications, especially for multi-state situations",
      },
      {
        label: "Over-Optimizing for Current Year",
        description:
          "Making decisions that save taxes today but create larger problems in future years. Think multi-year",
      },
      {
        label: "Not Considering Phase-Outs",
        description:
          "Income-based phase-outs can create effective marginal tax rates much higher than stated bracket rates",
      },
    ],
  },
];

export default function TaxPlanning() {
  return (
    <InfoCard title="Strategic Tax Planning" sections={taxPlanningSections} />
  );
}

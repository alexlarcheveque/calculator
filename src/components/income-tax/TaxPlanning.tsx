import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const taxPlanningSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Effective tax planning involves strategic timing of income and deductions, maximizing tax-advantaged accounts, and understanding the long-term impact of tax decisions. Proactive planning throughout the year can save thousands in taxes.",
  },
  {
    type: "subheader",
    heading: "Income Timing Strategies",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Defer Income",
        description:
          "Delay receiving income until the next tax year if you expect to be in a lower tax bracket. Useful for bonuses, consulting income, or investment gains.",
      },
      {
        title: "Accelerate Income",
        description:
          "Receive income earlier if you expect higher tax rates in the future or need to meet minimum income requirements for certain credits or deductions.",
      },
      {
        title: "Harvest Tax Losses",
        description:
          "Sell investments at a loss to offset capital gains. Can deduct up to $3,000 in excess losses against ordinary income annually.",
      },
      {
        title: "Manage Capital Gains",
        description:
          "Time the sale of appreciated assets to optimize between short-term (ordinary rates) and long-term (preferential rates) capital gains treatment.",
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
        label: "Maximize 401(k) Contributions",
        description:
          "2024 limit: $23,000 ($30,500 if 50+). Reduces current taxable income while building retirement savings. Always capture full employer match first",
      },
      {
        label: "Traditional vs. Roth Decisions",
        description:
          "Traditional provides immediate tax deduction; Roth provides tax-free growth. Choose based on current vs. expected future tax rates",
      },
      {
        label: "IRA Contributions",
        description:
          "2024 limit: $7,000 ($8,000 if 50+). Traditional IRA deduction phases out with higher incomes if you have workplace plan",
      },
      {
        label: "Roth Conversions",
        description:
          "Convert traditional IRA/401(k) to Roth in low-income years. Pay taxes now at lower rates for tax-free future withdrawals",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Year-End Tax Moves",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "tip",
      title: "December Tax Planning Checklist",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">Income Management:</p>
              <ul className="space-y-1">
                <li>• Defer year-end bonuses if beneficial</li>
                <li>• Realize capital gains/losses</li>
                <li>• Consider Roth conversions</li>
                <li>• Bunch income or spread it out</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Deduction Timing:</p>
              <ul className="space-y-1">
                <li>• Prepay property taxes (if beneficial)</li>
                <li>• Make charitable contributions</li>
                <li>• Pay outstanding medical bills</li>
                <li>• Consider bunching itemized deductions</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-600 text-center">
            Most year-end moves must be completed by December 31
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Advanced Strategies",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "HSA Maximization",
        description:
          "Triple tax advantage: deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses. 2024 limits: $4,300 (individual), $8,550 (family).",
      },
      {
        title: "Tax-Loss Harvesting",
        description:
          "Systematically realize losses to offset gains while avoiding wash sale rules. Can carry forward unused losses indefinitely to future years.",
      },
      {
        title: "Charitable Planning",
        description:
          "Consider donor-advised funds, appreciated securities donations, and bunching strategies. Qualified charitable distributions from IRA if 70½ or older.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Multi-Year Planning",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Long-Term Tax Considerations",
      content: (
        <div>
          <p className="mb-2">
            <strong>Plan for life events and tax law changes:</strong>
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              • <strong>Career changes:</strong> Plan Roth conversions during
              low-income years between jobs
            </li>
            <li>
              • <strong>Retirement transition:</strong> Manage withdrawal
              sequences from different account types
            </li>
            <li>
              • <strong>Estate planning:</strong> Understand step-up in basis
              and gift/estate tax implications
            </li>
            <li>
              • <strong>Tax law sunset:</strong> Many current provisions expire
              after 2025, including higher standard deductions
            </li>
            <li>
              • <strong>State tax planning:</strong> Consider domicile changes
              for retirees in high-tax states
            </li>
          </ul>
        </div>
      ),
    },
  },
];

export default function TaxPlanning() {
  return (
    <InfoCard
      title="Tax Planning & Optimization Strategies"
      sections={taxPlanningSections}
    />
  );
}

import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const retirementAccountsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Americans rely on several key sources for retirement income. Understanding these different account types and income sources helps you build a comprehensive retirement strategy and maximize your tax advantages.",
  },
  {
    type: "subheader",
    heading: "Employer-Sponsored Retirement Plans",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "401(k) Plans",
        description:
          "Most common employer plan with high contribution limits ($23,000 in 2024, $30,500 if 50+). Many employers offer matching contributions - take full advantage as it's free money.",
      },
      {
        title: "403(b) Plans",
        description:
          "For nonprofit organizations, schools, and government workers. Similar to 401(k)s with comparable contribution limits and potential employer matching.",
      },
      {
        title: "457 Plans",
        description:
          "For state and local government employees. Unique advantage: no early withdrawal penalty at any age if you leave your job, making it flexible for early retirement.",
      },
      {
        title: "Traditional Pensions",
        description:
          "Defined benefit plans that pay monthly income for life. Less common today but still offered by some government employers and large corporations.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Individual Retirement Accounts (IRAs)",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Traditional IRA",
        description:
          "Tax deduction on contributions, taxed on withdrawals. Good if you expect to be in a lower tax bracket in retirement. $7,000 limit ($8,000 if 50+) in 2024",
      },
      {
        label: "Roth IRA",
        description:
          "No tax deduction now, but tax-free growth and withdrawals in retirement. Ideal for younger savers and those expecting higher future tax rates",
      },
      {
        label: "SEP-IRA",
        description:
          "For self-employed individuals and small business owners. Higher contribution limits (up to 25% of income or $69,000 in 2024)",
      },
      {
        label: "Health Savings Account (HSA)",
        description:
          "Triple tax advantage: deductible contributions, tax-free growth, tax-free withdrawals for medical expenses. Functions like retirement account after age 65",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Social Security & Other Income Sources",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Social Security Benefits",
        description:
          "Replaces about 40% of pre-retirement income. You can claim reduced benefits at 62, full benefits at 66-67, or increased benefits by waiting until 70.",
      },
      {
        title: "Personal Savings & Investments",
        description:
          "Taxable investment accounts, real estate, and other assets. Provides flexibility since there are no age restrictions or required distributions.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Retirement Savings Priority Order",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "1. Employer Match",
        description:
          "Contribute enough to get full 401(k) match - it's an immediate 100% return",
      },
      {
        label: "2. High-Interest Debt",
        description:
          "Pay off credit cards and other high-interest debt (usually above 6-8% interest)",
      },
      {
        label: "3. Emergency Fund",
        description:
          "Build 3-6 months of expenses in a savings account for unexpected costs",
      },
      {
        label: "4. Max Retirement Accounts",
        description:
          "Maximize 401(k), IRA, and HSA contributions for tax advantages",
      },
      {
        label: "5. Taxable Investments",
        description:
          "Once retirement accounts are maxed, invest in taxable accounts for additional growth",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Tax Diversification Strategy",
      content:
        "Consider having money in both traditional (tax-deferred) and Roth (tax-free) accounts. This gives you flexibility to manage your tax burden in retirement by choosing which accounts to withdraw from each year.",
    },
  },
];

export default function RetirementAccounts() {
  return (
    <InfoCard
      title="Retirement Accounts & Income Sources"
      sections={retirementAccountsSections}
    />
  );
}

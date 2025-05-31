import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const taxesInflationSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Taxes and inflation significantly impact your real returns from interest-earning investments. Understanding these factors helps you make better decisions about where to save and invest your money.",
  },
  {
    type: "subheader",
    heading: "Tax Impact on Interest Earnings",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Taxable Interest",
        description:
          "Interest from savings accounts, CDs, and most bonds is taxed as ordinary income at your marginal tax rate, reducing your effective return.",
      },
      {
        title: "Tax-Advantaged Accounts",
        description:
          "401(k)s, IRAs, and similar accounts allow interest to compound tax-free or tax-deferred, significantly boosting long-term growth.",
      },
      {
        title: "Municipal Bonds",
        description:
          "Interest from municipal bonds is often exempt from federal taxes and sometimes state taxes, making them attractive for high earners.",
      },
      {
        title: "Capital Gains vs. Interest",
        description:
          "Long-term capital gains are taxed at lower rates than interest income, making growth investments potentially more tax-efficient.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Real Tax Impact Example",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Taxes Reduce Your Returns",
      content: (
        <div>
          <p className="mb-2">$100 invested at 6% for 20 years:</p>
          <ul className="space-y-1 text-sm">
            <li>
              • <strong>Tax-free:</strong> Grows to $320.71
            </li>
            <li>
              • <strong>25% tax rate:</strong> Grows to only $239.78
            </li>
            <li>
              • <strong>Difference:</strong> $80.93 lost to taxes
            </li>
          </ul>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Inflation's Hidden Impact",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Purchasing Power Erosion",
        description:
          "Inflation reduces what your money can buy over time. At 3% inflation, $100 today has the purchasing power of only $74 in 10 years",
      },
      {
        label: "Real vs. Nominal Returns",
        description:
          "Your real return is your nominal interest rate minus inflation. A 5% return with 3% inflation gives you only 2% real growth",
      },
      {
        label: "Historical Inflation",
        description:
          "U.S. inflation has averaged about 3% annually over the long term, though it can vary significantly in the short term",
      },
      {
        label: "Inflation Protection Strategies",
        description:
          "TIPS (Treasury Inflation-Protected Securities), I-bonds, and growth investments can help protect against inflation",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "tip",
      title: "Maximizing After-Tax, After-Inflation Returns",
      content:
        "Focus on tax-advantaged accounts first, consider investments that historically outpace inflation, and remember that earning returns significantly above both taxes and inflation is key to building real wealth over time.",
    },
  },
];

export default function TaxesInflationCard() {
  return (
    <InfoCard
      title="Taxes & Inflation Impact on Interest"
      sections={taxesInflationSections}
    />
  );
}

import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const compoundingFrequencySections: ContentSection[] = [
  {
    type: "text",
    content:
      "Interest can compound on different frequency schedules, and this significantly impacts your returns. Understanding how compounding frequency works helps you choose the best savings and investment options for maximum growth.",
  },
  {
    type: "subheader",
    heading: "Common Compounding Frequencies",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Annual Compounding",
        description:
          "Interest is calculated and added once per year. Most common for CDs and some savings accounts. Provides the baseline for comparison with other frequencies.",
      },
      {
        title: "Semi-Annual Compounding",
        description:
          "Interest compounds twice per year (every 6 months). Often used for bonds and some investment products. Provides moderately better returns than annual.",
      },
      {
        title: "Quarterly Compounding",
        description:
          "Interest compounds four times per year (every 3 months). Common for many savings accounts and some CDs. Noticeable improvement over annual compounding.",
      },
      {
        title: "Monthly Compounding",
        description:
          "Interest compounds twelve times per year. Very common for savings accounts, mortgages, and credit cards. Significant improvement over annual compounding.",
      },
      {
        title: "Daily Compounding",
        description:
          "Interest compounds 365 times per year. Offered by many high-yield savings accounts and money market accounts. Provides near-maximum benefit.",
      },
      {
        title: "Continuous Compounding",
        description:
          "Mathematical limit where interest compounds infinitely often. Theoretical maximum return for any given interest rate. Used in advanced financial modeling.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Impact on Different Financial Products",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Savings Accounts",
        description:
          "Most compound daily or monthly. High-yield online savings accounts often compound daily for maximum growth",
      },
      {
        label: "Certificates of Deposit (CDs)",
        description:
          "Usually compound monthly, quarterly, or annually. Longer-term CDs may have different compounding schedules",
      },
      {
        label: "Credit Cards",
        description:
          "Almost always compound daily, which works against you. This is why carrying a balance is so expensive",
      },
      {
        label: "Mortgages & Loans",
        description:
          "Typically compound monthly. This frequency affects your total interest paid over the life of the loan",
      },
      {
        label: "Investment Accounts",
        description:
          "Depends on the investment type. Dividend reinvestment creates effective compounding when earnings are reinvested",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Frequency Comparison Example",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "tip",
      title: "Real Impact Example",
      content: (
        <div>
          <p className="mb-2">$10,000 at 6% interest for 10 years:</p>
          <p className="mb-1 text-sm">• Annual: $17,908.48</p>
          <p className="mb-1 text-sm">• Quarterly: $18,061.11</p>
          <p className="mb-1 text-sm">• Monthly: $18,193.97</p>
          <p className="mb-1 text-sm">• Daily: $18,220.07</p>
          <p className="text-sm font-medium">
            Daily vs. Annual difference: $311.59
          </p>
        </div>
      ),
    },
  },
];

export default function CompoundingFrequency() {
  return (
    <InfoCard
      title="Compounding Frequencies & Their Impact"
      sections={compoundingFrequencySections}
    />
  );
}

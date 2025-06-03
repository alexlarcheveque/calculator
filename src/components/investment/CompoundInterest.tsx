import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const compoundInterestSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Compound interest is often called the 'eighth wonder of the world' because of its remarkable ability to accelerate wealth building. Understanding how it works can dramatically improve your investment strategy and long-term financial outcomes.",
  },
  {
    type: "subheader",
    heading: "How Compound Interest Works",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Simple Interest",
        description:
          "Earns interest only on the original principal. For example, $1,000 at 5% earns $50 per year, every year. Total after 10 years: $1,500.",
      },
      {
        title: "Compound Interest",
        description:
          "Earns interest on both principal AND accumulated interest. The same $1,000 at 5% compounded annually becomes $1,629 after 10 years.",
      },
      {
        title: "Exponential Growth",
        description:
          "The longer the time period, the more dramatic the difference. After 30 years, simple interest gives you $2,500 while compound interest yields $4,322.",
      },
      {
        title: "Frequency Matters",
        description:
          "More frequent compounding (daily vs. annually) increases returns. The same investment compounded daily instead of annually can add hundreds of dollars over time.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Maximizing Compound Interest",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Start Early",
        description:
          "Time is your greatest asset. Starting 10 years earlier can double or triple your final returns, even with the same total contributions.",
      },
      {
        label: "Contribute Regularly",
        description:
          "Consistent monthly contributions are often more powerful than large lump sums due to dollar-cost averaging and more compounding periods.",
      },
      {
        label: "Reinvest Returns",
        description:
          "Let your dividends and interest compound rather than withdrawing them. This accelerates the exponential growth effect.",
      },
      {
        label: "Choose Higher Frequencies",
        description:
          "When possible, choose investments that compound more frequently (monthly or daily) rather than annually.",
      },
      {
        label: "Avoid Early Withdrawals",
        description:
          "Breaking the compound interest chain by withdrawing funds early significantly reduces your long-term wealth accumulation.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Real-World Example",
      content:
        "A 25-year-old investing $200/month at 7% return will have about $1.37 million at age 65. If they wait until age 35 to start, they'll only have about $612,000 - less than half, despite only investing 10 years longer.",
    },
  },
];

export default function CompoundInterest() {
  return (
    <InfoCard
      title="The Power of Compound Interest"
      sections={compoundInterestSections}
    />
  );
}

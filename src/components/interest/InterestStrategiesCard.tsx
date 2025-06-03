import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const interestStrategiesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Strategic approaches to interest-earning investments can significantly boost your long-term wealth. Understanding contribution timing, the Rule of 72, and optimization techniques helps maximize your compound growth potential.",
  },
  {
    type: "subheader",
    heading: "The Rule of 72",
    headingLevel: "h3",
  },
  {
    type: "text",
    content: (
      <div>
        <p className="mb-4">
          Quick mental calculation to estimate doubling time:
        </p>
        <div className="bg-gray-100 p-4 rounded font-mono text-lg text-center mb-4">
          Years to Double ≈ 72 ÷ Interest Rate
        </div>
        <p className="mb-2">
          <strong>Examples:</strong>
        </p>
        <ul className="space-y-1 mb-4">
          <li>• 6% rate: 72 ÷ 6 = 12 years to double</li>
          <li>• 8% rate: 72 ÷ 8 = 9 years to double</li>
          <li>• 12% rate: 72 ÷ 12 = 6 years to double</li>
        </ul>
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Most accurate for rates between 6% and 10%
        </p>
      </div>
    ),
  },
  {
    type: "subheader",
    heading: "Contribution Strategies",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Regular vs. Lump Sum",
        description:
          "Regular contributions benefit from dollar-cost averaging and extended compounding time. Lump sums get maximum immediate compounding but require timing market conditions.",
      },
      {
        title: "Increasing Contributions",
        description:
          "Gradually increasing your contribution amounts (3-5% annually) can significantly boost your final balance without dramatically impacting your current budget.",
      },
      {
        title: "Reinvestment Strategy",
        description:
          "Always reinvest dividends and interest earnings to maximize compound growth. Even small amounts compound significantly over decades.",
      },
      {
        title: "Contribution Frequency",
        description:
          "This calculator automatically adds contributions at the beginning of each period for optimal growth. More frequent contributions can lead to higher returns due to earlier compounding.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Optimization Techniques",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Start Early",
        description:
          "Time is the most powerful factor in compound growth. Money invested in your 20s can outperform much larger amounts invested later",
      },
      {
        label: "Maximize High-Yield Options",
        description:
          "Seek higher interest rates through high-yield savings accounts, CDs, or low-risk bond funds while maintaining appropriate safety levels",
      },
      {
        label: "Consider Compounding Frequency",
        description:
          "When comparing options with similar rates, choose higher compounding frequency (daily vs. annual) for modestly better returns",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "success",
      title: "Power of Consistent Contributions",
      content:
        "A $200 monthly contribution earning 7% annually for 30 years grows to over $610,000. The key is consistency and patience - small amounts can create substantial wealth through the magic of compound interest.",
    },
  },
];

export default function InterestStrategiesCard() {
  return (
    <InfoCard
      title="Interest Strategies & Optimization"
      sections={interestStrategiesSections}
    />
  );
}

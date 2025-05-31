import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const investmentBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Investing is the act of using money to make more money through various financial instruments. Our Investment Calculator helps you determine different variables for investments with a fixed rate of return, making it easier to plan your financial future.",
  },
  {
    type: "subheader",
    heading: "Key Investment Variables",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Return Rate",
        description:
          "The percentage gain (or loss) on your investment annually. This is what most investors focus on when comparing investment opportunities.",
      },
      {
        label: "Starting Amount (Principal)",
        description:
          "The initial amount you invest at the beginning. This serves as the foundation for all future growth through compound interest.",
      },
      {
        label: "Target Amount",
        description:
          "Your financial goal - the amount you want to accumulate by the end of your investment period.",
      },
      {
        label: "Investment Length",
        description:
          "The duration of your investment. Generally, longer time periods allow for more compounding and potentially greater returns.",
      },
      {
        label: "Additional Contributions",
        description:
          "Regular contributions during the investment period that significantly boost your final returns through consistent compounding.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "How Our Calculator Works",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "End Amount Calculator",
        description:
          "Calculate how much your investment will be worth given a starting amount, contributions, return rate, and time period.",
      },
      {
        title: "Starting Amount Calculator",
        description:
          "Determine how much you need to start with to reach a specific financial goal by a certain date.",
      },
      {
        title: "Return Rate Calculator",
        description:
          "Find out what rate of return you need to achieve your investment goals with your available starting amount and contributions.",
      },
      {
        title: "Investment Length Calculator",
        description:
          "Calculate how long it will take to reach your financial goal given your starting amount, contributions, and expected return.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Pro Tip",
      content:
        "Use the different calculator tabs above to explore various scenarios. For example, see how changing your monthly contribution by $100 affects your timeline to reach your goal.",
    },
  },
];

export default function InvestmentBasics() {
  return (
    <InfoCard
      title="Understanding Investment Calculations"
      sections={investmentBasicsSections}
    />
  );
}

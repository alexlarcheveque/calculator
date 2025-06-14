import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function ConceptionBasics() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <>
          Understanding conception and fertility timing is crucial for couples
          trying to conceive or those wanting to understand their reproductive
          cycle. Conception occurs when a sperm fertilizes an egg, typically
          during the fertile window around ovulation.
        </>
      ),
    },
    {
      type: "subheader",
      heading: "The Conception Process",
      headingLevel: "h3",
      content: (
        <>
          Conception is a complex process that involves precise timing and
          optimal conditions. Understanding this process helps identify the best
          times for conception to occur.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Ovulation",
          description:
            "The release of a mature egg from the ovary, typically occurring 12-16 days before the next menstrual period. The egg survives for 12-24 hours after release.",
        },
        {
          title: "Fertilization",
          description:
            "When sperm meets egg in the fallopian tube. Sperm can survive in the female reproductive tract for up to 5 days, creating a fertile window.",
        },
        {
          title: "Implantation",
          description:
            "The fertilized egg (blastocyst) attaches to the uterine wall, typically 6-12 days after conception. This is when pregnancy officially begins.",
        },
        {
          title: "Early Development",
          description:
            "Cell division begins immediately after fertilization. The embryo travels down the fallopian tube to the uterus over 6-7 days.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Menstrual Cycle and Fertility",
      headingLevel: "h3",
      content: (
        <>
          The menstrual cycle creates a monthly opportunity for conception.
          Understanding cycle phases helps identify the most fertile days.
        </>
      ),
    },
    {
      type: "list",
      listItems: [
        {
          label: "Menstrual Phase (Days 1-5)",
          description:
            "Shedding of the uterine lining. Day 1 is the first day of full menstrual flow",
        },
        {
          label: "Follicular Phase (Days 1-14)",
          description:
            "Egg maturation in the ovaries. Estrogen levels rise, preparing the body for ovulation",
        },
        {
          label: "Ovulation (Around Day 14)",
          description:
            "Egg release from the ovary. Most fertile time of the cycle",
        },
        {
          label: "Luteal Phase (Days 15-28)",
          description:
            "Uterine lining thickens. If no pregnancy occurs, hormone levels drop and menstruation begins",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Fertile Window Calculation",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 3,
      gridItems: [
        {
          title: "Standard Cycle (28 days)",
          description:
            "Ovulation: Day 14\nFertile window: Days 9-14\nBest conception days: Days 12-14",
        },
        {
          title: "Shorter Cycle (24 days)",
          description:
            "Ovulation: Day 10\nFertile window: Days 5-10\nBest conception days: Days 8-10",
        },
        {
          title: "Longer Cycle (35 days)",
          description:
            "Ovulation: Day 21\nFertile window: Days 16-21\nBest conception days: Days 19-21",
        },
      ],
    },
    {
      type: "callout",
      callout: {
        type: "info",
        title: "Important Note",
        content:
          "Cycle lengths can vary between individuals and even month to month. These calculations provide estimates based on average cycles. For more precise timing, consider tracking ovulation signs or using ovulation predictor kits.",
      },
    },
  ];

  return (
    <InfoCard
      title="Understanding Conception & Fertility"
      sections={sections}
    />
  );
}

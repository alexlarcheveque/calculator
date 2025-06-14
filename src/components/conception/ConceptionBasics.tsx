import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function ConceptionBasics() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <>
          Understanding conception timing is essential for couples planning to
          start a family. Conception occurs when sperm fertilizes an egg during
          ovulation, creating the beginning of pregnancy. Success depends on
          timing intercourse during your fertile window.
        </>
      ),
    },
    {
      type: "subheader",
      heading: "How Conception Works",
      headingLevel: "h3",
      content: (
        <>
          Ovulation typically occurs 12-16 days before your next period. The
          released egg survives 12-24 hours, while sperm can live up to 5 days
          in the female reproductive tract. This creates a fertile window of
          approximately 6 days when pregnancy is possible.
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
            "The release of a mature egg from the ovary. Occurs about 14 days before your next period. The egg survives 12-24 hours after release.",
        },
        {
          title: "Fertilization",
          description:
            "When sperm meets egg in the fallopian tube. Sperm can survive up to 5 days, creating your fertile window.",
        },
        {
          title: "Implantation",
          description:
            "The fertilized embryo attaches to the uterine wall 6-12 days after conception. This is when pregnancy officially begins.",
        },
        {
          title: "Best Timing",
          description:
            "Highest conception chances occur 2 days before ovulation through ovulation day. Track your cycle to identify these days.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Understanding Your Cycle",
      headingLevel: "h3",
      content: (
        <>
          Normal cycles range from 21-35 days. The key is identifying when you
          ovulate, which typically happens 12-16 days before your next period,
          regardless of cycle length.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 3,
      gridItems: [
        {
          title: "Short Cycles (21-25 days)",
          description:
            "Ovulation occurs earlier, around days 7-11. Start tracking fertility signs immediately after your period ends.",
        },
        {
          title: "Average Cycles (26-32 days)",
          description:
            "Ovulation typically occurs between days 12-18. Most women fall into this category with predictable patterns.",
        },
        {
          title: "Long Cycles (33+ days)",
          description:
            "Later ovulation, often days 19-25 or later. Consider ovulation predictor kits for more precise timing.",
        },
      ],
    },
    {
      type: "callout",
      callout: {
        type: "info",
        title: "Remember",
        content:
          "Every woman's cycle is unique and can vary month to month. Track for 2-3 cycles to understand your patterns. Most healthy couples conceive within 12 months of trying.",
      },
    },
  ];

  return (
    <InfoCard
      title="Understanding Conception & Fertility Basics"
      sections={sections}
    />
  );
}

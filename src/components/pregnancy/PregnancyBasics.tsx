import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function PregnancyBasics() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <>
          Pregnancy typically lasts about 40 weeks (280 days) from the last
          menstrual period (LMP) or 38 weeks from conception. Understanding how
          pregnancy is calculated and what to expect during each stage helps you
          prepare for this incredible journey.
        </>
      ),
    },
    {
      type: "subheader",
      heading: "How Pregnancy is Calculated",
      headingLevel: "h3",
      content: (
        <>
          Healthcare providers use gestational age, which starts from the first
          day of your last menstrual period, even though conception typically
          occurs about two weeks later. This standardized method ensures
          consistent tracking across all pregnancies.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Gestational Age",
          description:
            "Calculated from the first day of your last menstrual period (LMP). This is the standard used by healthcare providers and includes the two weeks before conception.",
        },
        {
          title: "Fetal Age",
          description:
            "Calculated from conception date, typically 2 weeks less than gestational age. Also called embryonic age or conceptional age.",
        },
        {
          title: "Due Date Calculation",
          description:
            "Estimated as 280 days (40 weeks) from LMP using Naegele's rule. Only 4% of babies are born on their exact due date.",
        },
        {
          title: "Trimester System",
          description:
            "Pregnancy is divided into three trimesters: 1st (weeks 1-12), 2nd (weeks 13-26), and 3rd (weeks 27-40), each with distinct characteristics.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Calculation Methods",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Last Menstrual Period (LMP)",
          description:
            "Most common method, adds 280 days to the first day of your last period",
        },
        {
          label: "Ultrasound Dating",
          description:
            "Most accurate in first trimester (±3-5 days), uses fetal measurements",
        },
        {
          label: "Conception Date",
          description:
            "If known, adds 266 days to conception date or 280 days to LMP equivalent",
        },
        {
          label: "IVF Transfer Date",
          description:
            "Most precise method, calculated from embryo transfer date and embryo age",
        },
      ],
    },
    {
      type: "callout",
      callout: {
        type: "info",
        title: "Important Note",
        content:
          "Due dates are estimates. Most babies (85%) are born within 2 weeks of their calculated due date. Full-term pregnancy ranges from 37-42 weeks.",
      },
    },
  ];

  return (
    <InfoCard
      title="Understanding Pregnancy Calculations"
      sections={sections}
    />
  );
}

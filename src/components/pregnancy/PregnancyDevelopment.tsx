import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function PregnancyDevelopment() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <>
          Fetal development follows a remarkable and predictable pattern
          throughout pregnancy. Understanding these developmental milestones
          helps you appreciate the incredible changes happening during each
          stage of pregnancy.
        </>
      ),
    },
    {
      type: "subheader",
      heading: "First Trimester (Weeks 1-12)",
      headingLevel: "h3",
      content: (
        <>
          The first trimester is a period of rapid development where all major
          organs and body systems begin to form. This is the most critical
          period for fetal development.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 3,
      gridItems: [
        {
          title: "Weeks 1-4",
          description:
            "Fertilization occurs\nImplantation in uterus\nNeural tube begins forming\nHeart starts developing\nSize: Poppy seed to lentil",
        },
        {
          title: "Weeks 5-8",
          description:
            "Heart begins beating\nLimb buds appear\nFacial features forming\nMajor organs developing\nSize: Raspberry to grape",
        },
        {
          title: "Weeks 9-12",
          description:
            "All organs present\nFingers and toes formed\nReflexes developing\nGender determination possible\nSize: Cherry to lime",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Second Trimester (Weeks 13-26)",
      headingLevel: "h3",
      content: (
        <>
          Often called the "golden period" of pregnancy, the second trimester
          brings rapid growth and the exciting milestone of feeling baby's first
          movements.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Weeks 13-18",
          description:
            "Rapid growth period\nSex organs fully developed\nBaby can hear sounds\nFirst movements (quickening)\nSize: Peach to bell pepper",
        },
        {
          title: "Weeks 19-26",
          description:
            "Brain development accelerates\nSleep-wake cycles develop\nLungs begin producing surfactant\nViability milestone at 24 weeks\nSize: Banana to eggplant",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Third Trimester (Weeks 27-40)",
      headingLevel: "h3",
      content: (
        <>
          The final stretch focuses on growth and maturation, preparing your
          baby for life outside the womb.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Weeks 27-32",
          description:
            "Eyes can open and close\nBones hardening (except skull)\nRapid brain development\nImmune system strengthening\nSize: Cauliflower to squash",
        },
        {
          title: "Weeks 33-40",
          description:
            "Lungs nearly mature\nRapid weight gain\nFull-term at 37 weeks\nReady for birth\nSize: Pineapple to watermelon",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Key Developmental Milestones",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Week 6",
          description: "Heart begins beating (detectable by ultrasound)",
        },
        {
          label: "Week 8",
          description: "All major organs present, officially called a fetus",
        },
        {
          label: "Week 12",
          description: "Risk of miscarriage significantly decreases",
        },
        {
          label: "Week 16-20",
          description: "Gender can be determined, anatomy scan performed",
        },
        {
          label: "Week 18-22",
          description: "First movements felt (quickening)",
        },
        {
          label: "Week 24",
          description:
            "Viability milestone - survival possible with medical care",
        },
        {
          label: "Week 28",
          description: "Eyes open, rapid brain development",
        },
        {
          label: "Week 37",
          description: "Considered full-term, lungs mature",
        },
      ],
    },
    {
      type: "callout",
      callout: {
        type: "success",
        title: "Remember",
        content:
          "Every pregnancy is unique. These are average milestones, and your baby may develop slightly ahead or behind these timelines. Always consult with your healthcare provider for personalized information about your pregnancy.",
      },
    },
  ];

  return (
    <InfoCard
      title="Fetal Development Throughout Pregnancy"
      sections={sections}
    />
  );
}

import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function FertilityTips() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <>
          Optimizing fertility involves lifestyle choices, timing, and
          understanding your body's signals. Both partners play important roles
          in conception, and small changes can significantly improve your
          chances of getting pregnant.
        </>
      ),
    },
    {
      type: "subheader",
      heading: "Timing and Tracking",
      headingLevel: "h3",
      content: (
        <>
          Accurate timing is crucial for conception. Understanding and tracking
          your fertile window maximizes your chances of pregnancy.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Ovulation Tracking Methods",
          description:
            "Basal body temperature tracking\nCervical mucus monitoring\nOvulation predictor kits\nFertility apps and calendars\nOvulation pain awareness",
        },
        {
          title: "Best Timing for Intercourse",
          description:
            "Every other day during fertile window\nDay before and day of ovulation\nRegular intercourse throughout cycle\nAvoid excessive frequency\nMorning timing may be optimal",
        },
        {
          title: "Signs of Ovulation",
          description:
            "Clear, stretchy cervical mucus\nSlight temperature rise\nMild pelvic pain (mittelschmerz)\nIncreased libido\nBreast tenderness",
        },
        {
          title: "Cycle Irregularities",
          description:
            "Track for 3+ months\nConsult healthcare provider\nConsider underlying conditions\nStress management\nWeight optimization",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Lifestyle Factors for Both Partners",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Nutrition for Fertility",
          description:
            "Folic acid: 400-800 mcg daily\nAntioxidant-rich foods\nOmega-3 fatty acids\nWhole grains and lean proteins\nLimit processed foods\nStay hydrated",
        },
        {
          title: "Exercise and Weight",
          description:
            "Maintain healthy BMI (18.5-24.9)\nModerate exercise routine\nAvoid excessive training\nYoga and stress reduction\nRegular sleep schedule\n7-9 hours nightly",
        },
      ],
    },
    {
      type: "subheader",
      heading: "What to Avoid",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Smoking and Tobacco",
          description:
            "Reduces fertility in both partners, affects egg and sperm quality",
        },
        {
          label: "Excessive Alcohol",
          description: "Limit to 1-2 drinks per week when trying to conceive",
        },
        {
          label: "High Caffeine Intake",
          description: "Limit to 200mg daily (about 1-2 cups of coffee)",
        },
        {
          label: "Extreme Stress",
          description:
            "Chronic stress can disrupt ovulation and hormone balance",
        },
        {
          label: "Environmental Toxins",
          description:
            "Pesticides, heavy metals, and certain chemicals can affect fertility",
        },
        {
          label: "Excessive Heat (Men)",
          description:
            "Hot tubs, saunas, tight clothing can reduce sperm production",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Male Fertility Optimization",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Sperm Health",
          description:
            "Zinc and vitamin C supplements\nAntioxidant-rich diet\nRegular exercise\nAvoid excessive heat\nLimit alcohol and smoking\nManage stress levels",
        },
        {
          title: "Lifestyle Factors",
          description:
            "Maintain healthy weight\nWear loose-fitting underwear\nLimit laptop use on lap\nAvoid recreational drugs\nGet adequate sleep\nRegular medical checkups",
        },
      ],
    },
    {
      type: "subheader",
      heading: "When to Seek Help",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Under 35 years old",
          description: "After 12 months of trying without success",
        },
        {
          label: "35 years or older",
          description: "After 6 months of trying without success",
        },
        {
          label: "Irregular cycles",
          description: "Cycles shorter than 21 days or longer than 35 days",
        },
        {
          label: "Known medical conditions",
          description: "PCOS, endometriosis, previous pelvic infections",
        },
        {
          label: "Male factor concerns",
          description: "Previous injuries, infections, or fertility issues",
        },
      ],
    },
    {
      type: "callout",
      callout: {
        type: "success",
        title: "Remember",
        content:
          "Conception is a natural process that takes time. Most healthy couples conceive within 12 months of trying. Stay positive, maintain healthy habits, and don't hesitate to seek professional guidance when needed.",
      },
    },
    {
      type: "callout",
      callout: {
        type: "warning",
        title: "Important",
        content:
          "If you have any underlying health conditions or concerns about fertility, consult with a healthcare provider before trying to conceive. They can provide personalized advice and necessary testing.",
      },
    },
  ];

  return (
    <InfoCard
      title="Fertility Optimization & Conception Tips"
      sections={sections}
    />
  );
}

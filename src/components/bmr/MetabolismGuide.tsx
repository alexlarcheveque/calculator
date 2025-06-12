import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function MetabolismGuide() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <p>
          Your metabolism is the sum of all chemical processes that occur in
          your body to maintain life. Understanding how metabolism works can
          help you make informed decisions about nutrition, exercise, and
          lifestyle choices to optimize your energy expenditure and health.
        </p>
      ),
    },
    {
      type: "subheader",
      heading: "Factors That Boost Metabolism",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Strength Training",
          description:
            "Building muscle mass increases BMR since muscle tissue burns more calories at rest than fat tissue.",
        },
        {
          title: "High-Intensity Exercise",
          description:
            "HIIT workouts create an 'afterburn effect' where your body continues burning calories hours after exercise.",
        },
        {
          title: "Protein Intake",
          description:
            "Protein has a higher thermic effect than carbs or fats, burning 20-30% of calories consumed during digestion.",
        },
        {
          title: "Cold Exposure",
          description:
            "Cold temperatures force your body to burn more calories to maintain core temperature.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Metabolism Myths Debunked",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Myth: Small meals boost metabolism",
          description:
            "Research shows meal frequency has minimal impact on total daily energy expenditure",
        },
        {
          label: "Myth: Certain foods have 'negative calories'",
          description:
            "While some foods require energy to digest, none actually result in negative calories",
        },
        {
          label: "Myth: Metabolism slows dramatically with age",
          description:
            "BMR decreases gradually (~2% per decade), but staying active can maintain metabolic health",
        },
        {
          label: "Myth: Thin people always have fast metabolisms",
          description:
            "Body size and composition matter more than weight alone for metabolic rate",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Optimizing Your Metabolic Health",
      headingLevel: "h3",
    },
    {
      type: "text",
      content: (
        <p>
          Focus on sustainable lifestyle changes rather than quick fixes.
          Regular exercise, adequate protein intake, sufficient sleep, and
          stress management are the most effective ways to maintain a healthy
          metabolism throughout life.
        </p>
      ),
    },
    {
      type: "callout",
      callout: {
        type: "success",
        title: "Pro Tip",
        content:
          "The most significant factor you can control for metabolic health is maintaining muscle mass through regular strength training and adequate protein intake.",
      },
    },
  ];

  return (
    <InfoCard
      title="Metabolism and Metabolic Health Guide"
      sections={sections}
    />
  );
}

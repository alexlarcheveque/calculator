import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function BMRBasics() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <p>
          Basal Metabolic Rate (BMR) represents the number of calories your body
          burns at rest to maintain vital functions like breathing, circulation,
          cell production, and brain function. It's the minimum energy
          requirement your body needs to survive in a fasting state at room
          temperature.
        </p>
      ),
    },
    {
      type: "subheader",
      heading: "What Affects Your BMR?",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Age",
          description:
            "BMR decreases by about 2% per decade after age 20 due to muscle mass loss and slower cellular processes.",
        },
        {
          title: "Gender",
          description:
            "Men typically have higher BMRs than women due to greater muscle mass and larger body size.",
        },
        {
          title: "Body Composition",
          description:
            "Muscle tissue burns more calories than fat tissue, so higher muscle mass increases BMR.",
        },
        {
          title: "Body Size",
          description:
            "Larger bodies require more energy to maintain basic functions, resulting in higher BMRs.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "BMR vs. TDEE",
      headingLevel: "h3",
    },
    {
      type: "text",
      content: (
        <p>
          BMR is different from Total Daily Energy Expenditure (TDEE). While BMR
          represents calories burned at rest, TDEE includes all calories burned
          throughout the day, including physical activity, exercise, and the
          thermic effect of food.
        </p>
      ),
    },
    {
      type: "list",
      listItems: [
        {
          label: "BMR (60-75%)",
          description: "Energy for basic bodily functions at rest",
        },
        {
          label: "Physical Activity (15-25%)",
          description: "Exercise and planned physical activities",
        },
        {
          label: "Thermic Effect of Food (8-10%)",
          description: "Energy to digest, absorb, and process food",
        },
        {
          label: "Non-Exercise Activity (5-15%)",
          description:
            "Fidgeting, maintaining posture, other spontaneous activities",
        },
      ],
    },
    {
      type: "callout",
      callout: {
        type: "info",
        title: "Important Note",
        content:
          "BMR calculators provide estimates based on population averages. Individual BMR can vary by ±10-15% due to genetics, hormones, and other factors not captured in standard formulas.",
      },
    },
  ];

  return (
    <InfoCard
      title="Understanding BMR (Basal Metabolic Rate)"
      sections={sections}
    />
  );
}

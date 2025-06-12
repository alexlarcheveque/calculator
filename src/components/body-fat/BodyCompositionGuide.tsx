import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const bodyCompositionGuideSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Improving body composition requires a strategic approach combining resistance training, cardiovascular exercise, and proper nutrition. Understanding how different interventions affect fat loss and muscle preservation helps optimize results while maintaining long-term health and sustainable habits.",
  },
  {
    type: "subheader",
    heading: "Exercise Strategies for Body Fat Reduction",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Resistance Training",
        description:
          "Builds and preserves lean muscle mass during fat loss. Higher muscle mass increases metabolic rate and improves body composition. Focus on compound movements like squats, deadlifts, and presses for maximum efficiency.",
      },
      {
        title: "High-Intensity Interval Training (HIIT)",
        description:
          "Alternates between high-intensity bursts and recovery periods. Increases EPOC (excess post-exercise oxygen consumption) for continued calorie burning after exercise. Efficient for fat loss in shorter time periods.",
      },
      {
        title: "Steady-State Cardio",
        description:
          "Moderate-intensity continuous exercise like jogging, cycling, or swimming. Directly burns calories during exercise and improves cardiovascular health. Best combined with resistance training for optimal body composition.",
      },
      {
        title: "Circuit Training",
        description:
          "Combines resistance exercises with minimal rest between sets. Provides both strength and cardiovascular benefits. Excellent for improving body composition while maintaining training efficiency.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Nutrition Principles for Body Fat Management",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Caloric Balance",
        description:
          "Fat loss requires a caloric deficit (burning more calories than consumed). Moderate deficits of 300-500 calories daily are sustainable and preserve muscle mass better than extreme restrictions.",
      },
      {
        label: "Protein Intake",
        description:
          "Consume 0.8-1.2g protein per pound of body weight to preserve muscle during fat loss. Higher protein intake increases satiety and has a higher thermic effect than carbohydrates or fats.",
      },
      {
        label: "Nutrient Timing",
        description:
          "Consume protein within 2 hours post-exercise to optimize muscle protein synthesis. Distribute protein intake throughout the day for sustained amino acid availability.",
      },
      {
        label: "Hydration",
        description:
          "Adequate hydration supports metabolism, exercise performance, and accurate body fat measurements. Dehydration can significantly affect bioelectrical impedance readings.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Progressive Training Approaches",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Beginner Phase (0-6 months)",
        description:
          "Focus on learning proper form and establishing consistent exercise habits. Full-body routines 3 times per week. Emphasize major movement patterns and gradual progression.",
      },
      {
        title: "Intermediate Phase (6-24 months)",
        description:
          "Increase training frequency and volume. Implement periodization with varying intensities. Add specialized techniques like drop sets, supersets, or advanced cardio protocols.",
      },
      {
        title: "Advanced Phase (2+ years)",
        description:
          "Utilize advanced training methods and detailed periodization. May require specialized programming for specific goals. Consider working with qualified fitness professionals for optimal results.",
      },
      {
        title: "Recovery and Adaptation",
        description:
          "Allow adequate recovery between sessions for adaptation. Include active recovery days with light movement. Monitor for signs of overtraining such as decreased performance or elevated resting heart rate.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Measurement and Tracking Strategies",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Consistent Measurement Conditions",
        description:
          "Take measurements at the same time of day, preferably morning after using bathroom and before eating. Maintain consistent hydration status and avoid measuring after intense exercise or large meals.",
      },
      {
        label: "Multiple Assessment Methods",
        description:
          "Use combination of body fat percentage, circumference measurements, progress photos, and performance metrics. No single method provides complete picture of body composition changes.",
      },
      {
        label: "Realistic Timeline Expectations",
        description:
          "Sustainable fat loss occurs at 1-2 pounds per week. Body composition changes may be slower but more meaningful than rapid weight loss. Allow 4-6 weeks to see noticeable changes.",
      },
      {
        label: "Progress Indicators Beyond Scale",
        description:
          "Monitor energy levels, sleep quality, strength improvements, and how clothes fit. These indicators often change before significant scale movement occurs during body recomposition.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Common Challenges and Solutions",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Plateaus",
        description:
          "Normal part of fat loss process as body adapts to lower calorie intake. Solutions include refeed days, exercise variation, or temporary diet breaks to reset metabolic adaptations.",
      },
      {
        title: "Muscle Loss During Fat Loss",
        description:
          "Minimize with adequate protein intake, resistance training, and moderate caloric deficits. Rapid weight loss often includes significant muscle loss which negatively affects metabolism.",
      },
      {
        title: "Unrealistic Expectations",
        description:
          "Media and social media often portray unrealistic timelines and results. Focus on sustainable habits and long-term health rather than quick fixes or extreme measures.",
      },
      {
        title: "Metabolic Adaptation",
        description:
          "Metabolism naturally slows during prolonged caloric restriction. Include regular maintenance phases and focus on building metabolic capacity through muscle mass and activity levels.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Long-Term Maintenance Strategies",
    headingLevel: "h4",
  },
  {
    type: "text",
    content:
      "Successful body composition management requires sustainable lifestyle changes rather than temporary interventions. Focus on building habits that can be maintained long-term, including regular exercise, balanced nutrition, adequate sleep, and stress management. The most effective approach is one that can be consistently followed while maintaining quality of life and overall well-being.",
  },
];

export default function BodyCompositionGuide() {
  return (
    <InfoCard
      title="Body Composition Improvement Guide"
      sections={bodyCompositionGuideSections}
    />
  );
}

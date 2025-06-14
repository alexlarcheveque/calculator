import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function RunningMetricsGuide() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <p>
          Running metrics provide valuable insights into your performance and
          help track progress over time. Understanding key metrics like pace,
          cadence, heart rate, and power can transform your training from
          guesswork into precise, data-driven improvement.
        </p>
      ),
    },
    {
      type: "subheader",
      heading: "Essential Running Metrics",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Pace",
          description:
            "Time per distance unit (min/mile or min/km). Primary metric for training intensity and race prediction.",
        },
        {
          title: "Heart Rate",
          description:
            "Beats per minute. Objective measure of effort level, useful for training zones and recovery monitoring.",
        },
        {
          title: "Cadence",
          description:
            "Steps per minute. Optimal range is 170-190 SPM. Higher cadence often means better efficiency.",
        },
        {
          title: "Stride Length",
          description:
            "Distance per step. Calculated as speed ÷ cadence. Longer strides at same cadence = faster pace.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Advanced Metrics",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "VO2 Max",
          description:
            "Maximum oxygen uptake. Indicator of aerobic fitness and endurance capacity.",
        },
        {
          label: "Running Power",
          description:
            "Watts generated while running. Accounts for terrain, wind, and efficiency.",
        },
        {
          label: "Ground Contact Time",
          description:
            "Time foot spends on ground per step. Shorter contact often indicates better efficiency.",
        },
        {
          label: "Vertical Oscillation",
          description:
            "Up-and-down movement while running. Lower values typically mean better efficiency.",
        },
        {
          label: "Training Load",
          description:
            "Quantifies training stress combining duration, intensity, and frequency.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Using Metrics Effectively",
      headingLevel: "h3",
    },
    {
      type: "text",
      content: (
        <p>
          Focus on trends rather than single data points. Use metrics to guide
          training decisions, identify when to push harder or rest, and track
          long-term progress. Remember that metrics are tools to support your
          running, not replace listening to your body.
        </p>
      ),
    },
    {
      type: "callout",
      callout: {
        type: "warning",
        title: "Avoid Data Overload",
        content:
          "Don't get overwhelmed by too many metrics. Start with pace and heart rate, then gradually add others as you become more experienced with data-driven training.",
      },
    },
  ];

  return (
    <InfoCard
      title="Running Metrics and Performance Analysis"
      sections={sections}
    />
  );
}

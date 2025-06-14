import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function PaceTrainingGuide() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <p>
          Understanding pace is fundamental to effective training, whether
          you're running, cycling, or swimming. Proper pacing helps you optimize
          performance, prevent burnout, and achieve your fitness goals safely
          and efficiently.
        </p>
      ),
    },
    {
      type: "subheader",
      heading: "Training Zone Principles",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Easy/Base Pace",
          description:
            "70-80% of max heart rate. Builds aerobic base, promotes recovery. Should feel conversational and sustainable for long periods.",
        },
        {
          title: "Tempo Pace",
          description:
            "85-90% max heart rate. Comfortably hard effort. Improves lactate threshold and race pace endurance.",
        },
        {
          title: "Interval Pace",
          description:
            "95-100% max heart rate. Hard, sustainable for 3-8 minutes. Improves VO2 max and speed endurance.",
        },
        {
          title: "Recovery Pace",
          description:
            "60-70% max heart rate. Very easy effort for active recovery between hard sessions.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Pacing Strategies",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Negative Split",
          description:
            "Run the second half faster than the first. Conservative start with strong finish.",
        },
        {
          label: "Even Split",
          description:
            "Maintain consistent pace throughout. Most efficient for longer distances.",
        },
        {
          label: "Progressive Run",
          description:
            "Gradually increase pace every mile/km. Good for tempo and threshold training.",
        },
        {
          label: "Interval Training",
          description:
            "Alternate between fast and recovery paces. Builds speed and anaerobic capacity.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Race Day Pacing",
      headingLevel: "h3",
    },
    {
      type: "text",
      content: (
        <p>
          Start conservatively, especially in longer races. It's easier to speed
          up than to recover from going out too fast. Use the first 10-20% of
          the race to settle into your target pace, then maintain effort based
          on feel and conditions.
        </p>
      ),
    },
    {
      type: "callout",
      callout: {
        type: "info",
        title: "Pro Tip",
        content:
          "Train at a variety of paces to become comfortable with different effort levels. Use both time-based and feel-based training to develop good pacing instincts.",
      },
    },
  ];

  return (
    <InfoCard title="Pace Training and Strategy Guide" sections={sections} />
  );
}

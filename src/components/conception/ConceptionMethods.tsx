import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function ConceptionMethods() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <>
          There are various methods to track ovulation and optimize conception
          timing. Choose approaches that fit your lifestyle and combine multiple
          methods for the most accurate results.
        </>
      ),
    },
    {
      type: "subheader",
      heading: "Natural Tracking Methods",
      headingLevel: "h3",
      content: (
        <>
          These free methods involve observing your body's natural fertility
          signals. They require consistency but provide valuable insights into
          your cycle.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Cervical Mucus",
          description:
            "Monitor daily changes in cervical fluid. Fertile mucus becomes clear, stretchy, and abundant (like egg whites). This gives 1-2 days advance notice of ovulation.",
        },
        {
          title: "Basal Body Temperature",
          description:
            "Track daily temperature with a special BBT thermometer. Temperature rises 0.2-0.5°F after ovulation, confirming when it occurred.",
        },
        {
          title: "Calendar Method",
          description:
            "Track cycle length and predict ovulation by subtracting 14 days from your cycle length. Best combined with other methods for accuracy.",
        },
        {
          title: "Physical Signs",
          description:
            "Note ovulation pain (mittelschmerz), breast tenderness, increased libido, or mood changes that occur consistently in your cycle.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Modern Tracking Tools",
      headingLevel: "h3",
      content: (
        <>
          Technology makes fertility tracking more convenient and accurate.
          These tools can enhance natural methods and provide sophisticated
          predictions.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Ovulation Predictor Kits",
          description:
            "Detect the LH hormone surge 24-36 hours before ovulation. Digital versions provide clear results. Use daily during your expected fertile window.",
        },
        {
          title: "Fertility Apps",
          description:
            "Track cycles, symptoms, and predictions on your phone. Popular options include Clue, Flo, Ovia, and Glow. Many provide reminders and educational content.",
        },
        {
          title: "Wearable Monitors",
          description:
            "Devices like Ava bracelet and Tempdrop provide continuous temperature monitoring while you sleep, eliminating manual daily tracking.",
        },
        {
          title: "Advanced Monitors",
          description:
            "Comprehensive systems like Clearblue Fertility Monitor track multiple hormones for personalized fertility status. More expensive but highly accurate.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Choosing Your Approach",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 3,
      gridItems: [
        {
          title: "Getting Started",
          description:
            "Begin with a fertility app and cervical mucus tracking. Add ovulation predictor kits for better timing. This combination works well for regular cycles.",
        },
        {
          title: "Irregular Cycles",
          description:
            "Focus on daily fertility signs and consider investing in OPKs or fertility monitors. These provide more reliable predictions for unpredictable cycles.",
        },
        {
          title: "Advanced Tracking",
          description:
            "Combine multiple methods: wearable devices, apps, OPKs, and natural signs. Best for couples trying for several months or those wanting maximum precision.",
        },
      ],
    },
    {
      type: "callout",
      callout: {
        type: "info",
        title: "Tips for Success",
        content:
          "Start simple and build your tracking toolkit gradually. Consistency is key - choose methods you'll use daily. It takes 2-3 cycles to understand your patterns, so be patient as you learn.",
      },
    },
  ];

  return <InfoCard title="Fertility Tracking Methods" sections={sections} />;
}

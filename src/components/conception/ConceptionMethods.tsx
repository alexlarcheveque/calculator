import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function ConceptionMethods() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <>
          There are various methods and tools available to help track ovulation
          and optimize timing for conception. Understanding these different
          approaches helps you choose the best method for your lifestyle and
          needs.
        </>
      ),
    },
    {
      type: "subheader",
      heading: "Natural Fertility Awareness Methods",
      headingLevel: "h3",
      content: (
        <>
          These methods involve observing your body's natural signs of fertility
          and ovulation without the use of medical devices or medications.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Basal Body Temperature (BBT)",
          description:
            "Track daily temperature upon waking\nTemperature rises 0.2-0.5°F after ovulation\nRequires consistent timing\nUse special BBT thermometer\nChart for 3+ months for patterns",
        },
        {
          title: "Cervical Mucus Monitoring",
          description:
            "Observe daily changes in cervical fluid\nFertile mucus: clear, stretchy, egg-white consistency\nPeak fertility: most abundant, slippery mucus\nDries up after ovulation\nTakes practice to recognize patterns",
        },
        {
          title: "Calendar Method",
          description:
            "Track menstrual cycle length\nPredict ovulation based on past cycles\nSubtract 14 days from cycle length\nLess accurate for irregular cycles\nBest combined with other methods",
        },
        {
          title: "Cervical Position",
          description:
            "Check cervix position and texture\nFertile: high, soft, open\nInfertile: low, firm, closed\nRequires practice and consistency\nCombine with other fertility signs",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Modern Tracking Tools",
      headingLevel: "h3",
      content: (
        <>
          Technology has made fertility tracking more convenient and accurate
          with various digital tools and devices.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Ovulation Predictor Kits (OPKs)",
          description:
            "Detect luteinizing hormone (LH) surge\nPredict ovulation 12-36 hours in advance\nUse daily during fertile window\nDigital and strip options available\n99% accuracy when used correctly",
        },
        {
          title: "Fertility Apps",
          description:
            "Track cycles, symptoms, and predictions\nReminders for testing and fertile days\nData analysis and pattern recognition\nSome integrate with wearable devices\nPopular apps: Clue, Flo, Ovia, Glow",
        },
        {
          title: "Wearable Fertility Monitors",
          description:
            "Continuous temperature monitoring\nAutomatic data collection\nAdvanced algorithms for predictions\nExamples: Ava bracelet, Tempdrop\nHigher accuracy than manual tracking",
        },
        {
          title: "Fertility Monitors",
          description:
            "Advanced hormone detection\nTrack multiple fertility indicators\nClearblue Fertility Monitor\nPersonalized fertility status\nMore expensive but comprehensive",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Medical Fertility Tracking",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Transvaginal Ultrasound",
          description:
            "Monitor follicle development and ovulation in real-time",
        },
        {
          label: "Blood Hormone Tests",
          description: "Measure LH, FSH, estrogen, and progesterone levels",
        },
        {
          label: "Ovulation Induction",
          description:
            "Medications to stimulate ovulation in cases of irregular cycles",
        },
        {
          label: "Fertility Specialist Consultation",
          description:
            "Comprehensive evaluation and personalized treatment plans",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Choosing the Right Method",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 3,
      gridItems: [
        {
          title: "Beginners",
          description:
            "Start with fertility apps\nAdd ovulation predictor kits\nLearn to observe cervical mucus\nTrack for 2-3 cycles",
        },
        {
          title: "Irregular Cycles",
          description:
            "Use ovulation predictor kits\nConsider fertility monitors\nTrack multiple signs\nConsult healthcare provider",
        },
        {
          title: "Advanced Tracking",
          description:
            "Combine multiple methods\nWearable devices\nDetailed charting\nProfessional guidance",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Tips for Success",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Consistency is key",
          description: "Track daily at the same time for accurate patterns",
        },
        {
          label: "Be patient",
          description: "It takes 2-3 cycles to understand your unique patterns",
        },
        {
          label: "Combine methods",
          description: "Use multiple indicators for better accuracy",
        },
        {
          label: "Stay relaxed",
          description: "Stress can affect ovulation and cycle regularity",
        },
        {
          label: "Record everything",
          description:
            "Note symptoms, mood, and external factors that might affect cycles",
        },
      ],
    },
    {
      type: "callout",
      callout: {
        type: "info",
        title: "Method Accuracy",
        content:
          "No single method is 100% accurate. Combining multiple tracking methods (like BBT + cervical mucus + OPKs) provides the most reliable fertility awareness. Digital tools can help automate tracking and improve accuracy.",
      },
    },
    {
      type: "callout",
      callout: {
        type: "success",
        title: "Getting Started",
        content:
          "Begin with simple methods like cycle tracking and cervical mucus observation. Add tools like OPKs or apps as you become more comfortable. Remember that learning your body's patterns takes time and patience.",
      },
    },
  ];

  return (
    <InfoCard title="Conception Tracking Methods & Tools" sections={sections} />
  );
}

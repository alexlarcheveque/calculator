import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function WeightFormulaGuide() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <p>
          Ideal weight formulas were developed to provide standardized estimates
          for medical and clinical purposes. Each formula has its own
          methodology and best-use scenarios. Understanding these differences
          helps interpret the results more accurately.
        </p>
      ),
    },
    {
      type: "subheader",
      heading: "Popular Ideal Weight Formulas",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Robinson Formula (1983)",
          description:
            "Modern and widely used. Based on metropolitan life insurance data. Generally provides moderate estimates and works well for average builds.",
        },
        {
          title: "Miller Formula (1983)",
          description:
            "Slight modification of Robinson formula. Developed around the same time with similar methodology but slightly different coefficients.",
        },
        {
          title: "Devine Formula (1974)",
          description:
            "Originally created for drug dosing calculations. Often gives lower estimates and is still used in medical settings for medication calculations.",
        },
        {
          title: "Hamwi Formula (1964)",
          description:
            "One of the oldest formulas, developed for clinical nutrition. Simple calculation method and used in many healthcare settings.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Formula Limitations",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Height and Gender Only",
          description:
            "Formulas only consider height and gender, ignoring body composition, frame size, and muscle mass",
        },
        {
          label: "Population Averages",
          description:
            "Based on historical population data that may not represent current demographics or individual variation",
        },
        {
          label: "No Age Consideration",
          description:
            "Don't account for age-related changes in body composition and healthy weight ranges",
        },
        {
          label: "Athletic Populations",
          description:
            "May underestimate healthy weight for muscular individuals or athletes",
        },
        {
          label: "Ethnic Differences",
          description:
            "Originally developed using primarily Caucasian populations, may not apply universally",
        },
      ],
    },
    {
      type: "subheader",
      heading: "BMI vs. Formula Approaches",
      headingLevel: "h3",
    },
    {
      type: "text",
      content: (
        <p>
          BMI provides a weight range (18.5-25) that accommodates individual
          variation, while formulas give specific numbers. BMI ranges are often
          more practical for real-world application, while formulas are useful
          for clinical and research purposes.
        </p>
      ),
    },
    {
      type: "callout",
      callout: {
        type: "info",
        title: "Best Practice",
        content:
          "Use multiple formulas and BMI ranges together to get a comprehensive view. Consider your individual factors like activity level, body composition, and health markers when interpreting results.",
      },
    },
  ];

  return <InfoCard title="Ideal Weight Formula Guide" sections={sections} />;
}

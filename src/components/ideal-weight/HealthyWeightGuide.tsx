import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function HealthyWeightGuide() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <p>
          A healthy weight is more than just a number on a scale. It's a weight
          that allows you to feel energetic, reduces your risk of disease, and
          supports your overall well-being. Understanding the factors that
          influence healthy weight can help you make informed decisions about
          your health goals.
        </p>
      ),
    },
    {
      type: "subheader",
      heading: "Beyond the Scale: What Really Matters",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Body Composition",
          description:
            "The ratio of muscle to fat is more important than total weight. Athletes often weigh more due to muscle mass but are very healthy.",
        },
        {
          title: "Waist Circumference",
          description:
            "Abdominal fat is a better predictor of health risks than BMI. Men >40in and women >35in have increased risk.",
        },
        {
          title: "Energy and Vitality",
          description:
            "How you feel matters more than what you weigh. Good energy levels and physical capability indicate health.",
        },
        {
          title: "Disease Risk Factors",
          description:
            "Blood pressure, cholesterol, and blood sugar are better health indicators than weight alone.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Factors That Influence Healthy Weight",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Genetics",
          description:
            "Your genes influence body type, fat distribution, and metabolism - but don't determine your destiny",
        },
        {
          label: "Age",
          description:
            "Metabolism slows with age, and healthy weight ranges may shift as you get older",
        },
        {
          label: "Activity Level",
          description:
            "Regular exercise, especially strength training, helps maintain healthy weight and body composition",
        },
        {
          label: "Medical Conditions",
          description:
            "Thyroid disorders, PCOS, and medications can affect weight and should be considered",
        },
        {
          label: "Lifestyle Factors",
          description:
            "Sleep quality, stress levels, and eating patterns significantly impact weight management",
        },
      ],
    },
    {
      type: "subheader",
      heading: "A Balanced Approach to Weight",
      headingLevel: "h3",
    },
    {
      type: "text",
      content: (
        <p>
          Focus on building healthy habits rather than achieving a specific
          number. Eat nutrient-dense foods, stay physically active, manage
          stress, and get adequate sleep. These behaviors naturally support a
          healthy weight range for your individual body.
        </p>
      ),
    },
    {
      type: "callout",
      callout: {
        type: "success",
        title: "Remember",
        content:
          "The 'ideal' weight is the weight at which you feel your best, have good energy, and maintain good health markers. This may be different from calculator estimates.",
      },
    },
  ];

  return <InfoCard title="Understanding Healthy Weight" sections={sections} />;
}

import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const healthGuidelinesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Current health guidelines emphasize a holistic approach to weight management and wellness that goes beyond BMI alone. Understanding evidence-based recommendations for healthy weight maintenance, lifestyle factors, and when to seek medical guidance helps individuals make informed decisions about their health journey.",
  },
  {
    type: "subheader",
    heading: "Weight Management Guidelines",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Healthy Weight Loss Rate",
        description:
          "CDC and WHO recommend 1-2 pounds per week for sustainable weight loss. Gradual changes are more likely to result in long-term success and avoid metabolic slowdown associated with rapid weight loss.",
      },
      {
        title: "Physical Activity Standards",
        description:
          "150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly, plus 2+ days of muscle-strengthening activities. This combination supports healthy weight maintenance and overall wellness.",
      },
      {
        title: "Caloric Balance Approach",
        description:
          "Focus on creating a modest caloric deficit (300-500 calories/day) through combination of diet and exercise rather than extreme restriction. This approach preserves muscle mass and maintains metabolism.",
      },
      {
        title: "Behavioral Changes",
        description:
          "Emphasis on building sustainable habits: mindful eating, regular meal timing, adequate sleep (7-9 hours), stress management, and social support systems for long-term success.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Medical Guidelines for BMI Assessment",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "When to Consult Healthcare Providers",
      content: (
        <div>
          <p className="mb-2 mt-4">
            <strong>Recommended medical consultation scenarios:</strong>
          </p>
          <ul className="space-y-2 text-sm mb-3">
            <li>
              • <strong>BMI outside normal range:</strong> &lt;18.5 or &gt;25,
              especially with symptoms or health concerns
            </li>
            <li>
              • <strong>Rapid weight changes:</strong> Unexplained weight loss
              or gain of 10+ pounds within 6 months
            </li>
            <li>
              • <strong>Family history factors:</strong> Diabetes, heart
              disease, or metabolic disorders requiring early intervention
            </li>
            <li>
              • <strong>Age-related changes:</strong> Significant weight changes
              during menopause, aging, or life transitions
            </li>
            <li>
              • <strong>Medication effects:</strong> Weight changes related to
              prescriptions or health conditions
            </li>
          </ul>
          <p className="mb-2">
            <strong>Professional assessments may include:</strong>
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              • Body composition analysis (DEXA scan, bioelectrical impedance)
            </li>
            <li>• Metabolic panel and hormone testing</li>
            <li>• Cardiovascular risk assessment</li>
            <li>• Nutritional counseling and meal planning</li>
          </ul>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Age-Specific BMI Considerations",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Children and Adolescents (2-19 years)",
        description:
          "Use BMI-for-age percentiles rather than adult BMI categories. Pediatric BMI accounts for natural growth patterns and development. 85th-95th percentile indicates overweight; ≥95th percentile indicates obesity",
      },
      {
        label: "Young Adults (20-39 years)",
        description:
          "Standard BMI categories typically apply. This age group benefits most from establishing healthy lifestyle patterns. Focus on building sustainable habits for long-term health rather than short-term weight loss",
      },
      {
        label: "Middle-Aged Adults (40-64 years)",
        description:
          "Metabolic changes may affect weight distribution. Slightly higher BMI (up to 27) may be acceptable with good cardiovascular health. Emphasis on maintaining muscle mass and bone density through strength training",
      },
      {
        label: "Older Adults (65+ years)",
        description:
          "Higher BMI ranges (23-30) may be protective against frailty and falls. Unintentional weight loss is often more concerning than being slightly overweight. Focus on maintaining functional fitness and independence",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Evidence-Based Lifestyle Interventions",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Nutritional Approaches",
        description:
          "Mediterranean, DASH, or plant-based diets show strong evidence for health benefits. Focus on whole foods, adequate protein (0.8-1.2g/kg body weight), and balanced macronutrients rather than restrictive elimination diets.",
      },
      {
        title: "Exercise Programming",
        description:
          "Combination of cardio and resistance training optimizes body composition. High-intensity interval training (HIIT) and strength training particularly effective for metabolic health and maintaining muscle mass during weight loss.",
      },
      {
        title: "Technology Integration",
        description:
          "Wearable devices, apps, and telehealth support can improve adherence to healthy lifestyle changes. Use technology to track progress, maintain accountability, and access professional guidance remotely.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Mental Health and Body Image in Weight Management",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Holistic Approach to Health and Wellness",
      content: (
        <div>
          <p className="mb-2 mt-4">
            <strong>Mental health considerations in weight management:</strong>
          </p>
          <ul className="space-y-2 text-sm mb-3">
            <li>
              • <strong>Body positivity:</strong> Focus on health behaviors
              rather than appearance or scale numbers alone
            </li>
            <li>
              • <strong>Eating disorder awareness:</strong> Recognize signs of
              unhealthy relationships with food or exercise
            </li>
            <li>
              • <strong>Stress management:</strong> Chronic stress affects
              cortisol levels and can impact weight regulation
            </li>
            <li>
              • <strong>Sleep quality:</strong> 7-9 hours of quality sleep
              supports hormonal balance and weight management
            </li>
            <li>
              • <strong>Social support:</strong> Community and family support
              significantly improve long-term success rates
            </li>
          </ul>
          <p className="text-xs text-gray-600 mt-3">
            <strong>Remember:</strong> Health comes in many sizes. Focus on
            sustainable lifestyle changes that improve overall well-being rather
            than pursuing specific weight targets alone
          </p>
        </div>
      ),
    },
  },
];

export default function HealthGuidelines() {
  return (
    <InfoCard
      title="Current Health Guidelines and Weight Management"
      sections={healthGuidelinesSections}
    />
  );
}

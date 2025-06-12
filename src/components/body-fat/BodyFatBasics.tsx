import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const bodyFatBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Body fat percentage is a critical health metric that provides insight into body composition beyond what weight or BMI alone can reveal. Understanding body fat calculation methods, healthy ranges, and interpretation helps individuals make informed decisions about their fitness, health, and wellness goals.",
  },
  {
    type: "subheader",
    heading: "Body Fat Calculation Methods and Accuracy",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "U.S. Navy Method",
        description:
          "Uses circumference measurements (neck, waist, and hip for women) to estimate body fat percentage. Developed by the U.S. Navy for practical field assessment, this method is accurate to within 3-4% when measurements are taken correctly.",
      },
      {
        title: "BMI-Based Estimation",
        description:
          "Converts BMI to body fat percentage using age and gender factors. Less accurate than circumference methods but useful for general estimates. Best used as a secondary reference rather than primary assessment tool.",
      },
      {
        title: "DEXA Scan (Gold Standard)",
        description:
          "Dual-energy X-ray absorptiometry provides the most accurate body composition analysis, measuring bone density, muscle mass, and fat distribution. Considered the clinical gold standard with accuracy within 1-2%.",
      },
      {
        title: "Bioelectrical Impedance",
        description:
          "Measures electrical resistance through body tissues. Convenient but affected by hydration status, food intake, and exercise. Home scales using this method can vary significantly in accuracy.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Healthy Body Fat Ranges by Demographics",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Men - Essential Fat",
        description:
          "2-5%. Minimum fat required for basic physiological functions. Below this range poses serious health risks and is typically only seen in competitive bodybuilders temporarily.",
      },
      {
        label: "Men - Athletes",
        description:
          "6-13%. Range typical of athletes in sports requiring low body fat. Sustainable for trained individuals but may require careful nutrition and training management.",
      },
      {
        label: "Men - Fitness",
        description:
          "14-17%. Excellent fitness level with visible muscle definition. Achievable and sustainable for most active men with consistent exercise and nutrition habits.",
      },
      {
        label: "Men - Average",
        description:
          "18-24%. Acceptable range for general health. May not show significant muscle definition but poses no health risks when combined with regular activity.",
      },
      {
        label: "Women - Essential Fat",
        description:
          "10-13%. Minimum required for reproductive functions and hormonal health. Below this range can disrupt menstrual cycles and bone health in women.",
      },
      {
        label: "Women - Athletes",
        description:
          "14-20%. Range common in female athletes. Requires careful attention to nutritional adequacy, particularly iron, calcium, and energy intake to maintain health.",
      },
      {
        label: "Women - Fitness",
        description:
          "21-24%. Excellent fitness level with good muscle tone. Achievable through regular exercise and balanced nutrition without extreme dietary restrictions.",
      },
      {
        label: "Women - Average",
        description:
          "25-31%. Healthy range for most women. Provides adequate energy reserves and supports hormonal function while maintaining overall health.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Age-Related Changes and Considerations",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Young Adults (18-39)",
        description:
          "Peak muscle-building years with higher metabolic rates. Ideal time to establish healthy body composition habits. Body fat ranges: Men 8-20%, Women 21-33%.",
      },
      {
        title: "Middle Age (40-59)",
        description:
          "Gradual decrease in muscle mass and metabolic rate begins. Slight increases in body fat percentage are normal. Focus shifts to maintaining muscle mass and preventing excessive fat gain.",
      },
      {
        title: "Older Adults (60+)",
        description:
          "Sarcopenia (muscle loss) becomes more significant concern. Slightly higher body fat percentages may be protective. Emphasis on maintaining functional strength and mobility.",
      },
      {
        title: "Gender Differences",
        description:
          "Women naturally carry more essential fat due to reproductive functions. Hormonal changes during menopause can affect fat distribution and body composition even with stable weight.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Factors Affecting Body Fat Distribution",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Genetics",
        description:
          "Determines natural body fat distribution patterns, metabolic rate, and ease of fat loss or gain. Some individuals naturally store more fat in certain areas regardless of overall body fat percentage.",
      },
      {
        label: "Hormones",
        description:
          "Testosterone, estrogen, cortisol, insulin, and thyroid hormones significantly impact fat storage and distribution. Hormonal imbalances can affect body composition independent of diet and exercise.",
      },
      {
        label: "Exercise Type",
        description:
          "Resistance training preserves muscle mass during fat loss. Cardiovascular exercise burns calories efficiently. Combination approaches typically yield best body composition improvements.",
      },
      {
        label: "Nutrition Quality",
        description:
          "Protein intake affects muscle maintenance. Nutrient timing can influence body composition. Sustainable caloric deficits are more effective than extreme restrictions for long-term fat loss.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Health Implications and Practical Applications",
    headingLevel: "h4",
  },
  {
    type: "text",
    content:
      "Body fat percentage provides valuable context for health assessment beyond weight alone. Athletes may have high BMI due to muscle mass but low body fat. Conversely, individuals with normal weight may have elevated body fat percentages indicating poor body composition. Use body fat measurements as part of comprehensive health monitoring, alongside other metrics like waist circumference, fitness levels, and overall well-being indicators.",
  },
];

export default function BodyFatBasics() {
  return (
    <InfoCard
      title="Body Fat Calculation and Health Assessment"
      sections={bodyFatBasicsSections}
    />
  );
}
